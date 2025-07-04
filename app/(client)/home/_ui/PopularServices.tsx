"use client";

import { Tag, Typography } from "antd";
import CardShadow from "@/components/ui/card-shadow";
import { Easing, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { apiGet } from "@/api/baseApi";

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
            stiffness: 100,
            damping: 15,
            duration: 0.6
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

const PopularServices = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: "-50px 0px"
    });

    const tagColors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

    const getRandomColor = () => {
        return tagColors[Math.floor(Math.random() * tagColors.length)];
    };

    const [majors, setMajors] = useState<any[]>([]);

    useEffect(() => {
        apiGet("/top-8-major").then((res: any) => {
            setMajors(res?.data);
        })
    }, [])

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="overflow-hidden"
        >
            <motion.div
                variants={titleVariants}
                className="text-center mb-14"
            >
                <Title level={2} className="!text-3xl sm:!text-4xl !font-bold !mb-3 !text-gray-800">
                    Chuyên ngành phổ biến
                </Title>
                <Text type="secondary" className="text-lg">
                    Khám phá các dịch vụ được yêu cầu nhiều nhất
                </Text>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {majors.map((major, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                    >
                        <CardShadow
                            className="transition-all duration-300 flex flex-col h-full"
                            styleBody={{ padding: 20 }}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <Title level={4} className="!mb-0">
                                    {major?.name}
                                </Title>
                            </div>

                            <Paragraph
                                type="secondary"
                                className="min-h-12"
                                ellipsis={{ rows: 2, expandable: true, tooltip: major.description, symbol: '' }}
                            >
                                {major?.description}
                            </Paragraph>

                            <div className="mt-auto flex justify-between text-sm">
                                <Tag color={getRandomColor()} className="!m-0">
                                    {major.countSkill} kỹ năng
                                </Tag>
                                <Text type="secondary" className="!m-0">
                                    {major.countJob}+ bài đăng
                                </Text>
                            </div>
                        </CardShadow>
                    </motion.div>
                ))
                }
            </div >

            <motion.div
                variants={buttonVariants}
                className="text-center !mt-12"
            >
                <motion.button
                    className="!px-6 !py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Xem tất cả chuyên ngành
                </motion.button>
            </motion.div>
        </motion.div >
    );
};

export default PopularServices;