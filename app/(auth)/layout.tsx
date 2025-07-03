"use client";

import { motion } from "framer-motion";
import { Col, Row } from "antd";
import {
    FileSearchOutlined,
    ReconciliationOutlined,
    AuditOutlined,
    RocketOutlined
} from '@ant-design/icons';

const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="!h-screen !relative !overflow-hidden">
            {/* Background Image */}
            <div className="!absolute !inset-0 !flex !items-center !bg-[#06055A]">
                <img
                    src={"/banner_login3.gif"}
                    alt="Background"
                    className="!ml-15 !h-full !object-contain !object-left"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="!absolute !inset-0 !bg-gradient-to-r !from-[#06055A] !via-[#06055A]/50 !to-transparent"></div>

            {/* Content */}
            <Row className="!h-full !relative !z-10">
                {/* Left Column - Enhanced with animations */}
                <Col span={12} className="!flex !flex-col !justify-center !pl-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="!max-w-md"
                    >
                        {/* Animated Floating Circles */}
                        <motion.div
                            className="!relative !mb-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 1.2 }}
                        >
                            <motion.div
                                className="!absolute !-top-10 !-left-10 !w-32 !h-32 !rounded-full !bg-gradient-to-br !from-blue-500/30 !to-cyan-400/20 !animate-pulse-slow !blur-xl"
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            ></motion.div>
                            <motion.div
                                className="!absolute !-bottom-5 !-right-5 !w-24 !h-24 !rounded-full !bg-gradient-to-br !from-purple-500/30 !to-pink-400/20 !animate-pulse-slow !blur-xl !delay-1000"
                                animate={{
                                    scale: [1, 1.08, 1],
                                }}
                                transition={{
                                    duration: 7,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1
                                }}
                            ></motion.div>

                            {/* Main Title */}
                            <motion.h1
                                className="!text-7xl !font-black !mb-4 !text-white !relative !z-10 !tracking-tighter"
                                style={{
                                    textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                                    letterSpacing: "-0.03em"
                                }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                FREELANCER
                            </motion.h1>
                        </motion.div>

                        {/* Modern Tagline */}
                        <motion.div
                            className="!relative !z-10 !mb-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            <motion.div
                                className="!inline-block !bg-white/10 !backdrop-blur-sm !px-4 !py-2 !rounded-full !mb-4 !border !border-white/10"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15,
                                    delay: 1.0
                                }}
                            >
                                <span className="!text-white/90 !text-sm !font-medium !tracking-wider">
                                    NỀN TẢNG FREELANCE HÀNG ĐẦU
                                </span>
                            </motion.div>
                            <motion.p
                                className="!text-4xl !font-bold !text-white !leading-tight !mb-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 1.2 }}
                            >
                                Đột phá <span className="!text-blue-300">hiệu suất</span>
                                <br />
                                <span className="!text-cyan-200">Tối ưu hợp tác</span>
                            </motion.p>
                        </motion.div>

                        {/* Feature Card */}
                        <motion.div
                            className="!bg-gradient-to-br !from-blue-900/30 !to-indigo-900/20 !backdrop-blur-lg !rounded-2xl !p-6 !border !border-white/10 !shadow-xl"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.4 }}
                        >
                            <motion.div
                                className="!flex !items-center !mb-6 !pb-4 !border-b !border-white/10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6 }}
                            >
                                <RocketOutlined className="!text-blue-400 !text-2xl !mr-3" />
                                <h3 className="!text-xl !font-bold !text-white">
                                    Tính năng nổi bật
                                </h3>
                            </motion.div>

                            <ul className="!space-y-6">
                                <FeatureItem
                                    icon={<FileSearchOutlined />}
                                    text="Tìm dự án phù hợp trong vài giây"
                                    color="!from-blue-600/30 !to-blue-800/20"
                                    delay={1.7}
                                />
                                <FeatureItem
                                    icon={<ReconciliationOutlined />}
                                    text="Quản lý hợp đồng thông minh"
                                    color="!from-purple-600/30 !to-purple-800/20"
                                    delay={1.9}
                                />
                                <FeatureItem
                                    icon={<AuditOutlined />}
                                    text="Theo dõi tiến độ trực quan"
                                    color="!from-cyan-600/30 !to-cyan-800/20"
                                    delay={2.1}
                                />
                            </ul>
                        </motion.div>
                    </motion.div>
                </Col>

                {/* Right Column */}
                <Col span={12} className="!flex !justify-end !items-center">
                    {children}
                </Col>
            </Row>
        </div>
    );
}

// Feature Item Component with animation
const FeatureItem = ({
    icon,
    text,
    color,
    delay
}: {
    icon: React.ReactNode;
    text: string;
    color: string;
    delay: number;
}) => (
    <motion.li
        className="!flex !items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
    >
        <motion.div
            className={`!flex !items-center !justify-center !w-12 !h-12 !rounded-xl !bg-gradient-to-br ${color} !mr-4`}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(100, 200, 255, 0.4)"
            }}
            transition={{ type: "spring", stiffness: 400 }}
        >
            <span className="!text-white !text-xl">{icon}</span>
        </motion.div>
        <span className="!text-lg !font-medium !text-white">{text}</span>
    </motion.li>
);

export default LayoutAuth;