'use client';

import { Row, Col, Spin, Alert } from 'antd';
import { useFreelancerProfile } from '@/hooks/useFreelancerProfile';
import ActivityStats from './_ui/ActivityStats';
import PersonalInfo from './_ui/PersonalInfo';
import SkillsSection from './_ui/SkillsSection';
import CertificationsSection from './_ui/CertificationsSection';
import EducationSection from './_ui/EducationSection';
import TopReviews from './_ui/TopReviews';

export default function FreelancerPage() {
  const { data, loading, error } = useFreelancerProfile();

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
    <div className="min-h-screen bg-gray-50 py-8 flex justify-center">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            <Row gutter={[24, 24]} justify="center">
              <Col xs={24} lg={16}>
                <div className="space-y-6">
                  <ActivityStats data={data} />
                  <TopReviews />
                  <CertificationsSection data={data} />
                  <EducationSection data={data} />
                </div>
              </Col>
              
              <Col xs={24} lg={8}>
                <div className="space-y-6">
                  <PersonalInfo data={data} />
                  <SkillsSection data={data} />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
