"use client";

import { Row, Col, Button, Card, Typography, List } from "antd";
import {
    RocketFilled,
    TeamOutlined,
    BarChartOutlined,
    SyncOutlined,
    SolutionOutlined,
    GlobalOutlined,
    ClockCircleOutlined,
    WalletOutlined
} from "@ant-design/icons";
import Image from "next/image";
import { easeOut, Easing, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthorization } from "@/hooks/useAuthorization";

const MotionButton = motion(Button);
const MotionCard = motion(Card);

const easeBezier: Easing = [0.16, 1, 0.3, 1];

const { Title, Text } = Typography;

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
    hidden: { x: -50, opacity: 0, rotate: -2 },
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
    hidden: { x: 30, opacity: 0 },
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

const ForFreelancers = ({ data }: { data: any }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: "-50px 0px"
    });

    const router = useRouter();

    const isAuthenticated = useAuthorization();

    const features = [
        {
            icon: <GlobalOutlined className="!text-2xl" />,
            title: "Hợp tác với khách hàng lớn",
            content: "Làm việc với thương hiệu lớn và mở rộng tầm ảnh hưởng của bạn."
        },
        {
            icon: <ClockCircleOutlined className="!text-2xl" />,
            title: "Chọn dự án phù hợp",
            content: "Tự chủ thời gian và làm công việc bạn yêu thích."
        },
        {
            icon: <WalletOutlined className="!text-2xl" />,
            title: "Thanh toán an toàn",
            content: "Hệ thống thanh toán minh bạch và bảo mật, nhanh chóng."
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
                    <Col xs={24} lg={14} className="!p-0 !order-2 lg:!order-1">
                        <motion.div
                            variants={imageVariants}
                            className="relative !w-full !h-0 !pb-[56.25%] lg:!pb-0 lg:!h-full lg:!min-h-[500px] !rounded-2xl !overflow-hidden !shadow-2xl !border-4 !border-white/10"
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)"
                            }}
                        >
                            <Image
                                src="/assets/images/contain3.jpg"
                                alt="Freelancer làm việc chuyên nghiệp"
                                fill
                                className="!object-cover !object-center"
                                priority
                                quality={100}
                                sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                            <div className="absolute !inset-0 !bg-gradient-to-t lg:!bg-gradient-to-r !from-[#1c2526]/80 !via-[#1c2526]/40 !to-transparent" />

                            {/* Decorative elements */}
                            <motion.div
                                className="absolute !top-6 !left-6 !w-16 !h-16 !bg-cyan-500/20 !rounded-full !backdrop-blur-sm"
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Badge thông tin */}
                            <motion.div
                                className="absolute !bottom-6 !right-6 !bg-gradient-to-br !from-cyan-600 !to-blue-700 !backdrop-blur-sm !px-4 !py-3 md:!px-6 md:!py-4 !rounded-xl !shadow-lg !border !border-white/20"
                                initial={{ y: 20, opacity: 0 }}
                                animate={inView ? { y: 0, opacity: 1 } : {}}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <div className="!flex !items-center !gap-3">
                                    <BarChartOutlined className="!text-white !text-xl" />
                                    <Text className="!text-white !text-base md:!text-lg !font-medium">
                                        <span className="!text-2xl !font-bold !mr-2">{data?.rateFreelancer}%</span>
                                        Freelancer hài lòng
                                    </Text>
                                </div>
                            </motion.div>
                        </motion.div>
                    </Col>

                    <Col xs={24} lg={10} className="!p-6 lg:!p-8 !order-1 lg:!order-2">
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
                                className="!mb-8 !text-right"
                            >
                                <div className="!inline-flex !items-center !gap-2 !px-4 !py-2 !bg-cyan-500/20 !rounded-full !mb-4 !ml-auto">
                                    <TeamOutlined className="!text-cyan-400" />
                                    <Text className="!text-cyan-400 !font-semibold !text-sm !uppercase !tracking-wider">
                                        Dành Cho Freelancer
                                    </Text>
                                </div>

                                <Title
                                    level={2}
                                    className="!text-white !mt-4 !mb-6 !text-3xl sm:!text-4xl md:!text-5xl !font-bold !leading-tight !text-right"
                                >
                                    Phát triển <span className="!text-transparent !bg-clip-text !bg-gradient-to-r !from-cyan-400 !to-blue-400">sự nghiệp freelance</span> với dự án <span className="!text-transparent !bg-clip-text !bg-gradient-to-r !from-cyan-400 !to-blue-400">chất lượng cao</span>
                                </Title>

                                <Text className="!text-gray-300 !text-base md:!text-lg !max-w-2xl !ml-auto">
                                    Nền tảng kết nối freelancer với các dự án chất lượng từ khách hàng uy tín, giúp bạn phát triển sự nghiệp tự do.
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
                                        <List.Item className="!pl-0 !py-4 !border-0 !group !justify-end">
                                            <List.Item.Meta
                                                avatar={
                                                    <motion.div
                                                        className="!bg-gradient-to-br !from-cyan-500/20 !to-blue-500/20 !p-3 !rounded-xl !flex !items-center !justify-center !transition-all !duration-300 group-hover:!scale-110 group-hover:!shadow-lg group-hover:!shadow-cyan-500/20 !order-2 !ml-4"
                                                        whileHover={{ scale: 1.1 }}
                                                    >
                                                        {React.cloneElement(item.icon, {
                                                            className: `${item.icon.props.className} !text-cyan-400`
                                                        })}
                                                    </motion.div>
                                                }
                                                title={<Text className="!text-white !text-lg !font-medium group-hover:!text-cyan-300 !transition-colors !text-right">{item.title}</Text>}
                                                description={<Text className="!text-gray-400 group-hover:!text-gray-300 !transition-colors !text-right">{item.content}</Text>}
                                                className="!items-end"
                                            />
                                        </List.Item>
                                    </motion.div>
                                )}
                            />
                            {!isAuthenticated && (
                                <motion.div
                                    variants={buttonVariants}
                                    className="!mt-10 !flex !flex-wrap !justify-end !gap-4"
                                >
                                    <MotionButton
                                        type="primary"
                                        size="large"
                                        className="!h-14 !px-8 !bg-gradient-to-r !from-cyan-500 !to-blue-600 hover:!from-cyan-600 hover:!to-blue-700 !border-none !rounded-xl !text-lg !font-semibold !flex !items-center !shadow-lg !shadow-cyan-500/30"
                                        icon={<RocketFilled className="!text-xl" />}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.5)"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => router.push('/register')}
                                    >
                                        Đăng ký ngay
                                    </MotionButton>
                                </motion.div>
                            )}
                        </MotionCard>
                    </Col>
                </Row>
            </div>

            {/* Hiệu ứng nền động */}
            <motion.div
                className="absolute !top-1/3 !-right-20 !w-96 !h-96 !rounded-full !bg-cyan-500 !filter !blur-[100px] !opacity-20"
                animate={inView ? {
                    scale: [1, 1.2, 1],
                } : {}}
                transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute !bottom-1/3 !-left-20 !w-96 !h-96 !rounded-full !bg-blue-600 !filter !blur-[100px] !opacity-20"
                animate={inView ? {
                    scale: [1, 1.3, 1],
                } : {}}
                transition={{
                    repeat: Infinity,
                    duration: 7,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            />

            {/* Floating particles */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute !w-3 !h-3 !bg-cyan-400 !rounded-full"
                    style={{
                        top: `${20 + i * 15}%`,
                        right: `${5 + i * 5}%`,
                    }}
                    animate={{
                        y: [0, 15, 0],
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                    }}
                />
            ))}
        </motion.section>
    );
};

export default ForFreelancers;