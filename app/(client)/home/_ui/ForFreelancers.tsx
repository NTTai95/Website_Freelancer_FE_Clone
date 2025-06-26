"use client";

import { Row, Col, Button, Card, Typography, List } from "antd";
import {
    TrademarkCircleFilled,
    ProjectFilled,
    SafetyCertificateFilled,
    RocketFilled,
    TrademarkCircleOutlined,
    ProjectOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons";
import Image from "next/image";
import { easeOut, Easing, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MotionButton = motion(Button);

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
    hidden: { x: -50, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
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

const ForFreelancers = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: "-50px 0px"
    });

    const features = [
        {
            icon: <TrademarkCircleOutlined className="!text-2xl" />,
            title: "Hợp tác với khách hàng lớn",
            content: "Làm việc với thương hiệu lớn và mở rộng tầm ảnh hưởng của bạn."
        },
        {
            icon: <ProjectOutlined className="!text-2xl" />,
            title: "Chọn dự án phù hợp",
            content: "Tự chủ thời gian và làm công việc bạn yêu thích."
        },
        {
            icon: <SafetyCertificateOutlined className="!text-2xl" />,
            title: "Thanh toán an toàn",
            content: "Hệ thống thanh toán minh bạch và bảo mật, nhanh chóng."
        }
    ];

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="relative !py-12"
        >
            <div className="container !mx-auto !px-4">
                <Row gutter={[32, 32]} align="middle" className="!m-0">
                    <Col xs={24} lg={14} className="!p-0 !order-2 lg:!order-1">
                        <motion.div
                            variants={imageVariants}
                            className="relative !w-full !h-0 !pb-[56.25%] lg:!pb-0 lg:!h-full lg:!min-h-[500px] !rounded-lg !overflow-hidden !shadow-xl"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Image
                                src="/assets/images/contain3.jpg"
                                alt="Freelancer làm việc chuyên nghiệp"
                                fill
                                className="!object-cover !object-center !brightness-90 hover:!brightness-100 !transition-all !duration-500"
                                priority
                                quality={100}
                                sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                            <div className="absolute !inset-0 !bg-gradient-to-t lg:!bg-gradient-to-r !from-[#1c2526]/80 !via-[#1c2526]/40 !to-transparent" />

                            {/* Badge thông tin */}
                            <motion.div
                                className="absolute !bottom-6 !left-6 !bg-blue-500/90 !backdrop-blur-sm !px-4 !py-3 !rounded-lg !shadow-lg"
                                initial={{ y: 20, opacity: 0 }}
                                animate={inView ? { y: 0, opacity: 1 } : {}}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <Text className="!text-white !text-base md:!text-lg !font-medium">
                                    <RocketFilled className="!mr-2" />
                                    Hơn 5000+ freelancer đang làm việc
                                </Text>
                            </motion.div>
                        </motion.div>
                    </Col>

                    <Col xs={24} lg={10} className="!p-6 lg:!p-8 !order-1 lg:!order-2">
                        <Card
                            bordered={false}
                            className="!bg-transparent !shadow-none"
                            bodyStyle={{ padding: 0 }}
                        >
                            <motion.div
                                variants={textVariants}
                                className="text-end"
                            >
                                <Text className="!text-blue-400 !font-semibold !text-lg !uppercase !tracking-wider">
                                    Dành Cho Freelancer
                                </Text>
                            </motion.div>

                            <motion.div variants={textVariants}>
                                <Title
                                    level={2}
                                    className="!text-white !mt-4 !mb-6 !text-3xl sm:!text-4xl md:!text-5xl !font-bold !leading-tight !text-end"
                                >
                                    Phát triển <span className="!text-blue-400">sự nghiệp freelance</span> với dự án <span className="!text-blue-400">chất lượng cao</span>
                                </Title>
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
                                        <List.Item className="!pl-0 !py-4 !border-0">
                                            <List.Item.Meta
                                                avatar={
                                                    <motion.div
                                                        className="!bg-blue-400/20 !p-3 !rounded-xl !flex !items-center !justify-center"
                                                        whileHover={{ scale: 1.1 }}
                                                    >
                                                        {item.icon}
                                                    </motion.div>
                                                }
                                                title={<Text className="!text-white !text-lg !font-medium">{item.title}</Text>}
                                                description={<Text className="!text-gray-400">{item.content}</Text>}
                                                className="!items-start"
                                            />
                                        </List.Item>
                                    </motion.div>
                                )}
                            />

                            <motion.div
                                variants={buttonVariants}
                                className="!flex !flex-wrap !justify-center !gap-4"
                            >
                                <MotionButton
                                    type="primary"
                                    className="!h-12 !px-8 !bg-blue-500 hover:!bg-blue-600 !border-none !text-base !font-semibold"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Đăng ký ngay
                                </MotionButton>
                                <MotionButton
                                    type="default"
                                    className="!h-12 !px-8 !bg-transparent hover:!bg-gray-700/50 !border-gray-500 !text-white !text-base !font-semibold"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Tìm hiểu thêm
                                </MotionButton>

                            </motion.div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </motion.section>
    );
};

export default ForFreelancers;