/**
 * @file MilestoneStatistics.tsx
 * @description Component hiển thị thống kê tổng quan về milestones với design nâng cao.
 * Bao gồm progress bars, percentages, và visual indicators để tạo trải nghiệm đẹp mắt.
 * Thay thế statistics cũ với layout responsive và animation effects.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {object} props.summary - Dữ liệu thống kê milestone từ API
 * @param {string} props.jobTitle - Tiêu đề công việc
 * @returns {React.ReactElement} Enhanced statistics panel với visual charts
 */
'use client';

import { Progress, Typography, Divider } from 'antd';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  TaskDone01Icon,
  TaskDaily01Icon,
  Clock01Icon,
  Alert01Icon,
  CheckListIcon,
  Analytics01Icon,
  BarChartIcon
} from '@hugeicons/core-free-icons';
import { ResponseDetail } from '@/types/respones/detail';

const { Text } = Typography;

interface MilestoneStatisticsProps {
  summary: ResponseDetail.MilestoneListResponse['summary'];
  jobTitle: string;
}

export default function MilestoneStatistics({ summary, jobTitle }: MilestoneStatisticsProps) {
  if (!summary) {
    return null;
  }

  const total = summary.totalMilestones || 0;
  const completed = summary.completedMilestones || 0;
  const inProgress = summary.inProgressMilestones || 0;
  const overdue = summary.overdueMilestones || 0;
  const disputed = summary.disputedMilestones || 0;

  const completedPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const inProgressPercent = total > 0 ? Math.round((inProgress / total) * 100) : 0;
  const overduePercent = total > 0 ? Math.round((overdue / total) * 100) : 0;
  const disputedPercent = total > 0 ? Math.round((disputed / total) * 100) : 0;

  const statisticsData = [
    {
      title: 'Tổng số giai đoạn',
      value: total,
      icon: CheckListIcon,
      color: '#355a8e',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      percent: 100
    },
    {
      title: 'Đã hoàn thành',
      value: completed,
      icon: TaskDone01Icon,
      color: '#059669',
      background: 'linear-gradient(135deg, #ecfdf5 0%, #bbf7d0 100%)',
      percent: completedPercent
    },
    {
      title: 'Đang thực hiện',
      value: inProgress,
      icon: TaskDaily01Icon,
      color: '#d97706',
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      percent: inProgressPercent
    },
    {
      title: 'Quá hạn',
      value: overdue,
      icon: Clock01Icon,
      color: '#dc2626',
      background: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
      percent: overduePercent
    },
    {
      title: 'Có tranh chấp',
      value: disputed,
      icon: Alert01Icon,
      color: '#7c2d12',
      background: 'linear-gradient(135deg, #fdf4ff 0%, #f3e8ff 100%)',
      percent: disputedPercent
    }
  ];

  const completionRate = total > 0 
    ? Math.round((completed / total) * 100)
    : 0;

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
            Thống kê giai đoạn công việc
          </Text>
          <div style={{ color: '#6b7280', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <HugeiconsIcon icon={BarChartIcon} size={20} color="#6b7280" />
            {jobTitle}
          </div>
        </div>
        <div style={{ textAlign: 'right', minWidth: 60 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#355a8e', lineHeight: 1 }}>{total}</div>
          <Text style={{ color: '#6b7280', fontSize: 13, fontWeight: 500 }}>Tổng giai đoạn</Text>
        </div>
      </div>

      {/* Cards Section */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        {statisticsData.slice(1).map((stat, index) => (
          <div
            key={index}
            className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            style={{
              flex: 1,
              minWidth: '200px',
              background: stat.background,
              border: `1.5px solid ${stat.color}40`,
              borderRadius: 16,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)'
            }}
          >
            <div style={{
              background: stat.color,
              borderRadius: 12,
              padding: 8,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HugeiconsIcon icon={stat.icon} size={28} color="white" strokeWidth={2} />
            </div>
            <Text style={{ 
              fontSize: 16, 
              fontWeight: 700, 
              color: stat.color, 
              marginBottom: 2,
              textAlign: 'center'
            }}>
              {stat.title}
            </Text>
            <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, marginBottom: 4 }}>
              {stat.value}
            </div>
            <Progress 
              percent={stat.percent} 
              strokeColor={stat.color} 
              trailColor={`${stat.color}20`} 
              showInfo={false} 
              style={{ width: '100%', marginBottom: 2 }} 
            />
            <div style={{ color: stat.color, fontWeight: 600, fontSize: 13 }}>
              {stat.percent}%
            </div>
          </div>
        ))}
      </div>

      <Divider style={{ margin: '24px 0' }} />

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
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: `conic-gradient(#355a8e 0deg ${completionRate * 3.6}deg, #e5e7eb ${completionRate * 3.6}deg 360deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              position: 'relative'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography.Text strong style={{ color: '#355a8e', fontSize: '18px' }}>
                  {completionRate}%
                </Typography.Text>
              </div>
            </div>
            <Typography.Text style={{ color: '#6b7280', fontSize: '14px' }}>
              Tỷ lệ hoàn thành
            </Typography.Text>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: 32, 
              fontWeight: 800, 
              color: '#355a8e',
              marginBottom: 4
            }}>
              {total - completed}
            </div>
            <Typography.Text style={{ color: '#6b7280', fontSize: '14px' }}>
              Còn lại
            </Typography.Text>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: 32, 
              fontWeight: 800, 
              color: overdue > 0 ? '#dc2626' : '#059669',
              marginBottom: 4
            }}>
              {overdue}
            </div>
            <Typography.Text style={{ color: '#6b7280', fontSize: '14px' }}>
              Quá hạn
            </Typography.Text>
          </div>
        </div>
      )}

      {/* Performance Indicators */}
      {total > 0 && (
        <div style={{
          marginTop: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          background: completed === total ? 'linear-gradient(135deg, #ecfdf5 0%, #bbf7d0 100%)' : 
                      overdue > 0 ? 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)' :
                      'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderRadius: 8,
          border: `1px solid ${completed === total ? '#059669' : overdue > 0 ? '#dc2626' : '#d97706'}20`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <HugeiconsIcon 
              icon={completed === total ? TaskDone01Icon : overdue > 0 ? Alert01Icon : TaskDaily01Icon} 
              size={16} 
              color={completed === total ? '#059669' : overdue > 0 ? '#dc2626' : '#d97706'} 
            />
            <Text style={{ 
              fontSize: 14, 
              fontWeight: 600,
              color: completed === total ? '#059669' : overdue > 0 ? '#dc2626' : '#d97706'
            }}>
              {completed === total ? 'Dự án hoàn thành!' : 
               overdue > 0 ? 'Có giai đoạn quá hạn' : 
               'Dự án đang trong tiến độ'}
            </Text>
          </div>
          <Text style={{ 
            fontSize: 12, 
            color: '#6b7280',
            fontWeight: 500
          }}>
            Cập nhật {new Date().toLocaleDateString('vi-VN')}
          </Text>
        </div>
      )}
    </div>
  );
} 