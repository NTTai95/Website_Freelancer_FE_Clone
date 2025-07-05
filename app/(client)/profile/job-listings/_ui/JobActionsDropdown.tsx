import { Dropdown, MenuProps, Modal, message } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { JobListing } from './job';
import { useRouter } from 'next/navigation';
import { apiPost } from '@/api/baseApi';
import { motion } from 'framer-motion';
import { useState } from 'react';

const { confirm } = Modal;

interface JobActionsDropdownProps {
    job: JobListing;
    onRefresh: () => void;
}

export const JobActionsDropdown = ({ job, onRefresh }: JobActionsDropdownProps) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handlePublishJob = async (jobId: string) => {
        try {
            await apiPost(`/jobs/${jobId}/publish`);
            message.success('Công việc đã được đăng thành công');
            onRefresh();
        } catch (error: any) {
            if (error.response?.data?.message) {
                message.error(`Không thể đăng bài: ${error.response.data.message}`);
            } else {
                message.error('Có lỗi xảy ra khi đăng bài');
            }
        }
    };

    const getActionItems = (job: JobListing): MenuProps['items'] => {
        const status = job.status.toUpperCase();
        const baseItemStyle = '!flex !items-center !gap-2 !px-4 !py-3 !transition-all !duration-300 hover:!bg-blue-50 hover:!text-blue-600';
        const dangerItemStyle = `${baseItemStyle} !text-red-500 hover:!text-red-600`;

        if (status === 'DRAFT') {
            return [
                {
                    key: 'edit',
                    label: (
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className={baseItemStyle}
                        >
                            <span>Chỉnh sửa</span>
                        </motion.div>
                    ),
                    onClick: () => router.push(`/employer/jobs/${job.id}/edit`)
                },
                {
                    key: 'publish',
                    label: (
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className={baseItemStyle}
                        >
                            <span>Đăng bài</span>
                        </motion.div>
                    ),
                    onClick: () => {
                        confirm({
                            title: <span className="!text-blue-600">Xác nhận đăng bài</span>,
                            content: 'Bạn có chắc chắn muốn đăng bài công việc này?',
                            onOk: () => handlePublishJob(job.id),
                            okText: 'Đăng bài',
                            cancelText: 'Hủy',
                            okButtonProps: {
                                className: '!bg-blue-600 !hover:bg-blue-700 !text-white !border-0'
                            },
                            cancelButtonProps: {
                                className: '!border-gray-300 !text-gray-700 hover:!bg-gray-100'
                            },
                            centered: true
                        });
                    }
                },
                {
                    key: 'delete',
                    label: (
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className={dangerItemStyle}
                        >
                            <span>Xóa</span>
                        </motion.div>
                    ),
                    onClick: () => {
                        confirm({
                            title: <span className="!text-red-500">Xác nhận xóa</span>,
                            content: 'Bạn có chắc chắn muốn xóa công việc này?',
                            onOk: () => console.log('Delete job', job.id),
                            okText: 'Xóa',
                            cancelText: 'Hủy',
                            okButtonProps: {
                                className: '!bg-red-500 !hover:bg-red-600 !text-white !border-0'
                            },
                            cancelButtonProps: {
                                className: '!border-gray-300 !text-gray-700 hover:!bg-gray-100'
                            },
                            centered: true
                        });
                    }
                }
            ];
        }

        if (status === 'PUBLIC' || status === 'PRIVATE') {
            return [
                {
                    key: 'applicants',
                    label: (
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className={baseItemStyle}
                        >
                            <span>Xem ứng viên</span>
                        </motion.div>
                    ),
                    onClick: () => router.push(`/employer/jobs/${job.id}/applicants`)
                },
                {
                    key: 'milestones',
                    label: (
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className={baseItemStyle}
                        >
                            <span>Tạo milestone</span>
                        </motion.div>
                    ),
                    onClick: () => router.push(`/employer/jobs/${job.id}/milestones/create`)
                },
                {
                    key: 'view_milestones',
                    label: (
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className={baseItemStyle}
                        >
                            <span>Xem milestones</span>
                        </motion.div>
                    ),
                    onClick: () => router.push(`/employer/jobs/${job.id}/milestones`)
                }
            ];
        }

        if (status === 'IN_PROGRESS') {
            return [
                {
                    key: 'milestones',
                    label: (
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className={baseItemStyle}
                        >
                            <span>Tạo milestone</span>
                        </motion.div>
                    ),
                    onClick: () => router.push(`/employer/jobs/${job.id}/milestones/create`)
                },
                {
                    key: 'view_milestones',
                    label: (
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className={baseItemStyle}
                        >
                            <span>Xem milestones</span>
                        </motion.div>
                    ),
                    onClick: () => router.push(`/employer/jobs/${job.id}/milestones`)
                }
            ];
        }

        return [];
    };

    return (
        <Dropdown
            menu={{ items: getActionItems(job) }}
            placement="bottomRight"
            trigger={['click']}
            open={isOpen}
            onOpenChange={setIsOpen}
            overlayClassName="!rounded-xl !overflow-hidden !py-2 !shadow-lg !border !border-gray-100"
        >
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="!w-9 !h-9 !flex !items-center !justify-center !rounded-full !bg-blue-50 hover:!bg-blue-100 !transition-all !duration-300 !outline-none !border-0"
            >
                <EllipsisOutlined className="!text-blue-600 !text-lg hover:!cursor-pointer" />
            </motion.button>
        </Dropdown>
    );
};