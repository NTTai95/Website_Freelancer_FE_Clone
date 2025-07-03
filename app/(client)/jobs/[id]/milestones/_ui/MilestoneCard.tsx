/**
 * @file MilestoneCard.tsx
 * @description Component hiển thị card cho từng milestone với design system đồng nhất.
 * Sử dụng gradient background, hover effects và layout responsive theo chuẩn select-freelancer.
 * Hiển thị thông tin chi tiết milestone, freelancer, tiến độ và các thao tác có thể thực hiện.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {object} props.milestone - Thông tin milestone từ API
 * @param {function} props.formatDate - Hàm format ngày tháng
 * @param {number} props.jobId - ID của job
 * @returns {React.ReactElement} Card hiển thị thông tin milestone
 */
'use client';

import { Row, Col, Progress, Typography, Avatar, Space, Divider, Button } from 'antd';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  TaskDone01Icon,
  TaskDaily01Icon,
  Clock01Icon,
  Alert01Icon,
  Calendar03Icon,
  UserIcon,
  DocumentAttachmentIcon,
  EyeIcon
} from '@hugeicons/core-free-icons';
import { ResponseDetail } from '@/types/respones/detail';
import { useRouter } from 'next/navigation';

const { Text, Title } = Typography;

interface MilestoneCardProps {
  milestone: ResponseDetail.MilestoneListResponse['milestones'][0];
  formatDate: (dateString: string) => string;
  jobId: number;
}

