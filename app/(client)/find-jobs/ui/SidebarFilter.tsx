"use client";

import { apiFilterJob, FilterMap } from "@/api/filter";
import { RequestPage } from "@/types/requests/page";
import { Checkbox, Form, InputNumber, Select, Slider, Typography, Card, Divider } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import CardShadow from "@/components/ui/card-shadow";
import {
  BankOutlined,
  CodeOutlined,
  ClockCircleOutlined,
  DollarOutlined
} from '@ant-design/icons';

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
      },
      hover: {
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }
    };

    const buttonVariants = {
      hover: { scale: 1.03 },
      tap: { scale: 0.97 }
    };

    return (
      <div className="!space-y-6">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ delay: 0.1 }}
          className="!transform !transition-all !duration-300"
        >
          <CardShadow
            className="!rounded-xl !border-0 !shadow-md !overflow-hidden !bg-gradient-to-br !from-blue-50 !to-indigo-50"
            styleBody={{ padding: "1.5rem" }}
          >
            <div className="!flex !items-center !mb-4 !gap-2">
              <BankOutlined className="!text-xl !text-blue-600" />
              <Title level={4} className="!mb-0 !text-gray-800 !font-semibold">Chuyên ngành</Title>
            </div>
            <Select
              allowClear
              placeholder="Chọn chuyên ngành"
              onChange={(value) => {
                onFilterChange({
                  majorId: value ?? undefined,
                });
              }}
              className="!w-full !rounded-lg !border !border-gray-300 hover:!border-blue-500 focus:!border-blue-500 !shadow-sm"
              size="large"
              suffixIcon={<span className="!text-blue-500">▼</span>}
              dropdownClassName="!rounded-lg !shadow-lg !border !border-gray-200"
            >
              {majorList.map((major) => (
                <Option
                  key={major.value}
                  value={major.value}
                  className="!py-2 !px-4 hover:!bg-blue-50 !rounded"
                >
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
          whileHover="hover"
          transition={{ delay: 0.2 }}
          className="!transform !transition-all !duration-300"
        >
          <CardShadow
            className="!rounded-xl !border-0 !shadow-md !overflow-hidden !bg-gradient-to-br !from-purple-50 !to-pink-50"
            styleBody={{ padding: "1.5rem" }}
          >
            <div className="!flex !items-center !mb-4 !gap-2">
              <CodeOutlined className="!text-xl !text-purple-600" />
              <Title level={4} className="!mb-0 !text-gray-800 !font-semibold">Kỹ năng</Title>
            </div>
            <Select
              mode="multiple"
              allowClear
              placeholder="Chọn kỹ năng"
              onChange={(value) => {
                onFilterChange({
                  skillIds: value.length > 0 ? value : undefined,
                });
              }}
              className="!w-full !rounded-lg !border !border-gray-300 hover:!border-purple-500 focus:!border-purple-500 !shadow-sm"
              size="large"
              maxTagCount="responsive"
              suffixIcon={<span className="!text-purple-500">▼</span>}
              dropdownClassName="!rounded-lg !shadow-lg !border !border-gray-200"
              tagRender={(props) => (
                <span
                  className="!m-1 !px-2 !py-1 !bg-purple-100 !text-purple-800 !rounded-full !text-sm !flex !items-center"
                >
                  {props.label}
                  <span
                    className="!ml-1 !cursor-pointer hover:!text-purple-600"
                    onClick={props.onClose}
                  >
                    ×
                  </span>
                </span>
              )}
            >
              {skillsList.map((skill) => (
                <Option
                  key={skill.value}
                  value={skill.value}
                  className="!py-2 !px-4 hover:!bg-purple-50 !rounded"
                >
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
          whileHover="hover"
          transition={{ delay: 0.3 }}
          className="!transform !transition-all !duration-300"
        >
          <CardShadow
            className="!rounded-xl !border-0 !shadow-md !overflow-hidden !bg-gradient-to-br !from-cyan-50 !to-teal-50"
            styleBody={{ padding: "1.5rem" }}
          >
            <div className="!flex !items-center !mb-4 !gap-2">
              <ClockCircleOutlined className="!text-xl !text-cyan-600" />
              <Title level={4} className="!mb-0 !text-gray-800 !font-semibold">Thời gian làm việc (giờ)</Title>
            </div>
            <div className="!flex !items-center !gap-3 !mb-4">
              <InputNumber
                min={1}
                max={8760}
                value={durationHours}
                onChange={handleDurationInputChange}
                className="!flex-1 !rounded-lg !border !border-gray-300 hover:!border-cyan-500 focus:!border-cyan-500 !shadow-sm"
                size="large"
                formatter={(v) => `${v} giờ`}
                controls={false}
              />
            </div>
            <Slider
              range={false}
              min={1}
              max={8760}
              step={1}
              value={durationHours}
              onChange={handleDurationSliderChange}
              tooltip={{
                formatter: (val) => `${val} giờ`,
                placement: 'bottom'
              }}
              className="!mb-0"
              trackStyle={{ backgroundColor: "#06b6d4" }}
              handleStyle={{
                borderColor: "#06b6d4",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(6, 182, 212, 0.5)",
                height: 18,
                width: 18,
                marginTop: -7
              }}
              railStyle={{ backgroundColor: "#cffafe" }}
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
          whileHover="hover"
          transition={{ delay: 0.4 }}
          className="!transform !transition-all !duration-300"
        >
          <CardShadow
            className="!rounded-xl !border-0 !shadow-md !overflow-hidden !bg-gradient-to-br !from-amber-50 !to-orange-50"
            styleBody={{ padding: "1.5rem" }}
          >
            <div className="!flex !items-center !mb-4 !gap-2">
              <DollarOutlined className="!text-xl !text-amber-600" />
              <Title level={4} className="!mb-0 !text-gray-800 !font-semibold">Ngân sách</Title>
            </div>

            <div className="!grid !grid-cols-2 !gap-3 !mb-6">
              {budgetPresets.map((preset) => (
                <motion.div
                  key={preset.value}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <button
                    onClick={() => handleBudgetPresetChange(preset.value)}
                    className={`
                    !w-full !py-2 !rounded-lg !text-sm !font-medium !transition-all
                    !duration-200 !ease-in-out !transform
                    ${budgetChecked === preset.value
                        ? '!bg-amber-100 !border !border-amber-300 !text-amber-800 !font-semibold !shadow-inner'
                        : '!bg-white !border !border-amber-200 !text-amber-700 hover:!bg-amber-50 !shadow-sm'}
                  `}
                  >
                    {preset.label}
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="!text-sm !text-amber-700 !mb-4 !font-medium !flex !items-center">
              <span className="!h-px !flex-1 !bg-amber-200"></span>
              <span className="!px-3">Hoặc nhập khoảng giá phù hợp</span>
              <span className="!h-px !flex-1 !bg-amber-200"></span>
            </div>

            <div className="!flex !items-center !gap-3 !mb-6">
              <InputNumber
                min={0}
                max={100000000}
                value={budgetRange[0]}
                formatter={(v) => `${Number(v).toLocaleString()}đ`}
                onChange={(val) => handleBudgetInputChange(0, val)}
                className="!flex-1 !rounded-lg !border !border-amber-300 hover:!border-amber-500 focus:!border-amber-500 !shadow-sm"
                size="large"
                controls={false}
              />
              <span className="!text-amber-500 !font-bold">—</span>
              <InputNumber
                min={0}
                max={100000000}
                value={budgetRange[1]}
                formatter={(v) => `${Number(v).toLocaleString()}đ`}
                onChange={(val) => handleBudgetInputChange(1, val)}
                className="!flex-1 !rounded-lg !border !border-amber-300 hover:!border-amber-500 focus:!border-amber-500 !shadow-sm"
                size="large"
                controls={false}
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
              trackStyle={[{ backgroundColor: "#f59e0b" }]}
              handleStyle={[
                {
                  borderColor: "#f59e0b",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 8px rgba(245, 158, 11, 0.5)",
                  height: 18,
                  width: 18,
                  marginTop: -7
                },
                {
                  borderColor: "#f59e0b",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 8px rgba(245, 158, 11, 0.5)",
                  height: 18,
                  width: 18,
                  marginTop: -7
                }
              ]}
              railStyle={{ backgroundColor: "#fef3c7" }}
            />
            <div className="!flex !justify-between !text-xs !text-amber-700 !mt-2 !font-medium">
              <span>0đ</span>
              <span>100.000.000đ</span>
            </div>
          </CardShadow>
        </motion.div>
      </div>
    );
  };

export default SidebarFilter;