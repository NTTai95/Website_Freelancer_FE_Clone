"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Input, Button, Avatar } from "antd";
import { SendOutlined, DoubleLeftOutlined, UserOutlined } from "@ant-design/icons";
import { easeInOut, motion } from "framer-motion";
import useChatWebSocket from "@/hooks/useChat";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const parseDate = (timestamp: number) => {
    return new Date(timestamp);
};

const formatDateDisplay = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    ) {
        return "Hôm nay";
    } else if (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    ) {
        return "Hôm qua";
    } else {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${date.getFullYear()}`;
    }
};

const formatTimeDisplay = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
};

const ChatContent = ({ receiverId }: { receiverId: number }) => {
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const { receiver, messages, sendMessage, moreHistory } = useChatWebSocket(receiverId, setIsLoadingHistory);
    const isOnline = useSelector((state: RootState) => state.volatile.ws.activeUsers.includes(receiverId));
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

            // Check for new day
            const isFirstOfDay =
                !prevDate ||
                prevDate.getDate() !== currentDate.getDate() ||
                prevDate.getMonth() !== currentDate.getMonth() ||
                prevDate.getFullYear() !== currentDate.getFullYear();

            let minutesDiff = 0;
            if (prevDate) {
                minutesDiff = (currentDate.getTime() - prevDate.getTime()) / (1000 * 60);
            }

            const isLastOfSender =
                index === messages.length - 1 ||
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
            setTimeout(() => {
                setIsInitialScrollDone(true);
            }, 1000)
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
            {/* Header */}
            <div className="!p-4 !bg-gradient-to-r !from-[#1890ff] !to-[#0050b3] !text-white !flex !items-center !shadow-lg">
                <div className="!flex !items-center !animate-fadeIn">
                    <Avatar
                        size={40}
                        src={receiver?.avatar}
                        icon={<UserOutlined />}
                        className="!border-2 !border-white !shadow-md"
                    />
                    <div className="!ml-3 !flex !flex-col">
                        <span className="!text-lg !font-semibold !leading-tight">
                            {receiver?.fullName || "Người dùng"}
                        </span>
                        <div className="!flex !items-center !mt-1">
                            {isOnline ? (
                                <>
                                    <span className="!relative !flex !h-2 !w-2 !mr-2">
                                        <span className="!animate-ping !absolute !inline-flex !h-full !w-full !rounded-full !bg-[#52c41a] !opacity-75"></span>
                                        <span className="!relative !inline-flex !rounded-full !h-2 !w-2 !bg-[#52c41a]"></span>
                                    </span>
                                    <span className="!text-xs !text-blue-100">Đang hoạt động</span>
                                </>
                            ) : (
                                <span className="!text-xs !text-blue-200">Ngoại tuyến</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
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
                            {msg.showDate && (
                                <div className="!text-center !text-gray-500 !text-xs !my-4">
                                    {formatDateDisplay(msg.date)}
                                </div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`!mb-1 !flex ${isReceiver ? "!justify-start" : "!justify-end"} ${!msg.read && isReceiver ? "!opacity-80" : ""}`}
                                whileHover={{ opacity: 1 }}
                            >
                                <div className="!flex !items-end !max-w-[80%] !gap-2">
                                    {isReceiver && msg.isLastOfSender && (
                                        <Avatar
                                            size={24}
                                            src={receiver?.avatar}
                                            icon={<UserOutlined />}
                                            className="!self-end"
                                        />
                                    )}

                                    <div className="!flex !flex-col">
                                        <div
                                            className={`
                                                !px-4 !py-2 !rounded-2xl !relative
                                                ${isReceiver
                                                    ? "!bg-white !text-gray-800 !rounded-tl-none !shadow-sm"
                                                    : "!bg-blue-500 !text-white !rounded-tr-none !shadow-md"
                                                }
                                                ${!msg.isLastOfSender && "!ml-8"}
                                            `}
                                        >
                                            {msg.content}

                                            {msg.showTime && (
                                                <span className={`
                                                    !flex !items-center !gap-1 !text-xs !mt-1
                                                    ${isReceiver ? "!justify-start" : "!justify-end"}
                                                `}>
                                                    {formatTimeDisplay(msg.date)}
                                                    {!isReceiver && msg.read && (
                                                        <span className="!text-blue-300">✓✓</span>
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {isReceiver && !msg.isLastOfSender && (
                                        <div className="!w-6" />
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            {/* Input area */}
            <div className="!relative !border-t !border-gray-200 !p-3 !bg-white !flex !items-center">
                {showNewMsgBtn && (
                    <motion.div
                        className="!absolute !bottom-20 !right-10 !z-10"
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: easeInOut,
                        }}
                    >
                        <Button
                            type="default"
                            icon={<DoubleLeftOutlined rotate={-90} />}
                            onClick={() => scrollMessagesToBottom(0)}
                            shape="circle"
                            size="large"
                            className="!shadow-md"
                        />
                    </motion.div>
                )}
                <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onPressEnter={handleSendMessage}
                    placeholder="Nhập tin nhắn..."
                    className="!flex-1 !mr-3 !py-2 !px-4 !rounded-full !border !border-gray-300 focus:!outline-none focus:!ring-2 focus:!ring-blue-300"
                />
                <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<SendOutlined />}
                        onClick={handleSendMessage}
                        disabled={!inputText.trim()}
                        className="!w-10 !h-10 !bg-blue-500 !border-none hover:!bg-blue-600 focus:!bg-blue-600"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default ChatContent;