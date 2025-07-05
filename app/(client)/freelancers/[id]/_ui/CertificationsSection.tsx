'use client';

import { Card, Timeline, Tag, Typography, Button, Image } from 'antd';
import { SafetyCertificateOutlined, CalendarOutlined, BankOutlined, LinkOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { ResponseDetail } from '@/types/respones/detail';

const { Text, Title } = Typography;

interface CertificationsSectionProps {
  data: ResponseDetail.Freelancer;
}

export default function CertificationsSection({ data }: CertificationsSectionProps) {
  const certifications = data.certifications;

  const formatDate = (dateString: string) => {
    return new Date(dateString.split('/').reverse().join('-')).toLocaleDateString('vi-VN');
  };

  const isExpired = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate.split('/').reverse().join('-'));
    return today > expiry;
  };

  const getStatusColor = (status: string) => {
    return status === 'ACTIVE' ? 'green' : 'red';
  };

  const getStatusIcon = (status: string) => {
    return status === 'ACTIVE' ? <CheckCircleOutlined /> : <CloseCircleOutlined />;
  };

  const timelineItems = certifications.map((cert, index) => ({
    dot: getStatusIcon(cert.status),
    color: getStatusColor(cert.status),
    children: (
      <div
        className="!space-y-3 group !transition-all !duration-300 hover:!scale-[1.02] hover:!shadow-lg !p-4 !rounded-lg hover:!bg-white !border !border-transparent hover:!border-gray-200"
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <div className="!flex !flex-col sm:!flex-row sm:!items-center sm:!justify-between !gap-2">
          <Title level={4} className="!mb-0 !text-gray-800 !transition-colors !duration-300 group-hover:!text-blue-600">
            {cert.name}
          </Title>
          <Tag
            color={getStatusColor(cert.status)}
            icon={getStatusIcon(cert.status)}
            className="!w-fit !transition-all !duration-300 group-hover:!scale-110 group-hover:!shadow-md"
          >
            {cert.status === 'ACTIVE' ? 'Còn hiệu lực' : 'Đã hết hạn'}
          </Tag>
        </div>

        <div className="!bg-gray-50 !p-4 !rounded-lg !space-y-2 !transition-all !duration-300 group-hover:!bg-gradient-to-r group-hover:!from-blue-50 group-hover:!to-green-50 group-hover:!shadow-inner">
          <div className="!flex !items-center !gap-2 !text-sm !transition-all !duration-300 hover:!bg-white hover:!shadow-sm !rounded !p-2 !-m-2">
            <BankOutlined className="!text-blue-600 !transition-transform !duration-300 hover:!scale-125" />
            <Text strong>Tổ chức cấp:</Text>
            <Text className="!text-blue-600 !transition-colors !duration-300 hover:!text-blue-800">{cert.issueBy}</Text>
          </div>

          <div className="!flex !items-center !gap-2 !text-sm !transition-all !duration-300 hover:!bg-white hover:!shadow-sm !rounded !p-2 !-m-2">
            <CalendarOutlined className="!text-green-600 !transition-transform !duration-300 hover:!scale-125" />
            <Text strong>Ngày cấp:</Text>
            <Text className="!transition-colors !duration-300 hover:!text-green-600">{formatDate(cert.issueDate)}</Text>
          </div>

          <div className="!flex !items-center !gap-2 !text-sm !transition-all !duration-300 hover:!bg-white hover:!shadow-sm !rounded !p-2 !-m-2">
            <CalendarOutlined className="!text-orange-600 !transition-transform !duration-300 hover:!scale-125" />
            <Text strong>Ngày hết hạn:</Text>
            <Text className={`!transition-colors !duration-300 ${isExpired(cert.expiryDate) ? '!text-red-600 hover:!text-red-800' : '!text-gray-700 hover:!text-orange-600'}`}>
              {formatDate(cert.expiryDate)}
              {isExpired(cert.expiryDate) && (
                <Tag color="red" className="!ml-2 !text-xs !transition-all !duration-300 hover:!scale-110 animate-pulse">
                  Đã hết hạn
                </Tag>
              )}
            </Text>
          </div>

          {cert.link && (
            <div className="!flex !items-center !gap-2 !text-sm !transition-all !duration-300 hover:!bg-white hover:!shadow-sm !rounded !p-2 !-m-2">
              <LinkOutlined className="!text-purple-600 !transition-transform !duration-300 hover:!scale-125 hover:!rotate-12" />
              <Button
                type="link"
                size="small"
                href={cert.link}
                target="_blank"
                className="!p-0 !h-auto !transition-all !duration-300 hover:!scale-105 hover:!shadow-md"
              >
                Xem chứng chỉ online
              </Button>
            </div>
          )}

          {(cert.frontImage || cert.backImage) && (
            <div className="!space-y-2">
              <Text strong className="!text-sm !transition-colors !duration-300 group-hover:!text-gray-800">Hình ảnh chứng chỉ:</Text>
              <div className="!flex !gap-2">
                {cert.frontImage && (
                  <div className="!space-y-1 group/image">
                    <Text className="!text-xs !text-gray-600 !transition-colors !duration-300 group-hover/image:!text-blue-600">Mặt trước</Text>
                    <div className="!transition-all !duration-300 hover:!scale-110 hover:!shadow-lg hover:!z-10 !relative">
                      <Image
                        src={cert.frontImage}
                        alt="Certification Front"
                        width={100}
                        height={70}
                        className="!rounded !border !transition-all !duration-300 hover:!border-blue-300"
                      />
                    </div>
                  </div>
                )}
                {cert.backImage && (
                  <div className="!space-y-1 group/image">
                    <Text className="!text-xs !text-gray-600 !transition-colors !duration-300 group-hover/image:!text-blue-600">Mặt sau</Text>
                    <div className="!transition-all !duration-300 hover:!scale-110 hover:!shadow-lg hover:!z-10 !relative">
                      <Image
                        src={cert.backImage}
                        alt="Certification Back"
                        width={100}
                        height={70}
                        className="!rounded !border !transition-all !duration-300 hover:!border-blue-300"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }));

  return (
    <Card
      title={
        <div className="!flex !items-center !gap-2 !transition-colors !duration-300 hover:!text-green-600 group">
          <SafetyCertificateOutlined className="!text-green-600 !transition-transform !duration-300 group-hover:!scale-125 group-hover:!rotate-12" />
          <span>Chứng chỉ ({certifications.length})</span>
        </div>
      }
      className="!shadow-md hover:!shadow-xl !transition-all !duration-300 !transform hover:!-translate-y-1"
      styles={{ header: { borderBottom: '2px solid #f0f0f0' } }}
    >
      <Timeline
        items={timelineItems}
        className="!mt-4"
      />
    </Card>
  );
} 