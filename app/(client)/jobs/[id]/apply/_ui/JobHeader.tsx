import { Button, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const JobHeaderCard = () => {
  return (
    <Card
      className="!rounded-lg !shadow-sm !border-gray-200"
      styles={{ body: { padding: 0 } }}
    >
      <div className="!p-6 !pb-4 !border-b !border-solid !border-gray-100">
        <Title 
          level={2} 
          className="!mb-0 !text-2xl !font-semibold !text-gray-800"
        >
          Ứng tuyển công việc: Nhà phát triển Fullstack
        </Title>
      </div>

      <div className="!p-6 !pt-4">
        <Text className="!text-gray-700 !text-base !inline">
          Chúng tôi đang tìm kiếm một nhà phát triển Fullstack có kinh nghiệm với React, Node.js và MongoDB...
        </Text>
        <Button 
          type="link" 
          className="!p-0 !ml-2 !text-blue-600 !font-medium hover:!underline"
        >
          Xem chi tiết
        </Button>
      </div>
    </Card>
  );
};

export default JobHeaderCard;