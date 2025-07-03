import { Card, Typography } from "antd";

interface Props {
  job: Record<string, any>;
}

export default function JobInfo({ job }: Props) {
  return (
    <Card bordered={false}>
      <Typography.Title level={5}>{job.title}</Typography.Title>
      <Typography.Text>ID: {job.id}</Typography.Text>
      <Typography.Paragraph ellipsis={{ rows: 2, expandable: true }}>{job.description}</Typography.Paragraph>
    </Card>
  );
} 