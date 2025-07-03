import { List, Card, Tag, Typography } from "antd";

interface Props {
  disputes: Record<string, any>[];
}

export default function DisputeList({ disputes }: Props) {
  return (
    <Card title="Tranh chấp" bordered={false}>
      <List
        dataSource={disputes}
        renderItem={item => (
          <List.Item>
            <Card style={{ width: "100%" }}>
              <Typography.Text strong>Lý do: {item.reason}</Typography.Text>
              <Typography.Paragraph>Giải pháp: {item.resolution}</Typography.Paragraph>
              <Tag color={item.status === "RESOLVED" ? "green" : "red"}>{item.status}</Tag>
              <Typography.Text type="secondary">Tạo lúc: {item.createdAt}</Typography.Text>
              {item.resolvedAt && <Typography.Text type="secondary"> | Đã giải quyết: {item.resolvedAt}</Typography.Text>}
              {item.employerSues && <Tag color="blue">Nhà tuyển dụng khởi kiện</Tag>}
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
} 