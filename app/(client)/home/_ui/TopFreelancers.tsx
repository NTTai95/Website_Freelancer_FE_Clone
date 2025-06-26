"use client";

import { Tag, Button, Rate, Avatar, Typography, Tooltip, Badge } from 'antd';
import { UserOutlined, RocketOutlined, ClockCircleOutlined, DollarOutlined, StarFilled, MessageOutlined } from '@ant-design/icons';
import CardShadow from '@/components/ui/card-shadow';
import { Easing, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const easeBezier: Easing = [0.16, 1, 0.3, 1];

const MotionButton = motion(Button);

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
            ease: easeBezier
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

    interface Freelancer {
        name: string;
        skills: string[];
        rating: number;
        projects: number;
        hours: number;
        income: string;
        image: string;
        rank: number;
        latestReview?: {
            rating: number;
            comment: string;
            date: string;
        };
    }

    const freelancers: Freelancer[] = [
        {
            name: "Nguyễn Văn A",
            skills: ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL", "MongoDB", "AWS"],
            rating: 4.9,
            projects: 32,
            hours: 800,
            income: "15.000.000đ/dự án",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            rank: 1,
            latestReview: {
                rating: 5,
                comment: "Làm việc rất chuyên nghiệp, sản phẩm vượt mong đợi!",
                date: "2 ngày trước"
            }
        },
        ...Array(4).fill({
            name: "Nguyễn Văn B",
            skills: ["Python", "Django", "Flask", "PostgreSQL", "Docker"],
            rating: 4.7,
            projects: 24,
            hours: 500,
            income: "10.000.000đ/dự án",
            image: "https://randomuser.me/api/portraits/men/45.jpg",
            rank: 2,
            latestReview: {
                rating: 4,
                comment: "Giao sản phẩm đúng hạn, chất lượng tốt",
                date: "1 tuần trước"
            }
        })
    ];

    const renderSkills = (skills: string[]) => {
        const maxVisible = 4;
        const visibleSkills = skills.slice(0, maxVisible);
        const hiddenSkills = skills.slice(maxVisible);

        return (
            <div className="flex flex-wrap gap-2 justify-center !mb-4">
                {visibleSkills.map((skill, idx) => (
                    <Tag
                        key={idx}
                        className="!text-xs !py-1 !px-2 !m-0 !rounded-full !border-0 !bg-gray-100 !text-gray-800"
                    >
                        {skill}
                    </Tag>
                ))}

                {hiddenSkills.length > 0 && (
                    <Tooltip title={hiddenSkills.join(', ')}>
                        <Tag className="!text-xs !py-1 !px-2 !m-0 !rounded-full !bg-gray-200 !border-0 !text-gray-600">
                            +{hiddenSkills.length}
                        </Tag>
                    </Tooltip>
                )}
            </div>
        );
    };

    const renderReview = (review?: { rating: number; comment: string; date: string }) => {
        if (!review) return null;

        return (
            <div className="!mt-4 !p-3 !bg-gray-50 !rounded-lg">
                <div className="!flex !items-center !mb-2">
                    <Rate
                        disabled
                        defaultValue={review.rating}
                        className="!text-xs !text-yellow-400"
                    />
                    <Text className="!text-gray-500 !text-xs !ml-2">{review.date}</Text>
                </div>
                <Text className="!text-gray-700 !text-sm !italic">"{review.comment}"</Text>
            </div>
        );
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <motion.div
                variants={titleVariants}
                className="!mb-8 !text-center"
            >
                <Title level={2} className="!text-3xl !font-bold !text-gray-900 !mb-2">
                    Top Freelancers <span className="!text-blue-600">Xếp Hạng</span>
                </Title>
                <Text className="!text-gray-500 !text-lg">
                    Các chuyên gia hàng đầu được xếp hạng theo chất lượng
                </Text>
            </motion.div>

            {/* Row 1 - 2 cards (2/3 + 1/3) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 !mb-6">
                {/* Rank 1 - Featured Card (2/3 width) */}
                {freelancers.filter(f => f.rank === 1).map((freelancer) => (
                    <motion.div
                        key="rank1"
                        className="lg:col-span-2"
                        variants={featuredCardVariants}
                        whileHover={{ y: -5 }}
                    >
                        <CardShadow
                            className="h-full !border-0 !rounded-xl !overflow-hidden !shadow-lg hover:!shadow-xl !transition-all !duration-300 bg-gradient-to-br from-blue-50 to-white"
                            bodyPadding={0}
                        >
                            <div className="!p-6">
                                <div className="!flex !flex-col md:!flex-row !items-center md:!items-start">
                                    <div className="!relative !mb-4 md:!mb-0 md:!mr-6">
                                        <Badge.Ribbon
                                            text="TOP 1"
                                            color="gold"
                                            className="!-left-2 !top-2"
                                        >
                                            <Avatar
                                                size={100}
                                                src={freelancer.image}
                                                icon={<UserOutlined />}
                                                className="!border-4 !border-solid !border-white !shadow-md"
                                            />
                                        </Badge.Ribbon>
                                    </div>

                                    <div className="!flex-1 !text-center md:!text-left">
                                        <Title level={3} className="!mb-1 !text-xl !font-bold !text-gray-900">
                                            {freelancer.name}
                                        </Title>
                                        <div className="!flex !items-center !justify-center md:!justify-start !mb-3">
                                            <Rate
                                                allowHalf
                                                defaultValue={freelancer.rating}
                                                disabled
                                                className="!text-sm !text-yellow-500"
                                            />
                                            <Text className="!ml-2 !text-blue-600 !text-sm !font-medium">
                                                {freelancer.rating} ({freelancer.projects} reviews)
                                            </Text>
                                        </div>

                                        {renderSkills(freelancer.skills)}
                                    </div>
                                </div>

                                <div className="!grid !grid-cols-3 !gap-4 !mb-6">
                                    <div className="!flex !flex-col !items-center !p-3 !rounded-lg !bg-white !shadow-sm">
                                        <RocketOutlined className="!text-blue-500 !text-lg !mb-1" />
                                        <Text className="!text-gray-700 !text-sm !font-medium">{freelancer.projects}</Text>
                                        <Text className="!text-gray-500 !text-xs">Dự án</Text>
                                    </div>

                                    <div className="!flex !flex-col !items-center !p-3 !rounded-lg !bg-white !shadow-sm">
                                        <ClockCircleOutlined className="!text-blue-500 !text-lg !mb-1" />
                                        <Text className="!text-gray-700 !text-sm !font-medium">{freelancer.hours}+</Text>
                                        <Text className="!text-gray-500 !text-xs">Giờ làm việc</Text>
                                    </div>

                                    <div className="!flex !flex-col !items-center !p-3 !rounded-lg !bg-white !shadow-sm">
                                        <DollarOutlined className="!text-blue-500 !text-lg !mb-1" />
                                        <Text className="!text-gray-700 !text-sm !font-medium">{freelancer.income}</Text>
                                        <Text className="!text-gray-500 !text-xs">Thu nhập</Text>
                                    </div>
                                </div>

                                {renderReview(freelancer.latestReview)}

                                <div className="!flex !gap-3 !mb-6">
                                    <Button
                                        type="primary"
                                        block
                                        className="!h-10 !font-medium !rounded-lg !bg-blue-600"
                                    >
                                        Xem hồ sơ
                                    </Button>
                                </div>
                            </div>
                        </CardShadow>
                    </motion.div>
                ))}

                {/* Rank 2 Card (1/3 width) */}
                {freelancers.filter(f => f.rank === 2).slice(0, 1).map((freelancer, index) => (
                    <motion.div
                        key={`rank2-${index}`}
                        className="!important"
                        variants={cardVariants}
                        whileHover={{ y: -5 }}
                    >
                        <CardShadow
                            className="h-full !border !border-solid !border-gray-200 !rounded-xl !overflow-hidden !shadow-sm hover:!shadow-md !transition-all !duration-300 bg-white"
                            bodyPadding={0}
                        >
                            <div className="!p-6">
                                <div className="!flex !flex-col !items-center">
                                    <div className="!relative !mb-4">
                                        <Badge
                                            count="TOP 2"
                                            color="silver"
                                            className="!-right-4 !-top-2"
                                        >
                                            <Avatar
                                                size={80}
                                                src={freelancer.image}
                                                icon={<UserOutlined />}
                                                className="!border-2 !border-solid !border-gray-200 !shadow-sm"
                                            />
                                        </Badge>
                                    </div>

                                    <Title level={4} className="!mb-1 !text-lg !font-semibold !text-gray-900">
                                        {freelancer.name}
                                    </Title>
                                    <div className="!flex !items-center !mb-3">
                                        <Rate
                                            allowHalf
                                            defaultValue={freelancer.rating}
                                            disabled
                                            className="!text-xs !text-yellow-400"
                                        />
                                        <Text className="!ml-2 !text-gray-600 !text-xs !font-medium">
                                            {freelancer.rating}
                                        </Text>
                                    </div>

                                    {renderSkills(freelancer.skills)}
                                </div>

                                <div className="!grid !grid-cols-1 !gap-3 !mb-4">
                                    <div className="!flex !justify-between !items-center !p-2">
                                        <Text className="!text-gray-500 !text-xs">Dự án:</Text>
                                        <Text className="!text-gray-700 !text-sm !font-medium">{freelancer.projects}</Text>
                                    </div>
                                    <div className="!flex !justify-between !items-center !p-2">
                                        <Text className="!text-gray-500 !text-xs">Giờ làm việc:</Text>
                                        <Text className="!text-gray-700 !text-sm !font-medium">{freelancer.hours}+</Text>
                                    </div>
                                    <div className="!flex !justify-between !items-center !p-2">
                                        <Text className="!text-gray-500 !text-xs">Thu nhập:</Text>
                                        <Text className="!text-gray-700 !text-sm !font-medium">{freelancer.income}</Text>
                                    </div>
                                </div>

                                <Button
                                    type="primary"
                                    block
                                    className="!h-10 !font-medium !rounded-lg !bg-blue-600"
                                >
                                    Xem hồ sơ
                                </Button>
                            </div>
                        </CardShadow>
                    </motion.div>
                ))}
            </div>

            {/* Row 2 - 3 cards (1/3 each) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 !mt-12">
                {freelancers.filter(f => f.rank === 2).slice(1).map((freelancer, index) => (
                    <motion.div
                        key={`rank2-${index}`}
                        className="!important"
                        variants={cardVariants}
                        custom={index}
                        whileHover={{ y: -5 }}
                    >
                        <CardShadow
                            className="h-full !border !border-solid !border-gray-200 !rounded-xl !overflow-hidden !shadow-sm hover:!shadow-md !transition-all !duration-300 bg-white"
                            bodyPadding={0}
                        >
                            <div className="!p-6">
                                <div className="!flex !flex-col !items-center">
                                    <Avatar
                                        size={80}
                                        src={freelancer.image}
                                        icon={<UserOutlined />}
                                        className="!mb-4 !border-2 !border-solid !border-gray-200 !shadow-sm"
                                    />

                                    <Title level={4} className="!mb-1 !text-lg !font-semibold !text-gray-900">
                                        {freelancer.name}
                                    </Title>
                                    <div className="!flex !items-center !mb-3">
                                        <Rate
                                            allowHalf
                                            defaultValue={freelancer.rating}
                                            disabled
                                            className="!text-xs !text-yellow-400"
                                        />
                                        <Text className="!ml-2 !text-gray-600 !text-xs !font-medium">
                                            {freelancer.rating}
                                        </Text>
                                    </div>

                                    {renderSkills(freelancer.skills)}
                                </div>

                                <div className="!grid !grid-cols-1 !gap-3 !mb-4">
                                    <div className="!flex !justify-between !items-center !p-2">
                                        <Text className="!text-gray-500 !text-xs">Dự án:</Text>
                                        <Text className="!text-gray-700 !text-sm !font-medium">{freelancer.projects}</Text>
                                    </div>
                                    <div className="!flex !justify-between !items-center !p-2">
                                        <Text className="!text-gray-500 !text-xs">Giờ làm việc:</Text>
                                        <Text className="!text-gray-700 !text-sm !font-medium">{freelancer.hours}+</Text>
                                    </div>
                                    <div className="!flex !justify-between !items-center !p-2">
                                        <Text className="!text-gray-500 !text-xs">Thu nhập:</Text>
                                        <Text className="!text-gray-700 !text-sm !font-medium">{freelancer.income}</Text>
                                    </div>
                                </div>

                                <Button
                                    type="primary"
                                    block
                                    className="!h-10 !font-medium !rounded-lg !bg-blue-600"
                                >
                                    Xem hồ sơ
                                </Button>
                            </div>
                        </CardShadow>
                    </motion.div>
                ))}
            </div>

            <motion.div
                variants={buttonVariants}
                className="!mt-12 !text-center"
            >
                <MotionButton
                    type="primary"
                    ghost
                    className="!px-8 !h-10 !rounded-lg !border-blue-600 !text-blue-600 !font-medium hover:!bg-blue-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Xem thêm freelancers
                </MotionButton>
            </motion.div>
        </motion.div>
    );
};

export default TopFreelancers;