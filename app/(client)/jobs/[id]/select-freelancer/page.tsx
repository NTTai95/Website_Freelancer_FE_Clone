/**
 * @file SelectFreelancerPage.tsx
 * @description Trang quản lý ứng tuyển cho nhà tuyển dụng.
 * Cho phép xem danh sách ứng tuyển, thông tin công việc, thống kê và thực hiện các thao tác
 * chọn hoặc từ chối freelancer. Tự động xử lý trạng thái khi đã chọn freelancer.
 * 
 * @component
 * @returns {React.ReactElement} Trang quản lý ứng tuyển với đầy đủ chức năng
 * 
 * @example
 * // Được sử dụng tại route: /jobs/[id]/select-freelancer
 * <SelectFreelancerPage />
 */
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Row, Col, Spin, Modal, message, Typography, Space } from 'antd';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  ArrowLeft01Icon,
  UserGroupIcon,
  MailOpenIcon
} from '@hugeicons/core-free-icons';
import { ResponseDetail } from '@/types/respones/detail';
import { useJobActions } from '@/hooks/useJobActions';
import { useJobDetail } from '@/hooks/useJobDetail';
import EnhancedStatistics from './_ui/EnhancedStatistics';
import JobJourney from './_ui/JobJourney';
import ApplicationCard from './_ui/ApplicationCard';
import DecorativeSeparator from './_ui/DecorativeSeparator';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const { Title, Text } = Typography;

