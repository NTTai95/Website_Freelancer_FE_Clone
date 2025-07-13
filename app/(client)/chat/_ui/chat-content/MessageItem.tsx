// components/chat/MessageItem.tsx
import { useState } from "react";
import { Avatar, Button, Tooltip } from "antd";
import { UserOutlined, UndoOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import styled from '@emotion/styled';
import MessageContent from "./MessageContent";

interface MessageItemProps {
    msg: {
        id: number;
        senderId: number;
        content: string;
        date: Date;
        showTime: boolean;
        isLastOfSender: boolean;
        read?: boolean;
        recall?: boolean;
    };
    isReceiver: boolean;
    receiverAvatar?: string;
    onRecall?: (messageId: number) => void;
}

const StyledTooltip = styled(Tooltip)`
  .ant-tooltip-inner {
    background: rgba(0, 0, 0, 0.75) !important;
    backdrop-filter: blur(4px) !important;
    color: white !important;
    border-radius: 8px !important;
    padding: 8px 12px !important;
    font-size: 12px !important;
    min-height: auto !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  }
  
  .ant-tooltip-arrow::before {
    background: rgba(0, 0, 0, 0.75) !important;
    backdrop-filter: blur(4px) !important;
  }
`;

const MessageItem = ({ msg, isReceiver, receiverAvatar, onRecall }: MessageItemProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const isOwnMessage = !isReceiver;
    const isRecalled = msg.recall;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`!mb-1 !flex ${isReceiver ? "!justify-start" : "!justify-end"} ${!msg.read && isReceiver ? "!opacity-80" : ""}`}
            whileHover={{ opacity: 1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="!flex !items-end !max-w-[80%] !gap-2">
                {isReceiver && msg.isLastOfSender && (
                    <Avatar
                        size={24}
                        src={receiverAvatar}
                        icon={<UserOutlined />}
                        className="!self-end"
                    />
                )}

                <div className="!flex !flex-col !relative">
                    <MessageContent msg={msg} isReceiver={isReceiver} canRecall={(isOwnMessage && !isRecalled && isHovered)} onRecall={onRecall} />
                </div>

                {isReceiver && !msg.isLastOfSender && !isRecalled && (
                    <div className="!w-6" />
                )}
            </div>
        </motion.div>
    );
};

export default MessageItem;