import { Card, Tag, Button, List, Avatar, Divider, Space, Badge } from 'antd';
import { 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  DollarOutlined,
  HourglassOutlined,
  FileTextOutlined
} from '@ant-design/icons';

export default function AppliedJobsPage() {
  // Mock data từ ERD
  const appliedJobs = [
    {
      id: 1,
      content: "Tôi có kinh nghiệm 5 năm thiết kế UI/UX và đã hoàn thành nhiều dự án tương tự",
      createdAt: "2023-06-15T14:30:00",
      status: "pending",
      bidAmount: '1.000.000',
      estimatedHours: 40,
      jobId: 101,
      freelancerId: 201,
      jobTitle: "Thiết kế UI/UX cho ứng dụng di động",
      jobBudget: "1.000.000đ",
      jobDeadline: "2023-07-30"
    },
    {
      id: 2,
      content: "Tôi chuyên phát triển website thương mại điện tử với React và Node.js",
      createdAt: "2023-06-10T09:15:00",
      status: "accepted",
      bidAmount: '1.000.000',
      estimatedHours: 60,
      jobId: 102,
      freelancerId: 201,
      jobTitle: "Phát triển website thương mại điện tử",
      jobBudget: "3.000.000đ",
      jobDeadline: "2023-08-15"
    },
    {
      id: 3,
      content: "Tôi đã tối ưu hiệu năng cho 10+ ứng dụng React Native",
      createdAt: "2023-06-05T16:45:00",
      status: "rejected",
      bidAmount: '1.000.000',
      estimatedHours: 30,
      jobId: 103,
      freelancerId: 201,
      jobTitle: "Tối ưu hiệu năng React Native",
      jobBudget: "5.000.000đ",
      jobDeadline: "2023-07-20"
    }
  ];

  const getStatusTag = (status: string) => {
    switch (status) {
      case "accepted":
        return <Tag icon={<CheckCircleOutlined />} color="success">Đã chấp nhận</Tag>;
      case "rejected":
        return <Tag icon={<CloseCircleOutlined />} color="error">Đã từ chối</Tag>;
      default:
        return <Tag icon={<ClockCircleOutlined />} color="processing">Đang chờ</Tag>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Công việc đã ứng tuyển</h1>
      </div>
      
      <div className="flex flex-col items-end gap-6">
        {appliedJobs.map((job) => (
          <Card
            key={job.id}
            className="w-full max-w-4xl hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm"
            cover={
              <div className="p-4 bg-gray-50">
                <h3 className="text-2xl font-semibold text-gray-800 text-center">{job.jobTitle}</h3>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">#{job.jobId}</span>
                  {getStatusTag(job.status)}
                </div>
              </div>
            }
          >
            <div className="flex-grow">
              <div className="mb-4">
                <p className="text-gray-600 line-clamp-3 text-xl">
                  
                  {job.content}
                </p>
              </div>
              
              <Divider className="my-4" />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center">    
                    Giá thầu:
                  </span>
                  <span className="font-medium">{job.bidAmount}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center">
                    
                    Thời gian ước tính:
                  </span>
                  <span className="font-medium">{job.estimatedHours} giờ</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Ngày ứng tuyển:</span>
                  <span className="font-medium">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Hạn chót công việc:</span>
                  <span className="font-medium">{job.jobDeadline}</span>
                </div>
              </div>
            </div>
            
            <Divider className="my-4" />
            
            <div className="flex justify-between">
              <Button type="text">Xem chi tiết</Button>
              {job.status === "pending" && (
                <Button danger>Rút lại</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}