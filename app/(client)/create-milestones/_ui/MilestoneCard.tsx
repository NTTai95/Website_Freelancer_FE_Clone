"use client";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Space, Typography } from "antd";
import { EmloyerMilestones } from "./types";

const { Paragraph } = Typography;

export const renderStatus = (status?: string) => {
  switch (status) {
    case "DONE":
      return <Paragraph type="success">Đã hoàn thành</Paragraph>;
    case "DOING":
      return <Paragraph type="warning">Đang thực hiện</Paragraph>;
    case "REJECTED":
      return <Paragraph type="danger">Đã từ chối</Paragraph>;
    case "UNPAID":
      return (
        <Paragraph style={{ color: "#1890ff" }}>Chưa thanh toán</Paragraph>
      );
    default:
      return <Paragraph type="secondary">Chờ xác nhận</Paragraph>;
  }
};

interface Props {
  stage: EmloyerMilestones;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  onPay: () => void;
}

export default function MilestoneCard({
  stage,
  index,
  onEdit,
  onDelete,
  onPay,
}: Props) {
  return (
    <Card
      key={index}
      type="inner"
      title={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Giai đoạn {index + 1}</span>
          <Space>
            {stage.status === "PENDING" && stage.milestoneId && (
              <>
                <Button icon={<EditOutlined />} onClick={onEdit}>
                  Chỉnh sửa
                </Button>
                <Button danger icon={<DeleteOutlined />} onClick={onDelete}>
                  Xóa
                </Button>
              </>
            )}
            {stage.status === "UNPAID" && (
              <Button icon={<EditOutlined />} onClick={onPay}>
                Thanh toán
              </Button>
            )}
            {!stage.milestoneId && (
              <Button danger icon={<DeleteOutlined />} onClick={onDelete}>
                Xóa
              </Button>
            )}
          </Space>
        </div>
      }
      style={{ marginBottom: 16 }}
    >
      {stage.milestoneId && stage.status && (
        <div style={{ marginBottom: 10 }}>{renderStatus(stage.status)}</div>
      )}
      <Paragraph>
        <strong>Nội dung:</strong> {stage.content}
      </Paragraph>
      <Paragraph>
        <strong>Thời gian:</strong> {stage.startAt} → {stage.endAt}
      </Paragraph>
      <Paragraph>
        <strong>Tỷ trọng công việc:</strong> {stage.percent}%
      </Paragraph>
      {stage.document?.trim() && (
        <Paragraph>
          <strong>Link tài liệu:</strong>{" "}
          <a href={stage.document} target="_blank" rel="noopener noreferrer">
            {stage.document}
          </a>
        </Paragraph>
      )}

      <Paragraph>
        <strong>Tranh chấp:</strong>{" "}
        {stage.disputed ? "Có tranh chấp" : "Không"}
      </Paragraph>
      <Paragraph>
        <strong>Quá hạn:</strong> {stage.isOverdue ? "Đã quá hạn" : "Chưa"}
      </Paragraph>
    </Card>
  );
}
