/**
 * @file MilestoneDetailPage.tsx
 * @description Trang chi tiết milestone với layout responsive và design system đồng nhất.
 * Hiển thị thông tin chi tiết milestone, freelancer, job, products và disputes.
 * Sử dụng gradient background và modern UI components.
 * 
 * @component
 * @returns {React.ReactElement} Trang chi tiết milestone với đầy đủ thông tin
 * 
 * @example
 * // Được sử dụng tại route: /jobs/[id]/milestones/[milestoneId]
 * <MilestoneDetailPage />
 */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spin, Row, Col, message, Button, Typography, Space } from "antd";
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, RefreshIcon, TaskDaily01Icon } from '@hugeicons/core-free-icons';
import MilestoneHeader from "./_ui/MilestoneHeader";
import FreelancerInfo from "./_ui/FreelancerInfo";
import JobInfo from "./_ui/JobInfo";
import ProductList from "./_ui/ProductList";
import DisputeList from "./_ui/DisputeList";
import type { ResponseDetail } from "@/types/respones/detail";
import { apiMilestoneDetail } from "@/api/detail";

const { Title, Text } = Typography;

export default function MilestoneDetailPage() {
  const router = useRouter();
  const { id, milestoneId } = useParams() as { id: string; milestoneId: string };
  const [data, setData] = useState<ResponseDetail.MilestoneDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMilestone = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Starting API call...", { id, milestoneId });
      const response = await apiMilestoneDetail(parseInt(id), parseInt(milestoneId));
      console.log("API response:", response);
      setData(response);
    } catch (err: unknown) {
      console.error("API Error:", err);
      const errorMessage = err instanceof Error ? err.message : "Không thể tải dữ liệu milestone";
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && milestoneId) {
      fetchMilestone();
    }
  }, [id, milestoneId]);

  const handleBack = () => {
    router.push(`/jobs/${id}/milestones`);
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
            {error || "Không thể tải dữ liệu milestone."}
          </Text>
          <Space>
            <Button 
              onClick={handleBack}
              icon={<HugeiconsIcon icon={ArrowLeft01Icon} size={16} />}
              style={{
                borderRadius: '12px',
                height: '44px',
                padding: '0 24px',
                fontWeight: 600
              }}
            >
              Quay lại
            </Button>
            <Button 
              type="primary" 
              onClick={fetchMilestone}
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
              Thử lại
            </Button>
          </Space>
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
          <span style={{ color: '#355a8e', fontWeight: 500 }}>Quay lại danh sách</span>
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
                <div style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  borderRadius: '16px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <HugeiconsIcon icon={TaskDaily01Icon} size={28} color="white" strokeWidth={1.8} />
                </div>
                <div>
                  <Title level={2} style={{ margin: 0, color: '#1f2937', marginBottom: '8px' }}>
                    Chi tiết giai đoạn #{milestoneId}
                  </Title>
                  <Text style={{ color: '#6b7280', fontSize: '14px' }}>
                    Thông tin chi tiết về milestone và tiến độ thực hiện
                  </Text>
                </div>
              </div>
              <div>
                <Button 
                  type="primary" 
                  onClick={fetchMilestone}
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
          </div>
        </div>

        {/* Content Grid với sticky sidebar */}
        <Row gutter={[32, 32]}>
          {/* Left Column - Milestone Info & Freelancer */}
          <Col xs={24} lg={8}>
            <div style={{ 
              position: 'sticky', 
              top: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              <MilestoneHeader milestone={data.milestone} />
              <FreelancerInfo freelancer={data.freelancer} />
            </div>
          </Col>

          {/* Right Column - Job Info, Products & Disputes */}
          <Col xs={24} lg={16}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <JobInfo job={data.job} />
              <ProductList products={data.products} />
              <DisputeList disputes={data.disputes} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
} 