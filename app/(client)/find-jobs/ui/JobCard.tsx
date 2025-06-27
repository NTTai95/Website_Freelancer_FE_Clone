"use client";

import { ResponseRecord } from "@/types/respones/record";
import { getHighlightedText } from "@/utils/converter";
import { Avatar, Button, Card, Tag } from "antd";
import { useState } from "react";

export default function JobCard({
  job,
  highlightSkill,
  search,
}: {
  job: ResponseRecord.Job;
  highlightSkill?: number[];
  search?: string;
}) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const maxLength = 120;
  const shouldTruncate = job.description.length > maxLength;
  const truncated = job.description.slice(0, maxLength);
  return (
    <Card style={{ marginBottom: 20 }}>
      <Card.Meta
        avatar={<Avatar src={job.employerAvatar} size={48} />}
        title={
          <span style={{ fontSize: 18, fontWeight: "bold" }}>
            {getHighlightedText(job.title, search || "")}
          </span>
        }
        description={
          <div style={{ fontSize: 16 }}>
            <p style={{ marginBottom: 4, display: "inline" }}>
              {showFullDesc ? job.description : truncated}
              {!showFullDesc && shouldTruncate && <>...</>}
            </p>

            <div style={{ marginBottom: 6 }}>
              <strong>Người đăng:</strong> {job.employerFullName} |{" "}
              <strong>Ngày đăng:</strong> {job.postedAt}
            </div>

            <div style={{ marginBottom: 6 }}>
              <strong>Kỹ năng:</strong>{" "}
              {job.skills.map(
                (s: { id: number; name: string }): React.ReactElement => {
                  if (highlightSkill && highlightSkill.includes(s.id)) {
                    return (
                      <Tag
                        key={s.id}
                        color="#c41d7f"
                        style={{ fontWeight: "bold" }}
                      >
                        {s.name}
                      </Tag>
                    );
                  } else {
                    return <Tag key={s.id}>{s.name}</Tag>;
                  }
                }
              )}
            </div>

            <div style={{ marginBottom: 6 }}>
              <strong>Ngôn ngữ:</strong>{" "}
              {job.languages.map((l: { id: number; name: string }) => (
                <Tag key={l.id} color="green">
                  {l.name}
                </Tag>
              ))}
            </div>

            <div style={{ marginBottom: 6 }}>
              <strong>Chuyên ngành:</strong>{" "}
              {job.major ? (
                <Tag color="blue">{job.major.name}</Tag>
              ) : (
                "Không có"
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                marginTop: 10,
              }}
            >
              <div style={{ fontSize: 15, flex: 1 }}>
                <strong>Ngân sách:</strong> {job.budget.toLocaleString("vi-VN")}{" "}
                đ | <strong>Thời gian:</strong> {job.durationHours} giờ |{" "}
                <strong>Ứng tuyển:</strong> {job.countApplies}
              </div>
              <div style={{ whiteSpace: "nowrap", fontWeight: 500 }}>
                <strong>Hạn nộp:</strong> {job.closedAt}
              </div>
            </div>

            <div style={{ textAlign: "right", marginTop: 8 }}>
              <Button type="primary" size="small">
                Ứng tuyển
              </Button>
            </div>
          </div>
        }
      />
    </Card>
  );
}
