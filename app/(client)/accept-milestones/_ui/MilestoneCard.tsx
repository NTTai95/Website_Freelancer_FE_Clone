"use client";

import { Button, Card, Space, Tag, Typography } from "antd";
import { Milestone, MilestoneStatus } from "./types";

const { Paragraph } = Typography;

interface Props {
  milestone: Milestone;
  index: number;
  onAccept: () => void;
  onReject: () => void;
  onSubmit: () => void;
}

const renderStatusTag = (status: MilestoneStatus) => {
  switch (status) {
    case "doing":
      return <Tag color="blue">Đang thực hiện</Tag>;
    case "done":
      return <Tag color="green">Đã hoàn thành</Tag>;
    case "rejected":
      return <Tag color="red">Đã từ chối</Tag>;
    case "unpaid":
      return <Tag color="gold">Chưa thanh toán</Tag>;
    default:
      return <Tag color="default">Đang chờ</Tag>;
  }
};

export default function MilestoneCard({
  milestone,
  index,
  onAccept,
  onReject,
  onSubmit,
}: Props) {
  return (
    <Card
      title={`Giai đoạn ${index + 1}`}
      style={{ marginBottom: 20 }}
      extra={
        milestone.status === "pending" ? (
          <Space>
            <Button type="primary" onClick={onAccept}>
              Chấp nhận
            </Button>
            <Button danger onClick={onReject}>
              Từ chối
            </Button>
          </Space>
        ) : milestone.status === "doing" ? (
          <Button type="primary" onClick={onSubmit}>
            Nộp sản phẩm
          </Button>
        ) : (
          renderStatusTag(milestone.status)
        )
      }
    >
      <Paragraph>
        <strong>Nội dung:</strong> {milestone.content}
      </Paragraph>
      <Paragraph>
        <strong>Thời gian:</strong> {milestone.startAt} → {milestone.endAt}
      </Paragraph>
      <Paragraph>
        <strong>Tỷ trọng công việc:</strong> {milestone.percent}%
      </Paragraph>
      <Paragraph>
        <strong>Link tài liệu:</strong>{" "}
        <a href={milestone.document} target="_blank" rel="noopener noreferrer">
          {milestone.document}
        </a>
      </Paragraph>
    </Card>
  );
}
