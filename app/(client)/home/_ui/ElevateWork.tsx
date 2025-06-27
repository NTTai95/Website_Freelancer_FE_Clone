"use client";

import { Row, Col, Card, Avatar, Flex } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faUserTie, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { Easing, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const easeBezier: Easing = [0.16, 1, 0.3, 1];

const cardData = [
    {
        icon: faCoins,
        title: "Tham Gia Miễn Phí",
        description:
            "Đăng ký tài khoản và khám phá hồ sơ của các tài năng hàng đầu, tìm kiếm dự án hoặc đặt lịch tư vấn.",
    },
    {
        icon: faUserTie,
        title: "Thuê Người Giỏi",
        description:
            "Việc tìm kiếm nhân tài chưa bao giờ dễ dàng hơn. Đăng bài tuyển dụng hoặc để chúng tôi giúp bạn tìm người phù hợp!",
    },
    {
        icon: faBriefcase,
        title: "Làm Việc Với Chuyên Gia",
        description:
            "Freelancer giúp bạn tối ưu chi phí với mức phí giao dịch thấp, mang lại hiệu quả cùng với đội ngũ chuyên gia.",
    },
];

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

const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15
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

const ElevateWork = () => {
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
            <motion.h2
                variants={titleVariants}
                className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10"
            >
                Nâng Tầm Công Việc Của Bạn
            </motion.h2>

            <Flex justify="space-between" className="!mt-15">
                {cardData.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <Card
                            hoverable
                            className="w-full max-w-sm rounded-2xl shadow-lg border-0 text-gray-800 flex flex-col items-center pt-10 pb-6 px-4 transition-transform duration-300"
                            styles={{ body: { paddingTop: 0 } }}
                            cover={
                                <motion.div
                                    className="flex justify-center -mt-10"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Avatar
                                        size={64}
                                        icon={
                                            <FontAwesomeIcon icon={item.icon} />
                                        }
                                        className="!bg-gradient-to-tr !from-blue-500 !to-cyan-500 text-white shadow-lg -translate-y-1/2"
                                    />
                                </motion.div>
                            }
                        >
                            <h3 className="text-xl font-semibold text-center mb-3">
                                {item.title}
                            </h3>
                            <p className="text-center text-gray-600 leading-relaxed text-sm">
                                {item.description}
                            </p>
                        </Card>
                    </motion.div>
                ))}
            </Flex>
        </motion.div>
    );
};

export default ElevateWork;