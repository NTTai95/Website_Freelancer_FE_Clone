'use client';

import { Card, Avatar, Rate, Typography, Divider, Tooltip } from 'antd';
import { TrophyOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function TopReviews() {
  // Mock top reviews data
  const topReviews = [
    {
      id: 1,
      employerAvatar: "https://i.pravatar.cc/40?img=1",
      employerName: "Nguyễn Văn An",
      jobTitle: "Phát triển Website E-commerce",
      freelancerReputation: 850,
      completedDate: "2024-01-15",
      rating: 5,
      reviewContent: "Anh Huy làm việc rất chuyên nghiệp, giao code đúng hạn và chất lượng cao. Sẽ hợp tác lại trong tương lai.",
      actualBudget: 8500000
    },
    {
      id: 2,
      employerAvatar: "https://i.pravatar.cc/40?img=2",
      employerName: "Trần Thị Bình",
      jobTitle: "API Integration cho Mobile App",
      freelancerReputation: 845,
      completedDate: "2024-01-10",
      rating: 5,
      reviewContent: "Kỹ năng technical rất tốt, responsive và support nhiệt tình. Highly recommended!",
      actualBudget: 6200000
    },
    {
      id: 3,
      employerAvatar: "https://i.pravatar.cc/40?img=3",
      employerName: "Lê Minh Cường",
      jobTitle: "React Dashboard Development",
      freelancerReputation: 840,
      completedDate: "2024-01-05",
      rating: 4,
      reviewContent: "Code clean, UI đẹp và functionality hoàn chỉnh. Có một vài minor issues nhưng đã được fix nhanh chóng.",
      actualBudget: 12000000
    }
  ];

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' VNĐ';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <Card 
      title={
        <div className="flex items-center gap-2 transition-colors duration-300 hover:text-yellow-600 group">
          <TrophyOutlined className="text-yellow-600 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
          <span>Top 3 Reviews Cao Nhất</span>
        </div>
      }
      className="shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      styles={{ header: { borderBottom: '2px solid #f0f0f0' } }}
    >
      <div className="space-y-6">
        {topReviews.map((review, index) => (
          <div 
            key={review.id}
            className="group transition-all duration-500 hover:scale-[1.02] hover:shadow-lg p-4 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 border border-transparent hover:border-blue-200"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="space-y-4">
              {/* Header with Employer Info and Ranking */}
              <div className="flex items-start gap-3">
                <div className="relative shrink-0 group/avatar">
                  <Avatar 
                    src={review.employerAvatar} 
                    size={40}
                    className="border border-gray-200 transition-all duration-300 group-hover/avatar:scale-110 group-hover/avatar:shadow-lg group-hover/avatar:border-blue-300"
                  />
                  {/* Ranking badge overlay on avatar */}
                  <div className={`absolute top-0 left-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white transition-all duration-300 group-hover:scale-125 group-hover:shadow-md ${
                    index === 0 ? 'bg-yellow-500 group-hover:bg-yellow-400' : 
                    index === 1 ? 'bg-gray-400 group-hover:bg-gray-300' : 
                    'bg-orange-400 group-hover:bg-orange-300'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex items-center justify-between flex-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Text strong className="text-gray-800 text-base transition-colors duration-300 group-hover:text-blue-700">
                        {review.employerName}
                      </Text>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full transition-all duration-300 group-hover:bg-blue-100 group-hover:text-blue-600 group-hover:scale-105">
                        Employer
                      </span>
                    </div>
                    <Text className="text-sm text-blue-600 font-medium transition-colors duration-300 group-hover:text-blue-800">
                      {review.jobTitle}
                    </Text>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      <Rate disabled value={review.rating} className="text-sm mb-1" />
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 transition-colors duration-300 group-hover:text-blue-600">
                      {formatDate(review.completedDate)} • {formatCurrency(review.actualBudget)}
                      <Tooltip title={`Uy tín freelancer lúc đó: ${review.freelancerReputation} điểm`}>
                        <QuestionCircleOutlined className="text-gray-400 hover:text-blue-500 cursor-help ml-1 transition-all duration-300 hover:scale-125" />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>

              {/* Separator line */}
              <div className="ml-12 mt-6">
                <div className="w-full h-px bg-gray-200 transition-all duration-300 group-hover:bg-blue-300 group-hover:h-0.5"></div>
              </div>

              {/* Review Content - Main Focus with clear separation */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-500 ml-12 mt-4 transition-all duration-300 group-hover:from-blue-100 group-hover:to-indigo-100 group-hover:shadow-md group-hover:border-l-blue-600 group-hover:scale-[1.02]">
                <Text className="text-gray-700 text-sm leading-relaxed italic transition-colors duration-300 group-hover:text-gray-800">
                  &ldquo;{review.reviewContent}&rdquo;
                </Text>
                
                {/* Sparkle effect on hover */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>

            {index < topReviews.length - 1 && (
              <Divider className="!my-6 !border-gray-200 transition-colors duration-300 group-hover:!border-blue-300" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
} 