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

import { Card, Typography, Row, Col } from 'antd';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  BriefcaseIcon,
  MoneyBag02Icon
} from '@hugeicons/core-free-icons';
import { ResponseDetail } from '@/types/respones/detail';

const { Title, Text } = Typography;

interface JobHeaderProps {
  job: ResponseDetail.MilestoneListResponse['job'];
  formatBudget: (amount: number) => string;
}

export default function JobHeader({ job, formatBudget }: JobHeaderProps) {
  // Defensive programming - kiểm tra dữ liệu cần thiết
  if (!job) {
    return (
      <Card style={{ 
        borderRadius: '20px',
        marginBottom: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ textAlign: 'center', color: '#6b7280', padding: '32px' }}>
          Không thể tải thông tin công việc
        </div>
      </Card>
    );
  }



  return (
    <Card 
      style={{ 
        borderRadius: '20px',
        marginBottom: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}
    >
      <div style={{ 
        background: 'linear-gradient(135deg, #355a8e 0%, #01204b 100%)',
        margin: '-24px -24px 0 -24px',
        padding: '32px 24px',
        borderRadius: '20px 20px 0 0'
      }}>
        <Row gutter={[24, 16]} align="middle">
          {/* Left Column - Job Info */}
          <Col xs={24} lg={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '16px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <HugeiconsIcon icon={BriefcaseIcon} size={24} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <Title level={3} style={{ 
                  color: 'white', 
                  marginBottom: 8, 
                  fontSize: '24px', 
                  fontWeight: 600,
                  lineHeight: 1.3
                }}>
                  {job.title || 'Tiêu đề không có'}
                </Title>
                <Text style={{ 
                  color: 'rgba(255,255,255,0.8)', 
                  fontSize: '14px',
                  display: 'block'
                }}>
                  Dự án được quản lý thông qua hệ thống milestone
                </Text>
              </div>
            </div>
          </Col>

          {/* Right Column - Budget */}
          <Col xs={24} lg={8}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <div style={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '16px',
                padding: '20px 24px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                minWidth: '200px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <HugeiconsIcon icon={MoneyBag02Icon} size={18} color="#fbbf24" />
                  <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 500 }}>
                    Ngân sách dự án
                  </Text>
                </div>
                <Text style={{ 
                  color: 'white', 
                  fontSize: '20px', 
                  fontWeight: 700, 
                  display: 'block',
                  lineHeight: 1.2
                }}>
                  {formatBudget(job.budget || 0)} VNĐ
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Bottom Info Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        margin: '0 -24px -24px -24px',
        padding: '16px 24px',
        borderRadius: '0 0 20px 20px',
        borderTop: '1px solid #e2e8f0'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}>
          <Text style={{ 
            color: '#6b7280', 
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {job.description || 'Theo dõi tiến độ và quản lý các giai đoạn phát triển dự án'}
          </Text>
        </div>
      </div>
    </Card>
  );
} 