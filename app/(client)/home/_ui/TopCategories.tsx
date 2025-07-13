"use client";

import { Card, Collapse, CollapseProps } from "antd";
import {
    BarChartOutlined,
    CodeOutlined,
    DatabaseOutlined,
    MobileOutlined
} from "@ant-design/icons";
import { Easing, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const easeBezier: Easing = [0.16, 1, 0.3, 1];

const collapseContent = (
    <div className="!text-gray-700 !leading-relaxed !space-y-2 !text-sm">
        <div className="flex items-center gap-2">
            <div className="!w-6 !h-6 !rounded-full !bg-blue-100 !flex !items-center !justify-center">
                <span className="!text-blue-600">👤</span>
            </div>
            <p>Số người ứng tuyển: <strong className="!text-blue-600">100</strong></p>
        </div>

        <div className="flex items-center gap-2">
            <div className="!w-6 !h-6 !rounded-full !bg-green-100 !flex !items-center !justify-center">
                <span className="!text-green-600">✅</span>
            </div>
            <p>Số người hoàn thành: <strong className="!text-green-600">100</strong></p>
        </div>

        <div className="flex items-center gap-2">
            <div className="!w-6 !h-6 !rounded-full !bg-purple-100 !flex !items-center !justify-center">
                <span className="!text-purple-600">📊</span>
            </div>
            <p>Tỉ lệ thành công: <strong className="!text-purple-600">100%</strong></p>
        </div>
    </div>
);

const collapseItems: CollapseProps["items"] = [
    {
        key: "1",
        label: (
            <motion.div
                whileHover={{ scale: 1.03 }}
                className="!flex !items-center !gap-2 !font-bold !text-[#162556]"
            >
                <BarChartOutlined className="!text-lg" />
                <span>Thống kê chuyên ngành</span>
            </motion.div>
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
        icon: <CodeOutlined className="!text-2xl" />,
        pattern: "/assets/images/pattern-web.svg",
        color: "#4F46E5"
    },
    {
        key: "2",
        title: "Thiết Kế Database",
        description:
            "Xây dựng cấu trúc lưu trữ dữ liệu cho hệ thống, đảm bảo tổ chức hợp lý và dễ truy xuất.",
        image: "/assets/images/thiet-ke-database.webp",
        icon: <DatabaseOutlined className="!text-2xl" />,
        pattern: "/assets/images/pattern-db.svg",
        color: "#0D9488"
    },
    {
        key: "3",
        title: "Lập Trình Mobile",
        description:
            "Phát triển ứng dụng chạy trên thiết bị di động như điện thoại và máy tính bảng.",
        image: "/assets/images/laptrinhmobile.jpg",
        icon: <MobileOutlined className="!text-2xl" />,
        pattern: "/assets/images/pattern-mobile.svg",
        color: "#DB2777"
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
            className="!w-full !mx-auto !px-4 !py-16 !font-barlow !bg-white"
        >
            <div className="!max-w-6xl !mx-auto">
                <motion.div
                    variants={titleVariants}
                    className="!text-center !mb-16"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="!text-3xl !md:text-4xl !font-bold !text-[#162556] !mb-4"
                    >
                        Top chuyên ngành nổi bật
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: "100px" } : {}}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="!h-1 !bg-[#162556] !mx-auto !rounded-full"
                    />
                </motion.div>

                <div className="!grid !grid-cols-1 !sm:grid-cols-2 !lg:grid-cols-3 !gap-8">
                    {data.map((item) => (
                        <motion.div
                            key={item.key}
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                        >
                            <Card
                                hoverable
                                className="!rounded-2xl !shadow-xl !overflow-hidden !border-0 !transition-all"
                                cover={
                                    <motion.div
                                        className="!relative !h-52 !overflow-hidden"
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Pattern background */}
                                        <div
                                            className="!absolute !inset-0 !opacity-10 !bg-cover"
                                            style={{ backgroundImage: `url(${item.pattern})` }}
                                        />

                                        {/* Main image */}
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="!w-full !h-full !object-cover !relative z-10"
                                        />

                                        {/* Icon badge */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={inView ? { scale: 1 } : {}}
                                            transition={{ delay: 0.4, type: "spring" }}
                                            className="!absolute !-bottom-6 !left-6 !z-20 !w-12 !h-12 !rounded-full !flex !items-center !justify-center !shadow-lg"
                                            style={{ backgroundColor: item.color }}
                                        >
                                            {item.icon}
                                        </motion.div>
                                    </motion.div>
                                }
                                styles={{
                                    body: {
                                        padding: "24px 24px 16px 24px",
                                        position: "relative",
                                        zIndex: 10
                                    }
                                }}
                            >
                                <div className="!mt-6">
                                    <h3
                                        className="!text-xl !font-bold !text-gray-900 !mb-3"
                                        style={{ color: item.color }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="!text-gray-600 !text-sm !mb-6">
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
                                            className="!bg-gray-50 !rounded-xl !border !border-gray-200 !overflow-hidden"
                                        />
                                    </motion.div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default TopCategories;