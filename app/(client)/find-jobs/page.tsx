"use client";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Input,
  Pagination,
  Row,
  Skeleton,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import SidebarFilter from "./SidebarFilter";
import { Job, JobFilters } from "./constants";
import { mockJobs } from "./mockJobs";

const { Title } = Typography;

const JobPostPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<JobFilters>({
    skills: [],
    fields: [],
    maxDuration: null,
    budget: undefined,
  });

  const pageSize = 20;

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(true);
      let filtered = mockJobs.filter((job) => {
        const matchSearch =
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchSkills =
          filters.skills.length === 0 ||
          filters.skills.every((skill) => job.skills.includes(skill));

        const matchFields =
          filters.fields.length === 0 ||
          filters.fields.some((field) => job.title.includes(field));

        const matchDuration =
          filters.maxDuration === null ||
          parseInt(job.duration) <= filters.maxDuration;

        const matchBudget =
          !filters.budget ||
          (job.budget >= filters.budget[0] && job.budget <= filters.budget[1]);

        return (
          matchSearch &&
          matchSkills &&
          matchFields &&
          matchDuration &&
          matchBudget
        );
      });

      if (sortField) {
        filtered = filtered.sort((a, b) => {
          const getDate = (d: string) => new Date(d).getTime();
          switch (sortField) {
            case "budget":
              return sortOrder === "asc"
                ? a.budget - b.budget
                : b.budget - a.budget;
            case "duration":
              return sortOrder === "asc"
                ? parseInt(a.duration) - parseInt(b.duration)
                : parseInt(b.duration) - parseInt(a.duration);
            case "posted":
              return sortOrder === "asc"
                ? getDate(a.postedDate) - getDate(b.postedDate)
                : getDate(b.postedDate) - getDate(a.postedDate);
            case "deadline":
              return sortOrder === "asc"
                ? getDate(a.deadline) - getDate(b.deadline)
                : getDate(b.deadline) - getDate(a.deadline);
            default:
              return 0;
          }
        });
      }

      const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
      setJobs(paginated);
      setTotal(filtered.length);
      setLoading(false);
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm, page, sortField, sortOrder, filters]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSortClick = (field: string) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (newFilters: JobFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div
      className="container my-5"
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
        DANH SÁCH VIỆC LÀM
      </Title>

      <Row gutter={24}>
        <Col span={6}>
          <Title level={4}>Tìm kiếm</Title>
          <Input.Search
            placeholder="Nhập từ khóa tìm kiếm..."
            enterButton="Tìm"
            size="large"
            onSearch={handleSearch}
            style={{ width: "100%", marginBottom: 20 }}
            allowClear
          />
          <SidebarFilter
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
        </Col>

        <Col span={18}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "5px",
              fontWeight: 500,
              paddingLeft: 10,
              marginTop: -20,
            }}
          >
            {["budget", "duration", "posted", "deadline"].map((field) => {
              const labelMap: Record<string, string> = {
                budget: "Ngân sách",
                duration: "Thời gian",
                posted: "Ngày đăng",
                deadline: "Hạn chót",
              };
              return (
                <div
                  key={field}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                  onClick={() => handleSortClick(field)}
                >
                  <span>{labelMap[field]}</span>
                  <span style={{ display: "flex", lineHeight: 1 }}>
                    <ArrowUpOutlined
                      style={{
                        color:
                          sortField === field && sortOrder === "asc"
                            ? "#1890ff"
                            : "#ccc",
                        fontSize: 12,
                      }}
                    />
                    <ArrowDownOutlined
                      style={{
                        color:
                          sortField === field && sortOrder === "desc"
                            ? "#1890ff"
                            : "#ccc",
                        fontSize: 12,
                      }}
                    />
                  </span>
                </div>
              );
            })}
          </div>
          <Divider style={{ margin: "10px 0" }} />

          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} active avatar paragraph={{ rows: 3 }} />
            ))
          ) : jobs.length === 0 ? (
            <div>Không có bài đăng nào</div>
          ) : (
            <>
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} highlight={searchTerm} />
              ))}
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <Pagination
                  current={page}
                  total={total}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default JobPostPage;
