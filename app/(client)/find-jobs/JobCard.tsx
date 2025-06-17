import { Avatar, Button, Card, Tag } from "antd";
import React from "react";
import { JobCardProps } from "./constants";

const highlightText = (text: string, keyword: string) => {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.split(regex).map((part, idx) =>
    regex.test(part) ? (
      <span key={idx} style={{ backgroundColor: "yellow" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

const JobCard: React.FC<JobCardProps> = ({ job, highlight }) => {
  return (
    <Card style={{ marginBottom: 20 }}>
      <Card.Meta
        avatar={<Avatar src={job.avatar} size={48} />}
        title={
          <span style={{ fontSize: 18, fontWeight: "bold" }}>
            {highlightText(job.title, highlight)}
          </span>
        }
        description={
          <div style={{ fontSize: 16 }}>
            <p>{highlightText(job.description, highlight)}</p>
            <div style={{ marginBottom: 6 }}>
              <strong>Người đăng:</strong> {job.posterName} |{" "}
              <strong>Ngày đăng:</strong> {job.postedDate}
            </div>
            <div>
              <strong>Kỹ năng:</strong>{" "}
              {job.skills.map((skill) => (
                <Tag key={skill} style={{ fontSize: 14, padding: "2px 6px" }}>
                  {skill}
                </Tag>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
                fontSize: 15,
              }}
            >
              <div>
                <strong>Ngân sách:</strong> ${job.budget} |{" "}
                <strong>Thời gian:</strong> {job.duration} |{" "}
                <strong>Ứng tuyển:</strong> {job.applicants}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                  Hạn chót: {job.deadline}
                </div>
                <Button type="primary" size="small">
                  Ứng tuyển ngay
                </Button>
              </div>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default JobCard;