export default function SelectFreelancerPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = parseInt(params.id as string);
  
  const { data, isLoading, error, refetch } = useJobDetail(jobId);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApply, setSelectedApply] = useState<ResponseDetail.JobApplies['applies'][0] | null>(null);
  const [modalType, setModalType] = useState<'select' | 'reject'>('select');
  
  const { selectFreelancer, rejectApplication } = useJobActions();

  useEffect(() => {
    if (error) {
      message.error('Không thể tải dữ liệu ứng tuyển');
    }
  }, [error]);

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Chưa có thông tin';
    // Try parsing with dayjs for custom format
    const djs = dayjs(dateString, 'DD/MM/YYYY HH:mm:ss', true);
    if (djs.isValid()) {
      return djs.format('DD/MM/YYYY HH:mm');
    }
    // Fallback to native Date for ISO or other formats
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return dayjs(date).format('DD/MM/YYYY HH:mm');
      }
      return 'Ngày không hợp lệ';
    } catch {
      return 'Lỗi định dạng ngày';
    }
  };

  const getStatusColor = (status: string): 'success' | 'processing' | 'error' | 'default' => {
    switch (status) {
      case 'ACCEPT': return 'success';
      case 'PENDING': return 'processing';
      case 'REJECTED': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACCEPT': return 'Đã chọn';
      case 'PENDING': return 'Chờ duyệt';
      case 'REJECTED': return 'Đã từ chối';
      default: return 'Không xác định';
    }
  };

  const openModal = (apply: ResponseDetail.JobApplies['applies'][0], type: 'select' | 'reject') => {
    setSelectedApply(apply);
    setModalType(type);
    setModalVisible(true);
  };

  const handleAction = async () => {
    if (!selectedApply) return;

    setActionLoading(selectedApply.id);
    try {
      if (modalType === 'select') {
        await selectFreelancer(jobId, selectedApply.id);
        message.success('Đã chọn freelancer thành công!');
      } else {
        await rejectApplication(jobId, selectedApply.id);
        message.success('Đã từ chối ứng tuyển thành công!');
      }
      
      refetch();
    } catch (error: unknown) {
      let errorMessage = 'Có lỗi xảy ra';
      if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
      ) {
        errorMessage = (error as { message: string }).message;
      }
      message.error(errorMessage);
    } finally {
      setActionLoading(null);
      setModalVisible(false);
      setSelectedApply(null);
    }
  };

  const hasAcceptedFreelancer = data?.applies?.some(apply => apply.status === 'ACCEPT') || false;

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
            Có lỗi xảy ra khi tải thông tin ứng tuyển. Vui lòng thử lại.
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
          onClick={() => router.back()}
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
                  <Title level={2} style={{ margin: 0, color: '#1f2937', marginBottom: '8px' }}>
                    {data.job.title}
                  </Title>
                  <Space size="large">
                    <div style={{
                      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      border: '1px solid #bfdbfe',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <HugeiconsIcon icon={UserGroupIcon} size={16} color="#3b82f6" />
                      <Text style={{ color: '#1e40af', fontWeight: 600, fontSize: '14px' }}>
                        {data.applies.length} ứng tuyển
                      </Text>
                    </div>
                    <div style={{
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      border: '1px solid #bbf7d0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Text style={{ color: '#15803d', fontWeight: 600, fontSize: '14px' }}>
                        Ngân sách: {formatBudget(data.job.budget)} VNĐ
                      </Text>
                    </div>
                  </Space>
                </div>
              </div>
            </div>

            {data.applies.length === 0 && (
              <div style={{
                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                border: '1px solid #fed7aa',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <HugeiconsIcon icon={MailOpenIcon} size={48} color="#f59e0b" />
                </div>
                <Title level={4} style={{ color: '#92400e', margin: 0, marginBottom: '8px' }}>
                  Chưa có ứng tuyển nào
                </Title>
                <Text style={{ color: '#a16207', fontSize: '14px' }}>
                  Hãy đợi freelancer ứng tuyển hoặc chia sẻ công việc này để thu hút nhiều ứng viên hơn.
                </Text>
              </div>
            )}
          </div>
        </div>

        {data.applies.length > 0 && (
          <Row gutter={[32, 32]}>
            {/* Left Column - Statistics & Timeline */}
            <Col xs={24} lg={10}>
              <div style={{ 
                position: 'sticky', 
                top: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0
              }}>
                <EnhancedStatistics data={data} />
                <JobJourney 
                  jobStatus={data.job.status}
                  postedAt={data.job.createdAt}
                  hasAcceptedFreelancer={hasAcceptedFreelancer}
                  totalApplies={data.applies.length}
                  formatDate={formatDate}
                />
              </div>
            </Col>

            {/* Right Column - Applications */}
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
                    <HugeiconsIcon icon={UserGroupIcon} size={24} color="white" />
                  </div>
                  <div>
                    <Title level={3} style={{ margin: 0, color: '#1f2937' }}>
                      Danh sách ứng tuyển
                    </Title>
                    <Text style={{ color: '#6b7280', fontSize: '14px' }}>
                      Xem xét và chọn freelancer phù hợp nhất
                    </Text>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <DecorativeSeparator />
                </div>

                <div>
                  {data.applies.map((apply, index) => (
                    <ApplicationCard
                      key={apply.id}
                      apply={apply}
                      index={index}
                      data={data}
                      hasAcceptedFreelancer={hasAcceptedFreelancer}
                      actionLoading={actionLoading}
                      formatBudget={formatBudget}
                      formatDate={formatDate}
                      getStatusColor={getStatusColor}
                      getStatusText={getStatusText}
                      openModal={openModal}
                    />
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        )}

        {/* Confirmation Modal */}
        <Modal
          title={
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 0'
            }}>
              <div style={{
                background: modalType === 'select' 
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                borderRadius: '8px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <HugeiconsIcon 
                  icon={modalType === 'select' ? UserGroupIcon : ArrowLeft01Icon} 
                  size={20} 
                  color="white" 
                />
              </div>
              <Text strong style={{ fontSize: '18px', color: '#1f2937' }}>
                {modalType === 'select' ? 'Xác nhận chọn freelancer' : 'Xác nhận từ chối ứng tuyển'}
              </Text>
            </div>
          }
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button 
              key="cancel" 
              onClick={() => setModalVisible(false)}
              size="large"
              style={{
                borderRadius: '12px',
                height: '44px',
                padding: '0 24px',
                fontWeight: 500
              }}
            >
              Hủy
            </Button>,
            <Button 
              key="confirm" 
              type="primary" 
              loading={actionLoading === selectedApply?.id}
              onClick={handleAction}
              size="large"
              style={{
                background: modalType === 'select' 
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                borderColor: modalType === 'select' ? '#10b981' : '#ef4444',
                borderRadius: '12px',
                height: '44px',
                padding: '0 24px',
                fontWeight: 600,
                boxShadow: modalType === 'select' 
                  ? '0 4px 12px rgba(16, 185, 129, 0.3)'
                  : '0 4px 12px rgba(239, 68, 68, 0.3)'
              }}
            >
              {modalType === 'select' ? 'Chọn freelancer' : 'Từ chối'}
            </Button>
          ]}
          width={600}
          style={{
            borderRadius: '20px'
          }}
        >
          <div style={{ padding: '16px 0' }}>
            {selectedApply && (
              <div style={{
                background: modalType === 'select' 
                  ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                  : 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
                padding: '20px',
                borderRadius: '12px',
                border: `1px solid ${modalType === 'select' ? '#bbf7d0' : '#fca5a5'}`
              }}>
                <Text style={{ 
                  color: '#4b5563', 
                  fontSize: '15px',
                  lineHeight: 1.6
                }}>
                  {modalType === 'select' 
                    ? `Bạn có chắc chắn muốn chọn "${selectedApply.freelancer.fullName}" cho dự án này? Sau khi chọn, bạn sẽ không thể thay đổi quyết định.`
                    : `Bạn có chắc chắn muốn từ chối ứng tuyển của "${selectedApply.freelancer.fullName}"? Hành động này không thể hoàn tác.`
                  }
                </Text>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
} 