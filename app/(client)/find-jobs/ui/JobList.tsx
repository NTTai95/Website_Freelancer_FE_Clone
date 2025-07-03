"use client";

import { apiPageJob } from "@/api/page";
import { RequestPage } from "@/types/requests/page";
import { ResponseRecord } from "@/types/respones/record";
import { Skeleton, Empty, Result, Card, Button } from "antd";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { SmileOutlined, FrownOutlined, SearchOutlined } from "@ant-design/icons";
import CardShadow from "@/components/ui/card-shadow";

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
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setNoResults(false);
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
        setNoResults(!data.content || data.content.length === 0);
      } catch (err) {
        console.error("Lỗi khi gọi API jobs:", err);
        setNoResults(true);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [filters, search, page]);

  if (loading) {
    return (
      <div className="!flex !flex-col !gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <CardShadow key={i} className="!rounded-xl !overflow-hidden">
            <div className="!p-6">
              <div className="!flex !items-start !gap-4">
                <Skeleton.Avatar
                  active
                  size={56}
                  shape="square"
                  className="!rounded-xl"
                />
                <div className="!flex-1">
                  <Skeleton.Input active block className="!mb-3 !h-7" />
                  <Skeleton.Input active block className="!mb-2 !h-4" />
                  <Skeleton.Input active block className="!w-3/4 !h-4" />
                </div>
              </div>

              <div className="!mt-4">
                <Skeleton paragraph={{ rows: 2 }} active className="!mb-4" />

                <div className="!flex !flex-wrap !gap-2 !mb-4">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Skeleton.Input
                      key={idx}
                      active
                      className="!w-20 !h-8 !rounded-lg"
                    />
                  ))}
                </div>

                <div className="!grid !grid-cols-2 !gap-4">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="!flex !items-center !gap-2">
                      <Skeleton.Avatar active size={24} shape="circle" />
                      <div className="!flex-1">
                        <Skeleton.Input active className="!w-16 !h-4 !mb-1" />
                        <Skeleton.Input active className="!w-24 !h-5" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="!mt-4 !text-right">
                  <Skeleton.Button active className="!w-32 !h-10 !rounded-lg" />
                </div>
              </div>
            </div>
          </CardShadow>
        ))}
      </div>
    );
  }

  if (noResults) {
    return (
      <div className="!flex !justify-center !items-center">
        <CardShadow className="!w-full !text-center !py-12 !px-6">
          {search ? (
            <Empty
              image={<SearchOutlined className="!text-5xl !text-gray-400" />}
              imageStyle={{ height: 80 }}
              description={
                <div className="!flex !flex-col !gap-4">
                  <h3 className="!text-xl !font-medium !text-gray-800">
                    Không tìm thấy công việc phù hợp
                  </h3>
                  <p className="!text-gray-600">
                    Không có công việc nào phù hợp với từ khóa <span className="!font-semibold">"{search}"</span>
                    và bộ lọc hiện tại. Vui lòng thử lại với từ khóa hoặc tiêu chí khác.
                  </p>
                </div>
              }
            />
          ) : (
            <Result
              icon={<SmileOutlined className="!text-5xl !text-yellow-500" />}
              title="Hiện chưa có công việc nào"
              subTitle={
                <div className="!flex !flex-col !gap-3">
                  <p className="!text-gray-600">
                    Hiện không có công việc nào phù hợp với bộ lọc của bạn.
                    Vui lòng thử lại với các tiêu chí khác hoặc quay lại sau nhé!
                  </p>
                </div>
              }
            />
          )}
        </CardShadow>
      </div>
    );
  }

  return (
    <div className="!flex !flex-col !gap-6">
      {jobs.map((job, index) => (
        <JobCard
          key={job.id}
          job={job}
          highlightSkill={filters.skillIds}
          search={search}
          index={index}
        />
      ))}
    </div>
  );
}