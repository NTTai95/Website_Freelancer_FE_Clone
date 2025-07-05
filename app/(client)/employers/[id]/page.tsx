/**
 * @file EmployerPage.tsx
 * @description Professional Business Profile layout cho nhà tuyển dụng.
 * Thiết kế theo hướng LinkedIn/business profile với hero section, portfolio showcase,
 * performance dashboard, và professional layout 3-column sáng tạo và hiện đại.
 * 
 * @component
 * @returns {React.ReactElement} Professional business profile với layout độc đáo
 * 
 * @example
 * // Được sử dụng tại route: /employers/[id]
 * <EmployerPage />
 */
'use client';

import { Row, Col, Spin, Button, Typography, Avatar, Tag, Rate, Badge } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  UserIcon,
  BriefcaseIcon,
  MailOpen01Icon,
  EyeIcon
} from '@hugeicons/core-free-icons';
import { useEmployerProfile } from '@/hooks/useEmployerProfile';
import PersonalInfo from './_ui/PersonalInfo';
import ActiveJobsSection from './_ui/ActiveJobsSection';
import TopReviews from './_ui/TopReviews';

const { Title, Text, Paragraph } = Typography;

export default function EmployerPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { data, loading, error } = useEmployerProfile({ id });

  console.log(data);

  const handleBack = () => {
    router.back();
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Chưa có thông tin';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return 'Ngày không hợp lệ';
    }
  };



  if (loading) {
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
            Có lỗi xảy ra khi tải thông tin nhà tuyển dụng. Vui lòng thử lại.
          </Text>
          <Button
            type="primary"
            onClick={() => window.location.reload()}
            size="large"
            style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
              borderColor: '#1e40af',
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
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    }}>
      {/* Main Container */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Hero Profile Section */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
          borderRadius: '24px',
          padding: '40px 32px',
          marginBottom: '32px',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <Row gutter={[40, 24]} align="middle">
              {/* Profile Info */}
              <Col xs={24} lg={16}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                  <Avatar
                    size={120}
                    src={data.avatar}
                    icon={<HugeiconsIcon icon={UserIcon} size={40} />}
                    style={{
                      border: '4px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                    }}
                  />
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <Title level={2} style={{ color: 'white', margin: 0, marginBottom: '8px' }}>
                      {data.fullName}
                    </Title>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                      <Tag
                        icon={<HugeiconsIcon icon={BriefcaseIcon} size={12} />}
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          border: 'none',
                          fontSize: '13px',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        Nhà tuyển dụng
                      </Tag>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Rate disabled defaultValue={data.averageRating} style={{ fontSize: '16px' }} />
                        <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', marginLeft: '4px' }}>
                          {data.averageRating.toFixed(1)} ({formatNumber(data.totalReviews)} đánh giá)
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              {/* Quick Actions */}
              <Col xs={24} lg={8}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <Button
                      type="primary"
                      size="large"
                      icon={<HugeiconsIcon icon={MailOpen01Icon} size={18} />}
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: '#1e40af',
                        borderColor: 'transparent',
                        borderRadius: '12px',
                        height: '48px',
                        padding: '0 24px',
                        fontWeight: 600
                      }}
                    >
                      Liên hệ
                    </Button>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '16px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', display: 'block' }}>
                      Thành viên từ
                    </Text>
                    <Text style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>
                      {formatDate(data.joinedAt)}
                    </Text>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* Main Content */}
        <Row gutter={[24, 24]}>
          {/* Left Sidebar - Contact & Stats */}
          <Col xs={24} lg={6}>
            <div style={{ position: 'sticky', top: '120px' }}>
              <PersonalInfo data={data} />
            </div>
          </Col>

          {/* Center Content - Portfolio */}
          <Col xs={24} lg={12}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <ActiveJobsSection data={data} />
            </div>
          </Col>

          {/* Right Sidebar - Reviews & Activity */}
          <Col xs={24} lg={6}>
            <div style={{ position: 'sticky', top: '120px' }}>
              <TopReviews data={data} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
