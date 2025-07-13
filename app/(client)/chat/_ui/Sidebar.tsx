"use client";

import { RootState } from "@/store";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.locale("vi");

const timeDisplay = (iso: string, now?: string) => {
    if (!iso) return '';
    const parsedTime = dayjs(iso).tz("Asia/Ho_Chi_Minh");
    const nowTime = now
        ? dayjs(now, "DD/MM/YYYY HH:mm:ss", true).tz("Asia/Ho_Chi_Minh")
        : dayjs().tz("Asia/Ho_Chi_Minh");

    if (!parsedTime.isValid()) {
        return 'Ngày giờ không hợp lệ';
    }

    const diffDays = nowTime.diff(parsedTime, 'day');

    if (diffDays < 7 && diffDays >= 0) {
        return parsedTime.from(nowTime); // vd: "3 ngày trước"
    } else {
        return parsedTime.format("DD/MM/YYYY HH:mm");
    }
};

const Sidebar = ({
    receiverId,
    setReceiverId,
}: {
    receiverId: number | null;
    setReceiverId: (id: number) => void;
}) => {
    const conversationList = useSelector(
        (state: RootState) => state.volatile.ws.conversationList
    );

    return (
        <div className="w-[360px] !min-w-[360px] !bg-white !border-r !border-gray-200 flex flex-col !shadow-md !min-h-screen">

            {/* Conversation list */}
            <div className="overflow-y-auto flex-1 !bg-gray-50">
                {conversationList?.map((conversation) => (
                    <div
                        key={conversation.id}
                        onClick={() => setReceiverId(conversation.userId)}
                        className={`!flex !items-center !p-4 !cursor-pointer !border-b !border-gray-200 !relative
                            !transition-colors !duration-200
                            ${receiverId === conversation.userId
                                ? "!bg-blue-50 !border-l-4 !border-l-blue-500"
                                : "!bg-white hover:!bg-gray-50"
                            }`}
                    >
                        {/* Avatar with unread badge */}
                        <div className="!relative !mr-3">
                            <Avatar
                                src={conversation.avatar}
                                size={46}
                                className={`!border-2 ${receiverId === conversation.userId
                                    ? "!border-blue-400"
                                    : "!border-gray-200"
                                    }`}
                            />
                            {conversation.unreadCount > 0 && (
                                <div className={`!absolute !top-0 !right-0 !flex !items-center !justify-center 
                                    !bg-red-500 !text-white !text-xs !font-bold !rounded-full 
                                    ${conversation.unreadCount > 1 ? '!w-5 !h-5' : '!w-3 !h-3'} 
                                    !border-2 !border-white`}>
                                    {conversation.unreadCount > 1 ?
                                        (conversation.unreadCount > 9 ? '9+' : conversation.unreadCount)
                                        : ''}
                                </div>
                            )}
                        </div>

                        {/* Conversation info */}
                        <div className="!ml-2 !min-w-0 !flex-1">
                            <div className="!flex !justify-between !items-start">
                                <h3
                                    className={`!truncate !text-base ${receiverId === conversation.userId
                                        ? "!text-blue-700 !font-semibold"
                                        : conversation.unreadCount > 0
                                            ? "!text-gray-900 !font-medium"
                                            : "!text-gray-700"
                                        }`}
                                >
                                    {conversation.fullName}
                                </h3>
                                <span
                                    className={`!text-xs !shrink-0 !ml-2 ${conversation.unreadCount > 0
                                        ? "!text-blue-600 !font-medium"
                                        : "!text-gray-500"
                                        }`}
                                >
                                    {timeDisplay(conversation.lastTime)}
                                </span>
                            </div>

                            <p
                                className={`!text-sm !truncate !mt-1 ${conversation.unreadCount > 0
                                    ? "!text-gray-800 !font-medium"
                                    : "!text-gray-500"
                                    }`}
                            >

                                {conversation.lastIsRecall ? <span className={"!text-gray-400 !italic"}>Tin nhắn đã được thu hồi</span> : conversation.lastMessage || "Bắt đầu cuộc trò chuyện..."}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;