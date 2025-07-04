"use client";

import { RequestPage } from "@/types/requests/page";
import { Col, Divider, Input, Row, Typography } from "antd";
import { useState } from "react";
import JobList from "./ui/JobList";
import PaginationControl from "./ui/PaginationControl";
import SidebarFilter from "./ui/SidebarFilter";
import SortBar from "./ui/SortBar";
import { motion } from "framer-motion";
import { SearchOutlined } from "@ant-design/icons";

export default function JobPostPage() {
  const [filters, setFilters] = useState<RequestPage.Job>({});

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  return (
    <div style={{ margin: "0 auto", padding: "5rem" }}>

      <Row gutter={24}>
        <Col span={6}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="!mb-5"
          >
            <Input.Search
              placeholder="Tìm kiếm công việc..."
              size="large"
              allowClear
              onSearch={(val) => {
                setSearchTerm(val);
                setPage(1);
              }}
              className="!rounded-lg !overflow-hidden"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            />
          </motion.div>
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
          {total > 0 && (
            <PaginationControl
              current={page}
              total={total}
              onChange={(p) => setPage(p)}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}
