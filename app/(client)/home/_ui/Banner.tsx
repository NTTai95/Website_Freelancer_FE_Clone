"use client";

import { Button, Card, Typography, Carousel, Row, Col } from "antd";
import { RocketFilled, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, easeOut, Easing } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAuthorization } from "@/hooks/useAuthorization";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiGet } from "@/api/baseApi";

const { Title, Text } = Typography;

const easeBezier: Easing = [0.16, 1, 0.3, 1];
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

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: easeOut
        }
    }
};

const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easeBezier,
        },
    },
};

const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easeOut
        }
    }
};

const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.4
        }
    }
};

const statItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: easeOut
        }
    }
};

const Banner = ({ data }: { data: any }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const router = useRouter();

    const isAuthenticated = useAuthorization();

    return (
        <div className="relative !overflow-hidden !h-[105vh] !min-h-[600px] !important">
            {/* Background Video */}
            <motion.div
                className="absolute !inset-0 !z-0 !important"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <img
                    src="/banner_login.gif"
                    alt="Background GIF"
                    className="!w-full !h-full !object-cover !object-center !important"
                />
                <div className="absolute !inset-0 !bg-black/55 !important" />
            </motion.div>

            {/* Content */}
            <div className="relative !z-10 !h-full !flex !mt-30 !important">
                <div className="container !mx-auto !px-4 !important">
                    <Row gutter={[48, 32]} className="!m-0 !important">
                        <Col xs={24} lg={12} className="!p-4 !important">
                            <motion.div
                                ref={ref}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                variants={containerVariants}
                            >
                                <Card
                                    variant="borderless"
                                    className="!bg-transparent !shadow-none !important"
                                    styles={{ body: { padding: 0 } }}
                                >
                                    {/* Website Name */}
                                    <motion.div
                                        className="!mb-6 !important"
                                        variants={itemVariants}
                                    >
                                        <Text className="!text-blue-400 !font-semibold !text-lg !uppercase !tracking-wider !important">
                                            Nền tảng kết nối tự do
                                        </Text>
                                        <Title
                                            level={1}
                                            className="!text-white !mt-2 !mb-4 !important !text-4xl sm:!text-5xl md:!text-6xl !font-bold !leading-tight !important"
                                        >
                                            <motion.span
                                                className="!text-transparent !bg-clip-text !bg-gradient-to-r !from-blue-400 !to-cyan-400 !important"
                                                variants={fadeInUp}
                                            >
                                                Freelancer
                                            </motion.span>
                                        </Title>
                                    </motion.div>

                                    {/* Website Description */}
                                    <motion.div variants={itemVariants}>
                                        <Text className="!block !text-gray-200 !text-lg md:!text-xl !mb-8 !important !leading-relaxed !important">
                                            Freelancer là nền tảng hàng đầu kết nối chuyên gia tự do với các dự án chất lượng cao.
                                            Chúng tôi mang đến cơ hội làm việc linh hoạt, thanh toán minh bạch và môi trường
                                            chuyên nghiệp cho cả freelancer và nhà tuyển dụng.
                                        </Text>
                                    </motion.div>

                                    {/* Call-to-Action Buttons */}
                                    {!isAuthenticated &&
                                        <motion.div
                                            className="!flex !flex-wrap !gap-4 !mb-10 !important"
                                            variants={itemVariants}
                                        >
                                            <MotionButton
                                                type="primary"
                                                size="large"
                                                icon={<RocketFilled />}
                                                className="!h-14 !px-8 !important !bg-gradient-to-r !from-blue-500 !to-cyan-500 hover:!from-blue-600 hover:!to-cyan-600 !border-none !rounded-full !text-lg !font-semibold !flex !items-center !important"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => router.push("/register")}
                                            >
                                                Tham gia ngay
                                            </MotionButton>
                                        </motion.div>
                                    }
                                </Card>
                            </motion.div>
                        </Col>

                        <Col xs={24} lg={12} className="!p-4 !important">
                            <motion.div
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                variants={scaleUp}
                                className="relative !w-full !h-0 !pb-[56.25%] lg:!pb-0 lg:!h-[400px] !important !rounded-xl !overflow-hidden !shadow-2xl !border-2 !border-white/20 !important"
                            >
                                <Image
                                    src="/assets/images/lap-trinh-web-4.jpeg"
                                    alt="Freelancer làm việc"
                                    fill
                                    className="!object-cover !object-center !important"
                                    priority
                                    quality={100}
                                />
                                <motion.div
                                    className="absolute !bottom-6 !left-6 !important !bg-blue-500/90 !backdrop-blur-sm !px-4 !py-3 !important !rounded-lg !shadow-lg !important"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={inView ? { y: 0, opacity: 1 } : {}}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                >
                                    <Text className="!text-white !text-base md:!text-lg !font-medium !important">
                                        <span className="!text-2xl !font-bold !mr-2 !important">{data?.totalJobs || 0}</span>
                                        Dự án đang chờ bạn
                                    </Text>
                                </motion.div>
                            </motion.div>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Stats Bar */}
            <motion.div
                className="absolute !bottom-0 !left-0 !w-full !bg-white/10 !backdrop-blur-sm !py-4 !important !border-t !border-white/20 !important"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={statsVariants}
            >
                <div className="container !mx-auto !px-4 !important">
                    <Row gutter={[24, 16]} className="!m-0 !text-center !important">
                        <Col xs={24} sm={8} className="!p-2 !important">
                            <motion.div variants={statItemVariants}>
                                <Text className="!block !text-white !text-2xl md:!text-3xl !font-bold !mb-1 !important">
                                    {data?.totalFreelancer || 0}
                                </Text>
                                <Text className="!text-gray-300 !text-sm md:!text-base !important">
                                    Freelancer chuyên nghiệp
                                </Text>
                            </motion.div>
                        </Col>
                        <Col xs={24} sm={8} className="!p-2 !important">
                            <motion.div variants={statItemVariants}>
                                <Text className="!block !text-white !text-2xl md:!text-3xl !font-bold !mb-1 !important">
                                    {data?.totalEmployer || 0}
                                </Text>
                                <Text className="!text-gray-300 !text-sm md:!text-base !important">
                                    Doanh nghiệp đối tác
                                </Text>
                            </motion.div>
                        </Col>
                        <Col xs={24} sm={8} className="!p-2 !important">
                            <motion.div variants={statItemVariants}>
                                <Text className="!block !text-white !text-2xl md:!text-3xl !font-bold !mb-1 !important">
                                    {data?.satisfactionRate || 0}%
                                </Text>
                                <Text className="!text-gray-300 !text-sm md:!text-base !important">
                                    Tỷ lệ hài lòng
                                </Text>
                            </motion.div>
                        </Col>
                    </Row>
                </div>
            </motion.div>
        </div>
    );
};

export default Banner;