"use client";

import { Row, Col, Button, Card, List, Typography } from "antd";
import {
    PieChartOutlined,
    RiseOutlined,
    CheckCircleOutlined,
    CustomerServiceOutlined,
    RocketOutlined,
    TeamOutlined,
    BarChartOutlined,
    SyncOutlined,
    SolutionOutlined
} from "@ant-design/icons";
import Image from "next/image";
import { Easing, motion, easeOut } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthorization } from "@/hooks/useAuthorization";

const easeBezier: Easing = [0.16, 1, 0.3, 1];

const { Title, Text } = Typography;

const MotionButton = motion(Button);
const MotionCard = motion(Card);

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const textVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easeBezier
        }
    }
};

const imageVariants = {
    hidden: { x: 50, opacity: 0, rotate: 2 },
    visible: {
        x: 0,
        opacity: 1,
        rotate: 0,
        transition: {
            duration: 0.8,
            ease: easeBezier
        }
    }
};

const featureItemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easeOut
        }
    }
};

const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.4,
            duration: 0.5
        }
    }
};

const ForBusinesses = ({ data }: { data: any }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: "-50px 0px"
    });

    const router = useRouter();

    const isAuthenticated = useAuthorization();

    const features = [
        {
            icon: <PieChartOutlined className="!text-2xl" />,
            title: "Truy cập chuyên gia hàng đầu",
            content: "Kết nối với top 1% chuyên gia toàn cầu cùng bộ công cụ quản lý nhân sự tích hợp đầy đủ."
        },
        {
            icon: <RiseOutlined className="!text-2xl" />,
            title: "Tối ưu hóa năng suất",
            content: "Giải quyết mọi khoảng trống kỹ năng với đội ngũ chuyên gia chất lượng cao."
        },
        {
            icon: <CheckCircleOutlined className="!text-2xl" />,
            title: "Quản lý toàn diện",
            content: "Từ tuyển dụng, làm việc đến thanh toán trên một nền tảng duy nhất."
        },
        {
            icon: <CustomerServiceOutlined className="!text-2xl" />,
            title: "Hỗ trợ chuyên biệt",
            content: "Hỗ trợ 1:1 từ đội ngũ chuyên gia, giúp bạn tập trung vào chiến lược cốt lõi."
        }
    ];

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative !py-16 md:!py-24 !overflow-hidden"
        >
            {/* Background pattern */}
            <div className="container !mx-auto !px-4 !relative !z-10">
                <Row gutter={[48, 48]} align="middle" className="!m-0">
                    <Col xs={24} lg={12} className="!p-0">
                        <MotionCard
                            variant="borderless"
                            className="!bg-transparent !shadow-none"
                            styles={{ body: { padding: 0 } }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <motion.div
                                variants={textVariants}
                                className="!mb-8"
                            >
                                <div className="!inline-flex !items-center !gap-2 !px-4 !py-2 !bg-cyan-500/20 !rounded-full !mb-4">
                                    <TeamOutlined className="!text-cyan-400" />
                                    <Text className="!text-cyan-400 !font-semibold !text-sm !uppercase !tracking-wider">
                                        Giải pháp doanh nghiệp
                                    </Text>
                                </div>
                                <Title
                                    level={2}
                                    className="!text-white !mt-4 !mb-6 !text-3xl sm:!text-4xl md:!text-5xl !font-bold !leading-tight"
                                >
                                    Kết nối với <span className="!text-transparent !bg-clip-text !bg-gradient-to-r !from-cyan-400 !to-blue-400">tài năng hàng đầu</span>,
                                    thúc đẩy <span className="!text-transparent !bg-clip-text !bg-gradient-to-r !from-cyan-400 !to-blue-400">chiến lược phát triển</span>
                                </Title>
                                <Text className="!text-gray-300 !text-base md:!text-lg !max-w-2xl">
                                    Nền tảng quản lý nhân sự thế hệ mới giúp doanh nghiệp của bạn tiếp cận với chuyên gia toàn cầu và tối ưu hiệu suất làm việc.
                                </Text>
                            </motion.div>

                            <List
                                itemLayout="horizontal"
                                dataSource={features}
                                split={false}
                                className="!m-0 !p-0"
                                renderItem={(item, index) => (
                                    <motion.div
                                        variants={featureItemVariants}
                                        custom={index}
                                    >
                                        <List.Item className="!pl-0 !py-4 !border-0 !group">
                                            <List.Item.Meta
                                                avatar={
                                                    <motion.div
                                                        className="!bg-gradient-to-br !from-cyan-500/20 !to-blue-500/20 !p-3 !rounded-xl !flex !items-center !justify-center !transition-all !duration-300 group-hover:!scale-110 group-hover:!shadow-lg group-hover:!shadow-cyan-500/20"
                                                        whileHover={{ scale: 1.1 }}
                                                    >
                                                        {React.cloneElement(item.icon, {
                                                            className: `${item.icon.props.className} !text-cyan-400`
                                                        })}
                                                    </motion.div>
                                                }
                                                title={<Text className="!text-white !text-lg !font-medium group-hover:!text-cyan-300 !transition-colors">{item.title}</Text>}
                                                description={<Text className="!text-gray-400 group-hover:!text-gray-300 !transition-colors">{item.content}</Text>}
                                                className="!items-start"
                                            />
                                        </List.Item>
                                    </motion.div>
                                )}
                            />
                            {!isAuthenticated && (
                                <motion.div
                                    variants={buttonVariants}
                                    className="!mt-10 !flex !flex-wrap !gap-4"
                                >
                                    <MotionButton
                                        type="primary"
                                        size="large"
                                        className="!h-14 !px-8 !bg-gradient-to-r !from-cyan-500 !to-blue-600 hover:!from-cyan-600 hover:!to-blue-700 !border-none !rounded-xl !text-lg !font-semibold !flex !items-center !shadow-lg !shadow-cyan-500/30"
                                        icon={<RocketOutlined className="!text-xl" />}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.5)"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => router.push("/register")}
                                    >
                                        Đăng ký ngay
                                    </MotionButton>
                                </motion.div>
                            )}
                        </MotionCard>
                    </Col>

                    <Col xs={24} lg={12} className="!p-0 !pl-6">
                        <motion.div
                            variants={imageVariants}
                            className="relative !w-full !h-0 !pb-[100%] md:!pb-0 md:!h-full !min-h-[350px] md:!min-h-[550px] !rounded-2xl !overflow-hidden !shadow-2xl !border-4 !border-white/10"
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)"
                            }}
                        >
                            <Image
                                src="/assets/images/ft7.jpg"
                                alt="Giải pháp nhân sự cho doanh nghiệp"
                                fill
                                className="!object-cover !object-center"
                                priority
                                quality={100}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                style={{
                                    objectPosition: "center center"
                                }}
                            />
                            <div className="absolute !inset-0 !bg-gradient-to-r !from-gray-900/70 !via-gray-900/40 !to-transparent" />

                            {/* Decorative elements */}
                            <motion.div
                                className="absolute !top-6 !right-6 !w-16 !h-16 !bg-cyan-500/20 !rounded-full !backdrop-blur-sm"
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "easeInOut"
                                }}
                            />

                            <motion.div
                                className="absolute !bottom-16 !right-16 !w-10 !h-10 !bg-blue-500/20 !rounded-full !backdrop-blur-sm"
                                animate={{
                                    scale: [1, 0.9, 1],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Badge trên hình ảnh */}
                            <motion.div
                                className="absolute !bottom-6 !left-6 md:!bottom-8 md:!left-8 !bg-gradient-to-br !from-cyan-600 !to-blue-700 !backdrop-blur-sm !px-4 !py-3 md:!px-6 md:!py-4 !rounded-xl !shadow-lg !border !border-white/20"
                                initial={{ y: 20, opacity: 0 }}
                                animate={inView ? { y: 0, opacity: 1 } : {}}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <div className="!flex !items-center !gap-3">
                                    <BarChartOutlined className="!text-white !text-xl" />
                                    <Text className="!text-white !text-base md:!text-lg !font-medium">
                                        <span className="!text-2xl !font-bold !mr-2">{data?.rateEmployer}%</span>
                                        Doanh nghiệp hài lòng
                                    </Text>
                                </div>
                            </motion.div>
                        </motion.div>
                    </Col>
                </Row>
            </div>

            {/* Animated gradient blobs */}
            <motion.div
                className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-cyan-500 filter blur-[100px] opacity-20"
                animate={inView ? { scale: [1, 1.2, 1] } : {}}
                transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-blue-600 filter blur-[100px] opacity-20"
                animate={inView ? { scale: [1, 1.3, 1] } : {}}
                transition={{
                    repeat: Infinity,
                    duration: 7,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            />

            {/* Floating particles */}
            {Array.from({ length: 4 }).map((_, index) => {
                const size = 12;
                const position = {
                    top: `${20 + index * 15}%`,
                    left: `${5 + index * 10}%`,
                };

                return (
                    <motion.div
                        key={`particle-${index}`}
                        className="absolute w-3 h-3 bg-cyan-400 rounded-full"
                        style={position}
                        animate={{ y: [0, 15, 0] }}
                        transition={{
                            duration: 3 + index,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.3
                        }}
                    />
                )
            })}
        </motion.section>
    );
};

export default ForBusinesses;