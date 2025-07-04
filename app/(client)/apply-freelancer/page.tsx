'use client';
import { Table, Tag, Button } from 'antd';
import { useState, useEffect } from 'react';

// Định nghĩa kiểu dữ liệu cho job
interface Job {
  key: string;
  id: number;
  content: string;
  createdAt: string;
  status: string;
  bidAmount: string;
  estimatedHours: string;
}

const AppliedJobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Mock data
    const mockData: Job[] = [
      {
        key: '1',
        id: 1,
        content: 'Develop a web application',
        createdAt: '2025-07-03 14:30',
        status: 'Đang làm',
        bidAmount: '5.000.000đ',
        estimatedHours: '40 giờ',
      },
      {
        key: '2',
        id: 2,
        content: 'Design UI for mobile app',
        createdAt: '2025-07-02 09:15',
        status: 'Đã hoàn thành',
        bidAmount: '3.000.000đ',
        estimatedHours: '30 giờ',
      },
    ];
    setJobs(mockData);
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Công việc',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (text: string) => {
        let color = text === 'Đang làm' ? 'blue' : 'green';
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Ngân sách',
      dataIndex: 'bidAmount',
      key: 'bidAmount',
    },
    {
      title: 'Thời gian làm việc',
      dataIndex: 'estimatedHours',
      key: 'estimatedHours',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Button type="primary" size="small">
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/3 bg-gray-200 p-4 shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Sidebar</h2>
        <ul className="space-y-2">
          <li className="text-gray-600 hover:text-gray-800 cursor-pointer">Profile</li>
          <li className="text-gray-600 hover:text-gray-800 cursor-pointer">Settings</li>
          <li className="text-gray-600 hover:text-gray-800 cursor-pointer">Logout</li>
        </ul>
      </div>

      <div className="w-2/3 p-4">
        <div className="container mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Công việc đã ứng tuyển</h1>
          <Table
            columns={columns}
            dataSource={jobs}
            pagination={{ pageSize: 5 }}
            className="shadow-md rounded-lg overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default AppliedJobsPage;