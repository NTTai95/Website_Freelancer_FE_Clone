import { Button, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const JobHeaderCard = ({ job }: { job: any }) => {
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
          {job?.title}
        </Title>
      </div>

      <div className="!p-6 !pt-4">
        <Text className="!text-gray-700 !text-base whitespace-pre-line">
          {job?.description}
        </Text>
      </div>
    </Card>
  );
};

export default JobHeaderCard;