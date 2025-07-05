import { Card, Tag, Typography, Space, Badge } from 'antd';
import { FileOutlined, ClockCircleOutlined, DollarOutlined, CalendarOutlined } from '@ant-design/icons';
import { easeInOut, easeOut, motion } from 'framer-motion';
import { JobListing } from './job';
import { JobActionsDropdown } from './JobActionsDropdown';
import { formatCurrency } from './format';
import { Status } from '@/types/status';

const { Paragraph, Link, Text } = Typography;

interface JobCardProps {
    job: JobListing;
    onRefresh: () => void;
}

export const JobCard = ({ job, onRefresh }: JobCardProps) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: easeOut
            }
        },
        hover: {
            y: -8,
            boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.4)',
            transition: {
                duration: 0.4,
                ease: easeInOut
            }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="!mb-6"
        >
            <Card
                className="!border-0 !rounded-2xl !shadow-lg !overflow-hidden !bg-gradient-to-br !from-white !to-blue-50 !bg-opacity-50 hover:!to-blue-100 !transition-all"
            >
                {/* Header with status ribbon */}
                <Badge.Ribbon
                    text={job.status}
                    color={Status.Meta[job.status.toUpperCase()].color}
                    className="!capitalize !font-bold !px-3 !py-1"
                >
                    <div className="!flex !justify-between !items-start !mb-4 !pt-2">
                        <div>
                            <div className="!flex !items-center !gap-3 !mb-2">
                                <motion.div whileHover={{ scale: 1.02 }}>
                                    <h3 className="!text-2xl !font-extrabold !text-transparent !bg-clip-text !bg-gradient-to-r !from-blue-600 !to-blue-800">
                                        {job?.title || "Chưa có"}
                                    </h3>
                                </motion.div>
                            </div>

                            <Space className="!flex !flex-wrap !gap-4 !text-sm !text-gray-600 !mt-3">
                                {job?.postedAt && (
                                    <div className="!flex !items-center !bg-blue-100 !px-3 !py-1 !rounded-full">
                                        <CalendarOutlined className="!mr-2 !text-blue-600" />
                                        <Text className="!text-blue-800 !font-medium">
                                            Đăng ngày: {job?.postedAt || "Chưa có"}
                                        </Text>
                                    </div>
                                )}
                                <div className="!flex !items-center !bg-blue-100 !px-3 !py-1 !rounded-full">
                                    <CalendarOutlined className="!mr-2 !text-blue-600" />
                                    <Text className="!text-blue-800 !font-medium">
                                        Tạo ngày: {job.createdAt || "Chưa có"}
                                    </Text>
                                </div>
                                {job?.closedAt && (
                                    <div className="!flex !items-center !bg-blue-100 !px-3 !py-1 !rounded-full">
                                        <CalendarOutlined className="!mr-2 !text-blue-600" />
                                        <Text className="!text-blue-800 !font-medium">
                                            Đóng ngày: {job?.closedAt || "Chưa có"}
                                        </Text>
                                    </div>
                                )}
                            </Space>
                        </div>
                        {(job?.status.toUpperCase() != 'COMPLETED' && job?.status.toUpperCase() != 'CANCELED') &&
                            <motion.div whileHover={{ scale: 1.1 }} className={"!mt-10"}>
                                <JobActionsDropdown job={job} onRefresh={onRefresh} />
                            </motion.div>}
                    </div>
                </Badge.Ribbon>

                {/* Description */}
                <motion.div
                    className="!mb-6 !p-4 !bg-white !rounded-xl !shadow-sm !border !border-blue-100"
                    whileHover={{ backgroundColor: '#f0f9ff' }}
                    transition={{ duration: 0.3 }}
                >
                    <Paragraph className="!text-gray-700 !whitespace-pre-line !text-justify">
                        {job?.description || "Chưa có"}
                    </Paragraph>
                </motion.div>

                {/* Stats grid */}
                <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-4 !gap-4 !mb-6">
                    <motion.div
                        className="!flex !flex-col !p-4 !bg-gradient-to-br !from-blue-50 !to-blue-100 !rounded-2xl !border !border-blue-200 !shadow-sm"
                        whileHover={{
                            scale: 1.03,
                            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)'
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="!text-blue-700 !flex !items-center !mb-2">
                            <DollarOutlined className="!mr-2 !text-lg" />
                            <span className="!font-medium">Ngân sách</span>
                        </div>
                        <span className="!font-bold !text-2xl !text-blue-800">
                            {formatCurrency(job.budget)}
                        </span>
                    </motion.div>

                    <motion.div
                        className="!flex !flex-col !p-4 !bg-gradient-to-br !from-cyan-50 !to-cyan-100 !rounded-2xl !border !border-cyan-200 !shadow-sm"
                        whileHover={{
                            scale: 1.03,
                            boxShadow: '0 10px 25px -5px rgba(6, 182, 212, 0.3)'
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="!text-cyan-700 !flex !items-center !mb-2">
                            <DollarOutlined className="!mr-2 !text-lg" />
                            <span className="!font-medium">Giá chốt</span>
                        </div>
                        <span className="!font-bold !text-2xl !text-cyan-800">
                            {job.bidAmount ? formatCurrency(job.bidAmount) : 'Chưa có'}
                        </span>
                    </motion.div>

                    <motion.div
                        className="!flex !flex-col !p-4 !bg-gradient-to-br !from-indigo-50 !to-indigo-100 !rounded-2xl !border !border-indigo-200 !shadow-sm"
                        whileHover={{
                            scale: 1.03,
                            boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.3)'
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="!text-indigo-700 !flex !items-center !mb-2">
                            <ClockCircleOutlined className="!mr-2 !text-lg" />
                            <span className="!font-medium">Thời gian dự kiến</span>
                        </div>
                        <span className="!font-bold !text-2xl !text-indigo-800">
                            {job.durationHours} giờ
                        </span>
                    </motion.div>

                    <motion.div
                        className="!flex !flex-col !p-4 !bg-gradient-to-br !from-violet-50 !to-violet-100 !rounded-2xl !border !border-violet-200 !shadow-sm"
                        whileHover={{
                            scale: 1.03,
                            boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.3)'
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="!text-violet-700 !flex !items-center !mb-2">
                            <ClockCircleOutlined className="!mr-2 !text-lg" />
                            <span className="!font-medium">Thời gian thực tế</span>
                        </div>
                        <span className="!font-bold !text-2xl !text-violet-800">
                            {job.estimatedHours ? `${job.estimatedHours} giờ` : 'Chưa có'}
                        </span>
                    </motion.div>
                </div>

                {/* Document */}
                {job.document && (
                    <motion.div
                        className="!flex !items-center !mb-2 !p-3 !bg-white !rounded-xl !border !border-blue-200 !shadow-sm !w-fit"
                        whileHover={{
                            x: 5,
                            backgroundColor: '#dbeafe'
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <FileOutlined className="!text-blue-600 !text-xl !mr-3" />
                        <Link
                            href={job.document}
                            target="_blank"
                            className="!text-blue-600 hover:!text-blue-800 !font-medium !text-base"
                        >
                            Tài liệu đính kèm
                        </Link>
                    </motion.div>
                )}
            </Card>
        </motion.div >
    );
};