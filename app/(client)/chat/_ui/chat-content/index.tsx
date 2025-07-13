// components/chat/ChatContent.tsx
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useChatWebSocket from "@/hooks/useChat";
import ChatHeader from "./ChatHeader";
import DateSeparator from "./DateSeparator";
import MessageItem from "./MessageItem";
import ChatInput from "./ChatInput";
import { parseDate } from "./utils";

interface ChatContentProps {
    receiverId: number;
}

const ChatContent = ({ receiverId }: ChatContentProps) => {
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const { receiver, messages, sendMessage, moreHistory, handleRecall } = useChatWebSocket(receiverId, setIsLoadingHistory);
    const [inputText, setInputText] = useState("");

    const [isInitialScrollDone, setIsInitialScrollDone] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [showNewMsgBtn, setShowNewMsgBtn] = useState(false);
    const [isMoreHistory, setIsMoreHistory] = useState(false);

    const messagesWithMeta = useMemo(() => {
        if (!messages || messages.length === 0) return [];

        let prevDate: Date | null = null;
        let prevSenderId: number | null = null;

        return messages.map((msg, index) => {
            const currentDate = parseDate(msg.timestamp);
            const isFirstOfDay = !prevDate ||
                prevDate.getDate() !== currentDate.getDate() ||
                prevDate.getMonth() !== currentDate.getMonth() ||
                prevDate.getFullYear() !== currentDate.getFullYear();

            let minutesDiff = 0;
            if (prevDate) {
                minutesDiff = (currentDate.getTime() - prevDate.getTime()) / (1000 * 60);
            }

            const isLastOfSender = index === messages.length - 1 ||
                messages[index + 1].senderId !== msg.senderId;

            const showTime = isLastOfSender || minutesDiff > 10;

            prevDate = currentDate;
            prevSenderId = msg.senderId;

            return {
                ...msg,
                date: currentDate,
                showDate: isFirstOfDay,
                showTime,
                isLastOfSender,
            };
        });
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        sendMessage(inputText.trim());
        setInputText("");
    };

    const scrollMessagesToBottom = (offset = 0) => {
        const c = messagesContainerRef.current;
        if (c) {
            const target = c.scrollHeight - c.clientHeight - offset;
            c.scrollTo({ top: Math.max(target, 0), behavior: "smooth" });
        }
    };

    useEffect(() => {
        const c = messagesContainerRef.current;
        if (!c) return;

        const shouldScrollToBottom =
            (!isInitialScrollDone && messages.length > 0) ||
            (isAtBottom && messages.length > 0);

        if (shouldScrollToBottom) {
            scrollMessagesToBottom(0);
            setTimeout(() => setIsInitialScrollDone(true), 1000);
            setShowNewMsgBtn(false);
        } else if (!isAtBottom && !isMoreHistory) {
            setShowNewMsgBtn(true);
        } else {
            setIsMoreHistory(false);
        }
    }, [messages]);

    useEffect(() => {
        setIsLoadingHistory(false);
    }, [messages]);

    const onScroll = () => {
        const c = messagesContainerRef.current;
        if (!c) return;
        const distance = c.scrollHeight - c.scrollTop - c.clientHeight;
        const atBottom = distance < 20;
        setIsAtBottom(atBottom);
        if (atBottom) setShowNewMsgBtn(false);

        const nearTop = c.scrollTop <= 50;
        if (nearTop && !isLoadingHistory && moreHistory && isInitialScrollDone) {
            setIsLoadingHistory(true);
            setIsMoreHistory(true);
            moreHistory();
        }
    };

    return (
        <div className="!flex !flex-col !h-screen !w-full !bg-white !shadow-md !overflow-hidden">
            <ChatHeader receiverId={receiverId} receiver={receiver} />

            <div
                ref={messagesContainerRef}
                onScroll={onScroll}
                className="!relative !flex-1 !overflow-y-auto !p-4 !bg-gray-50"
            >
                {isLoadingHistory && (
                    <div className="!text-center !py-2 !text-gray-500">
                        Đang tải tin nhắn cũ...
                    </div>
                )}

                {messagesWithMeta.map((msg) => {
                    const isReceiver = msg.senderId === receiverId;
                    return (
                        <div key={msg.id}>
                            {msg.showDate && <DateSeparator date={msg.date} />}
                            <MessageItem
                                msg={msg}
                                isReceiver={isReceiver}
                                receiverAvatar={receiver?.avatar}
                                onRecall={handleRecall}
                            />
                        </div>
                    );
                })}
            </div>

            <ChatInput
                inputText={inputText}
                setInputText={setInputText}
                handleSendMessage={handleSendMessage}
                showNewMsgBtn={showNewMsgBtn}
                scrollMessagesToBottom={scrollMessagesToBottom}
            />
        </div>
    );
};

export default ChatContent;