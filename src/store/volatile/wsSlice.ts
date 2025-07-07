import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WsMessage = {
    type: "NOTIFICATIONS" | "ADD_NOTIFICATION" | "REMOVE_NOTIFICATION" | "READ_NOTIFICATION" | "READ_ALL_NOTIFICATION" | "REMOVE_ALL_NOTIFICATION";
    payload: any;
};

interface WsState {
    notifications: any[];
    [key: string]: any;
}

const initialState: WsState = {
    notifications: [],
};

const wsSlice = createSlice({
    name: "ws",
    initialState,
    reducers: {
        handleWS(state, action: PayloadAction<WsMessage>) {
            console.log("Received WS message:", action.payload);
            const { type, payload } = action.payload;

            switch (type) {
                case "NOTIFICATIONS":
                    state.notifications = payload;
                    break;
                case "ADD_NOTIFICATION":
                    state.notifications.push(payload);
                    state.notifications.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    break;
                case "REMOVE_NOTIFICATION":
                    state.notifications = state.notifications.filter((notif: any) => notif.id !== payload);
                    break;
                case "READ_NOTIFICATION":
                    const notification = state.notifications.find((notif: any) => notif.id === payload);
                    if (notification) {
                        notification.read = true;
                    }
                    break;
                case "READ_ALL_NOTIFICATION":
                    state.notifications.forEach((notif: any) => {
                        notif.read = true;
                    });
                    break;
                case "REMOVE_ALL_NOTIFICATION":
                    state.notifications = [];
                    break;
                default:
                    console.warn("Unhandled WS type:", type);
            }
        },
        resetWsState() {
            return initialState;
        },
    },
});

export const { handleWS, resetWsState } = wsSlice.actions;
export default wsSlice.reducer;
