/**
 * @file JobJourney.tsx
 * @description Component timeline hiển thị hành trình của công việc.
 * Thể hiện các bước từ đăng job → nhận ứng tuyển → chọn freelancer → hoàn thành.
 * Sử dụng Ant Design Timeline với custom styling và responsive design.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {string} props.jobStatus - Trạng thái hiện tại của job
 * @param {string} props.postedAt - Ngày đăng job
 * @param {boolean} props.hasAcceptedFreelancer - Có freelancer được chọn không
 * @param {number} props.totalApplies - Tổng số ứng tuyển
 * @param {function} props.formatDate - Hàm format ngày tháng
 * @returns {React.ReactElement} Timeline component với job journey
 */
'use client';

import { Timeline, Card, Typography, Progress } from 'antd';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  RocketIcon,
  UserAddIcon, 
  Tick02Icon, 
  ChampionIcon,
  Clock01Icon,
  FireIcon,
  WorkIcon,
  Calendar03Icon
} from '@hugeicons/core-free-icons';

const { Title, Text } = Typography;

interface JobJourneyProps {
  jobStatus: string;
  postedAt: string;
  hasAcceptedFreelancer: boolean;
  totalApplies: number;
  formatDate: (dateString: string) => string;
}

export default function JobJourney({ 
  jobStatus, 
  postedAt, 
  hasAcceptedFreelancer, 
  totalApplies,
  formatDate 
}: JobJourneyProps) {

  const getTimelineItems = () => {
    const items = [
      {
        color: '#10b981',
        dot: (
          <div style={{
            background: '#10b981',
            borderRadius: 10,
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
          }}>
            <HugeiconsIcon 
              icon={RocketIcon} 
              size={20} 
              color="white" 
              strokeWidth={2}
            />
          </div>
        ),
        children: (
          <div
            className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: 16,
              borderRadius: 12,
              border: '1px solid #bbf7d0',
              marginLeft: 12,
              transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)'
            }}
          >
            <Text strong style={{ color: '#1f2937', fontSize: 16 }}>Công việc được đăng</Text>
            <div style={{ 
              color: '#6b7280', 
              fontSize: 13, 
              marginTop: 6,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <HugeiconsIcon icon={Calendar03Icon} size={14} color="#6b7280" />
              {formatDate(postedAt)}
            </div>
            <div style={{ 
              color: '#10b981', 
              fontSize: 12, 
              marginTop: 8,
              fontWeight: 600
            }}>
              ✅ Hoàn thành
            </div>
          </div>
        ),
      },
      {
        color: totalApplies > 0 ? '#10b981' : '#f59e0b',
        dot: (
          <div style={{
            background: totalApplies > 0 ? '#10b981' : '#f59e0b',
            borderRadius: 10,
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 2px 8px ${totalApplies > 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
          }}>
            <HugeiconsIcon 
              icon={UserAddIcon} 
              size={20} 
              color="white" 
              strokeWidth={2}
            />
          </div>
        ),
        children: (
          <div
            className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            style={{
              background: totalApplies > 0 
                ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                : 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
              padding: 16,
              borderRadius: 12,
              border: `1px solid ${totalApplies > 0 ? '#bbf7d0' : '#fed7aa'}`,
              marginLeft: 12,
              transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)'
            }}
          >
            <Text strong style={{ color: '#1f2937', fontSize: 16 }}>Nhận ứng tuyển</Text>
            <div style={{ color: '#6b7280', fontSize: 13, marginTop: 6 }}>
              {totalApplies > 0 
                ? `Đã nhận ${totalApplies} ứng tuyển` 
                : 'Chưa có ứng tuyển nào'
              }
            </div>
            {totalApplies > 0 && (
              <div style={{ marginTop: 8 }}>
                <Progress
                  percent={100}
                  size="small"
                  strokeColor="#10b981"
                  trailColor="#dcfce7"
                  format={() => `${totalApplies} ứng tuyển`}
                />
              </div>
            )}
            <div style={{ 
              color: totalApplies > 0 ? '#10b981' : '#f59e0b', 
              fontSize: 12, 
              marginTop: 8,
              fontWeight: 600
            }}>
              {totalApplies > 0 ? '✅ Hoàn thành' : '⏳ Đang chờ...'}
            </div>
          </div>
        ),
      },
      {
        color: hasAcceptedFreelancer ? '#10b981' : '#d1d5db',
        dot: (
          <div style={{
            background: hasAcceptedFreelancer ? '#10b981' : '#d1d5db',
            borderRadius: 10,
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: hasAcceptedFreelancer 
              ? '0 2px 8px rgba(16, 185, 129, 0.3)' 
              : '0 2px 8px rgba(209, 213, 219, 0.3)'
          }}>
            <HugeiconsIcon 
              icon={Tick02Icon} 
              size={20} 
              color="white" 
              strokeWidth={2}
            />
          </div>
        ),
        children: (
          <div
            className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            style={{
              background: hasAcceptedFreelancer 
                ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                : 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              padding: 16,
              borderRadius: 12,
              border: `1px solid ${hasAcceptedFreelancer ? '#bbf7d0' : '#e5e7eb'}`,
              marginLeft: 12,
              transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)'
            }}
          >
            <Text strong style={{ color: '#1f2937', fontSize: 16 }}>Chọn freelancer</Text>
            <div style={{ color: '#6b7280', fontSize: 13, marginTop: 6 }}>
              {hasAcceptedFreelancer 
                ? 'Đã chọn freelancer phù hợp' 
                : 'Chưa chọn freelancer'
              }
            </div>
            <div style={{ 
              color: hasAcceptedFreelancer ? '#10b981' : '#d1d5db', 
              fontSize: 12, 
              marginTop: 8,
              fontWeight: 600
            }}>
              {hasAcceptedFreelancer ? '✅ Hoàn thành' : '⏸️ Chưa thực hiện'}
            </div>
          </div>
        ),
      },
      {
        color: jobStatus === 'COMPLETED' ? '#10b981' : '#d1d5db',
        dot: (
          <div style={{
            background: jobStatus === 'COMPLETED' ? '#10b981' : '#d1d5db',
            borderRadius: 10,
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: jobStatus === 'COMPLETED' 
              ? '0 2px 8px rgba(16, 185, 129, 0.3)' 
              : '0 2px 8px rgba(209, 213, 219, 0.3)'
          }}>
            <HugeiconsIcon 
              icon={ChampionIcon} 
              size={20} 
              color="white" 
              strokeWidth={2}
            />
          </div>
        ),
        children: (
          <div
            className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            style={{
              background: jobStatus === 'COMPLETED' 
                ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                : jobStatus === 'IN_PROGRESS'
                ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'
                : 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              padding: 16,
              borderRadius: 12,
              border: `1px solid ${
                jobStatus === 'COMPLETED' ? '#bbf7d0' : 
                jobStatus === 'IN_PROGRESS' ? '#fed7aa' : '#e5e7eb'
              }`,
              marginLeft: 12,
              transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)'
            }}
          >
            <Text strong style={{ color: '#1f2937', fontSize: 16 }}>Hoàn thành dự án</Text>
            <div style={{ color: '#6b7280', fontSize: 13, marginTop: 6 }}>
              {jobStatus === 'COMPLETED' 
                ? 'Dự án đã hoàn thành thành công' 
                : jobStatus === 'IN_PROGRESS'
                ? 'Đang thực hiện dự án'
                : 'Chưa bắt đầu thực hiện'
              }
            </div>
            <div style={{ 
              color: jobStatus === 'COMPLETED' ? '#10b981' : 
                     jobStatus === 'IN_PROGRESS' ? '#f59e0b' : '#d1d5db', 
              fontSize: 12, 
              marginTop: 8,
              fontWeight: 600
            }}>
              {jobStatus === 'COMPLETED' ? '✅ Hoàn thành' : 
               jobStatus === 'IN_PROGRESS' ? '🔄 Đang thực hiện' : '⏸️ Chưa bắt đầu'}
            </div>
          </div>
        ),
      },
    ];

    return items;
  };

  const getProgressPercentage = () => {
    if (jobStatus === 'COMPLETED') return 100;
    if (hasAcceptedFreelancer) return 75;
    if (totalApplies > 0) return 50;
    return 25;
  };

  const getStatusMessage = () => {
    if (jobStatus === 'COMPLETED') {
      return {
        icon: <HugeiconsIcon icon={ChampionIcon} size={24} color="#10b981" />,
        text: 'Dự án đã hoàn thành thành công! 🎉',
        color: '#10b981'
      };
    }
    if (jobStatus === 'IN_PROGRESS') {
      return {
        icon: <HugeiconsIcon icon={FireIcon} size={24} color="#f59e0b" />,
        text: 'Dự án đang được thực hiện 🚀',
        color: '#f59e0b'
      };
    }
    if (hasAcceptedFreelancer) {
      return {
        icon: <HugeiconsIcon icon={Tick02Icon} size={24} color="#10b981" />,
        text: 'Đã chọn freelancer, sẵn sàng bắt đầu! ✨',
        color: '#10b981'
      };
    }
    if (totalApplies > 0) {
      return {
        icon: <HugeiconsIcon icon={Clock01Icon} size={24} color="#f59e0b" />,
        text: 'Đang xem xét các ứng tuyển ⏳',
        color: '#f59e0b'
      };
    }
    return {
      icon: <HugeiconsIcon icon={UserAddIcon} size={24} color="#6b7280" />,
      text: 'Đang chờ freelancer ứng tuyển 📢',
      color: '#6b7280'
    };
  };

  const statusMessage = getStatusMessage();

  return (
    <Card 
      style={{
        borderRadius: 20,
        marginBottom: 32,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}
    >
      {/* Header với improved design */}
      <div style={{
        background: 'linear-gradient(135deg, #355a8e 0%, #01204b 100%)',
        padding: '24px 24px 32px',
        margin: '-24px -24px 24px',
        position: 'relative'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: -20,
          left: -30,
          width: 80,
          height: 80,
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: 16,
                padding: 16,
                marginRight: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <HugeiconsIcon 
                  icon={WorkIcon} 
                  size={28} 
                  color="white" 
                  strokeWidth={1.8}
                />
              </div>
              <div>
                <Title level={4} style={{ color: 'white', margin: 0, marginBottom: 4 }}>
                  Hành trình dự án
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 14 }}>
                  Theo dõi tiến độ từ đăng tin đến hoàn thành
                </Text>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 8
            }}>
              <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 13 }}>
                Tiến độ hoàn thành
              </Text>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 700 }}>
                {getProgressPercentage()}%
              </Text>
            </div>
            <Progress
              percent={getProgressPercentage()}
              strokeColor={{
                '0%': '#10b981',
                '100%': '#34d399'
              }}
              trailColor="rgba(255, 255, 255, 0.3)"
              size="small"
              showInfo={false}
            />
          </div>

          {/* Status message */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 12,
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            {statusMessage.icon}
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 500 }}>
              {statusMessage.text}
            </Text>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <Timeline
        mode="left"
        items={getTimelineItems()}
        style={{ 
          padding: '0 24px',
          marginTop: 8
        }}
      />
    </Card>
  );
} 