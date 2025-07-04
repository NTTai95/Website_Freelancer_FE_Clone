"use client"
import { Table, Tag, Progress, Button, Dropdown, MenuProps, Input, Select, Badge, Space } from 'antd';
import { SearchOutlined, PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { ColumnsType } from 'antd/es/table';

const { Option } = Select;

type JobStatus = 'active' | 'completed' | 'draft';
type JobListing = {
    key: string;
    title: string;
    company: string;
    applicants: number;
    status: JobStatus;
    stages: number;
    currentStage: number;
    postedDate: string;
};

const JobListingsPage = () => {
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState<JobStatus | 'all'>('all');
    const [jobs, setJobs] = useState<JobListing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                // Thay thế bằng API call thực tế của bạn
                // const response = await fetch('your-api-endpoint');
                // const data = await response.json();
                // setJobs(data);
                setJobs([]);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.company.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusText = (status: JobStatus) => {
        switch (status) {
            case 'active': return 'Đã đăng - Đang tuyển Freelancer';
            case 'completed': return 'Hoàn thành';
            case 'draft': return 'Bản nháp';
            default: return 'Unknown';
        }
    };

    const getActionItems = (status: JobStatus): MenuProps['items'] => {
        const baseItems = [
            { key: '1', label: 'Xem chi tiết' }
        ];

        if (status === 'draft') {
            return [
                ...baseItems,
                { key: '2', label: 'Chỉnh sửa' },
                { key: '3', label: 'Xóa', danger: true },
            ];
        }

        return baseItems;
    };

    const columns: ColumnsType<JobListing> = [
        {
            title: 'Tên công việc',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: JobListing) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{text}</span>
                    <span className="text-sm text-gray-500">{record.company}</span>
                </div>
            ),
            sorter: (a: JobListing, b: JobListing) => a.title.localeCompare(b.title),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: JobStatus) => (
                <Tag color="blue" className="capitalize">
                    {getStatusText(status)}
                </Tag>
            ),
            filters: [
                { text: 'Đang tuyển', value: 'active' },
                { text: 'Hoàn thành', value: 'completed' },
                { text: 'Bản nháp', value: 'draft' },
            ],
            onFilter: (value: any, record: JobListing) => record.status === value,
        },
        {
            title: 'Ứng viên',
            dataIndex: 'applicants',
            key: 'applicants',
            render: (applicants: number) => (
                <span className="font-medium">{applicants}</span>
            ),
            sorter: (a: JobListing, b: JobListing) => a.applicants - b.applicants,
        },
        {
            title: 'Tiến trình',
            key: 'progress',
            render: (record: JobListing) => (
                <div className="w-full max-w-xs">
                    <div className="flex justify-between text-xs mb-1">
                        <span>Giai đoạn {record.currentStage}/{record.stages}</span>
                        <span>{Math.round((record.currentStage / record.stages) * 100)}%</span>
                    </div>
                    <Progress
                        percent={Math.round((record.currentStage / record.stages) * 100)}
                        strokeColor="#3B82F6"
                        showInfo={false}
                        size="small"
                    />
                    <div className="flex justify-between mt-1">
                        <Space size="small">
                            {Array.from({ length: record.stages }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full ${idx < record.currentStage ? 'bg-blue-500' : 'bg-gray-200'}`}
                                />
                            ))}
                        </Space>
                        <Badge
                            count={record.stages}
                            style={{
                                backgroundColor: '#3B82F6',
                                color: 'white',
                                fontSize: '10px',
                            }}
                        />
                    </div>
                </div>
            ),
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'postedDate',
            key: 'postedDate',
            render: (date: string) => (
                <span className="text-sm text-gray-600">
                    {new Date(date).toLocaleDateString('vi-VN')}
                </span>
            ),
            sorter: (a: JobListing, b: JobListing) =>
                new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime(),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: JobListing) => (
                <Dropdown menu={{ items: getActionItems(record.status) }} placement="bottomRight" trigger={['click']}>
                    <Button
                        type="text"
                        icon={<EllipsisOutlined />}
                        className="text-gray-500 hover:text-gray-700"
                    />
                </Dropdown>
            ),
        },
    ];

    return (
        <div className="container max-w !px-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center !mb-6 !mx-3">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 !my-3">Danh sách công việc</h1>
                    <p className="text-gray-500 text-sm">Quản lý và theo dõi các công việc đang tuyển dụng</p>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    className="bg-blue-600 hover:bg-blue-700 shadow-md"
                >
                    Tạo công việc mới
                </Button>
            </div>

            <div className="p-4 mb-6">
                <div className="flex flex-col md:flex-row">
                    <Input
                        placeholder="Tìm kiếm theo tên công việc"
                        prefix={<SearchOutlined className="text-gray-400" />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="flex-1 max-w-xl !my-4 !ml-2"
                        size="middle"
                        allowClear
                    />
                    <Select
                        value={statusFilter}
                        onChange={(value) => setStatusFilter(value)}
                        size="middle"
                        className="w-full md:w-48 !my-4 !ml-3"
                        placeholder="Lọc theo trạng thái"
                    >
                        <Option value="all">Tất cả trạng thái</Option>
                        <Option value="active">Đang tuyển</Option>
                        <Option value="completed">Hoàn thành</Option>
                        <Option value="draft">Bản nháp</Option>
                    </Select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden !mt-5">
                <Table
                    columns={columns}
                    dataSource={filteredJobs}
                    loading={loading}
                    pagination={{
                        pageSize: 5,
                        showSizeChanger: false,
                        position: ['bottomRight'],
                        className: 'px-4 py-2'
                    }}
                    className="ant-table-striped"
                    rowClassName={(_, index) =>
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }
                />
            </div>
        </div>
    );
};

export default JobListingsPage;