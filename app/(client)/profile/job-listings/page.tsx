// src\app\client\profile\job-listings\page.tsx
"use client"
import { useState, useEffect } from 'react';
import { Spin, Empty, Pagination, Button } from 'antd';
import { apiGet } from '@/api/baseApi';
import { ApiResponse } from './_ui/types';
import { JobSearchBar } from './_ui/JobSearchBar';
import { JobCard } from './_ui/job-card/index';
import { motion } from 'framer-motion';

const JobListingsPage = () => {
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('PUBLIC');
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response: any = await apiGet(`/job-listings`, {
                params: {
                    page: currentPage,
                    size: pageSize,
                    keyword: searchText,
                    status: statusFilter === 'all' ? null : statusFilter
                }
            });
            const processedData = {
                ...response.data,
                jobs: response.data.jobs.map((job: any) => ({
                    ...job,
                    status: job.status.toUpperCase()
                }))
            };

            setData(processedData);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [currentPage, searchText, statusFilter]);

    const handleSearch = (values: any) => {
        setSearchText(values);
        setCurrentPage(1);
    };

    const handleRefresh = () => {
        fetchJobs();
    };

    return (
        <div className="!container !p-4">
            <JobSearchBar
                searchText={searchText}
                setSearchText={setSearchText}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                setCurrentPage={setCurrentPage}
                handleSearch={handleSearch}
            />

            {loading ? (
                <div className="!flex !justify-center !items-center !h-64">
                    <Spin size="large" tip="Đang tải dữ liệu..." fullscreen />
                </div>
            ) : (
                <>
                    {!data || data?.jobs?.length === 0 ? (
                        <div className="!bg-white !rounded-xl !shadow-sm !p-8 !text-center">
                            <Empty
                                description={
                                    <span className="!text-gray-500">
                                        Không tìm thấy công việc nào phù hợp
                                    </span>
                                }
                            />
                        </div>
                    ) : (
                        <div className="!space-y-6 !mb-8">
                            {data?.jobs && data?.jobs?.map((job: any) => (
                                <JobCard key={job.id} job={job} onRefresh={handleRefresh} keyword={searchText} />
                            ))}
                        </div>
                    )}

                    {data && data.totalItems > 0 && (
                        <div className="!flex !justify-center !mt-8">
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={data.totalItems}
                                onChange={(page) => setCurrentPage(page)}
                                showSizeChanger={false}
                                className="!text-blue-600"
                                itemRender={(current, type, originalElement) => {
                                    if (type === 'page') {
                                        return (
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    type={currentPage === current ? 'primary' : 'text'}
                                                    className={currentPage === current ? '!bg-blue-600' : ''}
                                                >
                                                    {current}
                                                </Button>
                                            </motion.div>
                                        );
                                    }
                                    return originalElement;
                                }}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default JobListingsPage;