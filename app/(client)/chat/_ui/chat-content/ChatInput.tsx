// components/chat/ChatInput.tsx
import { Input, Button } from "antd";
import { DoubleLeftOutlined, SendOutlined } from "@ant-design/icons";
import { motion, easeInOut } from "framer-motion";

interface ChatInputProps {
    inputText: string;
    setInputText: (text: string) => void;
    handleSendMessage: () => void;
    showNewMsgBtn: boolean;
    scrollMessagesToBottom: (offset?: number) => void;
}

const ChatInput = ({
    inputText,
    setInputText,
    handleSendMessage,
    showNewMsgBtn,
    scrollMessagesToBottom,
}: ChatInputProps) => {
    return (
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
    );
};

export default ChatInput;