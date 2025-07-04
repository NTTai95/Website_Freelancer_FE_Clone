import { Button, Card, Typography } from 'antd';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const JobHeaderCard = ({ job }: { job: any }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="!mb-6"
    >
      <Card
        className="!rounded-xl !shadow-lg !border-0 !bg-gradient-to-r !from-blue-50 !to-blue-50"
        styles={{ body: { padding: 0 } }}
      >
        <div className="!p-6 !pb-4 !border-b !border-solid !border-blue-100">
          <Title
            level={2}
            className="!mb-0 !text-3xl !font-bold !text-transparent !bg-clip-text !bg-gradient-to-r !from-blue-600 !to-purple-600"
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
    </motion.div>
  );
};

export default JobHeaderCard;