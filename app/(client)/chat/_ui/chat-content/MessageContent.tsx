import React from 'react';
import { Button, Tooltip } from 'antd';
import styled from '@emotion/styled';
import { formatTimeDisplay } from "./utils";
import { motion } from "framer-motion";
import {
    EyeOutlined,
    CheckOutlined,
    UndoOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

interface MessageContentProps {
    msg: {
        id: number;
        senderId: number;
        content: string;
        date: Date;
        showTime: boolean;
        isLastOfSender: boolean;
        read?: boolean;
        recall?: boolean; // Thêm trường recall để kiểm tra tin nhắn đã thu hồi
    };
    isReceiver: boolean;
    canRecall?: boolean;
    onRecall?: (messageId: number) => void;
}

// Tạo styled component cho Tooltip
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

const MessageContent = ({ msg, isReceiver, canRecall, onRecall }: MessageContentProps) => {
    const messageContent = (
        <div
            className={`!px-4 !py-2 !rounded-2xl !relative !transition-all !duration-200 !break-words
                ${msg.recall
                    ? "!bg-gray-100 !text-gray-500 !italic"
                    : isReceiver
                        ? "!bg-white !text-gray-800 !rounded-tl-none !shadow-sm"
                        : "!bg-blue-500 !text-white !rounded-tr-none !shadow-md"
                }
                ${!msg.isLastOfSender && "!ml-8"}`}
        >
            {msg.recall ? (
                <span className="!text-sm !italic !flex !items-center">
                    Tin nhắn đã được thu hồi
                </span>
            ) : (
                <>
                    <div>{msg.content}</div>
                    {msg.showTime && (
                        <div className={`!flex !items-center !gap-1 !text-xs !mt-1 ${isReceiver ? "!justify-start" : "!justify-end"}`}>
                            <span className="!opacity-70">
                                {formatTimeDisplay(msg.date)}
                            </span>
                            {!isReceiver && msg.read && (
                                <span className="!text-blue-300 !flex">
                                    <CheckCircleOutlined />
                                </span>
                            )}
                        </div>
                    )}
                </>
            )}

            {canRecall &&
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="!absolute -left-8 bottom-2 !z-10"
                >
                    <Tooltip title="Thu hồi">
                        <Button
                            type="default"
                            shape="circle"
                            size="small"
                            icon={<UndoOutlined className="!text-xs" />}
                            onClick={() => onRecall && onRecall(msg.id)}
                            className="!bg-white !shadow-md hover:!bg-gray-100 !border-gray-200"
                        />
                    </Tooltip>
                </motion.div>
            }
        </div>
    );

    // Chỉ hiển thị Tooltip khi không phải là người nhận (isReceiver = false)
    if (!isReceiver) {
        return (
            <StyledTooltip
                title={
                    <div className="!flex !flex-col !items-center !min-w-[100px]">
                        <div className="!flex !items-center !gap-1">
                            {msg.read ? (
                                <EyeOutlined className="!text-green-500" />
                            ) : (
                                <CheckOutlined className="!text-blue-400" />
                            )}
                            <span>{msg.read ? "Đã xem" : "Đã nhận"}</span>
                        </div>
                        <div className="!text-xs !opacity-80 !mt-0.5">
                            {formatTimeDisplay(msg.date)}
                        </div>
                    </div>
                }
                placement="bottom"
                mouseEnterDelay={0.3}
            >
                {messageContent}
            </StyledTooltip>
        );
    }

    return messageContent;
};

export default MessageContent;