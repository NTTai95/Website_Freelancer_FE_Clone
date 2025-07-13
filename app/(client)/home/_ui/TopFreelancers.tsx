"use client";

import { Tag, Button, Rate, Avatar, Typography, Tooltip, Badge, Card } from 'antd';
import {
    UserOutlined, RocketOutlined, ClockCircleOutlined,
    DollarOutlined, StarFilled, MessageOutlined,
    TrophyOutlined, CrownOutlined,
    FireOutlined, CheckCircleOutlined, CalendarOutlined
} from '@ant-design/icons';
import { easeOut, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { apiGet } from '@/api/baseApi';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

const { Title, Text } = Typography;

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
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
            ease: easeOut
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
            duration: 0.6
        }
    }
};

const featuredCardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 80,
            damping: 10,
            duration: 0.8
        }
    }
};

const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.5
        }
    }
};

const TopFreelancers = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: "-50px 0px"
    });

    const router = useRouter();
    const [freelancers, setFreelancers] = useState<any[]>([]);

    useEffect(() => {
        apiGet("/top-5-freelancer").then((res: any) => {
            setFreelancers(res.data);
        });
    }, []);

    const renderSkills = (skills: string[]) => {
        const maxVisible = 4;
        const visibleSkills = skills.slice(0, maxVisible);
        const hiddenSkills = skills.slice(maxVisible);

        return (
            <div className="!flex !flex-wrap !gap-2 !justify-center !mb-4 min-h-16">
                {visibleSkills.map((skill, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Tag className="!text-xs !py-1 !px-3 !m-0 !rounded-full !border-0 !bg-blue-100 !text-blue-800 !flex !items-center">
                            <CheckCircleOutlined className="!text-blue-500 !mr-1 !text-xs" />
                            {skill}
                        </Tag>
                    </motion.div>
                ))}

                {hiddenSkills.length > 0 && (
                    <Tooltip title={hiddenSkills.join(', ')}>
                        <Tag className="!text-xs !py-1 !px-3 !m-0 !rounded-full !bg-blue-50 !border !border-dashed !border-blue-200 !text-blue-600">
                            +{hiddenSkills.length}
                        </Tag>
                    </Tooltip>
                )}
            </div>
        );
    };

    const renderReview = (review?: { rating: number; content: string; createdAt: string }) => {
        if (!review) return null;

        return (
            <motion.div
                className="!mt-4 !p-4 !bg-gradient-to-r !from-blue-50 !to-sky-50 !rounded-xl !border !border-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <div className="!flex !items-center !mb-2">
                    <Rate
                        disabled
                        defaultValue={review?.rating}
                        className="!text-sm"
                    />
                    <Text className="!text-gray-500 !text-xs !ml-2 !flex !items-center">
                        <CalendarOutlined className="!mr-1" />
                        {review?.createdAt}
                    </Text>
                </div>
                <Text className="!text-gray-700 !text-sm !italic">"{review?.content}"</Text>
            </motion.div>
        );
    };

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return <CrownOutlined className="!text-yellow-500 !text-xl" />;
            case 2: return <FontAwesomeIcon icon={faMedal} className="!text-gray-400 !text-xl" />;
            case 3: return <FontAwesomeIcon icon={faMedal} className="!text-amber-700 !text-xl" />;
            default: return <TrophyOutlined className="!text-blue-400 !text-lg" />;
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="!px-4"
        >
            <div className="!mx-auto">
                <motion.div
                    variants={titleVariants}
                    className="!mb-12 !text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="!inline-block !mb-4"
                    >
                        <FireOutlined className="!text-4xl !text-orange-500 !bg-orange-100 !p-3 !rounded-full" />
                    </motion.div>

                    <Title level={2} className="!text-4xl !font-extrabold !text-gray-900 !mb-3">
                        Top Freelancers <span className="!text-transparent !bg-clip-text !bg-gradient-to-r !from-blue-600 !to-blue-600">Xuất Sắc</span>
                    </Title>
                    <Text className="!text-gray-600 !text-lg !max-w-3xl !mx-auto">
                        Các chuyên gia hàng đầu được đánh giá cao bởi chất lượng công việc và sự hài lòng của khách hàng
                    </Text>
                </motion.div>

                {/* Row 1 - 2 cards (2/3 + 1/3) */}
                <div className="!grid !grid-cols-1 lg:!grid-cols-3 !gap-8 !mb-8">
                    {/* Rank 1 - Featured Card (2/3 width) */}
                    {freelancers?.filter(f => f.rank === 1).map((freelancer) => (
                        <motion.div
                            key="rank1"
                            className="lg:!col-span-2"
                            variants={featuredCardVariants}
                            whileHover={{ y: -10, scale: 1.01 }}
                        >
                            <Card
                                className="!h-full !rounded-2xl !overflow-hidden !shadow-xl !border-0 !bg-gradient-to-br !from-blue-50 !to-white"
                            >
                                <div className="!p-8">
                                    <div className="!flex !flex-col md:!flex-row !items-center md:!items-start">
                                        <div className="!relative !mb-6 md:!mb-0 md:!mr-8">
                                            <Badge.Ribbon
                                                text="TOP 1"
                                                color="gold"
                                                className="!-left-2 !top-2 !font-bold !py-1 !px-4"
                                            >
                                                <motion.div
                                                    whileHover={{ rotate: 5, scale: 1.05 }}
                                                    transition={{ type: "spring" }}
                                                >
                                                    <Avatar
                                                        size={120}
                                                        src={freelancer?.avatar}
                                                        icon={<UserOutlined />}
                                                        className="!border-4 !border-solid !border-white !shadow-lg"
                                                    />
                                                </motion.div>
                                            </Badge.Ribbon>
                                        </div>

                                        <div className="!flex-1 !text-center md:!text-left">
                                            <div className="!flex !items-center !justify-center md:!justify-start !mb-2">
                                                <Title level={3} className="!mb-0 !text-2xl !font-bold !text-gray-900">
                                                    {freelancer?.fullName}
                                                </Title>
                                                <motion.div
                                                    className="!ml-3 !bg-gradient-to-r !from-yellow-400 !to-orange-400 !text-white !px-3 !py-1 !rounded-full !text-xs !font-bold"
                                                    animate={{ scale: [1, 1.05, 1] }}
                                                    transition={{ repeat: Infinity, duration: 2 }}
                                                >
                                                    #1
                                                </motion.div>
                                            </div>

                                            <div className="!flex !items-center !justify-center md:!justify-start !mb-4">
                                                <Rate
                                                    allowHalf
                                                    defaultValue={freelancer?.scoreReview}
                                                    disabled
                                                    className="!text-lg"
                                                />
                                                <Text className="!ml-3 !text-blue-600 !text-base !font-medium !flex !items-center">
                                                    <MessageOutlined className="!mr-1" />
                                                    {freelancer?.scoreReview} ({freelancer.totalReviews} đánh giá)
                                                </Text>
                                            </div>

                                            {renderSkills(freelancer.skills)}
                                        </div>
                                    </div>

                                    <div className="!grid !grid-cols-3 !gap-5 !my-4">
                                        <motion.div
                                            className="!flex !flex-col !items-center !p-4 !rounded-xl !bg-white !shadow-md !border !border-blue-100"
                                            whileHover={{ y: -5 }}
                                        >
                                            <div className="!bg-blue-100 !p-3 !rounded-full !mb-3">
                                                <RocketOutlined className="!text-blue-600 !text-2xl" />
                                            </div>
                                            <Text className="!text-gray-700 !text-xl !font-bold">{freelancer?.countJobs}</Text>
                                            <Text className="!text-gray-500 !text-sm">Dự án</Text>
                                        </motion.div>

                                        <motion.div
                                            className="!flex !flex-col !items-center !p-4 !rounded-xl !bg-white !shadow-md !border !border-blue-100"
                                            whileHover={{ y: -5 }}
                                        >
                                            <div className="!bg-blue-100 !p-3 !rounded-full !mb-3">
                                                <ClockCircleOutlined className="!text-blue-600 !text-2xl" />
                                            </div>
                                            <Text className="!text-gray-700 !text-xl !font-bold">{freelancer?.workingHours}+</Text>
                                            <Text className="!text-gray-500 !text-sm">Giờ làm việc</Text>
                                        </motion.div>

                                        <motion.div
                                            className="!flex !flex-col !items-center !p-4 !rounded-xl !bg-white !shadow-md !border !border-blue-100"
                                            whileHover={{ y: -5 }}
                                        >
                                            <div className="!bg-blue-100 !p-3 !rounded-full !mb-3">
                                                <DollarOutlined className="!text-blue-600 !text-2xl" />
                                            </div>
                                            <Text className="!text-gray-700 !text-xl !font-bold">
                                                {freelancer?.income?.toLocaleString("vi-VN", { maximumFractionDigits: 0 })}₫
                                            </Text>
                                            <Text className="!text-gray-500 !text-sm">/ Dự án</Text>
                                        </motion.div>
                                    </div>

                                    {renderReview(freelancer?.latestReview)}

                                    <div className="!flex !gap-4 !mt-8 !w-full">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="!w-full"
                                        >
                                            <Button
                                                type="primary"
                                                size="large"
                                                className="!h-12 !font-bold !rounded-xl !bg-gradient-to-r !from-blue-600 !to-sky-300 !border-0 !px-8 !w-full"
                                                onClick={() => router.push(`/freelancers/${freelancer?.id}`)}
                                            >
                                                Xem hồ sơ
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}

                    {/* Rank 2 Card (1/3 width) */}
                    {freelancers.filter(f => f.rank === 2).slice(0, 1).map((freelancer) => (
                        <motion.div
                            key={`rank2-${freelancer.id}`}
                            variants={cardVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                        >
                            <Card
                                className="!h-full !rounded-2xl !overflow-hidden !shadow-lg !border-0 !bg-white"
                                bodyStyle={{ padding: 0 }}
                            >
                                <div className="!p-6">
                                    <div className="!flex !flex-col !items-center !relative">
                                        <div className="!absolute !-top-3 !right-0 !bg-gray-200 !text-gray-800 !font-bold !py-1 !px-3 !rounded-bl-lg !rounded-tr-lg !flex !items-center">
                                            <FontAwesomeIcon icon={faMedal} className="!mr-1" /> #2
                                        </div>

                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="!mb-5"
                                        >
                                            <Avatar
                                                size={100}
                                                src={freelancer?.avatar}
                                                icon={<UserOutlined />}
                                                className="!border-4 !border-solid !border-gray-200 !shadow-md"
                                            />
                                        </motion.div>

                                        <Title level={4} className="!mb-1 !text-xl !font-bold !text-gray-900">
                                            {freelancer?.fullName}
                                        </Title>
                                        <div className="!flex !items-center !mb-3">
                                            <Rate
                                                allowHalf
                                                defaultValue={freelancer?.scoreReview}
                                                disabled
                                            />
                                            <Text className="!ml-2 !text-gray-600 !text-sm !font-medium">
                                                {freelancer?.scoreReview}
                                            </Text>
                                        </div>

                                        {renderSkills(freelancer?.skills)}
                                    </div>

                                    <div className="!grid !grid-cols-1 !gap-3 !mb-6 !mt-4">
                                        <div className="!flex !justify-between !items-center !p-3 !bg-blue-50 !rounded-lg">
                                            <Text className="!text-gray-600 !text-sm !flex !items-center">
                                                <RocketOutlined className="!mr-2 !text-blue-500" />
                                                Dự án:
                                            </Text>
                                            <Text className="!text-gray-800 !text-sm !font-bold">{freelancer?.countJobs}</Text>
                                        </div>
                                        <div className="!flex !justify-between !items-center !p-3 !bg-blue-50 !rounded-lg">
                                            <Text className="!text-gray-600 !text-sm !flex !items-center">
                                                <ClockCircleOutlined className="!mr-2 !text-blue-500" />
                                                Giờ làm việc:
                                            </Text>
                                            <Text className="!text-gray-800 !text-sm !font-bold">{freelancer?.workingHours}+</Text>
                                        </div>
                                        <div className="!flex !justify-between !items-center !p-3 !bg-blue-50 !rounded-lg">
                                            <Text className="!text-gray-600 !text-sm !flex !items-center">
                                                <DollarOutlined className="!mr-2 !text-blue-500" />
                                                Thu nhập:
                                            </Text>
                                            <Text className="!text-gray-800 !text-sm !font-bold">
                                                {freelancer?.income?.toLocaleString("vi-VN", { maximumFractionDigits: 0 })}₫
                                            </Text>
                                        </div>
                                    </div>

                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <Button
                                            type="primary"
                                            block
                                            className="!h-11 !font-bold !rounded-lg !bg-gradient-to-r !from-blue-500 !to-blue-500 !border-0 !mt-8"
                                            onClick={() => router.push(`/freelancer/${freelancer?.id}`)}
                                        >
                                            Xem hồ sơ
                                        </Button>
                                    </motion.div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Row 2 - 3 cards (1/3 each) */}
                <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 !gap-8 !mt-8">
                    {freelancers.filter(f => f.rank > 2).map((freelancer) => (
                        <motion.div
                            key={`rank${freelancer.rank}-${freelancer.id}`}
                            variants={cardVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <Card
                                className="!h-full !rounded-2xl !overflow-hidden !shadow-md hover:!shadow-lg !border-0 !bg-white !transition-all"
                                bodyStyle={{ padding: 0 }}
                            >
                                <div className="!p-6">
                                    <div className="!flex !flex-col !items-center !relative">
                                        <div className="!absolute !-top-3 !right-0 !bg-blue-100 !text-blue-800 !font-bold !py-1 !px-3 !rounded-bl-lg !rounded-tr-lg !flex !items-center">
                                            {getRankIcon(freelancer.rank)}
                                            <span className="!ml-1">#{freelancer.rank}</span>
                                        </div>

                                        <Avatar
                                            size={90}
                                            src={freelancer?.avatar}
                                            icon={<UserOutlined />}
                                            className="!mb-4 !border-3 !border-solid !border-blue-100 !shadow-sm"
                                        />

                                        <Title level={4} className="!mb-1 !text-lg !font-bold !text-gray-900">
                                            {freelancer?.fullName}
                                        </Title>
                                        <div className="!flex !items-center !mb-3">
                                            <Rate
                                                allowHalf
                                                value={freelancer?.scoreReview}
                                                disabled
                                                className="!text-sm"
                                            />
                                            <Text className="!ml-2 !text-gray-600 !text-xs !font-medium">
                                                {freelancer?.scoreReview}
                                            </Text>
                                        </div>

                                        {renderSkills(freelancer?.skills)}
                                    </div>

                                    <div className="!grid !grid-cols-3 !gap-2 !mb-6 !mt-4">
                                        <div className="!flex !flex-col !items-center !p-2">
                                            <div className="!bg-blue-50 !p-2 !rounded-lg !mb-1">
                                                <RocketOutlined className="!text-blue-500" />
                                            </div>
                                            <Text className="!text-gray-800 !text-xs !font-bold">{freelancer?.countJobs}</Text>
                                            <Text className="!text-gray-500 !text-[11px]">Dự án</Text>
                                        </div>

                                        <div className="!flex !flex-col !items-center !p-2">
                                            <div className="!bg-blue-50 !p-2 !rounded-lg !mb-1">
                                                <ClockCircleOutlined className="!text-blue-500" />
                                            </div>
                                            <Text className="!text-gray-800 !text-xs !font-bold">{freelancer?.workingHours}+</Text>
                                            <Text className="!text-gray-500 !text-[11px]">Giờ làm</Text>
                                        </div>

                                        <div className="!flex !flex-col !items-center !p-2">
                                            <div className="!bg-blue-50 !p-2 !rounded-lg !mb-1">
                                                <DollarOutlined className="!text-blue-500" />
                                            </div>
                                            <Text className="!text-gray-800 !text-xs !font-bold">
                                                {freelancer?.income?.toLocaleString("vi-VN", { maximumFractionDigits: 0 })}₫
                                            </Text>
                                            <Text className="!text-gray-500 !text-[11px]">/ Dự án</Text>
                                        </div>
                                    </div>

                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <Button
                                            type="primary"
                                            ghost
                                            block
                                            className="!h-10 !font-medium !rounded-lg !border-blue-600 !text-blue-600 hover:!bg-blue-50"
                                            onClick={() => router.push(`/freelancer/${freelancer?.id}`)}
                                        >
                                            Xem hồ sơ
                                        </Button>
                                    </motion.div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default TopFreelancers;