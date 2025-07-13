"use client";

import { useState } from "react";
import { Card, Avatar, Typography } from "antd";
import {
    MessageOutlined,
    UserOutlined,
    CommentOutlined,
    NotificationOutlined,
    SafetyOutlined
} from "@ant-design/icons";
import { motion } from "framer-motion";
import Sidebar from "./_ui/Sidebar";
import ChatContent from "./_ui/chat-content";

const { Title, Text } = Typography;

const ChatPlaceholder = () => {
    const features = [
        {
            icon: <CommentOutlined className="!text-2xl" />,
            title: "Trò chuyện trực tiếp",
            description: "Gửi và nhận tin nhắn ngay lập tức giữa hai người"
        },
        {
            icon: <UserOutlined className="!text-2xl" />,
            title: "Kết nối cá nhân",
            description: "Giao tiếp riêng tư với từng người dùng cụ thể"
        },
        {
            icon: <SafetyOutlined className="!text-2xl" />,
            title: "Bảo mật tuyệt đối",
            description: "Tin nhắn được đảm bảo an toàn và riêng tư"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col items-center justify-center !p-4 !bg-gradient-to-br !from-blue-50 !to-indigo-50"
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                    duration: 0.7,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 100
                }}
                className="!mb-8"
            >
                <div className="!relative !inline-block">
                    <Avatar
                        size={120}
                        icon={<MessageOutlined />}
                        className="!bg-blue-500 !text-white !shadow-lg !flex !items-center !justify-center"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="!absolute !-inset-2 !rounded-full !bg-blue-200 !opacity-70 !z-[-1]"
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="!text-center !max-w-2xl"
            >
                <Title level={2} className="!text-3xl !font-bold !text-gray-800 !mb-4">
                    <span className="!text-blue-600">Bắt đầu</span> cuộc trò chuyện
                </Title>

                <Text className="!text-lg !text-gray-600 !mb-8 !block">
                    Chọn một người từ danh sách liên hệ để bắt đầu trò chuyện riêng tư
                </Text>
            </motion.div>

            <motion.div
                className="!grid !grid-cols-1 md:!grid-cols-3 !gap-6 !mt-6 !w-full !max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        whileHover={{
                            y: -10,
                            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card
                            className="!rounded-xl !shadow-md !border-0 !h-full !bg-white !overflow-hidden"
                        >
                            <div className="!flex !flex-col !items-center !text-center">
                                <div className="!w-14 !h-14 !rounded-full !bg-blue-100 !flex !items-center !justify-center !mb-4 !text-blue-600">
                                    {feature.icon}
                                </div>
                                <Title level={4} className="!text-lg !font-semibold !mb-2 !text-gray-800">
                                    {feature.title}
                                </Title>
                                <Text className="!text-gray-600">{feature.description}</Text>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                className="!mt-12 !max-w-xl !w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div className="!relative">
                    <div className="!absolute !inset-0 !flex !items-center !justify-center">
                        <div className="!w-full !border-t !border-gray-200"></div>
                    </div>
                    <div className="!relative !flex !justify-center">
                        <span className="!px-3 !bg-gradient-to-r !from-blue-50 !to-indigo-50 !text-sm !text-gray-500">
                            Mẹo: Nhấp vào tên người dùng trong danh sách bên trái để trò chuyện
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ChatPage = () => {
    const [receiverId, setReceiverId] = useState<number | null>(null);

    return (
        <div className="flex !h-screen !bg-gradient-to-br !from-blue-50 !to-indigo-50">
            <Sidebar receiverId={receiverId} setReceiverId={setReceiverId} />

            <div className="flex-1 flex flex-col">
                {receiverId ? (
                    <ChatContent receiverId={receiverId} />
                ) : (
                    <ChatPlaceholder />
                )}
            </div>
        </div>
    );
};

export default ChatPage;