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

const { Title } = Typography;

export default function AcceptMilestones() {
  const jobId = 12;
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobIdParam = searchParams.get("jobId");
  // const jobId = jobIdParam ? Number(jobIdParam) : null;

  const [jobTitle, setJobTitle] = useState("");
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  // Define the expected shape of the fetchMilestones response
  type FetchMilestonesResponse = {
    milestones: any[];
    jobTitle?: string;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!jobId) return message.error("Thiếu jobId trên URL");

      try {
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

  return (
    <div style={{ padding: 32 }}>
      <Row justify="center">
        <Col xs={24} sm={22} md={18} lg={14}>
          <Title level={2}>
            Tên dự án: <span style={{ color: "#1677ff" }}>{jobTitle}</span>
          </Title>

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

          {hasPending && (
            <div style={{ textAlign: "right", marginTop: 24 }}>
              <Space>
                <Button danger onClick={() => handleBulkDecision("rejected")}>
                  Từ chối toàn bộ
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleBulkDecision("doing")}
                >
                  Chấp nhận toàn bộ
                </Button>
              </Space>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
