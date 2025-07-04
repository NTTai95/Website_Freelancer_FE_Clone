/**
 * @file JobHeader.tsx
 * @description Component hiển thị header thông tin công việc với gradient background.
 * Bao gồm tiêu đề, chuyên ngành, ngày đăng/hạn nộp và ngân sách được highlight.
 * Sử dụng gradient xanh dương đậm tạo sự chuyên nghiệp.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {object} props.job - Thông tin công việc từ API
 * @param {function} props.formatBudget - Hàm format số tiền theo chuẩn VN
 * @param {function} props.formatDate - Hàm format ngày tháng theo locale VN
 * @returns {React.ReactElement} Card header với gradient background
 */
'use client';

import { Card, Typography, Row, Col, Space, Tag } from 'antd';
import { DollarOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { ResponseDetail } from '@/types/respones/detail';

const { Title, Text } = Typography;

interface JobHeaderProps {
  job: ResponseDetail.JobApplies['job'];
  formatBudget: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

export default function JobHeader({ job, formatBudget, formatDate }: JobHeaderProps) {
  // Defensive programming - kiểm tra dữ liệu cần thiết
  if (!job) {
    return (
      <Card style={{ borderColor: '#e5e7eb', borderRadius: 12 }}>
        <div className="text-center text-gray-500 py-8">
          Không thể tải thông tin công việc
        </div>
      </Card>
    );
  }

  return (
    <Card 
      style={{ 
        borderColor: '#e5e7eb', 
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div style={{ 
        background: 'linear-gradient(135deg, #355a8e 0%, #01204b 100%)',
        margin: '-24px -24px 24px -24px',
        padding: '24px',
        borderRadius: '12px 12px 0 0'
      }}>
        <Row justify="space-between" align="middle">
          <Col flex="auto">
            <Title level={3} style={{ color: 'white', marginBottom: 8 }}>
              {job.title || 'Tiêu đề không có'}
            </Title>
            <Space size="middle">
              <Tag color="blue-inverse" style={{ 
                backgroundColor: 'rgba(255,255,255,0.15)', 
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white'
              }}>
                {job.major?.name || 'Chuyên ngành chưa xác định'}
              </Tag>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                <CalendarOutlined /> Đăng: {formatDate(job.postedAt)}
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                <ClockCircleOutlined /> Hạn: {formatDate(job.closedAt)}
              </Text>
            </Space>
          </Col>
          <Col>
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8,
              padding: '16px 20px',
              textAlign: 'center'
            }}>
              <DollarOutlined className="text-yellow-400 text-xl mb-2" />
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 4 }}>
                Ngân sách
              </div>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 600 }}>
                {formatBudget(job.budget || 0)} VNĐ
              </Text>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
} 