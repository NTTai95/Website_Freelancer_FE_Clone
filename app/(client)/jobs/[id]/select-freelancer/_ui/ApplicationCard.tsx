/**
 * @file ApplicationCard.tsx
 * @description Component hiển thị chi tiết một ứng tuyển với đầy đủ thông tin freelancer.
 * Bao gồm thông tin cá nhân, giá đề xuất, thời gian, tỷ lệ ngân sách và các action buttons.
 * Hỗ trợ animation fadeIn với delay dựa trên index và xử lý các trạng thái khác nhau.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {object} props.apply - Thông tin ứng tuyển từ API
 * @param {number} props.index - Vị trí trong danh sách (dùng cho animation delay)
 * @param {object} props.data - Dữ liệu tổng thể job để tính tỷ lệ ngân sách
 * @param {boolean} props.hasAcceptedFreelancer - Trạng thái đã chọn freelancer
 * @param {number|null} props.actionLoading - ID ứng tuyển đang loading action
 * @param {function} props.formatBudget - Hàm format số tiền
 * @param {function} props.formatDate - Hàm format ngày tháng
 * @param {function} props.getStatusColor - Hàm lấy màu theo trạng thái
 * @param {function} props.getStatusText - Hàm lấy text theo trạng thái
 * @param {function} props.openModal - Hàm mở modal xác nhận
 * @returns {React.ReactElement} Card ứng tuyển với animation và interactive elements
 */
'use client';

import { Card, Typography, Row, Col, Avatar, Space, Button, Badge, Tooltip, App } from 'antd';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  UserIcon,
  Dollar01Icon,
  Tick02Icon,
  Cancel01Icon,
  ViewIcon,
  Mail01Icon,
  StarIcon,
  Calendar03Icon,
  PercentIcon,
  TimeQuarterIcon
} from '@hugeicons/core-free-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResponseDetail } from '@/types/respones/detail';
import ExpandableParagraph from './ExpandableParagraph';
import { useEffect, useRef, useState } from 'react';
import { useAnimation } from 'framer-motion';
import { motion } from 'framer-motion';
import { Status } from '@/types/status';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/store/volatile/messageSlice';

const { Title, Text, Paragraph } = Typography;

interface ApplicationCardProps {
  apply: ResponseDetail.JobApplies['applies'][0];
  index: number;
  data: ResponseDetail.JobApplies;
  hasAcceptedFreelancer: boolean;
  actionLoading: number | null;
  formatBudget: (amount: number) => string;
  formatDate: (dateString: string) => string;
  openModal: (apply: ResponseDetail.JobApplies['applies'][0], type: 'select' | 'reject') => void;
}

