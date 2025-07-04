"use client";

import { ResponseRecord } from "@/types/respones/record";
import { getHighlightedText } from "@/utils/converter";
import { Avatar, Button, Card, Divider, Tag, Tooltip, Typography, Watermark } from "antd";
import { useEffect, useState } from "react";
import {
  ClockCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  CalendarOutlined,
  StarFilled,
  CheckCircleFilled
} from "@ant-design/icons";
import CardShadow from "@/components/ui/card-shadow";
import { useRouter } from "next/navigation";
import { easeOut, motion, AnimatePresence } from "framer-motion";
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
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: (index || 0) * 0.05,
        ease: easeOut
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)",
      transition: { duration: 0.3, ease: easeOut }
    }
  };

  const tagVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring" as const, stiffness: 400 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 6px 12px rgba(59, 130, 246, 0.25)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
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
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="!transform !transition-all !duration-300"
    >
      <CardShadow
        className="!rounded-xl !border-0 !overflow-hidden !bg-gradient-to-br !from-white !to-gray-50"
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar
                src={job.employerAvatar}
                size={56}
                className="!rounded-xl !shadow-md !border-2 !border-white hover:cursor-pointer hover:!shadow-blue-500/30 transition"
                onClick={() => router.push(`/employers/${job?.employerId}`)}
              />
            </motion.div>

            <div className="!flex-1">
              <motion.div
                className="!flex !items-start !justify-between !gap-2"
              >
                <motion.h3
                  className="!text-lg !font-bold !text-gray-800 !mb-1 !line-clamp-2 hover:cursor-pointer hover:!text-blue-700"
                  onClick={() => { router.push(`/jobs/${job?.id}`) }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {getHighlightedText(job.title, search || "")}
                </motion.h3>

                <AnimatePresence>
                  {isApply && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="!flex !items-center !gap-1 !bg-green-50 !px-2 !py-1 !rounded-lg"
                    >
                      <CheckCircleFilled className="!text-green-500" />
                      <span className="!text-xs !text-green-700 !font-medium">Đã ứng tuyển</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="!flex !items-center !gap-3 !flex-wrap">
                <div className="!flex !items-center !gap-1 !text-gray-600">
                  <span className="!text-sm">Người đăng:</span>
                  <Text
                    strong
                    className="!text-gray-800 hover:cursor-pointer hover:!text-blue-700 !transition-colors"
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
              className={'!text-gray-600 !text-base !mb-2 whitespace-pre-line !line-clamp-4'}
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
              <span className="!text-sm !font-medium !text-gray-700 !min-w-[90px]">Chuyên ngành:</span>
              {job.major ? (
                <motion.div
                  variants={tagVariants}
                  whileHover="hover"
                >
                  <Tag className="!px-3 !py-1 !rounded-lg !m-0 !bg-blue-100 !border !border-blue-200 !text-blue-700 !font-medium">
                    {job.major.name}
                  </Tag>
                </motion.div>
              ) : (
                <span className="!text-gray-500">Không có</span>
              )}
            </div>

            <div className="!flex !items-start !gap-2 !mb-3">
              <span className="!text-sm !font-medium !text-gray-700 !min-w-[90px] !pt-1">Kỹ năng:</span>
              <div className="!flex !flex-wrap !gap-2">
                {job.skills.map((s: { id: number; name: string }) => (
                  <motion.div
                    key={s.id}
                    variants={tagVariants}
                    whileHover="hover"
                  >
                    <Tag
                      className={`!px-3 !py-1 !rounded-lg !m-0 !font-medium !border !border-solid ${highlightSkill && highlightSkill.includes(s.id)
                        ? '!bg-pink-100 !border-pink-300 !text-pink-700'
                        : '!bg-gray-100 !border-gray-200 !text-gray-700'
                        }`}
                    >
                      {s.name}
                    </Tag>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="!flex !items-start !gap-2">
              <span className="!text-sm !font-medium !text-gray-700 !min-w-[90px] !pt-1">Ngôn ngữ:</span>
              <div className="!flex !flex-wrap !gap-2">
                {job.languages.map((l: { id: number; name: string }) => (
                  <motion.div
                    key={l.id}
                    variants={tagVariants}
                    whileHover="hover"
                  >
                    <Tag
                      className="!px-3 !py-1 !rounded-lg !m-0 !bg-teal-100 !border !border-teal-200 !text-teal-700 !font-medium"
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
            <motion.div
              className="!flex !items-center !gap-2 !bg-gradient-to-r !from-green-50 !to-emerald-50 !p-3 !rounded-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <div className="!p-2 !bg-green-100 !rounded-lg">
                <DollarOutlined className="!text-green-600 !text-lg" />
              </div>
              <div>
                <Text className="!block !text-xs !text-gray-500">Ngân sách</Text>
                <Text strong className="!text-base !text-gray-800">
                  {job.budget.toLocaleString("vi-VN")} đ
                </Text>
              </div>
            </motion.div>

            <motion.div
              className="!flex !items-center !gap-2 !bg-gradient-to-r !from-indigo-50 !to-violet-50 !p-3 !rounded-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <div className="!p-2 !bg-indigo-100 !rounded-lg">
                <ClockCircleOutlined className="!text-indigo-600 !text-lg" />
              </div>
              <div>
                <Text className="!block !text-xs !text-gray-500">Thời gian</Text>
                <Text strong className="!text-base !text-gray-800">
                  {job.durationHours} giờ
                </Text>
              </div>
            </motion.div>

            <motion.div
              className="!flex !items-center !gap-2 !bg-gradient-to-r !from-amber-50 !to-orange-50 !p-3 !rounded-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <div className="!p-2 !bg-amber-100 !rounded-lg">
                <TeamOutlined className="!text-amber-600 !text-lg" />
              </div>
              <div>
                <Text className="!block !text-xs !text-gray-500">Ứng tuyển</Text>
                <Text strong className="!text-base !text-gray-800">
                  {job.countApplies}
                </Text>
              </div>
            </motion.div>

            <motion.div
              className="!flex !items-center !gap-2 !bg-gradient-to-r !from-rose-50 !to-pink-50 !p-3 !rounded-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <div className="!p-2 !bg-rose-100 !rounded-lg">
                <CalendarOutlined className="!text-rose-600 !text-lg" />
              </div>
              <div>
                <Text className="!block !text-xs !text-gray-500">Hạn nộp</Text>
                <Text strong className="!text-base !text-gray-800">
                  {job.closedAt}
                </Text>
              </div>
            </motion.div>
          </motion.div>

          {/* Apply Button */}
          <motion.div
            className="!mt-4 !text-right"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {isApply ? (
              <Tooltip title="Bạn đã ứng tuyển công việc này" placement="top">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    disabled
                    className="!px-6 !py-2.5 !h-auto !rounded-xl !font-medium 
                      !bg-gradient-to-r !from-green-100 !to-emerald-100 
                      !text-green-700 !border !border-green-200
                      !shadow-sm !cursor-not-allowed"
                  >
                    <div className="!flex !items-center !gap-2">
                      <CheckCircleFilled className="!text-green-500" />
                      <span>Đã ứng tuyển</span>
                    </div>
                  </Button>
                </motion.div>
              </Tooltip>
            ) : (
              <motion.div
                variants={buttonVariants}
                whileTap="tap"
              >
                <Button
                  type="primary"
                  className="!px-6 !py-2.5 !h-auto !rounded-xl !font-medium 
                    !bg-gradient-to-r !from-blue-600 !to-indigo-600 
                    hover:!from-blue-700 hover:!to-indigo-700 
                    !shadow-md !transition-all !duration-200"
                  onClick={() => router.push(`jobs/${job?.id}/apply`)}
                >
                  Ứng tuyển ngay
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </CardShadow>
    </motion.div>
  );
}