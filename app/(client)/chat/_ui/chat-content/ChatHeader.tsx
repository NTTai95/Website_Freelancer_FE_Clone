// components/chat/ChatHeader.tsx
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ChatHeaderProps {
    receiverId: number;
    receiver?: {
        avatar?: string;
        fullName?: string;
    };
}

const ChatHeader = ({ receiverId, receiver }: ChatHeaderProps) => {
    const isOnline = useSelector((state: RootState) =>
        state.volatile.ws.activeUsers.includes(receiverId)
    );

    return (
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
    );
};

export default ChatHeader;