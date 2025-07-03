/**
 * @file JobStatusAlert.tsx
 * @description Component hiển thị thông báo trạng thái công việc phù hợp.
 * Xử lý các trạng thái: COMPLETED, IN_PROGRESS, hay đã chọn freelancer.
 * Hiển thị thông báo và styling phù hợp với từng trạng thái.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {boolean} props.hasAcceptedFreelancer - Trạng thái đã chọn freelancer
 * @param {string} props.jobStatus - Trạng thái công việc từ API
 * @returns {React.ReactElement|null} Card thông báo phù hợp hoặc null
 */
'use client';

import { Card, Typography } from 'antd';
import { CheckCircleOutlined, PlayCircleOutlined, TrophyOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface JobStatusAlertProps {
  hasAcceptedFreelancer: boolean;
  jobStatus?: string;
}

export default function JobStatusAlert({ hasAcceptedFreelancer, jobStatus }: JobStatusAlertProps) {
  // Không hiển thị gì nếu chưa chọn freelancer và job chưa có trạng thái đặc biệt
  if (!hasAcceptedFreelancer && jobStatus !== 'COMPLETED' && jobStatus !== 'IN_PROGRESS') {
    return null;
  }

  // Xử lý trạng thái COMPLETED
  if (jobStatus === 'COMPLETED') {
    return (
      <Card 
        style={{ 
          borderColor: '#0ea5e9', 
          borderRadius: 12, 
          backgroundColor: '#f0f9ff',
          marginBottom: 24,
          boxShadow: '0 4px 12px rgba(14, 165, 233, 0.15)'
        }}
      >
        <div className="text-center">
          <TrophyOutlined style={{ fontSize: 24, color: '#0ea5e9', marginBottom: 8 }} />
          <Title level={4} style={{ color: '#0ea5e9', marginBottom: 8 }}>
            Dự án đã hoàn thành
          </Title>
          <Text style={{ color: '#0c4a6e' }}>
            Công việc này đã được hoàn thành thành công. 
            Freelancer đã được chọn và dự án đã kết thúc.
          </Text>
        </div>
      </Card>
    );
  }

  // Xử lý trạng thái IN_PROGRESS
  if (jobStatus === 'IN_PROGRESS') {
    return (
      <Card 
        style={{ 
          borderColor: '#f59e0b', 
          borderRadius: 12, 
          backgroundColor: '#fffbeb',
          marginBottom: 24,
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)'
        }}
      >
        <div className="text-center">
          <PlayCircleOutlined style={{ fontSize: 24, color: '#f59e0b', marginBottom: 8 }} />
          <Title level={4} style={{ color: '#f59e0b', marginBottom: 8 }}>
            Dự án đang thực hiện
          </Title>
          <Text style={{ color: '#92400e' }}>
            Freelancer đã được chọn và đang thực hiện công việc. 
            Các ứng tuyển khác đã được tự động từ chối.
          </Text>
        </div>
      </Card>
    );
  }

  // Trạng thái mặc định: đã chọn freelancer nhưng chưa rõ status
  if (hasAcceptedFreelancer) {
    return (
      <Card 
        style={{ 
          borderColor: '#10b981', 
          borderRadius: 12, 
          backgroundColor: '#f0fdf4',
          marginBottom: 24,
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
        }}
      >
        <div className="text-center">
          <CheckCircleOutlined style={{ fontSize: 24, color: '#10b981', marginBottom: 8 }} />
          <Title level={4} style={{ color: '#10b981', marginBottom: 8 }}>
            Dự án đã chọn freelancer
          </Title>
          <Text style={{ color: '#166534' }}>
            Freelancer đã được chọn cho dự án này. 
            Các ứng tuyển còn lại đã được tự động từ chối.
          </Text>
        </div>
      </Card>
    );
  }

  return null;
} 