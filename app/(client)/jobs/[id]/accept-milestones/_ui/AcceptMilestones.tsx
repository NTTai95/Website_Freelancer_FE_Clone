// src/app/accept-milestones/[id]/_ui/AcceptMilestones.tsx
"use client";

import { Button, Typography } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import MilestoneCard from "./MilestoneCard";
import { useMilestones } from "./ContextMilestone";

const { Title } = Typography;

export default function AcceptMilestones() {
  const router = useRouter();
  const { id } = useParams();
  const { data, fetchData } = useMilestones();

  useEffect(() => {
    if (id) fetchData(id as string);
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="!px-16 !mb-6"
    >
      <div className="!flex !items-center !justify-between !my-6">
        <Title level={2} className="!text-2xl !font-bold !text-gray-800">
          <span className="!text-blue-600">{data?.job?.title}</span>
        </Title>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button type="primary" onClick={() => router.back()}>
            Quay lại
          </Button>
        </motion.div>
      </div>

      {data?.milestones.map((ms: any, index: number) => (
        <motion.div
          key={ms.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="!space-y-6"
        >
          <MilestoneCard
            milestone={ms}
            canCombined={data?.milestones.length > 1}
            index={index}
            totalProjectBudget={data?.totalProjectBudget || data?.job?.budget}
            jobMilestones={data?.milestones}
          />
        </motion.div>
      ))}
      <Button className={"!bg-gradient-to-r !to-blue-600 !from-sky-500 !w-full !text-white !font-bold !text-xl !p-6"}>Gửi danh sách giai đoạn đến freelancer</Button>
    </motion.div>
  );
}
