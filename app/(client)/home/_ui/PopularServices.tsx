"use client";

import { Tag, Typography } from "antd";
import CardShadow from "@/components/ui/card-shadow";
import { Easing, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { apiGet } from "@/api/baseApi";
import {
    RocketOutlined,
    CodeOutlined,
    DatabaseOutlined,
    CloudOutlined,
    AppstoreOutlined,
    BarChartOutlined,
    SettingOutlined,
    SecurityScanOutlined,
    RightOutlined
} from "@ant-design/icons";

const easeBezier: Easing = [0.16, 1, 0.3, 1];

const { Title, Text, Paragraph } = Typography;

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 120,
            damping: 12,
            duration: 0.7
        }
    }
};

const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easeBezier
        }
    }
};

const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            delay: 0.4,
            duration: 0.5
        }
    }
};

// Predefined icons for popular majors
const majorIcons = [
    <CodeOutlined key="code" />,
    <DatabaseOutlined key="db" />,
    <CloudOutlined key="cloud" />,
    <AppstoreOutlined key="app" />,
    <BarChartOutlined key="chart" />,
    <SettingOutlined key="setting" />,
    <SecurityScanOutlined key="security" />,
    <RocketOutlined key="rocket" />
];

const PopularServices = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: "-50px 0px"
    });

    const [majors, setMajors] = useState<any[]>([]);

    useEffect(() => {
        apiGet("/top-8-major").then((res: any) => {
            setMajors(res?.data);
        })
    }, [])

    return (
        <section className="!px-4">
            <div className="!mx-auto">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="overflow-hidden"
                >
                    <motion.div
                        variants={titleVariants}
                        className="!text-center !mb-16"
                    >
                        <Title
                            level={2}
                            className="!text-3xl sm:!text-4xl !font-bold !mb-4 !text-[#162556]"
                        >
                            <span className="!relative !inline-block">
                                Chuyên ngành phổ biến
                                <motion.span
                                    className="!absolute !-bottom-2 !left-0 !w-full !h-1 !bg-[#ff7e5f]"
                                    initial={{ scaleX: 0 }}
                                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                            </span>
                        </Title>
                        <Text className="!text-lg !text-gray-600 !max-w-2xl !mx-auto">
                            Khám phá các dịch vụ được yêu cầu nhiều nhất trong hệ thống của chúng tôi
                        </Text>
                    </motion.div>

                    <div className="!grid !grid-cols-4 !gap-8 !py-6">
                        {majors.map((major, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{
                                    y: -10,
                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                                }}
                            >
                                <CardShadow
                                    className="!transition-all !duration-300 !flex !flex-col !h-full !overflow-hidden 
                                          !bg-white !border !border-gray-100 !rounded-xl"
                                    styleBody={{ padding: 0 }}
                                >
                                    <div className="!relative">
                                        <div className="!absolute !top-4 !right-4 !w-12 !h-12 !rounded-lg !bg-[#162556] 
                                              !flex !items-center !justify-center !text-white !text-xl">
                                            {majorIcons[index % majorIcons.length]}
                                        </div>
                                        <div className="!p-6 !pb-4">
                                            <div className="!flex !items-center !gap-3 !mb-4">
                                                <Title level={4} className="!mb-0 !text-[#162556] !text-lg">
                                                    {major?.name}
                                                </Title>
                                            </div>

                                            <Paragraph
                                                className="!min-h-16 !text-gray-600 !mb-6"
                                                ellipsis={{ rows: 3, expandable: true, tooltip: major.description, symbol: '' }}
                                            >
                                                {major?.description}
                                            </Paragraph>
                                        </div>

                                        <div className="!px-6 !py-4 !bg-gray-50 !mt-auto !flex !justify-between !text-sm !border-t !border-gray-100">
                                            <span className="!px-3 !py-1 !bg-[#e6f7ff] !text-[#1890ff] !rounded-full !text-xs !font-medium">
                                                {major.countSkill} kỹ năng
                                            </span>
                                            <span className="!text-gray-500 !font-medium">
                                                {major.countJob}+ bài đăng
                                            </span>
                                        </div>
                                    </div>
                                </CardShadow>
                            </motion.div>
                        ))
                        }
                    </div >
                </motion.div>
            </div>
        </section>
    );
};

export default PopularServices;