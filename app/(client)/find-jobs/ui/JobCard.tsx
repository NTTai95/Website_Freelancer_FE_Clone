"use client";

import { ResponseRecord } from "@/types/respones/record";
import { getHighlightedText } from "@/utils/converter";
import { Avatar, Button, Card, Divider, Tag, Tooltip, Typography, Watermark } from "antd";
import { useEffect, useState } from "react";
import { ClockCircleOutlined, DollarOutlined, TeamOutlined, CalendarOutlined } from "@ant-design/icons";
import CardShadow from "@/components/ui/card-shadow";
import { useRouter } from "next/navigation";
import { easeOut, motion } from "framer-motion"; // Import framer-motion
import { apiGet } from "@/api/baseApi";

const { Text } = Typography;

export default function JobCard({
  job,
  highlightSkill,
  search,
  index,
}: {
  job: ResponseRecord.Job;
  highlightSkill?: number[];
  search?: string;
  index?: number;
}) {
  const router = useRouter();
  const [isApply, setIsApply] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: (index || 0) * 0.05, // Delay dựa trên index
        ease: easeOut
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  };

  useEffect(() => {
    apiGet(`/jobs/${job?.id}/is-apply`).then((res) => {
      setIsApply(res.data as boolean);
    })
  }, [])

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <CardShadow
        className="!rounded-xl !border !border-gray-100 !overflow-hidden"
        styleBody={{ padding: "1.5rem" }}
      >
        <div className="!flex !flex-col !gap-4">
          {/* Header with Avatar and Title */}
          <motion.div
            className="!flex !items-start !gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Avatar
              src={job.employerAvatar}
              size={56}
              className="!rounded-xl !shadow-sm !border !border-gray-200 hover:cursor-pointer hover:shadow-blue-500 transition"
              onClick={() => router.push(`/employers/${job?.employerId}`)}
            />

            <div className="!flex-1">
              <motion.h3
                className="!text-lg !font-bold !text-gray-800 !mb-1 !line-clamp-2 hover:cursor-pointer hover:!text-blue-700"
                onClick={() => { router.push(`/jobs/${job?.id}`) }}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {getHighlightedText(job.title, search || "")}
              </motion.h3>

              <div className="!flex !items-center !gap-3 !flex-wrap">
                <div className="!flex !items-center !gap-1 !text-gray-600">
                  <span className="!text-sm">Người đăng:</span>
                  <Text
                    strong
                    className="!text-gray-800 hover:cursor-pointer hover:!text-blue-700"
                    onClick={() => router.push(`/employers/${job?.employerId}`)}
                  >
                    {job.employerFullName}
                  </Text>
                </div>

                <div className="!w-px !h-4 !bg-gray-200"></div>

                <div className="!flex !items-center !gap-1 !text-gray-600">
                  <CalendarOutlined className="!text-gray-500" />
                  <span className="!text-sm">{job.postedAt}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Job Description with Expand */}
          <motion.div
            className="!mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p
              className={'!text-gray-600 !text-base !mb-2 whitespace-pre-line !line-clamp-7'}
            >{job.description}</p>
          </motion.div>

          <Divider className="!my-2 !border-gray-100" />

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="!flex !items-center !gap-2 !mb-3">
              <span className="!text-sm !font-medium !text-gray-700">Chuyên ngành:</span>
              {job.major ? (
                <Tag className="!px-3 !py-1 !rounded-lg !m-0 !bg-blue-100 !border-blue-200 !text-blue-700">
                  {job.major.name}
                </Tag>
              ) : (
                <span className="!text-gray-500">Không có</span>
              )}
            </div>

            <div className="!flex !items-center !gap-2 !mb-3">
              <span className="!text-sm !font-medium !text-gray-700">Kỹ năng:</span>
              <div className="!flex !flex-wrap !gap-2">
                {job.skills.map((s: { id: number; name: string }) => (
                  <motion.div
                    key={s.id}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Tag
                      className={`!px-3 !py-1 !rounded-lg !m-0 ${highlightSkill && highlightSkill.includes(s.id)
                        ? '!bg-pink-100 !border-pink-300 !text-pink-700 !font-medium'
                        : '!bg-gray-100 !border-gray-200 !text-gray-700'
                        }`}
                    >
                      {s.name}
                    </Tag>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="!flex !items-center !gap-2">
              <span className="!text-sm !font-medium !text-gray-700">Ngôn ngữ:</span>
              <div className="!flex !flex-wrap !gap-2">
                {job.languages.map((l: { id: number; name: string }) => (
                  <motion.div
                    key={l.id}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Tag
                      className="!px-3 !py-1 !rounded-lg !m-0 !bg-teal-100 !border-teal-200 !text-teal-700"
                    >
                      {l.name}
                    </Tag>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <Divider className="!my-2 !border-gray-100" />

          {/* Job Info Footer */}
          <motion.div
            className="!grid !grid-cols-2 !gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="!flex !items-center !gap-2">
              <DollarOutlined className="!text-green-600" />
              <div>
                <Text className="!block !text-xs !text-gray-500">Ngân sách</Text>
                <Text strong className="!text-base !text-gray-800">
                  {job.budget.toLocaleString("vi-VN")} đ
                </Text>
              </div>
            </div>

            <div className="!flex !items-center !gap-2">
              <ClockCircleOutlined className="!text-indigo-600" />
              <div>
                <Text className="!block !text-xs !text-gray-500">Thời gian</Text>
                <Text strong className="!text-base !text-gray-800">
                  {job.durationHours} giờ
                </Text>
              </div>
            </div>

            <div className="!flex !items-center !gap-2">
              <TeamOutlined className="!text-orange-600" />
              <div>
                <Text className="!block !text-xs !text-gray-500">Ứng tuyển</Text>
                <Text strong className="!text-base !text-gray-800">
                  {job.countApplies}
                </Text>
              </div>
            </div>

            <div className="!flex !items-center !gap-2">
              <CalendarOutlined className="!text-red-600" />
              <div>
                <Text className="!block !text-xs !text-gray-500">Hạn nộp</Text>
                <Text strong className="!text-base !text-gray-800">
                  {job.closedAt}
                </Text>
              </div>
            </div>
          </motion.div>

          {/* Apply Button */}
          <motion.div
            className="!mt-4 !text-right"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {isApply ?
              <Tooltip title="Bạn đã ứng tuyển công việc này" placement="top">
                <Button
                  disabled
                  className="!px-6 !py-2 !h-auto !rounded-lg !font-medium 
               !bg-gray-300 !text-gray-500 !cursor-not-allowed 
               !opacity-60 !hover:bg-gray-300 !hover:text-gray-500"
                  onClick={() => router.push(`jobs/${job?.id}/apply`)}
                >
                  Ứng tuyển
                </Button>
              </Tooltip>

              :
              <Button
                type="primary"
                className="!px-6 !py-2 !h-auto !rounded-lg !font-medium 
             !bg-gradient-to-r !from-blue-600 !to-indigo-600 
             hover:!from-blue-700 hover:!to-indigo-700 
             hover:!shadow-lg transition-all duration-200"
                onClick={() => router.push(`jobs/${job?.id}/apply`)}
              >
                Ứng tuyển
              </Button>
            }
          </motion.div>
        </div>
      </CardShadow>
    </motion.div>
  );
}