export default function ApplicationCard({
  apply,
  index,
  data,
  hasAcceptedFreelancer,
  actionLoading,
  formatBudget,
  formatDate,
  openModal
}: ApplicationCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [hasScrolled, setHasScrolled] = useState(false);

  const select = decodeURIComponent(searchParams.get('select') || '');
  const isSelected = select && select === apply.freelancer.fullName;

  const controls = useAnimation();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(apply.freelancer.email)
      .then(() => {
        dispatch(addMessage({
          key: 'copy-email',
          type: 'success',
          content: `Đã copy email`
        }));
      })
      .catch(() => {
        dispatch(addMessage({
          key: 'copy-email',
          type: 'error',
          content: `Không thể copy email`
        }));
      });
  };

  useEffect(() => {
    if (isSelected && !hasScrolled) {
      requestAnimationFrame(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      setHasScrolled(true);

      controls.start({
        opacity: [1, 0.4, 1, 0.4, 1, 0.4, 1, 0.4, 1],
        transition: { duration: 1.7 },
      }).then(() => {
        const newUrl = window.location.pathname;
        router.replace(newUrl, { scroll: false });
      });
    }
  }, [isSelected, hasScrolled, controls, router]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 1 }}
      style={{
        padding: '20px',
        margin: '10px',
        backgroundColor: isSelected ? '#40A3FF' : 'transparent',
        animationDelay: `${index * 700}ms`,
        borderRadius: '16px'
      }}
    >
      <Card
        style={{
          marginBottom: 24,
          borderColor: '#e2e8f0',
          borderRadius: 16,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0'
        }}
        className={`group hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 ${apply.status === 'ACCEPT' ? 'border-green-300 bg-green-50' : ''
          }`}
        styles={{ body: { padding: '28px' } }}
      >
        {/* Freelancer Header với improved spacing */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div style={{ position: 'relative' }}>
              <Avatar
                size={72}
                src={apply.freelancer.avatar}
                icon={<HugeiconsIcon icon={UserIcon} size={32} color="#6b7280" />}
                style={{
                  border: '3px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
              {apply.status === 'ACCEPT' && (
                <div style={{
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  background: '#10b981',
                  borderRadius: '50%',
                  padding: 4,
                  border: '2px solid white'
                }}>
                  <HugeiconsIcon icon={Tick02Icon} size={16} color="white" />
                </div>
              )}
            </div>
            <div>
              <Title level={4} style={{ margin: 0, marginBottom: 8, color: '#1f2937' }}>
                {apply.freelancer.fullName}
              </Title>
              <Space size="large">
                <Space size="small">
                  <div style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    borderRadius: 8,
                    padding: '4px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}>
                    <HugeiconsIcon icon={StarIcon} size={14} color="white" />
                    <Text strong style={{ color: 'white', fontSize: 13 }}>
                      {apply.freelancer.reputation.toFixed(1)}
                    </Text>
                  </div>
                </Space>
                <Tooltip title={apply.freelancer.email}>
                  <Button
                    type="text"
                    size="small"
                    icon={<HugeiconsIcon icon={Mail01Icon} size={16} color="#6b7280" />}
                    className="hover:bg-blue-50"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8
                    }}
                    onClick={handleCopyEmail}
                  />
                </Tooltip>
                <Button
                  type="text"
                  size="small"
                  icon={<HugeiconsIcon icon={ViewIcon} size={16} color="#355a8e" />}
                  className="hover:bg-blue-50"
                  onClick={() => window.open(`/freelancers/${apply.freelancer.id}`, '_blank')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    padding: '4px 12px'
                  }}
                >
                  <span style={{ fontSize: 13, color: '#355a8e', fontWeight: 500 }} >
                    Xem hồ sơ
                  </span>
                </Button>
              </Space>
            </div>
          </div>
          <div className="text-right">
            <Badge
              color={Status.Meta[apply.status].color}
              text={
                <span style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: apply.status === 'ACCEPT' ? '#10b981' :
                    apply.status === 'REJECTED' ? '#ef4444' : '#f59e0b'
                }}>
                  {Status.Meta[apply.status].label}
                </span>
              }
            />
            <div className="mt-3 text-gray-500 text-sm flex items-center gap-2">
              <HugeiconsIcon icon={Calendar03Icon} size={14} color="#6b7280" />
              {formatDate(apply.createdAt)}
            </div>
          </div>
        </div>

        {/* Bid Information Grid với improved design */}
        <Row gutter={[32, 32]} className="mb-10">
          <Col span={12}>
            <div style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              padding: 20,
              borderRadius: 16,
              border: '1px solid #bfdbfe',
              minHeight: 70,
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              marginBottom: 0,
              marginTop: 12
            }} className="hover:shadow-lg">
              <div className="flex items-center gap-2 w-full">
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  borderRadius: 8,
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 28,
                  minHeight: 28
                }}>
                  <HugeiconsIcon icon={Dollar01Icon} size={14} color="white" strokeWidth={2} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: '#64748b', fontSize: 12, marginBottom: 2, fontWeight: 500, whiteSpace: 'nowrap' }}>
                    Giá đề xuất
                  </div>
                  <Text strong style={{ color: '#1e293b', fontSize: 16, lineHeight: 1, whiteSpace: 'nowrap' }}>
                    {formatBudget(apply.bidAmount)} VNĐ
                  </Text>
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: 20,
              borderRadius: 16,
              border: '1px solid #bbf7d0',
              minHeight: 70,
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              marginBottom: 0,
              marginTop: 12
            }} className="hover:shadow-lg">
              <div className="flex items-center gap-2 w-full">
                <div style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: 8,
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 28,
                  minHeight: 28
                }}>
                  <HugeiconsIcon icon={TimeQuarterIcon} size={14} color="white" strokeWidth={2} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: '#64748b', fontSize: 12, marginBottom: 2, fontWeight: 500, whiteSpace: 'nowrap' }}>
                    Thời gian ước tính
                  </div>
                  <Text strong style={{ color: '#1e293b', fontSize: 16, lineHeight: 1, whiteSpace: 'nowrap' }}>
                    {apply.estimatedHours}h
                  </Text>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div style={{ height: 32 }} />

        {/* Application Content với enhanced styling */}
        <div className="mb-6">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 16
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              borderRadius: 8,
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HugeiconsIcon icon={Mail01Icon} size={16} color="white" />
            </div>
            <Text strong style={{ fontSize: 16, color: '#1f2937' }}>
              Thư ứng tuyển:
            </Text>
          </div>
          <ExpandableParagraph content={apply.content} />
        </div>

        {/* Action Buttons với improved spacing và design */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          {apply.status === 'PENDING' && !hasAcceptedFreelancer && (
            <>
              <Button
                danger
                size="large"
                loading={actionLoading === apply.id}
                onClick={() => openModal(apply, 'reject')}
                style={{
                  borderRadius: 12,
                  height: 44,
                  padding: '0 24px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
                Từ chối
              </Button>
              <Button
                type="primary"
                size="large"
                loading={actionLoading === apply.id}
                onClick={() => openModal(apply, 'select')}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderColor: '#10b981',
                  borderRadius: 12,
                  height: 44,
                  padding: '0 24px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}
              >
                <HugeiconsIcon icon={Tick02Icon} size={18} />
                Chọn freelancer
              </Button>
            </>
          )}
          {apply.status === 'ACCEPT' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 8,
              marginLeft: 0,
              background: '#f0fdf4',
              border: '1.5px solid #10b981',
              borderRadius: 20,
              padding: '4px 14px',
              width: 'fit-content',
              boxShadow: 'none',
              fontSize: 14,
              fontWeight: 600,
              color: '#059669',
              gap: 6
            }}>
              <HugeiconsIcon icon={Tick02Icon} size={16} color="#10b981" />
              Freelancer đã được chọn
            </div>
          )}
          {apply.status === 'REJECTED' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 8,
              marginLeft: 0,
              background: '#fef2f2',
              border: '1.5px solid #ef4444',
              borderRadius: 20,
              padding: '4px 14px',
              width: 'fit-content',
              boxShadow: 'none',
              fontSize: 14,
              fontWeight: 600,
              color: '#ef4444',
              gap: 6
            }}>
              <HugeiconsIcon icon={Cancel01Icon} size={16} color="#ef4444" />
              Đã từ chối ứng tuyển
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
} 