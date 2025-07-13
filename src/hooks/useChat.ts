import SockJS from "sockjs-client";
import { Client, StompSubscription } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useAuthorization } from "./useAuthorization";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function useChatWebSocket(receiverId: number, setIsLoadingHistory: (isLoading: boolean) => void) {
    const token = useSelector((state: RootState) => state.persistent.auth.token);
    const isAuthenticated = useAuthorization();

    const [messages, setMessages] = useState<any[]>([]);
    const [receiver, setReceiver] = useState<any>(null);
    const [iso, setIso] = useState<number>(new Date().getTime());
    const clientRef = useRef<Client | null>(null);
    const subscriptionRef = useRef<StompSubscription | null>(null);

    // chỉ khởi tạo client 1 lần
    useEffect(() => {
        if (!isAuthenticated || !token) return;

        if (clientRef.current) {
            console.log("⚠️ Client already exists, skip init");
            return;
        }

        const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
        });

        client.onConnect = () => {
            console.log("✅ Connected to WS");
        };

        client.onStompError = (frame) => {
            console.error("🛑 Broker error:", frame.headers["message"]);
        };

        client.activate();
        clientRef.current = client;

        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
                subscriptionRef.current = null;
            }
            if (clientRef.current) {
                clientRef.current.deactivate();
                clientRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!clientRef.current || !receiverId) return;

        const client = clientRef.current;

        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
            subscriptionRef.current = null;
        }

        const subscribeAndFetch = () => {
            subscriptionRef.current = client.subscribe(
                `/user/queue/chat/${receiverId}`,
                (msg) => {
                    try {
                        const data = JSON.parse(msg.body);
                        if (data?.receiver) {
                            setReceiver(data.receiver);
                        }

                        if (data?.messages && data.messages.length > 0) {
                            setMessages(prev => [...data.messages.reverse(), ...prev]);
                            setIso(data.messages[0].timestamp);
                        } else {
                            setIsLoadingHistory(false);
                        }

                        if (data?.message) {
                            setMessages(prev => [...prev, data.message]);
                        }

                        if (data?.senderIsRead) {
                            setMessages(prev => prev.map(m => ({
                                ...m,
                                read: true
                            })));
                        }

                        if (data?.recall) {
                            setMessages(prev =>
                                prev.map(m =>
                                    m.id === data.recall
                                        ? { ...m, recall: true }
                                        : m
                                )
                            );
                        }
                    } catch (err) {
                        console.error("❌ Failed to parse WS message", err);
                    }
                }
            );

            // Gửi yêu cầu lấy dữ liệu ban đầu
            client.publish({
                destination: "/app/chat/history",
                body: JSON.stringify({
                    receiverId, iso
                }),
            });
        };

        if (client.connected) {
            subscribeAndFetch();
        } else {
            const originalOnConnect = client.onConnect;
            client.onConnect = (frame) => {
                console.log("✅ Connected to WS (from receiver effect)");
                originalOnConnect?.(frame);
                subscribeAndFetch();
            };
        }

        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
                subscriptionRef.current = null;
            }
        };
    }, [receiverId]);


    const sendMessage = (content: string) => {
        if (!clientRef.current || !clientRef.current.connected) {
            console.error("🚫 Cannot send message. Not connected.");
            return;
        }

        const messagePayload = {
            receiverId,
            content,
        };

        clientRef.current.publish({
            destination: "/app/chat/send",
            body: JSON.stringify(messagePayload),
        });
    };

    const moreHistory = () => {
        if (!clientRef.current || !clientRef.current.connected) {
            console.error("🚫 Cannot load more message. Not connected.");
            return;
        }

        clientRef.current.publish({
            destination: "/app/chat/history",
            body: JSON.stringify({
                receiverId, iso
            }),
        });
    }

    const handleRecall = (messageId: number) => {
        if (!clientRef.current || !clientRef.current.connected) {
            console.error("🚫 Cannot recall message. Not connected.");
            return;
        }

        clientRef.current.publish({
            destination: "/app/chat/recall/" + messageId,
        });
    };

    return { receiver, messages, sendMessage, moreHistory, handleRecall };
}