'use client';

import { Card, Avatar, Rate, Tag, Button, Typography } from 'antd';
import { MailOutlined, PhoneOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { ResponseDetail } from '@/types/respones/detail';

const { Title, Text } = Typography;

interface ProfileHeaderProps {
  data: ResponseDetail.Freelancer;
}

export default function ProfileHeader({ data }: ProfileHeaderProps) {
  const freelancerData = data;

  const reputationStars = (freelancerData.reputation / 200); // Convert to 5-star scale
  
  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 -m-6 mb-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          {/* Avatar */}
          <Avatar 
            size={120} 
            src={freelancerData.avatar}
            icon={<UserOutlined />}
            className="border-4 border-white shadow-lg"
          />
          
          {/* Main Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div>
                <Title level={1} className="text-white mb-2 !text-3xl lg:!text-4xl">
                  {freelancerData.fullName}
                </Title>
                <Text className="text-blue-100 text-lg">
                  Full-stack Developer
                </Text>
              </div>
              
              <div className="mt-4 lg:mt-0">
                <Tag 
                  color={freelancerData.status === 'ACTIVE' ? 'success' : 'default'}
                  className="text-sm px-3 py-1"
                >
                  {freelancerData.status === 'ACTIVE' ? 'Đang hoạt động' : 'Không hoạt động'}
                </Tag>
              </div>
            </div>
            
            {/* Reputation */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Rate 
                  disabled 
                  value={reputationStars} 
                  className="text-yellow-400"
                />
                <Text className="text-white font-semibold">
                  {reputationStars.toFixed(1)} ({freelancerData.reputation} điểm)
                </Text>
              </div>
              
              <div className="flex items-center gap-2 text-blue-100">
                <CalendarOutlined />
                <Text className="text-blue-100">
                  Tham gia từ {new Date(freelancerData.joinedAt).toLocaleDateString('vi-VN')}
                </Text>
              </div>
            </div>
            
            {/* Bio */}
            <Text className="text-blue-100 text-base leading-relaxed block mb-6">
              {freelancerData.bio}
            </Text>
            
            {/* Contact Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                type="primary" 
                size="large" 
                icon={<MailOutlined />}
                className="bg-white text-blue-600 border-white hover:bg-blue-50"
              >
                Liên hệ qua Email
              </Button>
              <Button 
                size="large" 
                icon={<PhoneOutlined />}
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                {freelancerData.phone}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 