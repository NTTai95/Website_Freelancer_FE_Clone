import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { handleWS } from "@/store/volatile/wsSlice";
import { useAuthorization } from "./useAuthorization";

export default function useWebSocket() {
    const token = useSelector((state: RootState) => state.persistent.auth.token);
    const isAuthenticated = useAuthorization();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated || !token) return;

        const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
        });

        client.onConnect = () => {
            client.subscribe("/user/queue/data", (msg) => {
                try {
                    const data = JSON.parse(msg.body);
                    dispatch(handleWS(data));
                } catch (err) {
                    console.error("❌ Failed to parse WS message", err);
                }
            });
        };

        client.onStompError = (frame) => {
            console.error("Broker error:", frame.headers["message"]);
        };

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [token, dispatch, isAuthenticated]);
}
