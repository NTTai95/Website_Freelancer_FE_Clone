/**
 * @file TopReviews.tsx
 * @description Component hiển thị top reviews từ freelancers với design hiện đại.
 * Layout sạch sẽ, dễ đọc với card-based design và proper spacing.
 * Tối ưu cho sidebar layout trong employers profile.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {object} props.data - Dữ liệu employer profile chứa topReviews
 * @returns {React.ReactElement} Reviews component với modern design
 */
'use client';

import { Card, Avatar, Rate, Typography, Empty, Badge, Divider } from 'antd';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  StarIcon,
  UserIcon,
  Calendar03Icon,
  MoneyBag02Icon
} from '@hugeicons/core-free-icons';
import { ResponseDetail } from '@/types/respones/detail';

const { Text } = Typography;

interface TopReviewsProps {
  data: ResponseDetail.EmployerProfile;
}

export default function TopReviews({ data }: TopReviewsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

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

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HugeiconsIcon icon={StarIcon} size={20} color="#fbbf24" />
          <span style={{ color: '#1f2937', fontSize: '16px', fontWeight: 600 }}>
            Đánh giá nổi bật
          </span>
        </div>
      }
      style={{
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e5e7eb'
      }}
      styles={{
        header: {
          borderBottom: '1px solid #f3f4f6',
          padding: '16px 20px'
        },
        body: {
          padding: '20px'
        }
      }}
    >
      {!data.topReviews || data.topReviews.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div style={{ textAlign: 'center' }}>
              <Text style={{ color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                Chưa có đánh giá
              </Text>
              <Text style={{ color: '#9ca3af', fontSize: '12px' }}>
                Hoàn thành dự án đầu tiên để nhận đánh giá
              </Text>
            </div>
          }
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {data.topReviews.slice(0, 3).map((review, index) => {

            return (
              <div key={review.id} style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #f3f4f6',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
                className="hover:shadow-md hover:-translate-y-1"
              >
                {/* Freelancer Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <Avatar
                    size={40}
                    src={review.freelancerAvatar}
                    icon={<HugeiconsIcon icon={UserIcon} size={18} />}
                    style={{
                      border: '2px solid #e5e7eb',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <Text strong style={{
                      color: '#1f2937',
                      fontSize: '14px',
                      display: 'block',
                      marginBottom: '2px'
                    }}>
                      {review.freelancerName}
                    </Text>
                    <Badge
                      count="Freelancer"
                      style={{
                        backgroundColor: '#e0e7ff',
                        color: '#3730a3',
                        fontSize: '10px',
                        height: '16px',
                        lineHeight: '16px',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                </div>

                {/* Rating */}
                <div style={{ marginBottom: '12px' }}>
                  <Rate
                    disabled
                    value={review.rating}
                    style={{ fontSize: '14px' }}
                  />
                </div>

                {/* Job Title */}
                <div style={{ marginBottom: '12px' }}>
                  <Text style={{
                    color: '#4f46e5',
                    fontSize: '13px',
                    fontWeight: 500,
                    display: 'block'
                  }}>
                    {review.jobTitle}
                  </Text>
                </div>

                {/* Review Content */}
                <div style={{
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                  borderLeft: '3px solid #0ea5e9',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '12px'
                }}>
                  <Text style={{
                    color: '#374151',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    fontStyle: 'italic'
                  }}>
                    &ldquo;{review.content}&rdquo;
                  </Text>
                </div>

                {/* Project Details */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '8px',
                  borderTop: '1px solid #f3f4f6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <HugeiconsIcon icon={Calendar03Icon} size={12} color="#6b7280" />
                    <Text style={{ fontSize: '11px', color: '#6b7280' }}>
                      {formatDate(review.jobCompletedAt)}
                    </Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <HugeiconsIcon icon={MoneyBag02Icon} size={12} color="#059669" />
                    <Text style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>
                      {formatCurrency(review.actualBudget)}
                    </Text>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Summary */}
          {data.topReviews.length > 3 && (
            <>
              <Divider style={{ margin: '8px 0' }} />
              <div style={{ textAlign: 'center' }}>
                <Text style={{ color: '#6b7280', fontSize: '12px' }}>
                  Hiển thị 3/{data.topReviews.length} đánh giá cao nhất
                </Text>
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  );
} 