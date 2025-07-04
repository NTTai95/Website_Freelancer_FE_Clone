/**
 * @file EducationSection.tsx
 * @description Component hiển thị học vấn của freelancer sử dụng Timeline layout.
 * Bao gồm logic phức tạp để tính toán thời gian học, phân loại GPA và degree types.
 * Có Progress bar cho GPA và nhiều animation effects khi hover.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {object} props.data - Dữ liệu freelancer chứa educations array
 * @returns {React.ReactElement} Card chứa Timeline các education items với detailed info
 */
'use client';

import { Card, Timeline, Typography, Tag, Progress } from 'antd';
import { BookOutlined, CalendarOutlined, TrophyOutlined, FileTextOutlined } from '@ant-design/icons';
import { ResponseDetail } from '@/types/respones/detail';

const { Text, Title } = Typography;

interface EducationSectionProps {
  data: ResponseDetail.Freelancer;
}

export default function EducationSection({ data }: EducationSectionProps) {
  const educations = data.educations;

  /**
   * @description Format ngày từ DD/MM/YYYY thành Month Year format.
   * Xử lý edge case khi endDate null (hiện tại đang học).
   */
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Hiện tại';
    return new Date(dateString.split('/').reverse().join('-')).toLocaleDateString('vi-VN', {
      month: 'short',
      year: 'numeric'
    });
  };

  /**
   * @description Phân loại màu Progress bar dựa trên GPA.
   * Sử dụng thang điểm 10 của Việt Nam.
   */
  const getGpaColor = (gpa: number): "success" | "exception" | "normal" | "active" => {
    if (gpa >= 8.5) return 'success';
    if (gpa >= 7.0) return 'active';
    if (gpa >= 6.0) return 'normal';
    return 'exception';
  };

  /**
   * @description Phân loại học lực dựa trên GPA theo chuẩn VN.
   */
  const getGpaLabel = (gpa: number) => {
    if (gpa >= 8.5) return 'Xuất sắc';
    if (gpa >= 7.0) return 'Khá';
    if (gpa >= 6.0) return 'Trung bình';
    return 'Yếu';
  };

  /**
   * @description Phân loại màu tag dựa trên loại bằng cấp.
   * Hỗ trợ cả tiếng Việt và tiếng Anh.
   */
  const getDegreeColor = (degree: string) => {
    if (degree.includes('Cử nhân') || degree.includes('Bachelor')) return 'blue';
    if (degree.includes('Thạc sĩ') || degree.includes('Master')) return 'purple';
    if (degree.includes('Tiến sĩ') || degree.includes('PhD')) return 'gold';
    if (degree.includes('Chứng chỉ') || degree.includes('Certificate')) return 'green';
    return 'default';
  };

  const timelineItems = educations.map((edu, index) => ({
    color: index === 0 ? 'blue' : 'green',
    dot: <BookOutlined className="!text-blue-600 !transition-transform !duration-300 hover:!scale-125" />,
    children: (
      <div
        className="!space-y-4 group !transition-all !duration-300 hover:!scale-[1.02] hover:!shadow-lg !p-4 !rounded-lg hover:!bg-white !border !border-transparent hover:!border-gray-200"
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <div className="!flex !flex-col lg:!flex-row lg:!items-center lg:!justify-between !gap-2">
          <div className="!space-y-1">
            <Title level={4} className="!mb-0 !text-gray-800 !transition-colors !duration-300 group-hover:!text-blue-600">
              {edu.schoolName}
            </Title>
            <div className="!flex !flex-wrap !items-center !gap-2">
              <Tag
                color={getDegreeColor(edu.degree)}
                className="!font-medium !transition-all !duration-300 group-hover:!scale-110 group-hover:!shadow-md !cursor-default"
              >
                {edu.degree}
              </Tag>
              <Text className="!text-blue-600 !font-medium !transition-colors !duration-300 group-hover:!text-blue-800">
                {edu.major}
              </Text>
            </div>
          </div>

          <div className="!flex !items-center !gap-2 !text-sm !text-gray-600 !transition-colors !duration-300 group-hover:!text-blue-600">
            <CalendarOutlined className="!transition-transform !duration-300 group-hover:!rotate-12" />
            <Text className="!transition-colors !duration-300 group-hover:!text-blue-600">
              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
            </Text>
          </div>
        </div>

        <div className="!bg-gray-50 !p-4 !rounded-lg !space-y-3 !transition-all !duration-300 group-hover:!bg-gradient-to-r group-hover:!from-blue-50 group-hover:!to-purple-50 group-hover:!shadow-inner">
          {/* GPA Section */}
          <div className="!flex !items-center !gap-4 !transition-all !duration-300 hover:!bg-white hover:!shadow-sm !rounded !p-3 !-m-3">
            <div className="!flex !items-center !gap-2">
              <TrophyOutlined className="!text-yellow-600 !transition-all !duration-300 hover:!scale-125 hover:!rotate-12" />
              <Text strong className="!text-sm !transition-colors !duration-300 hover:!text-yellow-600">GPA:</Text>
            </div>

            <div className="!flex-1 !max-w-xs">
              <div className="!flex !items-center !gap-2 !mb-1">
                <Text strong className="!text-lg !text-blue-600 !transition-colors !duration-300 group-hover:!text-blue-800">
                  {edu.gpa.toFixed(2)}
                </Text>
                <Text className="!text-sm !text-gray-600 !transition-colors !duration-300 group-hover:!text-gray-800">/10.0</Text>
                <Tag
                  color={getGpaColor(edu.gpa)}
                  className="!text-xs !transition-all !duration-300 group-hover:!scale-110 group-hover:!shadow-md"
                >
                  {getGpaLabel(edu.gpa)}
                </Tag>
              </div>
              <div className="!transition-transform !duration-300 group-hover:!scale-105">
                <Progress
                  percent={edu.gpa * 10}
                  size="small"
                  status={getGpaColor(edu.gpa)}
                  showInfo={false}
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          {edu.description && (
            <div className="!flex !items-start !gap-2 !transition-all !duration-300 hover:!bg-white hover:!shadow-sm !rounded !p-3 !-m-3">
              <FileTextOutlined className="!text-gray-500 !mt-1 !transition-all !duration-300 hover:!scale-125 hover:!text-blue-500" />
              <div className="!flex-1">
                <Text strong className="!text-sm !block !mb-1 !transition-colors !duration-300 hover:!text-blue-600">Mô tả:</Text>
                <Text className="!text-gray-700 !text-sm !leading-relaxed !transition-colors !duration-300 group-hover:!text-gray-800">
                  {edu.description}
                </Text>
              </div>
            </div>
          )}

          {/* Duration Calculation */}
          <div className="!flex !items-center !gap-2 !text-xs !text-gray-500 !transition-all !duration-300 hover:!bg-white hover:!shadow-sm !rounded !p-2 !-m-2 group-hover:!text-blue-500">
            <CalendarOutlined className="!transition-transform !duration-300 hover:!scale-125" />
            <Text className="!transition-colors !duration-300 group-hover:!text-blue-500">
              Thời gian học: {(() => {
                const start = new Date(edu.startDate.split('/').reverse().join('-'));
                const end = edu.endDate ? new Date(edu.endDate.split('/').reverse().join('-')) : new Date();
                const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                const years = Math.floor(months / 12);
                const remainingMonths = months % 12;

                if (years > 0 && remainingMonths > 0) {
                  return `${years} năm ${remainingMonths} tháng`;
                } else if (years > 0) {
                  return `${years} năm`;
                } else {
                  return `${remainingMonths} tháng`;
                }
              })()}
            </Text>
          </div>
        </div>
      </div>
    )
  }));

  return (
    <Card
      title={
        <div className="!flex !items-center !gap-2 !transition-colors !duration-300 hover:!text-blue-600 group">
          <BookOutlined className="!text-blue-600 !transition-all !duration-300 group-hover:!scale-125 group-hover:!rotate-12" />
          <span>Học vấn ({educations.length})</span>
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