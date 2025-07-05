"use client";

import { Button, Col, message, Row, Space, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MilestoneCard from "./MilestoneCard";
import {
  fetchMilestones,
  respondToMilestone,
  respondToMultipleMilestones,
} from "./milestoneAPI";
import { Milestone, MilestoneStatus } from "./types";
import { motion } from "framer-motion";

const { Title } = Typography;

export default function AcceptMilestones() {
  const jobId = 12;
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobIdParam = searchParams.get("jobId");
  // const jobId = jobIdParam ? Number(jobIdParam) : null;

  const [jobTitle, setJobTitle] = useState("");
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define the expected shape of the fetchMilestones response
  type FetchMilestonesResponse = {
    milestones: any[];
    jobTitle?: string;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!jobId) return message.error("Thiếu jobId trên URL");

      try {
        setIsLoading(true);
        const rawData = (await fetchMilestones(
          jobId
        )) as FetchMilestonesResponse;
        if (!rawData || !Array.isArray(rawData.milestones)) {
          throw new Error("Dữ liệu milestones không hợp lệ.");
        }

        const all: Milestone[] = rawData.milestones.map((m: any) => ({
          milestoneId: m.milestoneId,
          content: m.title,
          startAt: m.startAt,
          endAt: m.endAt,
          percent: m.percent,
          document: m.document,
          status:
            m.mode === "actionable"
              ? "pending"
              : m.statusLabel === "Đã hoàn thành"
              ? "done"
              : m.statusLabel === "Đã từ chối"
              ? "rejected"
              : m.statusLabel === "Chưa thanh toán"
              ? "unpaid"
              : "doing",
        }));

        setMilestones(all);
        if (rawData.jobTitle) {
          setJobTitle(rawData.jobTitle);
        }
      } catch {
        message.error("Không thể tải dữ liệu giai đoạn.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [jobId]);

  const handleDecision = async (
    milestoneId: number,
    status: MilestoneStatus
  ) => {
    try {
      await respondToMilestone(milestoneId, status === "doing");
      setMilestones((prev) =>
        prev.map((ms) =>
          ms.milestoneId === milestoneId ? { ...ms, status } : ms
        )
      );
      message.success("Cập nhật trạng thái thành công.");
    } catch {
      message.error("Lỗi cập nhật trạng thái.");
    }
  };

  const handleBulkDecision = async (status: MilestoneStatus) => {
    try {
      const pendingIds = milestones
        .filter((m) => m.status === "pending")
        .map((m) => m.milestoneId);

      await respondToMultipleMilestones(pendingIds, status === "doing");

      setMilestones((prev) =>
        prev.map((ms) => (ms.status === "pending" ? { ...ms, status } : ms))
      );

      message.success(
        status === "doing"
          ? "Bạn đã chấp nhận toàn bộ các giai đoạn."
          : "Bạn đã từ chối toàn bộ các giai đoạn."
      );
    } catch {
      message.error("Lỗi khi cập nhật trạng thái hàng loạt.");
    }
  };

  const handleSubmitProduct = (id: number) => {
    router.push(`/submit-product/${id}`);
  };

  const hasPending = milestones.some((ms) => ms.status === "pending");

  if (isLoading) {
    return (
      <div className="!flex !items-center !justify-center !min-h-[70vh]">
        <div className="!animate-spin !rounded-full !h-16 !w-16 !border-t-2 !border-b-2 !border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="!min-h-screen !bg-gradient-to-br !from-blue-50 !to-indigo-100 !py-12 !px-4"
    >
      <div className="!max-w-4xl !mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
          className="!bg-white !rounded-2xl !shadow-xl !p-6 !mb-8 !border !border-blue-100"
        >
          <Row justify="center">
            <Col xs={24} sm={22} md={20} lg={18}>
              <div className="!flex !items-center !justify-between !mb-6">
                <Title
                  level={2}
                  className="!text-2xl !font-bold !text-gray-800"
                >
                  Tên dự án: <span className="!text-blue-600">{jobTitle}</span>
                </Title>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    type="primary"
                    className="!bg-gradient-to-r !from-blue-500 !to-indigo-600 !hover:from-blue-600 !hover:to-indigo-700"
                    onClick={() => router.back()}
                  >
                    Quay lại
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                className="!space-y-6"
              >
                {milestones.map((ms, index) => (
                  <MilestoneCard
                    key={ms.milestoneId}
                    milestone={ms}
                    index={index}
                    onAccept={() => handleDecision(ms.milestoneId, "doing")}
                    onReject={() => handleDecision(ms.milestoneId, "rejected")}
                    onSubmit={() => handleSubmitProduct(ms.milestoneId)}
                  />
                ))}
              </motion.div>

              {hasPending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="!mt-8 !pt-6 !border-t !border-gray-200 !text-right"
                >
                  <Space>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="large"
                        danger
                        className="!px-6 !py-3 !font-medium !bg-gradient-to-r !from-red-500 !to-orange-500 !hover:from-red-600 !hover:to-orange-600 !text-white"
                        onClick={() => handleBulkDecision("rejected")}
                      >
                        Từ chối toàn bộ
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="large"
                        type="primary"
                        className="!px-6 !py-3 !font-medium !bg-gradient-to-r !from-green-500 !to-teal-500 !hover:from-green-600 !hover:to-teal-600"
                        onClick={() => handleBulkDecision("doing")}
                      >
                        Chấp nhận toàn bộ
                      </Button>
                    </motion.div>
                  </Space>
                </motion.div>
              )}
            </Col>
          </Row>
        </motion.div>
      </div>
    </motion.div>
  );
}
