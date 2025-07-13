// src/app/accept-milestones/[id]/_ui/MilestoneCard.tsx
"use client";

import { Card, Tag, Typography, Progress, Row, Col } from "antd";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CheckCircleTwoTone, FileTextOutlined } from "@ant-design/icons";
import ActionFreelancer from "./ButtonAction/ActionFreelancer";
import { AuthGuard } from "@/components/AuthGuard";
import ActionEmployer from "./ButtonAction/ActionEmployer";
import EditMilestoneModal from "./ButtonAction/EditMilestoneModal";
import SplitMilestoneModal from "./ButtonAction/SplitMilestoneModal";
import DeleteMilestoneModal from "./ButtonAction/DeleteMilestoneModal";

const { Text } = Typography;

export default function MilestoneCard({
  milestone,
  index,
  totalProjectBudget,
  canCombined,
  jobMilestones
}: {
  milestone: any;
  index: number;
  totalProjectBudget: number;
  canCombined: boolean;
  jobMilestones: any[];
}) {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isSplitModalVisible, setIsSplitModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const milestoneAmount = useMemo(
    () => (milestone.percent / 100) * totalProjectBudget,
    [milestone.percent, totalProjectBudget]
  );

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{
          y: -5,
          transition: { duration: 0.2 }
        }}
        className="!mb-8"
      >
        <Card
          title={
            <div className="!flex !items-center !flex-wrap">
              <motion.div
                className="!w-10 !h-10 !rounded-full !bg-gradient-to-r !from-blue-500 !to-indigo-600 !flex !items-center !justify-center !text-white !font-bold !mr-3"
                whileHover={{ scale: 1.05 }}
              >
                {index + 1}
              </motion.div>
              <span className="!text-xl !font-bold !text-gray-800">
                Giai đoạn {index + 1}
              </span>

              {milestone?.isOverdue && (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="!ml-3"
                >
                  <Tag color="error" className="!py-1 !px-3 !font-semibold !text-sm !rounded-full">
                    QUÁ HẠN
                  </Tag>
                </motion.div>
              )}

              {milestone?.disputed && (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="!ml-2"
                >
                  <Tag color="warning" className="!py-1 !px-3 !font-semibold !text-sm !rounded-full">
                    TRANH CHẤP ({milestone?.totalDisputes})
                  </Tag>
                </motion.div>
              )}
            </div>
          }
          className={`
            !rounded-xl !overflow-hidden !border-0 
            !bg-white !shadow-md hover:!shadow-xl
            !transition-all !duration-300
            ${milestone?.isOverdue ? '!border-l-4 !border-l-red-500' : ''}
            ${milestone?.disputed ? '!border-l-4 !border-l-orange-500' : ''}
          `}
          extra={
            <AuthGuard roles={["ROLE_FREELANCER"]} fallback={<ActionEmployer onDeleteClick={() => setIsDeleteModalVisible(true)} onSplitClick={() => setIsSplitModalVisible(true)} onEditClick={() => setIsEditModalVisible(true)} canCombined={canCombined} milestone={milestone} />}>
              <ActionFreelancer milestone={milestone} />
            </AuthGuard>
          }
        >
          <div className="!grid !grid-cols-1 !md:grid-cols-2 !gap-5">
            {/* Content */}
            <div className="!mb-3">
              <Text strong className="!text-gray-600 !block !mb-1 !text-sm">Nội dung</Text>
              <div className="!bg-gray-50 !rounded-lg !p-3 !border !border-gray-100">
                <Text className="!text-gray-800">{milestone?.content}</Text>
              </div>
            </div>

            {/* Timeline */}
            <Row gutter={64}>
              {/* Progress */}
              <Col span={12}>
                <div className="col-span-2">
                  <div className="!flex !justify-between !items-center">
                    <Text strong className="!text-gray-600 !text-sm">
                      Tỷ trọng công việc
                    </Text>
                    <Text className="!text-gray-800 !font-bold">
                      {milestone?.percent}%
                    </Text>
                  </div>

                  <Progress
                    percent={milestone?.percent}
                    strokeColor={{
                      '0%': '#3b82f6',
                      '100%': '#6366f1',
                    }}
                    showInfo={false}
                    className=" !bg-gray-50 !rounded-lg !p-3 !border !border-gray-100"
                  />


                  <div className="!flex !justify-between !items-center">
                    <Text className="!text-gray-700 !font-semibold">
                      {formatCurrency(milestoneAmount)}
                    </Text>
                    <Text className="!text-gray-500 !text-xs">
                      Tổng ngân sách: {formatCurrency(totalProjectBudget)}
                    </Text>
                  </div>
                </div>
              </Col>

              <Col span={12}>
                <div>
                  <Text strong className="!text-gray-600 !block !mb-1 !text-sm">Thời gian</Text>
                  <div className="!flex !items-center !justify-between !bg-gray-50 !rounded-lg !p-3 !border !border-gray-100">
                    <Text className="!text-gray-800 !font-medium">
                      {milestone?.startAt}
                    </Text>
                    <div className="!mx-2 !text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <Text
                      className={`!text-gray-800 !font-medium ${milestone?.isOverdue ? '!text-red-500' : ''}`}
                    >
                      {milestone?.endAt}
                    </Text>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Products */}
            <div>
              <Text strong className="!text-gray-600 !block !mb-1 !text-sm">Tiến độ sản phẩm</Text>
              <div className="!bg-gray-50 !rounded-lg !p-3 !border !border-gray-100">
                <div className="!flex !items-center">
                  <div className="!w-8 !h-8 !rounded-full !bg-blue-100 !flex !items-center !justify-center !mr-3">
                    <span className="!text-blue-600 !font-bold">{milestone?.pendingProducts}/{milestone?.totalProducts}</span>
                  </div>
                  <Text className="!text-gray-800">sản phẩm đang chờ</Text>
                </div>
              </div>
            </div>

            {/* Document */}
            {milestone?.document && (
              <div>
                <Text strong className="!text-gray-600 !block !mb-1 !text-sm">Tài liệu đính kèm</Text>
                <motion.a
                  href={milestone.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    !flex !items-center !text-blue-600 !font-medium
                    !bg-blue-50 !rounded-lg !p-3 !border !border-blue-100
                    hover:!bg-blue-100 !transition-colors
                  "
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileTextOutlined className="!text-lg !mr-2" />
                  Xem tài liệu
                </motion.a>
              </div>
            )}

            {/* Payment */}
            {milestone?.fundedAt && (
              <div className="!md:col-span-2 !mt-2">
                <Text strong className="!text-gray-600 !block !mb-1 !text-sm">Thời điểm thanh toán</Text>
                <div className="!flex !items-center !justify-between !bg-green-50 !rounded-lg !p-3 !border !border-green-100">
                  <Text className="!text-gray-800 !font-medium">
                    {milestone?.fundedAt}
                  </Text>
                  <CheckCircleTwoTone className="!text-xl" twoToneColor="#10b981" />
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div >

      {/* Modals */}
      < EditMilestoneModal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)
        }
        milestone={milestone}
      />

      <SplitMilestoneModal
        visible={isSplitModalVisible}
        onCancel={() => setIsSplitModalVisible(false)}
        milestone={milestone}
      />

      <DeleteMilestoneModal
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        milestone={milestone}
        jobMilestones={jobMilestones}
      />
    </>
  );
}