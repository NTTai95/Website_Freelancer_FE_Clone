import { List, Card, Tag, Typography } from "antd";

interface Props {
  products: Record<string, any>[];
}

export default function ProductList({ products }: Props) {
  return (
    <Card title="Sản phẩm bàn giao" bordered={false}>
      <List
        dataSource={products}
        renderItem={item => (
          <List.Item>
            <Card style={{ width: "100%" }}>
              <Typography.Text strong>{item.content}</Typography.Text>
              <Typography.Paragraph>{item.description}</Typography.Paragraph>
              <Tag color={item.status === "COMPLETED" ? "green" : "orange"}>{item.status}</Tag>
              <Typography.Text type="secondary">Tạo lúc: {item.createdAt}</Typography.Text>
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
} 