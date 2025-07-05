"use client";

import { Button, Card, Space, Tag, Typography } from "antd";
import { motion } from "framer-motion";
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
  const tagConfig = {
    doing: { color: "blue", text: "Đang thực hiện" },
    done: { color: "green", text: "Đã hoàn thành" },
    rejected: { color: "red", text: "Đã từ chối" },
    unpaid: { color: "gold", text: "Chưa thanh toán" }, // Fixed to "Chưa thanh toán"
    pending: { color: "purple", text: "Đang chờ" },
  };

  return (
    <Tag
      color={tagConfig[status].color}
      className="!py-1 !px-3 !rounded-full !font-medium !text-sm"
    >
      {tagConfig[status].text}
    </Tag>
  );
};

export default function MilestoneCard({
  milestone,
  index,
  onAccept,
  onReject,
  onSubmit,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="!mb-6"
    >
      <Card
        title={
          <div className="!flex !items-center">
            <div className="!w-8 !h-8 !rounded-full !bg-blue-500 !flex !items-center !justify-center !text-white !font-bold !mr-3">
              {index + 1}
            </div>
            <span className="!text-lg !font-semibold !text-gray-800">
              Giai đoạn {index + 1}
            </span>
          </div>
        }
        className={`
  !rounded-xl !overflow-hidden !border-0
  !shadow-md hover:!shadow-xl
  ${
    milestone.status === "pending"
      ? "!border-l-4 !border-l-blue-500"
      : milestone.status === "doing"
      ? "!border-l-4 !border-l-green-500"
      : milestone.status === "rejected"
      ? "!border-l-4 !border-l-red-500"
      : milestone.status === "unpaid" // ĐÃ SỬA: Thêm điều kiện riêng cho unpaid
      ? "!border-l-4 !border-l-yellow-500"
      : "!border-l-4 !border-l-purple-500"
  }
`}
        extra={
          <div className="!flex !items-center">
            {milestone.status === "pending" ? (
              <Space>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="primary"
                    className="!bg-gradient-to-r !from-blue-500 !to-indigo-600 !hover:from-blue-600 !hover:to-indigo-700 !text-white"
                    onClick={onAccept}
                  >
                    Chấp nhận
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    danger
                    className="!bg-gradient-to-r !from-red-500 !to-orange-500 !hover:from-red-600 !hover:to-orange-600 !text-white"
                    onClick={onReject}
                  >
                    Từ chối
                  </Button>
                </motion.div>
              </Space>
            ) : milestone.status === "doing" ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="primary"
                  className="!bg-gradient-to-r !from-green-500 !to-teal-600 !hover:from-green-600 !hover:to-teal-700 !text-white"
                  onClick={onSubmit}
                >
                  Nộp sản phẩm
                </Button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }}>
                {renderStatusTag(milestone.status)}
              </motion.div>
            )}
          </div>
        }
      >
        <div className="!grid !grid-cols-1 !md:grid-cols-2 !gap-4">
          <Paragraph className="!mb-3">
            <span className="!font-medium !text-gray-700 !block">Nội dung</span>
            <span className="!text-gray-900">{milestone.content}</span>
          </Paragraph>

          <div>
            <Paragraph className="!mb-3">
              <span className="!font-medium !text-gray-700 !block">
                Thời gian
              </span>
              <span className="!text-gray-900">
                {milestone.startAt} → {milestone.endAt}
              </span>
            </Paragraph>
          </div>

          <div>
            <Paragraph className="!mb-3">
              <span className="!font-medium !text-gray-700 !block">
                Tỷ trọng công việc
              </span>
              <div className="!flex !items-center">
                <div className="!flex-1 !mr-2">
                  <div className="!w-full !bg-gray-200 !rounded-full !h-2.5">
                    <div
                      className="!h-2.5 !rounded-full !bg-gradient-to-r !from-blue-500 !to-indigo-600"
                      style={{ width: `${milestone.percent}%` }}
                    ></div>
                  </div>
                </div>
                <span className="!text-gray-900 !font-medium !whitespace-nowrap">
                  {milestone.percent}%
                </span>
              </div>
            </Paragraph>
          </div>

          <Paragraph className="!mb-3">
            <span className="!font-medium !text-gray-700 !block">
              Link tài liệu
            </span>
            {milestone.document ? (
              <a
                href={milestone.document}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-blue-600 !hover:text-blue-800 !transition-colors !truncate !block"
              >
                {milestone.document}
              </a>
            ) : (
              <span className="!text-gray-500 !italic !select-none">
                Không có tài liệu
              </span>
            )}
          </Paragraph>
        </div>
      </Card>
    </motion.div>
  );
}