export default function MilestoneCard({ milestone, formatDate, jobId }: MilestoneCardProps) {
  const router = useRouter();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'DONE':
        return {
          color: '#059669',
          text: 'Đã hoàn thành',
          icon: TaskDone01Icon,
          background: 'linear-gradient(135deg, #ecfdf5 0%, #bbf7d0 100%)',
          borderColor: '#059669'
        };
      case 'DOING':
        return {
          color: '#d97706',
          text: 'Đang thực hiện',
          icon: TaskDaily01Icon,
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderColor: '#d97706'
        };
      case 'PENDING':
        return {
          color: '#6b7280',
          text: 'Chờ bắt đầu',
          icon: Clock01Icon,
          background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)',
          borderColor: '#6b7280'
        };
      default:
        return {
          color: '#6b7280',
          text: 'Không xác định',
          icon: Clock01Icon,
          background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)',
          borderColor: '#6b7280'
        };
    }
  };

  const statusConfig = getStatusConfig(milestone.status);

  const handleViewDetail = () => {
    router.push(`/jobs/${jobId}/milestones/${milestone.id}`);
  };

  return (
    <div
      className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'white',
        border: `1px solid ${statusConfig.borderColor}20`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)'
      }}
    >
      {/* Header with gradient */}
      <div style={{
        background: statusConfig.background,
        padding: '20px 24px',
        borderBottom: `2px solid ${statusConfig.color}20`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative element */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `${statusConfig.color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <HugeiconsIcon 
            icon={statusConfig.icon}
            size={24}
            color={statusConfig.color}
          />
        </div>

        <Row justify="space-between" align="middle">
          <Col flex="auto">
            <Space direction="vertical" size="small">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 2px 8px ${statusConfig.color}30`
                }}>
                  <HugeiconsIcon 
                    icon={statusConfig.icon}
                    size={18}
                    color={statusConfig.color}
                  />
                </div>
                <Title level={5} style={{ margin: 0, color: statusConfig.color, fontSize: '16px', fontWeight: 600 }}>
                  Giai đoạn #{milestone.id}
                </Title>
              </div>
              <div style={{
                backgroundColor: 'white',
                color: statusConfig.color,
                border: `1px solid ${statusConfig.color}30`,
                borderRadius: '12px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: 500,
                display: 'inline-block'
              }}>
                {statusConfig.text}
              </div>
            </Space>
          </Col>
          <Col>
            <div style={{ textAlign: 'center' }}>
              <Progress
                type="circle"
                percent={milestone.percent}
                size={60}
                strokeColor={{
                  '0%': statusConfig.color,
                  '100%': `${statusConfig.color}80`
                }}
                trailColor="#f1f5f9"
                strokeWidth={6}
                format={(percent) => (
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: 700, 
                    color: statusConfig.color 
                  }}>
                    {percent}%
                  </span>
                )}
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* Content body */}
      <div style={{ padding: '24px' }}>
        {/* Description */}
        <div style={{ marginBottom: '20px' }}>
          <Text style={{ 
            fontSize: '14px', 
            lineHeight: 1.6,
            color: '#374151',
            display: 'block'
          }}>
            {milestone.content || 'Chưa có mô tả giai đoạn'}
          </Text>
        </div>

        {/* Freelancer info */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px',
          border: '1px solid #e2e8f0'
        }}>
          <Space align="center" size="middle">
            <Avatar 
              src={milestone.freelancer.avatar} 
              size={40}
              icon={<HugeiconsIcon icon={UserIcon} size={20} />}
              style={{ 
                border: '2px solid white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            />
            <div style={{ flex: 1 }}>
              <Text strong style={{ 
                color: '#355a8e', 
                display: 'block', 
                fontSize: '15px',
                marginBottom: '2px'
              }}>
                {milestone.freelancer.fullName}
              </Text>
              <Text style={{ 
                color: '#6b7280', 
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <HugeiconsIcon icon={UserIcon} size={12} />
                Freelancer thực hiện
              </Text>
            </div>
          </Space>
        </div>

        {/* Timeline */}
        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col span={12}>
            <div style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '10px',
              padding: '12px',
              border: '1px solid #3b82f620',
              textAlign: 'center'
            }}>
              <HugeiconsIcon icon={Calendar03Icon} size={16} color="#3b82f6" style={{ marginBottom: '6px' }} />
              <Text style={{ 
                fontSize: '11px', 
                color: '#6b7280', 
                display: 'block',
                marginBottom: '4px'
              }}>
                Bắt đầu
              </Text>
              <Text style={{ 
                fontSize: '13px', 
                fontWeight: 600,
                color: '#374151'
              }}>
                {formatDate(milestone.startAt)}
              </Text>
            </div>
          </Col>
          <Col span={12}>
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '10px',
              padding: '12px',
              border: '1px solid #f59e0b20',
              textAlign: 'center'
            }}>
              <HugeiconsIcon icon={Calendar03Icon} size={16} color="#f59e0b" style={{ marginBottom: '6px' }} />
              <Text style={{ 
                fontSize: '11px', 
                color: '#6b7280', 
                display: 'block',
                marginBottom: '4px'
              }}>
                Kết thúc
              </Text>
              <Text style={{ 
                fontSize: '13px', 
                fontWeight: 600,
                color: '#374151'
              }}>
                {formatDate(milestone.endAt)}
              </Text>
            </div>
          </Col>
        </Row>

        {/* Tags và indicators */}
        <Row gutter={[8, 8]} style={{ marginBottom: '20px' }}>
          {milestone.isOverdue && (
            <Col>
              <div style={{
                background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 1px 3px rgba(220, 38, 38, 0.1)'
              }}>
                <HugeiconsIcon icon={Clock01Icon} size={12} color="#dc2626" />
                <Text style={{ 
                  color: '#991b1b', 
                  fontSize: '12px', 
                  fontWeight: 500,
                  lineHeight: '12px'
                }}>
                  Quá hạn
                </Text>
              </div>
            </Col>
          )}
          {milestone.disputed && (
            <Col>
              <div style={{
                background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                border: '1px solid #e9d5ff',
                borderRadius: '8px',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 1px 3px rgba(147, 51, 234, 0.1)'
              }}>
                <HugeiconsIcon icon={Alert01Icon} size={12} color="#9333ea" />
                <Text style={{ 
                  color: '#7c3aed', 
                  fontSize: '12px', 
                  fontWeight: 500,
                  lineHeight: '12px'
                }}>
                  Có tranh chấp
                </Text>
              </div>
            </Col>
          )}
          {milestone.totalProducts > 0 && (
            <Col>
              <div style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 1px 3px rgba(59, 130, 246, 0.1)'
              }}>
                <HugeiconsIcon icon={DocumentAttachmentIcon} size={12} color="#3b82f6" />
                <Text style={{ 
                  color: '#1e40af', 
                  fontSize: '12px', 
                  fontWeight: 500,
                  lineHeight: '12px'
                }}>
                  {milestone.totalProducts} sản phẩm
                </Text>
              </div>
            </Col>
          )}
          {milestone.pendingProducts > 0 && (
            <Col>
              <div style={{
                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                border: '1px solid #fed7aa',
                borderRadius: '8px',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 1px 3px rgba(245, 158, 11, 0.1)'
              }}>
                <HugeiconsIcon icon={Clock01Icon} size={12} color="#f59e0b" />
                <Text style={{ 
                  color: '#92400e', 
                  fontSize: '12px', 
                  fontWeight: 500,
                  lineHeight: '12px'
                }}>
                  {milestone.pendingProducts} chờ duyệt
                </Text>
              </div>
            </Col>
          )}
          {milestone.totalDisputes > 0 && (
            <Col>
              <div style={{
                background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 1px 3px rgba(220, 38, 38, 0.1)'
              }}>
                <HugeiconsIcon icon={Alert01Icon} size={12} color="#dc2626" />
                <Text style={{ 
                  color: '#991b1b', 
                  fontSize: '12px', 
                  fontWeight: 500,
                  lineHeight: '12px'
                }}>
                  {milestone.totalDisputes} tranh chấp
                </Text>
              </div>
            </Col>
          )}
        </Row>

        <Divider style={{ margin: '16px 0' }} />

        {/* Actions */}
        <div style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            icon={<HugeiconsIcon icon={EyeIcon} size={16} />}
            onClick={handleViewDetail}
            style={{
              background: 'linear-gradient(135deg, #355a8e 0%, #01204b 100%)',
              borderColor: '#355a8e',
              borderRadius: '12px',
              height: '40px',
              padding: '0 24px',
              fontWeight: 600,
              width: '100%'
            }}
          >
            Xem chi tiết
          </Button>
        </div>

        {/* Footer info */}
        <div style={{ 
          marginTop: '16px',
          textAlign: 'center',
          padding: '12px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <Text style={{ 
            fontSize: '12px', 
            color: '#6b7280'
          }}>
            Tạo lúc: {formatDate(milestone.createdAt)}
          </Text>
        </div>
      </div>
    </div>
  );
} 