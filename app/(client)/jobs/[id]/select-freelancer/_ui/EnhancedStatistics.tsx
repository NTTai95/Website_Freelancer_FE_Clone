/**
 * @file EnhancedStatistics.tsx
 * @description Component hiển thị thống kê ứng tuyển với design nâng cao.
 * Bao gồm progress bars, percentages, và visual indicators để tạo trải nghiệm đẹp mắt.
 * Thay thế JobStats cũ với layout responsive và animation effects.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {object} props.data - Dữ liệu thống kê ứng tuyển từ API
 * @returns {React.ReactElement} Enhanced statistics panel với visual charts
 */
'use client';

import { Progress, Typography, Divider } from 'antd';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  Clock01Icon,
  Tick02Icon,
  Cancel01Icon,
  Analytics01Icon,
  BarChartIcon
} from '@hugeicons/core-free-icons';
import { ResponseDetail } from '@/types/respones/detail';

const { Text } = Typography;

interface EnhancedStatisticsProps {
  data: ResponseDetail.JobApplies;
}

export default function EnhancedStatistics({ data }: EnhancedStatisticsProps) {
  if (!data) {
    return null;
  }

  const total = data.totalApplies || 0;
  const pending = data.pendingApplies || 0;
  const accepted = data.acceptedApplies || 0;
  const rejected = data.rejectedApplies || 0;

  const pendingPercent = total > 0 ? Math.round((pending / total) * 100) : 0;
  const acceptedPercent = total > 0 ? Math.round((accepted / total) * 100) : 0;
  const rejectedPercent = total > 0 ? Math.round((rejected / total) * 100) : 0;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
      borderRadius: 24,
      padding: 32,
      marginBottom: 32,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0',
      minWidth: 0
    }}>
      {/* Header Section */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <div style={{
          background: 'linear-gradient(135deg, #355a8e 0%, #01204b 100%)',
          borderRadius: 16,
          padding: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
          minWidth: 44,
          minHeight: 44
        }}>
          <HugeiconsIcon icon={Analytics01Icon} size={28} color="white" strokeWidth={1.8} />
        </div>
        <div style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 700, color: '#1f2937', display: 'block', marginBottom: 2 }}>
            Thống kê ứng tuyển
          </Text>
          <div style={{ color: '#6b7280', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <HugeiconsIcon icon={BarChartIcon} size={20} color="#6b7280" />
            Tổng quan tình hình tuyển dụng
          </div>
        </div>
        <div style={{ textAlign: 'right', minWidth: 60 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#355a8e', lineHeight: 1 }}>{total}</div>
          <Text style={{ color: '#6b7280', fontSize: 13, fontWeight: 500 }}>Tổng ứng tuyển</Text>
        </div>
      </div>
      {/* Cards Section */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        {/* Pending */}
        <div
          className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            border: '1.5px solid #fbbf24',
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 0,
            transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          <div style={{
            background: '#fbbf24',
            borderRadius: 12,
            padding: 8,
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <HugeiconsIcon icon={Clock01Icon} size={28} color="white" strokeWidth={2} />
          </div>
          <Text style={{ fontSize: 16, fontWeight: 700, color: '#b45309', marginBottom: 2 }}>Chờ xử lý</Text>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#f59e0b', marginBottom: 4 }}>{pending}</div>
          <Progress percent={pendingPercent} strokeColor="#fbbf24" trailColor="#fef3c7" showInfo={false} style={{ width: '100%', marginBottom: 2 }} />
          <div style={{ color: '#b45309', fontWeight: 600, fontSize: 13 }}>{pendingPercent}%</div>
        </div>
        {/* Accepted */}
        <div
          className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            border: '1.5px solid #10b981',
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 0,
            transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          <div style={{
            background: '#10b981',
            borderRadius: 12,
            padding: 8,
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <HugeiconsIcon icon={Tick02Icon} size={28} color="white" strokeWidth={2} />
          </div>
          <Text style={{ fontSize: 16, fontWeight: 700, color: '#059669', marginBottom: 2 }}>Đã chấp nhận</Text>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#10b981', marginBottom: 4 }}>{accepted}</div>
          <Progress percent={acceptedPercent} strokeColor="#10b981" trailColor="#dcfce7" showInfo={false} style={{ width: '100%', marginBottom: 2 }} />
          <div style={{ color: '#059669', fontWeight: 600, fontSize: 13 }}>{acceptedPercent}%</div>
        </div>
        {/* Rejected */}
        <div
          className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
            border: '1.5px solid #ef4444',
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 0,
            transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          <div style={{
            background: '#ef4444',
            borderRadius: 12,
            padding: 8,
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <HugeiconsIcon icon={Cancel01Icon} size={28} color="white" strokeWidth={2} />
          </div>
          <Text style={{ fontSize: 16, fontWeight: 700, color: '#dc2626', marginBottom: 2 }}>Đã từ chối</Text>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#ef4444', marginBottom: 4 }}>{rejected}</div>
          <Progress percent={rejectedPercent} strokeColor="#ef4444" trailColor="#fecaca" showInfo={false} style={{ width: '100%', marginBottom: 2 }} />
          <div style={{ color: '#dc2626', fontWeight: 600, fontSize: 13 }}>{rejectedPercent}%</div>
        </div>
      </div>
      {/* Summary Section */}
      {total > 0 && (
        <div style={{
          marginTop: 18,
          padding: 16,
          background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
          borderRadius: 12,
          border: '1px solid #cbd5e1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 32
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#64748b', fontSize: 14, marginBottom: 2, fontWeight: 500 }}>
              Tỷ lệ phản hồi
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#355a8e' }}>
              {total > 0 ? Math.round(((accepted + rejected) / total) * 100) : 0}%
            </div>
          </div>
          <Divider type="vertical" style={{ height: 32, borderColor: '#cbd5e1' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#64748b', fontSize: 14, marginBottom: 2, fontWeight: 500 }}>
              Tỷ lệ chấp nhận
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#10b981' }}>
              {acceptedPercent}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 