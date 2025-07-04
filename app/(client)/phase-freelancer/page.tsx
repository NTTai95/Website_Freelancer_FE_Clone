'use client';

import { Table, Tag, Button, Space, Layout } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import Head from 'next/head';
import Link from 'next/link';

const { Content } = Layout;

type MilestoneStatus = 'pending' | 'in_progress' | 'completed' | 'overdue'; 


interface Milestone {
  id: number;
  status: MilestoneStatus;
  isOverdue: boolean;
  percent: number;
  content: string;
  startAt: string;
  endAt: string;
  createdAt: string;
}

const milestones: Milestone[] = [
  {
    id: 1,
    status: 'in_progress',
    isOverdue: false,
    percent: 50.0,
    content: 'Thiết kế giao diện chính cho website.',
    startAt: '2025-07-01 09:00:00',
    endAt: '2025-07-10 17:00:00',
    createdAt: '2025-06-25 14:00:00',
  },
  {
    id: 2,
    status: 'completed',
    isOverdue: false,
    percent: 100.0,
    content: 'Phát triển backend API.',
    startAt: '2025-06-20 09:00:00',
    endAt: '2025-06-30 17:00:00',
    createdAt: '2025-06-15 10:00:00',
  },
  {
    id: 3,
    status: 'pending',
    isOverdue: true,
    percent: 0.0,
    content: 'Kiểm thử hệ thống.',
    startAt: '2025-07-11 09:00:00',
    endAt: '2025-07-15 17:00:00',
    createdAt: '2025-06-28 12:00:00',
  },
];

const renderStatus = (status: MilestoneStatus) => {
  let color;
  switch (status) {
    case 'in_progress':
      color = 'blue';
      break;
    case 'completed':
      color = 'green';
      break;
    case 'pending':
      color = 'gray';
      break;
    case 'overdue':
      color = 'red';
      break;
  }
  return <Tag color={color}>{status === 'in_progress' ? 'Đang thực hiện' : status === 'completed' ? 'Hoàn thành' : status === 'pending' ? 'Chưa bắt đầu' : 'Quá hạn'}</Tag>;
};


const renderIsOverdue = (isOverdue: boolean) => (
  <Tag color={isOverdue ? 'red' : 'green'}>{isOverdue ? 'Có' : 'Không'}</Tag>
);


const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: renderStatus,
    width: 150, 
  },
  {
    title: 'Quá hạn',
    dataIndex: 'isOverdue',
    key: 'isOverdue',
    render: renderIsOverdue,
    width: 120, 
  },
  {
    title: 'Tiến độ (%)',
    dataIndex: 'percent',
    key: 'percent',
    render: (percent: number) => `${percent}%`,
    width: 120, 
  },
  {
    title: 'Nội dung',
    dataIndex: 'content',
    key: 'content',
    width: 300, 
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'startAt',
    key: 'startAt',
    width: 180, 
  },
  {
    title: 'Ngày kết thúc',
    dataIndex: 'endAt',
    key: 'endAt',
    width: 180, 
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 180, 
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (_: any, record: Milestone) => (
      <Space size="middle">
        <Link href={`/milestones/${record.id}`}>
          <Button icon={<EyeOutlined />} type="text" className="text-blue-500 hover:text-blue-700">
            Xem
          </Button>
        </Link>
        <Link href={`/milestones/edit/${record.id}`}>
          <Button icon={<EditOutlined />} type="text" className="text-yellow-500 hover:text-yellow-700">
            Sửa
          </Button>
        </Link>
      </Space>
    ),
    width: 200, 
  },
];

export default function FreelancerPhases() {
  return (
    <>
      <Head>
        <title>Danh sách giai đoạn - Freelancer</title>
        <meta name="description" content="Danh sách các giai đoạn công việc của freelancer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/5.0.0/antd.min.css" />
      </Head>
      <Layout className="min-h-screen bg-gray-100">
        <Content className="p-4 md:p-8 flex justify-center">
          <div className="w-full max-w-6xl"> 
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Danh sách giai đoạn công việc
            </h1>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
              <Table
                columns={columns}
                dataSource={milestones}
                pagination={{ pageSize: 10 }}
                className="w-full"
              />
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}