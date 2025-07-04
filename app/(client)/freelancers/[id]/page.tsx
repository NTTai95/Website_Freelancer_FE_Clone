/**
 * @file FreelancerPage.tsx
 * @description Trang hiển thị hồ sơ chi tiết của freelancer.
 * Bao gồm thống kê hoạt động, thông tin cá nhân, kỹ năng, chứng chỉ, học vấn và đánh giá.
 * Layout responsive với 2 cột: cột trái chứa thông tin chính, cột phải chứa thông tin cá nhân và kỹ năng.
 * 
 * @component
 * @returns {React.ReactElement} Trang hồ sơ freelancer với layout responsive
 * 
 * @example
 * // Được sử dụng tại route: /freelancers/[id]
 * <FreelancerPage />
 */
'use client';

import { Row, Col, Spin, Alert } from 'antd';
import { useFreelancerProfile } from '@/hooks/useFreelancerProfile';
import ActivityStats from './_ui/ActivityStats';
import PersonalInfo from './_ui/PersonalInfo';
import SkillsSection from './_ui/SkillsSection';
import CertificationsSection from './_ui/CertificationsSection';
import EducationSection from './_ui/EducationSection';
import TopReviews from './_ui/TopReviews';
import { useParams } from 'next/navigation';

export default function FreelancerPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data, loading, error } = useFreelancerProfile({ id });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Alert
          message="Lỗi tải dữ liệu"
          description={error || 'Không thể tải thông tin freelancer'}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="w-full !p-16">
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} lg={8}>
          <div className="flex flex-col gap-y-6">
            <PersonalInfo data={data} />
            <SkillsSection data={data} />
          </div>
        </Col>
        <Col xs={24} lg={16}>
          <div className="flex flex-col gap-y-6">
            <ActivityStats data={data} />
            <CertificationsSection data={data} />
            <EducationSection data={data} />
            <TopReviews data={data} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
