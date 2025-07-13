import React from 'react';
import { MenuProps } from 'antd';
import { motion } from 'framer-motion';
import { JobListing } from '../types';
import { useRouter } from 'next/navigation';
import { useModal } from './ModalProvider';
import { useJobActions } from './useJobActions';

interface ActionItemsProps {
    job: JobListing;
    role: string;
    onRefresh: () => void;
}

export const getActionItems = (
    job: JobListing,
    role: string,
    onRefresh: () => void
): MenuProps['items'] => {
    const router = useRouter();
    const { showConfirmModal } = useModal();
    const { handlePublishJob, handleDeleteJob, handleRevokeJob, handleRevokeApplication } = useJobActions();

    const getActionItems = (): MenuProps['items'] => {
        const status = job.status.toUpperCase();
        const baseItemStyle = '!flex !items-center !gap-2 !px-4 !transition-all !duration-300 hover:!bg-blue-50 hover:!text-blue-600 rounded-lg';
        const dangerItemStyle = `${baseItemStyle} !text-red-500 hover:!text-red-600`;

        if (role === 'ROLE_NHA_TUYEN_DUNG') {
            switch (status) {
                case 'DRAFT':
                    return [
                        {
                            key: 'edit',
                            label: (
                                <motion.div whileHover={{ scale: 1.03 }} className={baseItemStyle}>
                                    <span>Chỉnh sửa</span>
                                </motion.div>
                            ),
                            onClick: () => router.push(`/update-jobs/${job.id}`),
                        },
                        {
                            key: 'publish',
                            label: (
                                <motion.div whileHover={{ scale: 1.03 }} className={baseItemStyle}>
                                    <span>Đăng tải</span>
                                </motion.div>
                            ),
                            onClick: () => {
                                showConfirmModal({
                                    title: <span className="!text-blue-600">Xác nhận đăng bài</span>,
                                    content: 'Bạn có chắc chắn muốn đăng bài công việc này?',
                                    onOk: () => handlePublishJob(job.id, onRefresh),
                                    okText: 'Đăng bài',
                                    cancelText: 'Hủy',
                                });
                            },
                        },
                        {
                            key: 'delete',
                            label: (
                                <motion.div whileHover={{ scale: 1.03 }} className={dangerItemStyle}>
                                    <span>Xóa</span>
                                </motion.div>
                            ),
                            onClick: () => {
                                showConfirmModal({
                                    title: <span className="!text-red-500">Xác nhận xóa</span>,
                                    content: 'Bạn có chắc chắn muốn xóa công việc này?',
                                    onOk: () => handleDeleteJob(job.id, onRefresh),
                                    okText: 'Xóa',
                                    cancelText: 'Hủy',
                                    okButtonProps: { className: '!bg-red-500 hover:!bg-red-600 !text-white !border-0' },
                                });
                            },
                        },
                    ];
                case 'PUBLIC':
                case 'PRIVATE':
                    return [
                        {
                            key: 'revoke',
                            label: (
                                <motion.div whileHover={{ scale: 1.03 }} className={dangerItemStyle}>
                                    <span>Thu hồi</span>
                                </motion.div>
                            ),
                            onClick: () => {
                                showConfirmModal({
                                    title: <span className="!text-red-500">Xác nhận thu hồi</span>,
                                    content: 'Bạn có chắc chắn muốn thu hồi công việc này?',
                                    onOk: () => handleRevokeJob(job.id, onRefresh),
                                    okText: 'Thu hồi',
                                    cancelText: 'Hủy',
                                    okButtonProps: { className: '!bg-red-500 hover:!bg-red-600 !text-white !border-0' },
                                });
                            },
                        },
                        {
                            key: 'applicants',
                            label: (
                                <motion.div whileHover={{ scale: 1.03 }} className={baseItemStyle}>
                                    <span>Danh sách ứng viên</span>
                                </motion.div>
                            ),
                            onClick: () => router.push(`/jobs/${job.id}/select-freelancer`),
                        },
                    ];
                case 'IN_PROGRESS':
                case 'PREPARING':
                    return [
                        {
                            key: 'view_milestones',
                            label: (
                                <motion.div whileHover={{ scale: 1.03 }} className={baseItemStyle}>
                                    <span>Danh sách giai đoạn</span>
                                </motion.div>
                            ),
                            onClick: () => router.push(`/jobs/${job.id}/accept-milestones`),
                        },
                        {
                            key: 'applicants',
                            label: (
                                <motion.div whileHover={{ scale: 1.03 }} className={baseItemStyle}>
                                    <span>Danh sách ứng viên</span>
                                </motion.div>
                            ),
                            onClick: () => router.push(`/jobs/${job.id}/select-freelancer`),
                        },
                    ];
                case 'COMPLETED':
                case 'CANCELED':
                    return [];
                default:
                    return [];
            }
        } else if (role === 'ROLE_FREELANCER') {
            switch (status) {
                case 'PUBLIC':
                case 'PRIVATE':
                    return [
                        {
                            key: 'revoke_application',
                            label: (
                                <motion.div whileHover={{ scale: 1.03 }} className={dangerItemStyle}>
                                    <span>Thu hồi ứng tuyển</span>
                                </motion.div>
                            ),
                            onClick: () => {
                                showConfirmModal({
                                    title: <span className="!text-red-500">Xác nhận thu hồi</span>,
                                    content: 'Bạn có chắc chắn muốn thu hồi ứng tuyển cho công việc này?',
                                    onOk: () => handleRevokeApplication(job.id, onRefresh),
                                    okText: 'Thu hồi',
                                    cancelText: 'Hủy',
                                    okButtonProps: { className: '!bg-red-500 hover:!bg-red-600 !text-white !border-0' },
                                });
                            },
                        },
                    ];
                case 'IN_PROGRESS':
                    return [
                        {
                            key: 'view_milestones',
                            label: (
                                <motion.div whileHover={{ scale: 1.03 }} className={baseItemStyle}>
                                    <span>Danh sách giai đoạn</span>
                                </motion.div>
                            ),
                            onClick: () => router.push(`/jobs/${job.id}/accept-milestones`),
                        },
                    ];
                case 'DRAFT':
                case 'COMPLETED':
                case 'CANCELED':
                    return [];
                default:
                    return [];
            }
        }
        return [];
    };

    return getActionItems();
};