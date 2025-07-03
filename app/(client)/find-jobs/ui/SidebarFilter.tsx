"use client";

import { apiFilterJob, FilterMap } from "@/api/filter";
import { RequestPage } from "@/types/requests/page";
import { Checkbox, Form, InputNumber, Select, Slider, Typography, Card, Divider } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import CardShadow from "@/components/ui/card-shadow";

const { Option } = Select;
const { Title, Text } = Typography;

const SidebarFilter: React.FC<{
  onFilterChange: (filters: RequestPage.Job) => void;
}> = ({
  onFilterChange,
}: {
  onFilterChange: (filters: RequestPage.Job) => void;
}) => {
    const [skillsList, setSkillsList] = useState<
      {
        label: string;
        value: number;
      }[]
    >([]);
    const [majorList, setMajorList] = useState<
      {
        label: string;
        value: number;
      }[]
    >([]);

    const [durationHours, setDurationHours] = useState<number>(8760);
    const [budgetRange, setBudgetRange] = useState<[number, number]>([
      0, 100000000,
    ]);
    const [budgetChecked, setBudgetChecked] = useState<string | null>(null);

    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const debounceBudgetRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      const fetchFilterData = async () => {
        try {
          const res = await apiFilterJob();
          const filterData: FilterMap = res.data;
          const skills =
            filterData["skillIds"]?.map((s) => {
              return { label: `${s.label} (${s.count})`, value: Number(s.value) };
            }) || [];

          const majors =
            filterData["majorId"]?.map((m) => {
              return { label: `${m.label} (${m.count})`, value: Number(m.value) };
            }) || [];
          setSkillsList(skills);
          setMajorList(majors);
        } catch (error) {
          console.error("❌ Lỗi gọi API Filter Job:", error);
        }
      };

      fetchFilterData();
    }, []);

    const budgetPresets: {
      label: string;
      value: string;
      range: [number, number];
    }[] = [
        { label: "Tất cả", value: "all", range: [0, 100000000] },
        { label: "Dưới 5 triệu", value: "below5", range: [0, 5000000] },
        { label: "5 - 10 triệu", value: "5to10", range: [5000000, 10000000] },
        { label: "10 - 20 triệu", value: "10to20", range: [10000000, 20000000] },
        { label: "20 - 50 triệu", value: "20to50", range: [20000000, 50000000] },
        { label: "50 - 100 triệu", value: "50to100", range: [50000000, 100000000] },
      ];
    const findBudgetPreset = (min: number, max: number): string | null => {
      for (const preset of budgetPresets) {
        if (min >= preset.range[0] && max <= preset.range[1]) {
          return preset.value;
        }
      }
      return null;
    };

    const handleBudgetPresetChange = (value: string) => {
      const preset = budgetPresets.find((p) => p.value === value);
      if (preset) {
        setBudgetChecked(value);
        setBudgetRange(preset.range);
        onFilterChange({
          minBudget: preset.range[0],
          maxBudget: preset.range[1],
        });
      }
    };

    const handleBudgetInputChange = (index: 0 | 1, val: number | null) => {
      const newRange: [number, number] = [...budgetRange];
      if (val !== null) {
        newRange[index] = val;
        setBudgetRange(newRange);
        setBudgetChecked(findBudgetPreset(newRange[0], newRange[1]));

        if (debounceBudgetRef.current) {
          clearTimeout(debounceBudgetRef.current);
        }
        debounceBudgetRef.current = setTimeout(() => {
          onFilterChange({
            minBudget: newRange[0],
            maxBudget: newRange[1],
          });
        }, 800);
      }
    };

    const handleBudgetSliderChange = (value: [number, number]) => {
      setBudgetRange(value);
      setBudgetChecked(findBudgetPreset(value[0], value[1]));

      if (debounceBudgetRef.current) {
        clearTimeout(debounceBudgetRef.current);
      }
      debounceBudgetRef.current = setTimeout(() => {
        onFilterChange({
          minBudget: value[0],
          maxBudget: value[1],
        });
      }, 800);
    };
    const handleDurationInputChange = (value: number | null) => {
      if (value !== null) {
        setDurationHours(value);
        onFilterChange({
          maxDurationHours: value,
        });
      }
    };

    const handleDurationSliderChange = (value: number) => {
      setDurationHours(value);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        onFilterChange({
          maxDurationHours: value,
        });
      }, 800);
    };

    // Animation variants
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: easeOut }
      }
    };

    return (
      <div className="!space-y-6">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <CardShadow
            className="!rounded-xl !border-0 !shadow-sm !overflow-hidden"
            styleBody={{ padding: "1.5rem" }}
          >
            <Title level={4} className="!mb-4 !text-gray-800">Chuyên ngành</Title>
            <Select
              allowClear
              placeholder="Chọn chuyên ngành"
              onChange={(value) => {
                onFilterChange({
                  majorId: value ?? undefined,
                });
              }}
              className="!w-full"
              size="large"
            >
              {majorList.map((major) => (
                <Option key={major.value} value={major.value}>
                  {major.label}
                </Option>
              ))}
            </Select>
          </CardShadow>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <CardShadow
            className="!rounded-xl !border-0 !shadow-sm !overflow-hidden"
            styleBody={{ padding: "1.5rem" }}
          >
            <Title level={4} className="!mb-4 !text-gray-800">Kỹ năng</Title>
            <Select
              mode="multiple"
              allowClear
              placeholder="Chọn kỹ năng"
              onChange={(value) => {
                onFilterChange({
                  skillIds: value.length > 0 ? value : undefined,
                });
              }}
              className="!w-full"
              size="large"
              maxTagCount="responsive"
            >
              {skillsList.map((skill) => (
                <Option key={skill.value} value={skill.value}>
                  {skill.label}
                </Option>
              ))}
            </Select>
          </CardShadow>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <CardShadow
            className="!rounded-xl !border-0 !shadow-sm !overflow-hidden"
            styleBody={{ padding: "1.5rem" }}
          >
            <Title level={4} className="!mb-4 !text-gray-800">Thời gian làm việc (giờ)</Title>
            <div className="!flex !items-center !gap-3 !mb-4">
              <InputNumber
                min={1}
                max={8760}
                value={durationHours}
                onChange={handleDurationInputChange}
                className="!flex-1"
                size="large"
                formatter={(v) => `${v} giờ`}
              />
            </div>
            <Slider
              range={false}
              min={1}
              max={8760}
              step={1}
              value={durationHours}
              onChange={handleDurationSliderChange}
              tooltip={{ formatter: (val) => `${val} giờ` }}
              className="!mb-0"
              trackStyle={{ backgroundColor: "#3b82f6" }}
              handleStyle={{
                borderColor: "#3b82f6",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)"
              }}
            />
            <div className="!flex !justify-between !text-xs !text-gray-500 !mt-2">
              <span>1 giờ</span>
              <span>8760 giờ</span>
            </div>
          </CardShadow>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <CardShadow
            className="!rounded-xl !border-0 !shadow-sm !overflow-hidden"
            styleBody={{ padding: "1.5rem" }}
          >
            <Title level={4} className="!mb-4 !text-gray-800">Ngân sách</Title>

            <div className="!grid !grid-cols-2 !gap-3 !mb-6">
              {budgetPresets.map((preset) => (
                <motion.div
                  key={preset.value}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <button
                    onClick={() => handleBudgetPresetChange(preset.value)}
                    className={`
                    !w-full !py-2 !rounded-lg !text-sm !font-medium !transition-all
                    ${budgetChecked === preset.value
                        ? '!bg-blue-100 !border !border-blue-300 !text-blue-700 !font-semibold'
                        : '!bg-gray-100 !border !border-gray-200 !text-gray-700 hover:!bg-gray-200'}
                  `}
                  >
                    {preset.label}
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="!text-sm !text-gray-600 !mb-4">
              Hoặc nhập khoảng giá phù hợp:
            </div>

            <div className="!flex !items-center !gap-3 !mb-6">
              <InputNumber
                min={0}
                max={100000000}
                value={budgetRange[0]}
                formatter={(v) => `${Number(v).toLocaleString()}đ`}
                onChange={(val) => handleBudgetInputChange(0, val)}
                className="!flex-1"
                size="large"
              />
              <span className="!text-gray-400">—</span>
              <InputNumber
                min={0}
                max={100000000}
                value={budgetRange[1]}
                formatter={(v) => `${Number(v).toLocaleString()}đ`}
                onChange={(val) => handleBudgetInputChange(1, val)}
                className="!flex-1"
                size="large"
              />
            </div>

            <Slider
              range
              min={0}
              max={100000000}
              step={1000000}
              value={budgetRange}
              onChange={(value: number[]) =>
                handleBudgetSliderChange(value as [number, number])
              }
              className="!mb-0"
              trackStyle={[{ backgroundColor: "#3b82f6" }]}
              handleStyle={[
                {
                  borderColor: "#3b82f6",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)"
                },
                {
                  borderColor: "#3b82f6",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)"
                }
              ]}
            />
            <div className="!flex !justify-between !text-xs !text-gray-500 !mt-2">
              <span>0đ</span>
              <span>100.000.000đ</span>
            </div>
          </CardShadow>
        </motion.div>
      </div>
    );
  };

export default SidebarFilter;