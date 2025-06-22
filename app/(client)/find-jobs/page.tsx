"use client";

import { RequestPage } from "@/types/requests/page";
import { Col, Divider, Input, Row, Typography } from "antd";
import { useState } from "react";
import JobList from "./ui/JobList";
import PaginationControl from "./ui/PaginationControl";
import SidebarFilter from "./ui/SidebarFilter";
import SortBar from "./ui/SortBar";

const { Title } = Typography;

export default function JobPostPage() {
  const [filters, setFilters] = useState<RequestPage.Job>({});

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
        DANH SÁCH VIỆC LÀM
      </Title>

      <Row gutter={24}>
        <Col span={6}>
          <Input.Search
            placeholder="Tìm kiếm công việc..."
            enterButton="Tìm"
            size="large"
            allowClear
            onSearch={(val) => {
              setSearchTerm(val);
              setPage(1);
            }}
            style={{ marginBottom: 20 }}
          />
          <SidebarFilter
            onFilterChange={(filters) => {
              setFilters((prev: RequestPage.Job) => {
                return {
                  ...prev,
                  ...filters,
                };
              });
              setPage(1);
            }}
          />
        </Col>

        <Col span={18}>
          <SortBar
            onChange={(sort: RequestPage.Job) => {
              setFilters((prev: RequestPage.Job) => ({
                ...prev,
                ...sort,
              }));
              setPage(1);
            }}
          />
          <Divider style={{ marginTop: 0, marginBottom: 16 }} />
          <JobList
            filters={filters}
            search={searchTerm}
            page={page}
            onTotalChange={setTotal}
          />
          <PaginationControl
            current={page}
            total={total}
            onChange={(p) => setPage(p)}
          />
        </Col>
      </Row>
    </div>
  );
}
