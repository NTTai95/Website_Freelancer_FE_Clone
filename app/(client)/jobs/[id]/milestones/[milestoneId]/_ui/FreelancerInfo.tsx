import { Card, Avatar, Typography, Rate, Space } from "antd";

interface Props {
  freelancer: Record<string, any>;
}

export default function FreelancerInfo({ freelancer }: Props) {
  return (
    <Card bordered={false}>
      <Space direction="horizontal" size="middle">
        <Avatar size={64} src={freelancer.avatar} />
        <div>
          <Typography.Title level={5}>{freelancer.fullName}</Typography.Title>
          <Typography.Text>ID: {freelancer.id}</Typography.Text>
          <div>
            <Rate disabled value={freelancer.reputation / 2} allowHalf />
            <Typography.Text style={{ marginLeft: 8 }}>{freelancer.reputation}</Typography.Text>
          </div>
        </div>
      </Space>
    </Card>
  );
} 