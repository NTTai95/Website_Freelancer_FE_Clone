/**
 * @file JobDetails.tsx
 * @description Component hiển thị mô tả chi tiết công việc và yêu cầu.
 * Bao gồm mô tả công việc, danh sách kỹ năng và ngôn ngữ yêu cầu.
 * Layout 2 cột responsive để hiển thị kỹ năng và ngôn ngữ.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {object} props.job - Thông tin chi tiết công việc từ API
 * @returns {React.ReactElement} Section hiển thị mô tả và yêu cầu công việc
 */
'use client';

import { Typography, Space, Row, Col, Tag } from 'antd';
import { FileTextOutlined, BulbOutlined, UserOutlined } from '@ant-design/icons';
import { ResponseDetail } from '@/types/respones/detail';

const { Title, Paragraph, Text } = Typography;

interface JobDetailsProps {
  job: ResponseDetail.JobApplies['job'];
}

export default function JobDetails({ job }: JobDetailsProps) {
  // Defensive programming
  if (!job) {
    return (
      <div className="text-center text-gray-500 py-4">
        Không thể tải thông tin chi tiết công việc
      </div>
    );
  }

  const skills = job.skills || [];
  const languages = job.languages || [];

  return (
    <div>
      <Space align="center" className="mb-4">
        <FileTextOutlined style={{ color: '#355a8e', fontSize: 16 }} />
        <Title level={5} style={{ margin: 0 }}>Mô tả công việc</Title>
      </Space>
      <Paragraph style={{ color: '#6b7280', lineHeight: 1.6 }}>
        {job.description || 'Không có mô tả chi tiết'}
      </Paragraph>
      
      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} md={12}>
          <Space align="center" className="mb-2">
            <BulbOutlined style={{ color: '#f59e0b', fontSize: 14 }} />
            <Text strong>Kỹ năng yêu cầu ({skills.length})</Text>
          </Space>
          <div>
            {skills.length === 0 ? (
              <Text type="secondary">Không có kỹ năng cụ thể</Text>
            ) : (
              skills.map(skill => (
                <Tag key={skill.id} color="blue" style={{ marginBottom: 4 }}>
                  {skill.name}
                </Tag>
              ))
            )}
          </div>
        </Col>
        <Col xs={24} md={12}>
          <Space align="center" className="mb-2">
            <UserOutlined style={{ color: '#10b981', fontSize: 14 }} />
            <Text strong>Ngôn ngữ ({languages.length})</Text>
          </Space>
          <div>
            {languages.length === 0 ? (
              <Text type="secondary">Không có yêu cầu ngôn ngữ</Text>
            ) : (
              languages.map(language => (
                <Tag key={language.id} color="green" style={{ marginBottom: 4 }}>
                  {language.name}
                </Tag>
              ))
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
} 