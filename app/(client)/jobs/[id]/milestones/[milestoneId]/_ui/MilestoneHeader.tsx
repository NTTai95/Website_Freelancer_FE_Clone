import { Card, Typography, Progress, Tag, Space } from "antd";

interface Props {
  milestone: Record<string, any>;
}

export default function MilestoneHeader({ milestone }: Props) {
  return (
    <Card title={<span>Giai đoạn #{milestone.id}</span>} bordered={false}>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Typography.Text strong>Trạng thái: </Typography.Text>
        <Tag color={milestone.status === "COMPLETED" ? "green" : milestone.status === "IN_PROGRESS" ? "blue" : "orange"}>{milestone.status}</Tag>
        <Typography.Text strong>Tiến độ: </Typography.Text>
        <Progress percent={milestone.percent} status={milestone.isOverdue ? "exception" : "active"} />
        <Typography.Text strong>Nội dung: </Typography.Text>
        <Typography.Paragraph>{milestone.content}</Typography.Paragraph>
        <Typography.Text strong>Bắt đầu: </Typography.Text> <span>{milestone.startAt}</span>
        <Typography.Text strong>Kết thúc: </Typography.Text> <span>{milestone.endAt}</span>
        {milestone.isOverdue && <Tag color="red">Quá hạn</Tag>}
        {milestone.disputed && <Tag color="volcano">Đang tranh chấp</Tag>}
        {milestone.fundedAt && <Tag color="blue">Đã ký quỹ: {milestone.fundedAt}</Tag>}
        {milestone.disburseAt && <Tag color="green">Đã giải ngân: {milestone.disburseAt}</Tag>}
      </Space>
    </Card>
  );
} 