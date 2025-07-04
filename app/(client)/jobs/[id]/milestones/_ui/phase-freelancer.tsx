import { Card, Tag, Progress, Divider, Button, Space } from 'antd';
import { 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  PaperClipOutlined,
  DollarOutlined,
  HourglassOutlined,
  CalendarOutlined,
  BankOutlined
} from '@ant-design/icons';
import React from 'react';

export default function MilestonesDashboard() {
  // Dữ liệu milestones
  const milestones = [
    {
      key: 1,
      id: 1,
      title: "Thiết kế UI/UX cho ứng dụng di động",
      status: 'pending',
      isOverdue: false,
      percent: 30,
      disputed: false,
      content: 'Thiết kế wireframe cho toàn bộ ứng dụng',
      startAt: '2023-06-01',
      endAt: '2023-06-15',
      fundedAt: '2023-05-28',
      createdAt: '2023-05-20',
      jobId: 101,
      freelancerId: 201,
      employerId: 301,
      budget: "10.000.000đ",
      document: "design_spec.pdf"
    },
    {
      key: 2,
      id: 2,
      title: "Phát triển website thương mại điện tử",
      status: 'completed',
      isOverdue: false,
      percent: 100,
      disputed: false,
      content: 'Phát triển module đăng nhập/đăng ký',
      startAt: '2023-05-10',
      endAt: '2023-05-25',
      fundedAt: '2023-05-08',
      disbursedAt: '2023-05-28',
      createdAt: '2023-05-05',
      jobId: 101,
      freelancerId: 201,
      employerId: 301,
      budget: "4.000.000đ",
      document: "api_docs.pdf"
    },
    {
      key: 3,
      id: 3,
      title: "Tối ưu hiệu năng React Native",
      status: 'disputed',
      isOverdue: true,
      percent: 70,
      disputed: true,
      content: 'Thiết kế giao diện dashboard',
      startAt: '2023-05-15',
      endAt: '2023-05-30',
      fundedAt: '2023-05-12',
      createdAt: '2023-05-10',
      jobId: 101,
      freelancerId: 201,
      employerId: 301,
      budget: "7.000.000đ",
      document: "performance_report.pdf"
    }
  ];

  const getStatusTag = (status: string, isOverdue: boolean): React.ReactNode => {
    let tag: React.ReactNode;
    switch (status) {
      case 'completed':
        tag = <Tag icon={<CheckCircleOutlined />} color="success">Hoàn thành</Tag>;
        break;
      case 'disputed':
        tag = <Tag icon={<ExclamationCircleOutlined />} color="warning">Tranh chấp</Tag>;
        break;
      case 'overdue':
        tag = <Tag icon={<CloseCircleOutlined />} color="error">Quá hạn</Tag>;
        break;
      default:
        tag = <Tag icon={<ClockCircleOutlined />} color="processing">Đang thực hiện</Tag>;
    }
    
    if (isOverdue && status !== 'completed') {
      return (
        <Space>
          {tag}
          <Tag color="red">Quá hạn</Tag>
        </Space>
      );
    }
    return tag;
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-8">
      <div className="w-full max-w-6xl px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Giai đoạn của các công việc</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {milestones.map((milestone) => (
            <Card 
              key={milestone.key} 
              className={`mx-auto w-full shadow-sm hover:shadow-md transition-shadow ${
                milestone.isOverdue ? 'border-red-200 bg-red-50' : ''
              }`}
              title={
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">{milestone.title}</h2>
                  {getStatusTag(milestone.status, milestone.isOverdue)}
                </div>
              }
            >
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-2">{milestone.content}</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium">ID: #{milestone.id}</p>
                    <p className="text-sm font-medium">Job ID: {milestone.jobId}</p>
                  </div>
                </div>
                
                <Divider className="my-2" />
                
                <div>
                  <h3 className="font-medium mb-2">Tiến độ công việc</h3>
                  <div className="flex items-center space-x-4">
                    <Progress 
                      percent={milestone.percent} 
                      status={
                        milestone.status === 'completed' ? 'success' : 
                        milestone.isOverdue ? 'exception' : 'normal'
                      }
                      className="w-full"
                    />
                    
                  </div>
                  
                </div>
                
                <Divider className="my-2" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <BankOutlined className="text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Ngân sách</p>
                      <p className="font-medium">{milestone.budget}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <HourglassOutlined className="text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Thời gian</p>
                      <p className="font-medium">
                        {milestone.startAt} - {milestone.endAt}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <PaperClipOutlined className="text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Tài liệu</p>
                      <p className="font-medium">
                        {milestone.document ? (
                          <Button type="link" size="small" >
                            {milestone.document}
                          </Button>
                        ) : 'Không có'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <Divider className="my-2" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">Ngày tạo</h4>
                    <p>{milestone.createdAt}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">Ngày thanh toán</h4>
                    <p>{milestone.disbursedAt || 'Chưa thanh toán'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">Freelancer ID</h4>
                    <p>{milestone.freelancerId}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">Employer ID</h4>
                    <p>{milestone.employerId}</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="primary" ghost>Chi tiết</Button>
                  {milestone.status === 'pending' && (
                    <Button>Cập nhật</Button>
                  )}
                  {milestone.disputed && (
                    <Button type="primary" danger>Giải quyết tranh chấp</Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}