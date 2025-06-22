"use client";

import { apiPageJob } from "@/api/page";
import { RequestPage } from "@/types/requests/page";
import { ResponseRecord } from "@/types/respones/record";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";

interface Props {
  filters: RequestPage.Job;
  search: string;
  page: number;
  onTotalChange: (total: number) => void;
}

export default function JobList({
  filters,
  search,
  page,
  onTotalChange,
}: Props) {
  const [jobs, setJobs] = useState<ResponseRecord.Job[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await apiPageJob({
          page,
          size: 15,
          sortField: filters.sortField || "id",
          sortType: filters.sortType || "desc",
          keyword: search,
          skillIds: filters.skillIds,
          majorId: filters.majorId,
          minBudget: filters.minBudget,
          maxBudget: filters.maxBudget,
          maxDurationHours: filters.maxDurationHours,
        });
        const data = res.data;
        setJobs(data.content || []);
        onTotalChange(data.totalElements || 0);
      } catch (err) {
        console.error("Lỗi khi gọi API jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [filters, search, page]);

  if (loading)
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} active avatar paragraph={{ rows: 3 }} />
        ))}
      </>
    );

  if (jobs.length === 0) return <div>Không có bài đăng nào</div>;

  return (
    <>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          highlightSkill={filters.skillIds}
          search={search}
        />
      ))}
    </>
  );
}
