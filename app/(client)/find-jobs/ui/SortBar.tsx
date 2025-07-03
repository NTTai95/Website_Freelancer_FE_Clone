"use client";

import { apiSortJob } from "@/api/sort";
import { RequestPage } from "@/types/requests/page";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";

const fieldLabel: Record<string, string> = {
  budget: "Ngân sách",
  durationHours: "Thời gian",
  postedAt: "Ngày đăng",
  closedAt: "Hạn nộp",
  id: "Mới nhất",
};

export default function SortBar({
  onChange,
}: {
  onChange: (sort: RequestPage.Job) => void;
}) {
  const [fields, setFields] = useState<
    ("budget" | "durationHours" | "postedAt" | "closedAt" | "id")[]
  >([]);
  const [sortField, setSortField] = useState<
    "budget" | "durationHours" | "postedAt" | "closedAt" | "id"
  >("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>("desc");

  useEffect(() => {
    apiSortJob().then((res) => {
      const allowedFields = ["budget", "durationHours", "postedAt", "closedAt", "id"];
      const filtered = (res.data || []).filter((f: string) =>
        allowedFields.includes(f)
      );
      setFields(
        filtered as (
          | "budget"
          | "durationHours"
          | "postedAt"
          | "closedAt"
          | "id"
        )[]
      );
    });
  }, []);

  const handleClick = (
    field: "budget" | "durationHours" | "postedAt" | "closedAt" | "id"
  ) => {
    let tempSortOrder = sortOrder;

    if (sortField === field) {
      if (sortOrder === "asc") {
        tempSortOrder = "desc";
      } else if (sortOrder === "desc") {
        tempSortOrder = undefined;
      } else {
        tempSortOrder = "asc";
      }
    } else {
      tempSortOrder = "asc";
    }

    onChange({
      sortField: tempSortOrder && field,
      sortType: tempSortOrder,
    });

    setSortOrder(tempSortOrder);
    setSortField(field);
  };

  return (
    <div className="!flex !flex-wrap !gap-3 !mb-6">
      <AnimatePresence>
        {fields.map((field) => {
          const isActive = sortField === field;
          const isAsc = isActive && sortOrder === "asc";
          const isDesc = isActive && sortOrder === "desc";
          const isUndefined = !isActive || !sortOrder;

          return (
            <motion.div
              key={field}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: easeOut }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.button
                onClick={() => handleClick(field)}
                className={`
                  !flex !items-center !gap-2 !px-4 !py-2 !rounded-xl !font-medium !text-sm
                  !transition-all !duration-200 !ease-in-out
                  ${isActive && !isUndefined
                    ? '!bg-blue-50 !border !border-blue-200 !text-blue-600'
                    : '!bg-gray-50 !border !border-gray-100 !text-gray-600 hover:!bg-gray-100'}
                `}
                animate={{
                  backgroundColor: isActive && !isUndefined ? "#dbeafe" : "#f9fafb",
                  borderColor: isActive && !isUndefined ? "#bfdbfe" : "#f3f4f6",
                  color: isActive && !isUndefined ? "#2563eb" : "#4b5563",
                }}
              >
                <span>{fieldLabel[field] || field}</span>

                <motion.span
                  className="!flex !items-center !gap-0.5"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.5,
                    scale: isActive ? 1.1 : 0.9
                  }}
                  transition={{ duration: 0.1 }}
                >
                  <ArrowUpOutlined
                    className={`
                      !text-[10px] !transition-colors
                      ${isAsc ? '!text-blue-600' : '!text-gray-400'}
                    `}
                  />
                  <ArrowDownOutlined
                    className={`
                      !text-[10px] !transition-colors
                      ${isDesc ? '!text-blue-600' : '!text-gray-400'}
                    `}
                  />
                </motion.span>

                <AnimatePresence>
                  {isActive && !isUndefined && (
                    <motion.span
                      initial={{ width: "auto", opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: "auto", opacity: 0 }}
                      className="!text-xs !text-blue-500 !ml-1 !font-normal"
                    >
                      {sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}