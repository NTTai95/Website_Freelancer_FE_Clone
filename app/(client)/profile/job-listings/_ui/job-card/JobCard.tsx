import { Card, Typography, Badge } from 'antd';
import { ClockCircleOutlined, DollarOutlined, CalendarOutlined, TeamOutlined, FlagOutlined } from '@ant-design/icons';
import { motion, AnimatePresence, easeOut, easeInOut } from 'framer-motion';
import { JobListing } from '../types';
import { formatCurrency } from '../format';
import { Status } from '@/types/status';
import MilestoneProgressBar from './MilestoneProgressBar';
import StatCard from './StatCard';
import { getHighlightedText } from '@/utils/converter';
import { JobActionsDropdownWithProvider } from '../job-action/JobActionsDropdownWithProvider';
import { AuthGuard } from '@/components/AuthGuard';
import ApplyDetail from './ApplyDetail';
import DetailJob from './DetailJob';
import InfoEmployer from './InfoEmployer';

interface JobCardProps {
    job: JobListing;
    onRefresh: () => void;
    keyword: string;
}

const JobCard = ({ job, onRefresh, keyword }: JobCardProps) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: easeOut
            }
        }
    };

    const statCardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: easeOut
            }
        },
        hover: {
            scale: 1.03,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            transition: {
                duration: 0.2,
                ease: easeInOut
            }
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="!mb-8"
                layout
            >
                <Card
                    className="!border-0 !rounded-2xl !shadow-xl !overflow-hidden !bg-gradient-to-br !from-white !to-blue-50 !bg-opacity-80 hover:!to-blue-100 !transition-all !backdrop-blur-sm"
                >
                    <Badge.Ribbon
                        text={Status.Meta[job.status.toUpperCase()].label}
                        color={Status.Meta[job.status.toUpperCase()].color}
                        className="!capitalize !font-bold !px-4 !py-1 !text-sm"
                    >
                        <div className="!flex !justify-between !items-start !mb-4 !pt-3 !px-1">
                            <div className="!w-full">
                                <div className="!flex !items-center !justify-between !mb-3">
                                    <motion.h3
                                        className="!text-2xl !font-bold !text-transparent !bg-clip-text !bg-gradient-to-r !from-blue-600 !to-indigo-800"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {getHighlightedText(job.title, keyword, "!bg-blue-500 !text-white !px-1 !rounded-sm") || "Chưa có tiêu đề"}
                                    </motion.h3>

                                    {(job?.status.toUpperCase() != 'COMPLETED' && job?.status.toUpperCase() != 'CANCELED') &&
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="!translate-y-14"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <JobActionsDropdownWithProvider job={job} onRefresh={onRefresh} />
                                        </motion.div>
                                    }
                                </div>

                                <div className="!flex !flex-wrap !gap-3 !mt-4">
                                    <AuthGuard roles={['ROLE_NHA_TUYEN_DUNG']} fallback={<InfoEmployer job={job} />}>
                                        <motion.div
                                            className="!flex !items-center !bg-white !px-3 !py-2 !rounded-lg !border !border-gray-200 !shadow-sm"
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1, duration: 0.3 }}
                                        >
                                            <div className="!flex !items-center !mr-2">
                                                <div className="!w-2 !h-2 !rounded-full !bg-blue-500 !mr-2"></div>
                                                <CalendarOutlined className="!text-blue-500" />
                                            </div>
                                            <div className="!flex !flex-col">
                                                <span className="!text-xs !font-medium !text-gray-500">Tạo</span>
                                                <span className="!text-sm !font-semibold !text-gray-800">
                                                    {job.createdAt || "Chưa có"}
                                                </span>
                                            </div>
                                        </motion.div>
                                    </AuthGuard>

                                    {job?.postedAt && (
                                        <motion.div
                                            className="!flex !items-center !bg-white !px-3 !py-2 !rounded-lg !border !border-gray-200 !shadow-sm"
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.15, duration: 0.3 }}
                                        >
                                            <div className="!flex !items-center !mr-2">
                                                <div className="!w-2 !h-2 !rounded-full !bg-green-500 !mr-2"></div>
                                                <CalendarOutlined className="!text-green-500" />
                                            </div>
                                            <div className="!flex !flex-col">
                                                <span className="!text-xs !font-medium !text-gray-500">Đăng</span>
                                                <span className="!text-sm !font-semibold !text-gray-800">
                                                    {job.postedAt}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {job?.closedAt && (
                                        <motion.div
                                            className="!flex !items-center !bg-white !px-3 !py-2 !rounded-lg !border !border-gray-200 !shadow-sm"
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2, duration: 0.3 }}
                                        >
                                            <div className="!flex !items-center !mr-2">
                                                <div className="!w-2 !h-2 !rounded-full !bg-red-500 !mr-2"></div>
                                                <CalendarOutlined className="!text-red-500" />
                                            </div>
                                            <div className="!flex !flex-col">
                                                <span className="!text-xs !font-medium !text-gray-500">Đóng</span>
                                                <span className="!text-sm !font-semibold !text-gray-800">
                                                    {job.closedAt}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Badge.Ribbon>

                    <DetailJob job={job} keyword={keyword} />

                    <AuthGuard roles={["ROLE_FREELANCER"]}>
                        <ApplyDetail job={job} />
                    </AuthGuard>

                    <motion.div
                        className="!grid !grid-cols-4 !gap-4 !mt-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.08
                                }
                            }
                        }}
                    >
                        {/* Combined Financial Card */}
                        <StatCard
                            icon={<DollarOutlined className="!text-blue-500" />}
                            title="Tài chính"
                            value={
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 text-sm">Ngân sách:</span>
                                        <span className="font-semibold text-blue-700">
                                            {formatCurrency(job.budget)}
                                        </span>
                                    </div>
                                    <AuthGuard roles={["ROLE_NHA_TUYEN_DUNG"]}>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 text-sm">Giá chốt:</span>
                                            <span className="font-semibold text-cyan-700">
                                                {job.bidAmount ? formatCurrency(job.bidAmount) : 'Chưa có'}
                                            </span>
                                        </div>
                                    </AuthGuard>
                                </div>
                            }
                            color="blue"
                            variants={statCardVariants}
                        />

                        {/* Combined Time Card */}
                        <StatCard
                            icon={<ClockCircleOutlined className="!text-indigo-500" />}
                            title="Thời gian"
                            value={
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 text-sm">Dự kiến:</span>
                                        <span className="font-semibold text-indigo-700">
                                            {job.durationHours} giờ
                                        </span>
                                    </div>
                                    <AuthGuard roles={["ROLE_NHA_TUYEN_DUNG"]}>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 text-sm">Thực tế:</span>
                                            <span className="font-semibold text-violet-700">
                                                {job.estimatedHours ? `${job.estimatedHours} giờ` : 'Chưa có'}
                                            </span>
                                        </div>
                                    </AuthGuard>
                                </div>
                            }
                            color="indigo"
                            variants={statCardVariants}
                        />

                        <StatCard
                            icon={<TeamOutlined className="!text-green-500" />}
                            title="Số ứng viên"
                            value={`${job.countApplicants} freelancer`}
                            color="green"
                            variants={statCardVariants}
                        />

                        <StatCard
                            icon={<FlagOutlined className="!text-amber-500" />}
                            title="Giai đoạn"
                            value={
                                <MilestoneProgressBar
                                    total={job.countMilestones}
                                    statusCounts={job.milestoneStatusCounts}
                                />
                            }
                            color="amber"
                            variants={statCardVariants}
                        />
                    </motion.div>
                </Card>
            </motion.div>
        </AnimatePresence >
    );
};

export default JobCard;