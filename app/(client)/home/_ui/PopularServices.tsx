"use client";

import { Card, Tag, Typography } from "antd";
import {
    CodeOutlined,
    VideoCameraOutlined,
    AppstoreOutlined,
    LineChartOutlined,
    HomeOutlined,
    BookOutlined,
    PictureOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import CardShadow from "@/components/ui/card-shadow";
import { Easing, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const easeBezier: Easing = [0.16, 1, 0.3, 1];

const { Title, Text, Paragraph } = Typography;

const fields = [
    {
        title: "Phát triển Website",
        description: "Thiết kế và xây dựng website chuyên nghiệp",
        skillCount: 12,
        postCount: 128,
        icon: <CodeOutlined className="text-blue-500" />,
        color: "blue"
    },
    {
        title: "Chỉnh sửa Video",
        description: "Biên tập video chất lượng cao, hậu kỳ chuyên nghiệp",
        skillCount: 8,
        postCount: 95,
        icon: <VideoCameraOutlined className="text-purple-500" />,
        color: "purple"
    },
    {
        title: "Phát triển phần mềm",
        description: "Xây dựng ứng dụng máy tính và di động",
        skillCount: 15,
        postCount: 110,
        icon: <AppstoreOutlined className="text-green-500" />,
        color: "green"
    },
    {
        title: "SEO & Marketing",
        description: "Tối ưu hóa công cụ tìm kiếm và chiến lược tiếp thị. Tối ưu hóa công cụ tìm kiếm và chiến lược tiếp thị",
        skillCount: 10,
        postCount: 87,
        icon: <LineChartOutlined className="text-orange-500" />,
        color: "orange"
    },
    {
        title: "Thiết kế nội thất",
        description: "Lên ý tưởng và phối cảnh cho không gian sống",
        skillCount: 6,
        postCount: 52,
        icon: <HomeOutlined className="text-red-500" />,
        color: "red"
    },
    {
        title: "Thiết kế sách",
        description: "Dàn trang và trình bày sách chuyên nghiệp",
        skillCount: 7,
        postCount: 39,
        icon: <BookOutlined className="text-indigo-500" />,
        color: "indigo"
    },
    {
        title: "Thiết kế đồ họa",
        description: "Tạo hình ảnh thương hiệu, poster, banner",
        skillCount: 14,
        postCount: 102,
        icon: <PictureOutlined className="text-pink-500" />,
        color: "pink"
    },
    {
        title: "Dịch thuật",
        description: "Chuyển ngữ tài liệu giữa nhiều ngôn ngữ",
        skillCount: 9,
        postCount: 66,
        icon: <GlobalOutlined className="text-cyan-500" />,
        color: "cyan"
    },
];

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
                {fields.map((field, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                    >
                        <CardShadow
                            className="transition-all duration-300 flex flex-col h-full"
                            bodyPadding={20}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {field.icon}
                                </motion.div>
                                <Title level={4} className="!mb-0">
                                    {field.title}
                                </Title>
                            </div>

                            <Paragraph
                                type="secondary"
                                className="min-h-12"
                                ellipsis={{ rows: 2, expandable: true, tooltip: field.description, symbol: '' }}
                            >
                                {field.description}
                            </Paragraph>

                            <div className="mt-auto flex justify-between text-sm">
                                <Tag color={`${field.color}`} className="!m-0">
                                    {field.skillCount} kỹ năng
                                </Tag>
                                <Text type="secondary" className="!m-0">
                                    {field.postCount}+ bài đăng
                                </Text>
                            </div>
                        </CardShadow>
                    </motion.div>
                ))}
            </div>

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
        </motion.div>
    );
};

export default PopularServices;