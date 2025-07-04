/**
 * @file PersonalInfo.tsx
 * @description Component hiển thị thông tin cá nhân và liên hệ của nhà tuyển dụng.
 * Professional design với contact info, personal details và performance metrics.
 * Tối ưu cho sidebar layout với proper spacing và interactive elements.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {object} props.data - Dữ liệu profile nhà tuyển dụng từ API
 * @returns {React.ReactElement} Contact & Personal info card với modern design
 */
'use client';

import { Card, Typography, Divider, message } from 'antd';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  Contact01Icon,
  Mail01Icon,
  Calendar03Icon,
  UserIcon,
  Award01Icon,
  Award02Icon
} from '@hugeicons/core-free-icons';
import { ResponseDetail } from '@/types/respones/detail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const { Text } = Typography;

interface PersonalInfoProps {
  data: ResponseDetail.EmployerProfile;
}

export default function PersonalInfo({ data }: PersonalInfoProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Chưa có thông tin';
    try {
      // Handle format "DD/MM/YYYY HH:mm:ss" or "DD/MM/YYYY"
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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success(`Đã sao chép ${type}!`);
    }).catch(() => {
      message.error('Không thể sao chép!');
    });
  };

  const getSuccessRate = () => {
    if (data.totalJobs === 0) return 0;
    return Math.round((data.totalCompletedJobs / data.totalJobs) * 100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Bio */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FontAwesomeIcon icon={faBook} color="#1e40af"  />
            <span style={{ color: '#1f2937', fontSize: '16px', fontWeight: 600 }}>
              Giới thiệu
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
              &ldquo;{data.bio}&rdquo;
            </Text>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HugeiconsIcon icon={Contact01Icon} size={18} color="#1e40af" />
            <span style={{ color: '#1f2937', fontSize: '16px', fontWeight: 600 }}>
              Thông tin liên hệ
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Email */}
          <div
            style={{
              background: '#f8fafc',
              borderRadius: '8px',
              padding: '12px',
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            className="hover:bg-blue-50 hover:border-blue-200"
            onClick={() => copyToClipboard(data.email, 'email')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <HugeiconsIcon icon={Mail01Icon} size={14} color="#1e40af" />
              <Text style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600 }}>
                EMAIL
              </Text>
            </div>
            <Text style={{
              color: '#1e40af',
              fontSize: '13px',
              fontWeight: 600,
              wordBreak: 'break-all'
            }}>
              {data.email}
            </Text>
          </div>

          {/* Phone */}
          <div
            style={{
              background: '#f8fafc',
              borderRadius: '8px',
              padding: '12px',
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            className="hover:bg-green-50 hover:border-green-200"
            onClick={() => copyToClipboard(data.phone, 'số điện thoại')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <HugeiconsIcon icon={Contact01Icon} size={14} color="#10b981" />
              <Text style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600 }}>
                ĐIỆN THOẠI
              </Text>
            </div>
            <Text style={{
              color: '#10b981',
              fontSize: '14px',
              fontWeight: 700
            }}>
              {data.phone}
            </Text>
          </div>

          {/* Personal Details */}
          <Divider style={{ margin: '8px 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Birthday */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HugeiconsIcon icon={Calendar03Icon} size={12} color="#6b7280" />
                <Text style={{ color: '#6b7280', fontSize: '11px' }}>Sinh ngày</Text>
              </div>
              <Text style={{ color: '#1f2937', fontSize: '12px', fontWeight: 600 }}>
                {formatDate(data.birthday)}
              </Text>
            </div>

            {/* Gender & Age */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HugeiconsIcon icon={UserIcon} size={12} color="#6b7280" />
                <Text style={{ color: '#6b7280', fontSize: '11px' }}>Giới tính</Text>
              </div>
              <Text style={{ color: '#1f2937', fontSize: '12px', fontWeight: 600 }}>
                {data.isMale ? 'Nam' : 'Nữ'} • {data.age} tuổi
              </Text>
            </div>

            {/* Join Date */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HugeiconsIcon icon={Calendar03Icon} size={12} color="#6b7280" />
                <Text style={{ color: '#6b7280', fontSize: '11px' }}>Tham gia</Text>
              </div>
              <Text style={{ color: '#1f2937', fontSize: '12px', fontWeight: 600 }}>
                {formatDate(data.joinedAt)}
              </Text>
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HugeiconsIcon icon={Award02Icon} size={18} color="#f59e0b" />
            <span style={{ color: '#1f2937', fontSize: '16px', fontWeight: 600 }}>
              Hiệu suất làm việc
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Success Rate */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #bbf7d0',
            textAlign: 'center'
          }}>
            <Text style={{
              color: '#16a34a',
              fontSize: '24px',
              fontWeight: 700,
              display: 'block',
              marginBottom: '4px'
            }}>
              {getSuccessRate()}%
            </Text>
            <Text style={{ color: '#15803d', fontSize: '11px', fontWeight: 600 }}>
              Tỷ lệ thành công
            </Text>
          </div>

          {/* Project Stats */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{
              background: '#f0f9ff',
              borderRadius: '8px',
              padding: '12px',
              border: '1px solid #bfdbfe',
              flex: 1,
              textAlign: 'center'
            }}>
              <Text style={{
                color: '#1e40af',
                fontSize: '18px',
                fontWeight: 700,
                display: 'block'
              }}>
                {data.totalJobs}
              </Text>
              <Text style={{ color: '#1e3a8a', fontSize: '10px', fontWeight: 600 }}>
                Dự án
              </Text>
            </div>

            <div style={{
              background: '#f0fdf4',
              borderRadius: '8px',
              padding: '12px',
              border: '1px solid #bbf7d0',
              flex: 1,
              textAlign: 'center'
            }}>
              <Text style={{
                color: '#16a34a',
                fontSize: '18px',
                fontWeight: 700,
                display: 'block'
              }}>
                {data.totalCompletedJobs}
              </Text>
              <Text style={{ color: '#15803d', fontSize: '10px', fontWeight: 600 }}>
                Hoàn thành
              </Text>
            </div>
          </div>

          {/* Reputation & Reviews */}
          <Divider style={{ margin: '8px 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HugeiconsIcon icon={Award01Icon} size={12} color="#6b7280" />
                <Text style={{ color: '#6b7280', fontSize: '11px' }}>Uy tín</Text>
              </div>
              <Text style={{ color: '#1f2937', fontSize: '12px', fontWeight: 600 }}>
                {data.reputation} điểm
              </Text>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HugeiconsIcon icon={Award02Icon} size={12} color="#6b7280" />
                <Text style={{ color: '#6b7280', fontSize: '11px' }}>Đánh giá</Text>
              </div>
              <Text style={{ color: '#1f2937', fontSize: '12px', fontWeight: 600 }}>
                {data.averageRating}/5 ⭐ ({data.totalReviews} đánh giá)
              </Text>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}