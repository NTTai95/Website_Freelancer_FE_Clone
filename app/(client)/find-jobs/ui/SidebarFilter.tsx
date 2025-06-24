"use client";

import { apiFilterJob, FilterMap } from "@/api/filter";
import { RequestPage } from "@/types/requests/page";
import { Checkbox, Form, InputNumber, Select, Slider, Typography } from "antd";
import React, { useEffect, useState, useRef } from "react";

const { Option } = Select;
const { Title } = Typography;

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

  return (
    <Form layout="vertical">
      <Form.Item>
        <Title level={4}>Chuyên ngành</Title>
        <Select
          allowClear
          placeholder="Chọn chuyên ngành"
          onChange={(value) => {
            onFilterChange({
              majorId: value ?? undefined,
            });
          }}
        >
          {majorList.map((major) => (
            <Option key={major.value} value={major.value}>
              {major.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Title level={4}>Kỹ năng</Title>
        <Select
          mode="multiple"
          allowClear
          placeholder="Chọn kỹ năng"
          onChange={(value) => {
            onFilterChange({
              skillIds: value.length > 0 ? value : undefined,
            });
          }}
        >
          {skillsList.map((skill) => (
            <Option key={skill.value} value={skill.value}>
              {skill.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Title level={4}>Thời gian làm việc (giờ)</Title>
        <div style={{ display: "flex", gap: 8, marginTop: 4, marginBottom: 8 }}>
          <InputNumber
            min={1}
            max={8760}
            value={durationHours}
            onChange={handleDurationInputChange}
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
        />
      </Form.Item>

      <Form.Item>
        <Title level={4}>Ngân sách</Title>
        {budgetPresets.map((preset) => (
          <div key={preset.value} style={{ marginBottom: 6 }}>
            <Checkbox
              checked={budgetChecked === preset.value}
              onChange={() => handleBudgetPresetChange(preset.value)}
            >
              {preset.label}
            </Checkbox>
          </div>
        ))}

        <div style={{ fontSize: 12, color: "#888", marginTop: 10 }}>
          Hoặc nhập khoảng giá phù hợp:
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 4, marginBottom: 8 }}>
          <InputNumber
            min={0}
            max={100000000}
            value={budgetRange[0]}
            formatter={(v) => `${Number(v).toLocaleString()}đ`}
            onChange={(val) => handleBudgetInputChange(0, val)}
            style={{ width: "50%" }}
          />
          <span>~</span>
          <InputNumber
            min={0}
            max={100000000}
            value={budgetRange[1]}
            formatter={(v) => `${Number(v).toLocaleString()}đ`}
            onChange={(val) => handleBudgetInputChange(1, val)}
            style={{ width: "50%" }}
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
        />
      </Form.Item>
    </Form>
  );
};

export default SidebarFilter;
