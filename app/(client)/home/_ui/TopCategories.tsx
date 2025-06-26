"use client";

import { Card, Collapse, CollapseProps } from "antd";
import { BarChartOutlined } from "@ant-design/icons";
import { Easing, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const easeBezier: Easing = [0.16, 1, 0.3, 1];

const collapseContent = (
    <div className="text-sm text-gray-700 leading-relaxed space-y-1">
        <p>👤 Số người ứng tuyển: <strong>100</strong></p>
        <p>✅ Số người hoàn thành: <strong>100</strong></p>
        <p>📊 Tỉ lệ thành công: <strong>100%</strong></p>
    </div>
);

const collapseItems: CollapseProps["items"] = [
    {
        key: "1",
        label: (
            <div className="flex items-center gap-2 font-semibold text-blue-600">
                <BarChartOutlined />
                Thống kê chuyên ngành
            </div>
        ),
        children: collapseContent,
        showArrow: false,
    },
];

const data = [
    {
        key: "1",
        title: "Lập Trình Web",
        description:
            "Xây dựng các website thương mại, mạng xã hội, blog, và hệ thống quản lý trên nền tảng web.",
        image: "/assets/images/lap-trinh-web-4.jpeg",
    },
    {
        key: "2",
        title: "Thiết Kế Database",
        description:
            "Xây dựng cấu trúc lưu trữ dữ liệu cho hệ thống, đảm bảo tổ chức hợp lý và dễ truy xuất.",
        image: "/assets/images/thiet-ke-database.webp",
    },
    {
        key: "3",
        title: "Lập Trình Mobile",
        description:
            "Phát triển ứng dụng chạy trên thiết bị di động như điện thoại và máy tính bảng.",
        image: "/assets/images/laptrinhmobile.jpg",
    },
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15,
            mass: 0.5
        }
    }
};

const titleVariants = {
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

const TopCategories = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: "-50px 0px"
    });

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="w-full mx-auto px-4 py-14 font-barlow overflow-hidden"
        >
            <motion.h2
                variants={titleVariants}
                className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-14"
            >
                Top chuyên ngành nổi bật
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((item) => (
                    <motion.div
                        key={item.key}
                        variants={cardVariants}
                        whileHover={{ y: -5 }}
                    >
                        <Card
                            hoverable
                            className="rounded-2xl shadow-md transition-transform duration-300"
                            cover={
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-52 object-cover rounded-t-2xl"
                                    />
                                </motion.div>
                            }
                            bodyStyle={{ padding: "20px" }}
                        >
                            <h3 className="text-xl font-semibold text-center text-gray-900 mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm text-center mb-4 px-2">
                                {item.description}
                            </p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Collapse
                                    ghost
                                    items={[
                                        {
                                            ...collapseItems[0],
                                            key: item.key,
                                        },
                                    ]}
                                    className="bg-gray-50 border border-gray-200 rounded-lg"
                                />
                            </motion.div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default TopCategories;