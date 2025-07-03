/**
 * @file MilestonesPage.tsx
 * @description Trang quản lý các giai đoạn công việc (milestones) cho nhà tuyển dụng.
 * Cho phép xem danh sách milestones, thông tin công việc, thống kê và thực hiện các thao tác
 * quản lý milestone. Tự động xử lý trạng thái và hiển thị thông tin chi tiết.
 * 
 * @component
 * @returns {React.ReactElement} Trang quản lý milestones với đầy đủ chức năng
 * 
 * @example
 * // Được sử dụng tại route: /jobs/[id]/milestones
 * <MilestonesPage />
 */
'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Row, Col, Spin, Typography, Space } from 'antd';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  ArrowLeft01Icon,
  TaskDaily01Icon,
  RefreshIcon,
  CheckListIcon,
  CheckmarkCircle01Icon
} from '@hugeicons/core-free-icons';
import { useJobMilestones } from '@/hooks/useJobMilestones';
import MilestoneStatistics from './_ui/MilestoneStatistics';
import MilestoneCard from './_ui/MilestoneCard';
import JobHeader from './_ui/JobHeader';
import DecorativeSeparator from './_ui/DecorativeSeparator';

const { Title, Text } = Typography;

export default function MilestonesPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = parseInt(params.id as string);
  
  const { data, isLoading, error, refetch } = useJobMilestones(jobId);

  useEffect(() => {
    if (error) {
      console.error('Error loading milestones:', error);
    }
  }, [error]);

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Chưa có thông tin';
    
    try {
      // Check if the date is already in Vietnamese format (dd/mm/yyyy)
      if (dateString.includes('/') && !dateString.includes('-')) {
        // Extract just the date part if it includes time (dd/mm/yyyy hh:mm:ss)
        const datePart = dateString.split(' ')[0];
        
        // Validate the format dd/mm/yyyy
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (dateRegex.test(datePart)) {
          return datePart; // Return as is since it's already in the correct format
        }
        
        // If it has time, try to parse and reformat
        const parts = datePart.split('/');
        if (parts.length === 3) {
          const day = parts[0];
          const month = parts[1];
          const year = parts[2];
          
          // Create ISO format string for parsing
          const isoString = `${year}-${month}-${day}`;
          const date = new Date(isoString);
          
          if (!isNaN(date.getTime())) {
            return `${day}/${month}/${year}`;
          }
        }
      }
      
      // Try to parse as standard date format
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Ngày không hợp lệ';
      }
      
      // Format to dd/mm/yyyy
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Lỗi định dạng ngày';
    }
  };



  const handleBack = () => {
    router.push(`/jobs/${jobId}`);
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '48px 24px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          background: 'white',
          padding: '32px',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px'
        }}>
          <Title level={3} style={{ color: '#dc2626', marginBottom: '16px' }}>
            Không thể tải dữ liệu
          </Title>
          <Text style={{ color: '#6b7280', marginBottom: '24px', display: 'block' }}>
            Có lỗi xảy ra khi tải thông tin milestones. Vui lòng thử lại.
          </Text>
          <Button 
            type="primary" 
            onClick={() => refetch()}
            size="large"
            style={{
              background: 'linear-gradient(135deg, #355a8e 0%, #01204b 100%)',
              borderColor: '#355a8e',
              borderRadius: '12px',
              height: '44px',
              padding: '0 24px',
              fontWeight: 600
            }}
          >
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '32px 0'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        {/* Back Button placed above header */}
        <Button
          type="text"
          size="large"
          icon={<HugeiconsIcon icon={ArrowLeft01Icon} size={20} color="#355a8e" />}
          onClick={handleBack}
          style={{
            background: 'rgba(53, 90, 142, 0.1)',
            borderRadius: '16px',
            border: '1px solid rgba(53, 90, 142, 0.2)',
            height: '48px',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: 24
          }}
          className="hover:bg-blue-100"
        >
          <span style={{ color: '#355a8e', fontWeight: 500 }}>Quay lại</span>
        </Button>

        {/* Header Section với improved design */}
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 150,
            height: 150,
            background: 'linear-gradient(135deg, #355a8e20 0%, #01204b20 100%)',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            bottom: -40,
            left: -40,
            width: 120,
            height: 120,
            background: 'linear-gradient(135deg, #10b98120 0%, #05966920 100%)',
            borderRadius: '50%'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <div>
                  {/* Activity System Indicator - moved above title */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#059669', 
                    fontSize: '13px', 
                    fontWeight: 500,
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#059669'
                    }} />
                    Hệ thống hoạt động
                  </div>
                  <Title level={2} style={{ margin: 0, color: '#1f2937', marginBottom: '8px' }}>
                    {data.job?.title || 'Quản lý giai đoạn công việc'}
                  </Title>
                  <Space size="large" wrap>
                    <div style={{
                      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                      padding: '10px 16px',
                      borderRadius: '12px',
                      border: '1px solid #bfdbfe',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.1)'
                    }}>
                      <HugeiconsIcon icon={TaskDaily01Icon} size={16} color="#3b82f6" />
                      <Text style={{ 
                        color: '#1e40af', 
                        fontWeight: 600, 
                        fontSize: '14px',
                        lineHeight: '16px'
                      }}>
                        {data.milestones?.length || 0} giai đoạn
                      </Text>
                    </div>
                    <div style={{
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                      padding: '10px 16px',
                      borderRadius: '12px',
                      border: '1px solid #bbf7d0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 4px rgba(5, 150, 105, 0.1)'
                    }}>
                      <Text style={{ 
                        color: '#15803d', 
                        fontWeight: 600, 
                        fontSize: '14px',
                        lineHeight: '16px'
                      }}>
                        Ngân sách: {formatBudget(data.job?.budget || 0)} VNĐ
                      </Text>
                    </div>
                    {data.job && (
                      <div style={{
                        background: data.job.status === 'COMPLETED' ? 
                          'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' : 
                          data.job.status === 'ACTIVE' ? 
                          'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' :
                          data.job.status === 'PAUSED' ? 
                          'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' : 
                          'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                        border: `1px solid ${
                          data.job.status === 'COMPLETED' ? '#bfdbfe' :
                          data.job.status === 'ACTIVE' ? '#bbf7d0' :
                          data.job.status === 'PAUSED' ? '#fed7aa' : '#fecaca'
                        }`,
                        borderRadius: '12px',
                        padding: '10px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: `0 2px 4px ${
                          data.job.status === 'COMPLETED' ? 'rgba(53, 90, 142, 0.15)' :
                          data.job.status === 'ACTIVE' ? 'rgba(5, 150, 105, 0.15)' :
                          data.job.status === 'PAUSED' ? 'rgba(217, 119, 6, 0.15)' : 'rgba(220, 38, 38, 0.15)'
                        }`
                      }}>
                        <HugeiconsIcon 
                          icon={CheckmarkCircle01Icon} 
                          size={16} 
                          color={
                            data.job.status === 'COMPLETED' ? '#355a8e' :
                            data.job.status === 'ACTIVE' ? '#059669' :
                            data.job.status === 'PAUSED' ? '#d97706' : '#dc2626'
                          } 
                        />
                        <Text style={{
                          color: data.job.status === 'COMPLETED' ? '#1e40af' :
                                 data.job.status === 'ACTIVE' ? '#15803d' :
                                 data.job.status === 'PAUSED' ? '#92400e' : '#991b1b',
                          fontWeight: 600,
                          fontSize: '14px',
                          lineHeight: '16px'
                        }}>
                          {data.job.status === 'COMPLETED' ? 'Đã hoàn thành' :
                           data.job.status === 'ACTIVE' ? 'Đang hoạt động' :
                           data.job.status === 'PAUSED' ? 'Tạm dừng' : 'Đã hủy'}
                        </Text>
                      </div>
                    )}
                  </Space>
                </div>
              </div>
              <div>
                <Button 
                  type="primary" 
                  onClick={() => refetch()}
                  icon={<HugeiconsIcon icon={RefreshIcon} size={16} />}
                  style={{
                    background: 'linear-gradient(135deg, #355a8e 0%, #01204b 100%)',
                    borderColor: '#355a8e',
                    borderRadius: '12px',
                    height: '44px',
                    padding: '0 24px',
                    fontWeight: 600
                  }}
                >
                  Làm mới
                </Button>
              </div>
            </div>

            {(!data.milestones || data.milestones.length === 0) && (
              <div style={{
                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                border: '1px solid #fed7aa',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <HugeiconsIcon icon={CheckListIcon} size={48} color="#f59e0b" />
                </div>
                <Title level={4} style={{ color: '#92400e', margin: 0, marginBottom: '8px' }}>
                  Chưa có giai đoạn nào
                </Title>
                <Text style={{ color: '#a16207', fontSize: '14px' }}>
                  Các giai đoạn sẽ được tạo sau khi chọn freelancer và bắt đầu dự án.
                </Text>
              </div>
            )}
          </div>
        </div>

        {/* Job Information Header */}
        {data.job && (
          <JobHeader 
            job={data.job}
            formatBudget={formatBudget}
          />
        )}

        {data.milestones && data.milestones.length > 0 && (
          <Row gutter={[32, 32]}>
            {/* Left Column - Statistics & Summary */}
            <Col xs={24} lg={10}>
              <div style={{ 
                position: 'sticky', 
                top: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0
              }}>
                {data.summary && (
                  <MilestoneStatistics 
                    summary={data.summary}
                    jobTitle={data.job?.title || 'Công việc'}
                  />
                )}
              </div>
            </Col>

            {/* Right Column - Milestones List */}
            <Col xs={24} lg={14}>
              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '32px'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <HugeiconsIcon icon={TaskDaily01Icon} size={24} color="white" />
                  </div>
                  <div>
                    <Title level={3} style={{ margin: 0, color: '#1f2937' }}>
                      Danh sách giai đoạn
                    </Title>
                    <Text style={{ color: '#6b7280', fontSize: '14px' }}>
                      Theo dõi tiến độ và quản lý từng milestone
                    </Text>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <DecorativeSeparator />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {data.milestones.map((milestone, index) => (
                    <div key={milestone.id} style={{ position: 'relative' }}>
                      {index > 0 && (
                        <div style={{
                          position: 'absolute',
                          top: '-12px',
                          left: '0',
                          right: '0',
                          height: '1px',
                          background: 'linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%)'
                        }} />
                      )}
                      <MilestoneCard 
                        milestone={milestone}
                        formatDate={formatDate}
                        jobId={jobId}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
} 