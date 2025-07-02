"use client";

import { Row, Col, Button, Card, List, Typography } from "antd";
import {
    PieChartOutlined,
    RiseOutlined,
    CheckCircleOutlined,
    CustomerServiceOutlined,
    RocketOutlined
} from "@ant-design/icons";
import Image from "next/image";
import { Easing, motion, easeOut } from "framer-motion";
import { useInView } from "react-intersection-observer";

const easeBezier: Easing = [0.16, 1, 0.3, 1];

const { Title, Text } = Typography;

const MotionButton = motion(Button);

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
    hidden: { x: 50, opacity: 0 },
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

const ForBusinesses = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: "-50px 0px"
    });

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
            className="relative !py-16 md:!py-24"
        >
            <div className="container !mx-auto !px-4">
                <Row gutter={[48, 48]} align="middle" className="!m-0">
                    <Col xs={24} lg={12} className="!p-0">
                        <Card
                            variant="borderless"
                            className="!bg-transparent !shadow-none"
                            styles={{ body: { padding: 0 } }}
                        >
                            <motion.div
                                variants={textVariants}
                                className="!mb-8"
                            >
                                <Text className="!text-blue-400 !font-semibold !text-lg !uppercase !tracking-wider">
                                    Giải pháp doanh nghiệp
                                </Text>
                                <Title
                                    level={2}
                                    className="!text-white !mt-4 !mb-6 !text-3xl sm:!text-4xl md:!text-5xl !font-bold !leading-tight"
                                >
                                    Kết nối với <span className="!text-blue-400">tài năng hàng đầu</span>,
                                    thúc đẩy <span className="!text-blue-400">chiến lược phát triển</span>
                                </Title>
                                <Text className="!text-gray-300 !text-base md:!text-lg">
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
                                className="!mt-10 !flex !flex-wrap !gap-4"
                            >
                                <MotionButton
                                    type="primary"
                                    size="large"
                                    className="!h-14 !px-8 !bg-blue-500 hover:!bg-blue-600 !border-none !rounded-xl !text-lg !font-semibold !flex !items-center"
                                    icon={<RocketOutlined className="!text-xl" />}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Khám phá giải pháp
                                </MotionButton>

                                <MotionButton
                                    type="default"
                                    size="large"
                                    className="!h-14 !px-8 !bg-transparent hover:!bg-gray-800/50 !border-gray-600 !text-white !rounded-xl !text-lg !font-semibold"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Liên hệ tư vấn
                                </MotionButton>

                            </motion.div>
                        </Card>
                    </Col>

                    <Col xs={24} lg={12} className="!p-0 !pl-6">
                        <motion.div
                            variants={imageVariants}
                            className="relative !w-full !h-0 md:!pb-0 md:!h-full !min-h-[350px] md:!min-h-[550px] !rounded-2xl !overflow-hidden !shadow-2xl"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Image
                                src="/assets/images/doanhnghiep.jpg"
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

                            {/* Badge trên hình ảnh */}
                            <motion.div
                                className="absolute !bottom-6 !left-6 md:!bottom-8 md:!left-8 !bg-blue-500/90 !backdrop-blur-sm !px-4 !py-3 md:!px-6 md:!py-4 !rounded-xl !shadow-lg"
                                initial={{ y: 20, opacity: 0 }}
                                animate={inView ? { y: 0, opacity: 1 } : {}}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <Text className="!text-white !text-base md:!text-lg !font-medium">
                                    <span className="!text-2xl !font-bold !mr-2">95%</span>
                                    Doanh nghiệp hài lòng
                                </Text>
                            </motion.div>
                        </motion.div>
                    </Col>
                </Row>
            </div>

            {/* Hiệu ứng nền */}
            <div className="absolute !top-0 !left-0 !w-full !h-full !overflow-hidden !opacity-20 !pointer-events-none">
                <motion.div
                    className="absolute !top-1/4 !-left-20 !w-96 !h-96 !rounded-full !bg-blue-500 !filter !blur-3xl !opacity-30"
                    initial={{ scale: 0.8 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <motion.div
                    className="absolute !bottom-1/4 !-right-20 !w-96 !h-96 !rounded-full !bg-purple-500 !filter !blur-3xl !opacity-30"
                    initial={{ scale: 0.8 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                />
            </div>
        </motion.section>
    );
};

export default ForBusinesses;