'use client';

import { Card, Statistic } from 'antd';
import { CheckCircleOutlined, TrophyOutlined, StarOutlined, WalletOutlined } from '@ant-design/icons';
import { ResponseDetail } from '@/types/respones/detail';

interface ActivityStatsProps {
  data: ResponseDetail.Freelancer;
}

export default function ActivityStats({ data }: ActivityStatsProps) {
  // Tính toán thống kê từ dữ liệu thực
  const stats = {
    completedJobs: 24, // TODO: Sẽ được lấy từ API công việc trong tương lai
    totalEarnings: data.balance, // Sử dụng balance từ API
    averageRating: (data.reputation / 200).toFixed(1), // Chuyển đổi uy tín (850) sang thang đánh giá (4.25/5)
    successRate: Math.min(Math.round((data.reputation / 850) * 100), 100) // Tính tỷ lệ thành công dựa trên reputation
  };

  return (
    <Card
      title={
        <span className="!transition-colors !duration-300 hover:!text-blue-600">
          Thống kê hoạt động
        </span>
      }
      className="!shadow-md hover:!shadow-xl !transition-all !duration-300 !transform hover:!-translate-y-1"
      styles={{ header: { borderBottom: '2px solid #f0f0f0' } }}
    >
      <div className="!flex !flex-col !gap-4">
        {/* Row 1 */}
        <div className="!flex !gap-4">
          <div className="!flex-1 group">
            <Card className="!text-center !bg-green-50 !border-green-200 hover:!bg-gradient-to-br hover:!from-green-50 hover:!to-green-100 !transition-all !duration-300 hover:!shadow-lg hover:!scale-105 hover:!border-green-300 !h-full !cursor-default">
              <div className="!transition-transform !duration-300 group-hover:!scale-110">
                <Statistic
                  title={<span className="!text-gray-700 !font-medium !transition-colors !duration-300 group-hover:!text-green-700">Dự án hoàn thành</span>}
                  value={stats.completedJobs}
                  prefix={<CheckCircleOutlined className="!text-green-600 !transition-all !duration-300 group-hover:!scale-125 group-hover:!rotate-12" />}
                  valueStyle={{
                    color: '#16a085',
                    fontWeight: 'bold',
                    fontSize: '28px',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
              <div className="!absolute !inset-0 !bg-gradient-to-r !from-green-400/0 !to-green-600/0 group-hover:!from-green-400/10 group-hover:!to-green-600/10 !transition-all !duration-300 !rounded"></div>
            </Card>
          </div>

          <div className="!flex-1 group">
            <Card className="!text-center !bg-blue-50 !border-blue-200 hover:!bg-gradient-to-br hover:!from-blue-50 hover:!to-blue-100 !transition-all !duration-300 hover:!shadow-lg hover:!scale-105 hover:!border-blue-300 !h-full !cursor-default">
              <div className="!transition-transform !duration-300 group-hover:!scale-110">
                <Statistic
                  title={<span className="!text-gray-700 !font-medium !transition-colors !duration-300 group-hover:!text-blue-700">Đánh giá trung bình</span>}
                  value={parseFloat(stats.averageRating)}
                  precision={1}
                  prefix={<StarOutlined className="!text-yellow-500 !transition-all !duration-300 group-hover:!scale-125 group-hover:!rotate-12 group-hover:!text-yellow-400" />}
                  suffix={<span className="!text-gray-500 !text-sm !transition-colors !duration-300 group-hover:!text-blue-600">/ 5.0</span>}
                  valueStyle={{
                    color: '#2563eb',
                    fontWeight: 'bold',
                    fontSize: '28px',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
              <div className="!absolute !inset-0 !bg-gradient-to-r !from-blue-400/0 !to-blue-600/0 group-hover:!from-blue-400/10 group-hover:!to-blue-600/10 !transition-all !duration-300 !rounded"></div>
            </Card>
          </div>
        </div>

        {/* Row 2 */}
        <div className="!flex !gap-4">
          <div className="!flex-1 group">
            <Card className="!text-center !bg-purple-50 !border-purple-200 hover:!bg-gradient-to-br hover:!from-purple-50 hover:!to-purple-100 !transition-all !duration-300 hover:!shadow-lg hover:!scale-105 hover:!border-purple-300 !h-full !cursor-default">
              <div className="!transition-transform !duration-300 group-hover:!scale-110">
                <Statistic
                  title={<span className="!text-gray-700 !font-medium !transition-colors !duration-300 group-hover:!text-purple-700">Tổng thu nhập</span>}
                  value={stats.totalEarnings}
                  formatter={(value) => `${Number(value).toLocaleString('vi-VN')}`}
                  prefix={<WalletOutlined className="!text-purple-600 !transition-all !duration-300 group-hover:!scale-125 group-hover:!rotate-12" />}
                  suffix={<span className="!text-gray-500 !text-sm !transition-colors !duration-300 group-hover:!text-purple-600">VNĐ</span>}
                  valueStyle={{
                    color: '#7c3aed',
                    fontWeight: 'bold',
                    fontSize: '22px',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
              <div className="!absolute !inset-0 !bg-gradient-to-r !from-purple-400/0 !to-purple-600/0 group-hover:!from-purple-400/10 group-hover:!to-purple-600/10 !transition-all !duration-300 !rounded"></div>
            </Card>
          </div>

          <div className="!flex-1 group">
            <Card className="!text-center !bg-orange-50 !border-orange-200 hover:!bg-gradient-to-br hover:!from-orange-50 hover:!to-orange-100 !transition-all !duration-300 hover:!shadow-lg hover:!scale-105 hover:!border-orange-300 !h-full !cursor-default">
              <div className="!transition-transform !duration-300 group-hover:!scale-110">
                <Statistic
                  title={<span className="!text-gray-700 !font-medium !transition-colors !duration-300 group-hover:!text-orange-700">Tỷ lệ thành công</span>}
                  value={stats.successRate}
                  prefix={<TrophyOutlined className="!text-orange-500 !transition-all !duration-300 group-hover:!scale-125 group-hover:!rotate-12 group-hover:!text-orange-400" />}
                  suffix={<span className="!text-gray-500 !text-sm !transition-colors !duration-300 group-hover:!text-orange-600">%</span>}
                  valueStyle={{
                    color: '#ea580c',
                    fontWeight: 'bold',
                    fontSize: '28px',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
              <div className="!absolute !inset-0 !bg-gradient-to-r !from-orange-400/0 !to-orange-600/0 group-hover:!from-orange-400/10 group-hover:!to-orange-600/10 !transition-all !duration-300 !rounded"></div>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
} 