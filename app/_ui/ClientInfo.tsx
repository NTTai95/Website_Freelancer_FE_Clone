import { Dropdown, Avatar, Badge, Spin, Empty, Button, List, Tooltip } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { BellOutlined, ReloadOutlined, DeleteOutlined, CheckCircleOutlined, ArrowRightOutlined, MessageOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { apiPost, apiDelete, apiPut } from '@/api/baseApi';
import { getClientMenuItems } from './MenuItems';
import { useRouter } from 'next/navigation';
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

export const ClientInfo = ({
    scrolled,
    fullName,
    avatar
}: {
    scrolled: boolean;
    fullName: string;
    avatar?: string;
}) => {
    const [loading, setLoading] = useState(false);
    const notifications = useSelector((state: RootState) => state.volatile.ws.notifications);
    const conversationList = useSelector((state: RootState) => state.volatile.ws.conversationList).filter(item => item.unreadCount > 0).toReversed();
    const [messageLoading, setMessageLoading] = useState(false);
    const router = useRouter();

    const handleMarkAsRead = async (id: string) => {
        try {
            await apiPut(`/notifications/${id}/read`, {});
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await apiDelete(`/notifications/${id}`, {});
        } catch (error) {
            console.error("Failed to delete notification", error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await apiPost(`/notifications/read-all`, {});
        } catch (error) {
            console.error("Failed to mark all as read", error);
        }
    };

    const handleDeleteAll = async () => {
        try {
            await apiDelete(`/notifications/delete-all`, {});
        } catch (error) {
            console.error("Failed to delete all notifications", error);
        }
    };

    const notificationContent = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="!w-[360px] !bg-white !rounded-xl !shadow-xl !overflow-hidden !flex !flex-col !border !border-gray-100"
        >
            {/* Header */}
            <div className="!p-2 !flex !justify-between !items-center !bg-gradient-to-r !from-blue-50 !to-indigo-50 !border-b !border-gray-100">
                <h3 className="!text-lg !font-bold !text-gray-800">Thông báo</h3>
            </div>

            {/* Body */}
            <div className="!max-h-[400px] !overflow-y-auto !p-2 !bg-gray-50">
                {loading ? (
                    <div className="!h-60 !flex !items-center !justify-center">
                        <Spin indicator={<ReloadOutlined spin />} />
                    </div>
                ) : notifications.length === 0 ? (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Không có thông báo mới"
                        className="!h-60 !flex !flex-col !items-center !justify-center"
                    />
                ) : (
                    <AnimatePresence initial={false}>
                        {notifications.map(notification => (
                            <motion.div
                                key={notification.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8, height: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    height: 'auto',
                                    transition: {
                                        opacity: { duration: 0.3 },
                                        scale: { duration: 0.3 },
                                        height: { duration: 0.4 }
                                    }
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                    height: 0,
                                    transition: {
                                        opacity: { duration: 0.2 },
                                        scale: { duration: 0.2 },
                                        height: { duration: 0.3 }
                                    }
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="!overflow-hidden"
                            >
                                <List.Item
                                    className={`
                                        !p-3 !rounded-xl !transition-all !duration-200 !ease-in-out !relative !my-2
                                        ${notification.read
                                            ? '!bg-white hover:!bg-gray-50'
                                            : '!bg-blue-50 hover:!bg-blue-100 !border-l-4 !border-blue-500'}
                                        group
                                    `}
                                >
                                    {/* Nội dung chính */}
                                    <List.Item.Meta
                                        className="!overflow-hidden"
                                        title={
                                            <div className="!flex !items-start">
                                                <div className="!flex-1 !min-w-0 !pr-4">
                                                    <div className={`!font-medium !truncate ${notification.read ? '!text-gray-700' : '!text-blue-800'}`}>
                                                        {notification.title}
                                                    </div>
                                                    <div className={`!text-sm !mt-1 !line-clamp-2 ${notification.read ? '!text-gray-600' : '!text-blue-700'}`}>
                                                        {notification.content}
                                                    </div>
                                                    {notification?.link && (
                                                        <motion.div
                                                            whileHover={{ x: 5 }}
                                                            className="!mt-2"
                                                        >
                                                            <Button
                                                                onClick={() => window.open(notification.link, '_blank')}
                                                                type="link"
                                                                className={`!p-0 !h-auto !text-sm !font-medium ${notification.read
                                                                    ? '!text-gray-500 hover:!text-gray-700'
                                                                    : '!text-blue-600 hover:!text-blue-800'
                                                                    }`}
                                                                icon={<ArrowRightOutlined className="!text-xs" />}
                                                            >
                                                                Xem chi tiết
                                                            </Button>
                                                        </motion.div>
                                                    )}
                                                </div>
                                                {!notification.read && (
                                                    <span className="!shrink-0 !mt-1 !h-2 !w-2 !rounded-full !bg-blue-500"></span>
                                                )}
                                            </div>
                                        }
                                        description={
                                            <div className="!flex !justify-between !items-center !mt-2">
                                                <span className={`!text-xs ${notification.read ? '!text-gray-500' : '!text-blue-600'}`}>
                                                    {notification.createdAt}
                                                </span>
                                                <div className="!opacity-0 group-hover:!opacity-100 !transition-opacity !duration-200">
                                                    {!notification.read && (
                                                        <Tooltip title="Đánh dấu đã đọc">
                                                            <Button
                                                                size="small"
                                                                type="text"
                                                                onClick={() => handleMarkAsRead(notification.id)}
                                                                className="!p-1 !h-6 !w-6 !text-gray-500 hover:!bg-blue-100"
                                                                icon={<CheckCircleOutlined className="!text-blue-600" />}
                                                            />
                                                        </Tooltip>
                                                    )}
                                                    <Tooltip title="Xóa">
                                                        <Button
                                                            size="small"
                                                            type="text"
                                                            onClick={() => handleDelete(notification.id)}
                                                            className="!p-1 !h-6 !w-6 !ml-1 !text-gray-500 hover:!bg-red-100"
                                                            icon={<DeleteOutlined className="!text-red-400 hover:!text-red-600" />}
                                                        />
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Footer */}
            <div className="!p-3 !flex !justify-between !bg-white !border-t !border-gray-100">
                <Button
                    type="primary"
                    size="small"
                    onClick={handleMarkAllAsRead}
                    className="!bg-blue-600 hover:!bg-blue-700 !text-white !font-medium"
                >
                    Đánh dấu tất cả đã đọc
                </Button>

                <Button
                    size="small"
                    onClick={handleDeleteAll}
                    className="!text-red-500 hover:!text-red-700 !font-medium !border !border-red-200 hover:!bg-red-50"
                >
                    Xóa tất cả
                </Button>
            </div>
        </motion.div>
    );

    // Component nội dung tin nhắn mới
    const handleMessageClick = (conversationId: string) => {
        router.push(`/messages?conversationId=${conversationId}`);
    };

    const messageContent = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="!w-[360px] !bg-white !rounded-xl !shadow-xl !overflow-hidden !flex !flex-col !border !border-gray-100"
        >
            {/* Header */}
            <div className="!p-2 !flex !justify-between !items-center !bg-gradient-to-r !from-blue-50 !to-indigo-50 !border-b !border-gray-100">
                <h3 className="!text-lg !font-bold !text-gray-800">Tin nhắn</h3>
            </div>

            {/* Body */}
            <div className="!max-h-[400px] !overflow-y-auto !p-2 !bg-gray-50">
                {messageLoading ? (
                    <div className="!h-60 !flex !items-center !justify-center">
                        <Spin indicator={<ReloadOutlined spin />} />
                    </div>
                ) : conversationList.length === 0 ? (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Không có tin nhắn mới"
                        className="!h-60 !flex !flex-col !items-center !justify-center"
                    />
                ) : (
                    <AnimatePresence initial={false}>
                        {conversationList.map((conversation) => (
                            <motion.div
                                key={conversation.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8, height: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    height: 'auto',
                                    transition: {
                                        opacity: { duration: 0.3 },
                                        scale: { duration: 0.3 },
                                        height: { duration: 0.4 }
                                    }
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                    height: 0,
                                    transition: {
                                        opacity: { duration: 0.2 },
                                        scale: { duration: 0.2 },
                                        height: { duration: 0.3 }
                                    }
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="!overflow-hidden"
                            >
                                <List.Item
                                    onClick={() => handleMessageClick(conversation.id)}
                                    className={`
                                        !p-3 !rounded-xl !transition-all !duration-200 !ease-in-out !relative !my-2!bg-blue-50 hover:!bg-blue-100 !border-l-4 !border-blue-500 group cursor-pointer
                                    `}
                                >
                                    <List.Item.Meta
                                        className="!overflow-hidden"
                                        title={
                                            <div className="!flex !items-start">
                                                <div className="!flex-1 !min-w-0 !pr-4">
                                                    <div className={`flex item !truncate !text-blue-800`}>
                                                        <Avatar
                                                            src={conversation.avatar}
                                                            size={24}
                                                            className="!mr-2"
                                                        />
                                                        <span className="!font-bold">
                                                            {conversation.fullName}
                                                        </span>
                                                    </div>
                                                    <div className={`!text-sm !mt-1 !line-clamp-2 !text-blue-700`}>
                                                        {conversation.lastIsRecall ? <span className={"!text-gray-400 !italic"}>Tin nhắn đã được thu hồi</span> : conversation.lastMessage}
                                                    </div>
                                                </div>
                                                {conversation.unreadCount < 2 ? (
                                                    <span className="!shrink-0 !mt-1 !h-2 !w-2 !rounded-full !bg-blue-500"></span>
                                                ) : (<Badge
                                                    count={conversation.unreadCount}
                                                    overflowCount={99}
                                                    className="!text-white !font-semibold"
                                                />)}
                                            </div>
                                        }
                                        description={
                                            <span className={`!text-xs !text-blue-600`}>
                                                {timeDisplay(conversation.lastTime)}
                                            </span>
                                        }
                                    />
                                </List.Item>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Footer */}
            <div className="!p-3 !flex !justify-center !bg-white !border-t !border-gray-100">
                <Button
                    type="primary"
                    size="small"
                    onClick={() => router.push('/chat')}
                    className="!bg-blue-600 hover:!bg-blue-700 !text-white !font-medium"
                >
                    Xem tất cả tin nhắn
                </Button>
            </div>
        </motion.div>
    );

    return (
        <div className="flex items-center gap-4">
            {/* Message Icon */}
            <Dropdown
                popupRender={() => messageContent()}
                trigger={['click']}
                placement="bottomRight"
                overlayClassName="!rounded-xl"
            >
                <motion.div
                    className="cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Badge
                        count={conversationList.map((conversation) => conversation.unreadCount).reduce((a, b) => a + b, 0)}
                        overflowCount={99}
                        className="!text-white !font-semibold"
                    >
                        <motion.div
                            className={`
                                !p-2 !rounded-full !transition-colors
                                ${scrolled
                                    ? '!bg-blue-50 hover:!bg-blue-100'
                                    : '!bg-blue-500/20 hover:!bg-blue-500/30'}
                            `}
                            whileHover={{ rotate: 10 }}
                        >
                            <MessageOutlined
                                className={`
                                    ${scrolled ? '!text-blue-600' : '!text-white'}
                                    !text-lg
                                `}
                            />
                        </motion.div>
                    </Badge>
                </motion.div>
            </Dropdown>

            {/* Notification Bell */}
            <Dropdown
                popupRender={() => notificationContent()}
                trigger={['click']}
                placement="bottomRight"
                overlayClassName="!rounded-xl"
            >
                <motion.div
                    className="cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Badge
                        count={notifications.filter(n => !n.read).length}
                        overflowCount={99}
                        className="!text-white !font-semibold"
                    >
                        <motion.div
                            className={`
                                !p-2 !rounded-full !transition-colors
                                ${scrolled
                                    ? '!bg-blue-50 hover:!bg-blue-100'
                                    : '!bg-blue-500/20 hover:!bg-blue-500/30'}
                            `}
                            whileHover={{ rotate: 10 }}
                        >
                            <BellOutlined
                                className={`
                                    ${scrolled ? '!text-blue-600' : '!text-white'}
                                    !text-lg
                                `}
                            />
                        </motion.div>
                    </Badge>
                </motion.div>
            </Dropdown>

            {/* User Info */}
            <Dropdown
                menu={{
                    items: getClientMenuItems(),
                    className: '!rounded-xl !py-2 !shadow-lg !border !border-gray-100'
                }}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
                overlayClassName="!rounded-xl"
            >
                <motion.div
                    className={`
                        !font-bold !flex !gap-2 !items-center !cursor-pointer !transition-colors
                        ${scrolled
                            ? '!text-blue-600 hover:!text-blue-800'
                            : '!text-white hover:!text-blue-100'}
                    `}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="!hidden sm:!inline">{fullName}</span>
                    <motion.div
                        whileHover={{ rotate: 10 }}
                        className="!relative"
                    >
                        <Avatar
                            src={avatar}
                            size={40}
                            shape="circle"
                            className={`
                                !border-2 !transition-all
                                ${scrolled
                                    ? '!border-blue-500 hover:!border-blue-700'
                                    : '!border-white hover:!border-blue-200'}
                            `}
                        />
                    </motion.div>
                </motion.div>
            </Dropdown>
        </div>
    );
};