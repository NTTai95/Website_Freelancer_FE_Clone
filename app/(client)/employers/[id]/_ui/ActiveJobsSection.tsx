/**
 * @file ActiveJobsSection.tsx
 * @description Component hiển thị portfolio công việc đang tuyển dụng của nhà tuyển dụng.
 * Design professional với job cards logic layout, phân chia rõ ràng thông tin quan trọng.
 * Tối ưu cho center content trong 3-column layout với hierarchy rõ ràng.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {object} props.data - Dữ liệu employer profile chứa activeJobs
 * @returns {React.ReactElement} Portfolio section với improved logical layout
 */
'use client';

import { Card, Typography, Empty, Button, Row, Col } from 'antd';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  BriefcaseIcon,
  Calendar03Icon,
  MoneyBag02Icon,
  Clock01Icon,
  UserGroupIcon,
  ViewIcon,
  Award01Icon,
  CalendarCheckIn01Icon
} from '@hugeicons/core-free-icons';
import { ResponseDetail } from '@/types/respones/detail';
import { useRouter } from 'next/navigation';

const { Text, Title } = Typography;

interface ActiveJobsSectionProps {
  data: ResponseDetail.EmployerProfile;
}

export default function ActiveJobsSection({ data }: ActiveJobsSectionProps) {
  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

  const router = useRouter();

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Chưa có thông tin';
    try {
      // Handle format "DD/MM/YYYY HH:mm:ss"
      const datePart = dateString.split(' ')[0];
      const [day, month, year] = datePart.split('/');
      const date = new Date(`${year}-${month}-${day}`);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return 'Ngày không hợp lệ';
    }
  };

  const getApplicationStatus = (count: number) => {
    if (count >= 10) return { label: 'Hot', color: '#ef4444', bg: '#fef2f2', textColor: '#991b1b' };
    if (count >= 5) return { label: 'Warm', color: '#f97316', bg: '#fff7ed', textColor: '#9a3412' };
    return { label: 'New', color: '#10b981', bg: '#f0fdf4', textColor: '#065f46' };
  };

  const isUrgent = (closedAt: string) => {
    if (!closedAt) return false;
    try {
      const datePart = closedAt.split(' ')[0];
      const [day, month, year] = datePart.split('/');
      const closeDate = new Date(`${year}-${month}-${day}`);
      const now = new Date();
      const diffDays = Math.ceil((closeDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
      return diffDays <= 7; // Urgent if deadline is within 7 days
    } catch {
      return false;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Section Header with Summary */}
      <div style={{
        background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
        borderRadius: '16px',
        padding: '20px 24px',
        border: '1px solid #d1d5db'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
              borderRadius: '12px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HugeiconsIcon icon={BriefcaseIcon} size={20} color="white" />
            </div>
            <div>
              <Title level={3} style={{ margin: 0, color: '#1f2937', marginBottom: '4px' }}>
                Dự án đang tuyển dụng
              </Title>
              <Text style={{ color: '#6b7280', fontSize: '13px' }}>
                Các dự án đang tuyển dụng freelancer
              </Text>
            </div>
          </div>

          <div style={{
            background: '#dbeafe',
            color: '#1e40af',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 600,
            border: '1px solid #bfdbfe'
          }}>
            {data.activeJobs?.length || 0} dự án
          </div>
        </div>
      </div>

      {/* Jobs List */}
      {!data.activeJobs || data.activeJobs.length === 0 ? (
        <Card style={{
          borderRadius: '16px',
          border: '1px solid #f3f4f6',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div style={{ textAlign: 'center' }}>
                <Text style={{ color: '#6b7280', display: 'block', marginBottom: '4px', fontSize: '16px' }}>
                  Chưa có dự án nào
                </Text>
                <Text style={{ color: '#9ca3af', fontSize: '14px' }}>
                  Nhà tuyển dụng này hiện chưa có dự án đang tuyển dụng
                </Text>
              </div>
            }
          />
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {data.activeJobs.map((job) => {
            const appStatus = getApplicationStatus(job.countApplies);
            const urgent = isUrgent(job.closedAt);

            return (
              <Card
                key={job.id}
                style={{
                  borderRadius: '16px',
                  border: `1px solid ${urgent ? '#fecaca' : '#f3f4f6'}`,
                  boxShadow: urgent ? '0 4px 20px rgba(239, 68, 68, 0.15)' : '0 4px 20px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  position: 'relative'
                }}
                className="hover:shadow-lg hover:-translate-y-1"
                styles={{
                  body: { padding: 0 }
                }}
              >
                {/* Urgent Banner */}
                {urgent && (
                  <div style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    padding: '6px 16px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textAlign: 'center',
                    letterSpacing: '0.5px'
                  }}>
                    ⚡ GẤP - Hạn nộp sắp hết
                  </div>
                )}

                {/* Job Header - Title & Budget */}
                <div style={{
                  background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                  padding: '24px',
                  color: 'white'
                }}>
                  <Row justify="space-between" align="top" gutter={[16, 16]}>
                    <Col flex="1">
                      <Title level={4} style={{
                        color: 'white',
                        margin: 0,
                        marginBottom: '12px',
                        fontSize: '18px',
                        lineHeight: '1.4'
                      }}>
                        {job.title}
                      </Title>

                      {/* Major & Application Status in same line */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontWeight: 500
                        }}>
                          📂 {job.majorName}
                        </div>

                        <div style={{
                          background: appStatus.bg,
                          border: `1px solid ${appStatus.color}`,
                          borderRadius: '8px',
                          padding: '6px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <HugeiconsIcon icon={UserGroupIcon} size={12} color={appStatus.color} />
                          <Text style={{ color: appStatus.textColor, fontSize: '11px', fontWeight: 600 }}>
                            {job.countApplies} ứng viên • {appStatus.label}
                          </Text>
                        </div>
                      </div>
                    </Col>

                    <Col>
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        minWidth: '140px'
                      }}>
                        <HugeiconsIcon icon={MoneyBag02Icon} size={18} color="#fbbf24" />
                        <div style={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '11px',
                          marginTop: '4px',
                          marginBottom: '4px'
                        }}>
                          Ngân sách
                        </div>
                        <Text style={{
                          color: 'white',
                          fontSize: '15px',
                          fontWeight: 700,
                          display: 'block'
                        }}>
                          {formatBudget(job.budget)}
                        </Text>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Job Details Section */}
                <div style={{ padding: '24px' }}>
                  {/* Timeline Information */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '16px'
                    }}>
                      <HugeiconsIcon icon={CalendarCheckIn01Icon} size={16} color="#1e40af" />
                      <Text style={{
                        color: '#1e40af',
                        fontSize: '14px',
                        fontWeight: 600
                      }}>
                        Thời gian dự án
                      </Text>
                    </div>

                    <Row gutter={[16, 12]}>
                      <Col span={8}>
                        <div style={{
                          background: '#f8fafc',
                          borderRadius: '8px',
                          padding: '12px',
                          border: '1px solid #e5e7eb',
                          textAlign: 'center'
                        }}>
                          <HugeiconsIcon icon={Clock01Icon} size={14} color="#6b7280" />
                          <Text style={{
                            color: '#6b7280',
                            fontSize: '10px',
                            display: 'block',
                            marginTop: '4px'
                          }}>
                            Thời lượng
                          </Text>
                          <Text style={{
                            color: '#1f2937',
                            fontSize: '14px',
                            fontWeight: 700,
                            display: 'block'
                          }}>
                            {job.durationHours}h
                          </Text>
                        </div>
                      </Col>

                      <Col span={8}>
                        <div style={{
                          background: '#f0f9ff',
                          borderRadius: '8px',
                          padding: '12px',
                          border: '1px solid #bfdbfe',
                          textAlign: 'center'
                        }}>
                          <HugeiconsIcon icon={Calendar03Icon} size={14} color="#1e40af" />
                          <Text style={{
                            color: '#1e40af',
                            fontSize: '10px',
                            display: 'block',
                            marginTop: '4px'
                          }}>
                            Đăng ngày
                          </Text>
                          <Text style={{
                            color: '#1e3a8a',
                            fontSize: '14px',
                            fontWeight: 700,
                            display: 'block'
                          }}>
                            {formatDate(job.postedAt)}
                          </Text>
                        </div>
                      </Col>

                      <Col span={8}>
                        <div style={{
                          background: urgent ? '#fef2f2' : '#fef7ed',
                          borderRadius: '8px',
                          padding: '12px',
                          border: `1px solid ${urgent ? '#fecaca' : '#fed7aa'}`,
                          textAlign: 'center'
                        }}>
                          <HugeiconsIcon
                            icon={Calendar03Icon}
                            size={14}
                            color={urgent ? '#ef4444' : '#f97316'}
                          />
                          <Text style={{
                            color: urgent ? '#ef4444' : '#f97316',
                            fontSize: '10px',
                            display: 'block',
                            marginTop: '4px'
                          }}>
                            Hạn nộp
                          </Text>
                          <Text style={{
                            color: urgent ? '#dc2626' : '#ea580c',
                            fontSize: '14px',
                            fontWeight: 700,
                            display: 'block'
                          }}>
                            {formatDate(job.closedAt)}
                          </Text>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Skills Requirements */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px'
                    }}>
                      <HugeiconsIcon icon={Award01Icon} size={16} color="#1e40af" />
                      <Text style={{
                        color: '#1e40af',
                        fontSize: '14px',
                        fontWeight: 600
                      }}>
                        Kỹ năng yêu cầu ({job.skills?.length || 0})
                      </Text>
                    </div>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      padding: '12px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      {job.skills?.slice(0, 6).map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          style={{
                            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                            color: '#1e40af',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 600,
                            border: '1px solid #93c5fd',
                            boxShadow: '0 1px 3px rgba(59, 130, 246, 0.1)'
                          }}
                        >
                          {skill}
                        </div>
                      ))}
                      {job.skills && job.skills.length > 6 && (
                        <div style={{
                          background: '#f3f4f6',
                          color: '#6b7280',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 600,
                          border: '1px solid #d1d5db'
                        }}>
                          +{job.skills.length - 6} kỹ năng
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Section */}
                  <div style={{
                    borderTop: '1px solid #f3f4f6',
                    paddingTop: '20px',
                    textAlign: 'center'
                  }}>
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                        border: 'none',
                        borderRadius: '10px',
                        height: '44px',
                        paddingLeft: '32px',
                        paddingRight: '32px',
                        fontSize: '14px',
                        fontWeight: 700,
                        boxShadow: '0 4px 15px rgba(30, 64, 175, 0.4)',
                        letterSpacing: '0.5px'
                      }}
                      onClick={() => router.push(`/jobs/${job.id}/apply`)}
                    >
                      Ứng tuyển ngay
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
} 