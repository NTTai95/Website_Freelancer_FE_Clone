"use client";

import { Checkbox, Form, InputNumber, Select, Slider, Typography } from "antd";
import React, { useState } from "react";
import { SidebarFilterProps } from "./constants";

const { Option } = Select;
const { Title } = Typography;

const skillsList = ["React", "Node.js", "TypeScript", "Java", "Python"];
const fieldList = ["Web", "Mobile", "AI", "Data", "Game"];
const durationOptions = [3, 5, 7, 10];

const SidebarFilter: React.FC<SidebarFilterProps> = ({ onFilterChange }) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [duration, setDuration] = useState<number | null>(null);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([
    0, 50000000,
  ]);
  const [budgetChecked, setBudgetChecked] = useState<string>("all");

  const budgetPresets = [
    { label: "Tất cả", value: "all", range: [0, 99999999] },
    { label: "Dưới 2 triệu", value: "below2", range: [0, 2000000] },
    { label: "Từ 2 - 4 triệu", value: "2to4", range: [2000000, 4000000] },
    { label: "Từ 4 - 7 triệu", value: "4to7", range: [4000000, 7000000] },
    { label: "Từ 7 - 13 triệu", value: "7to13", range: [7000000, 13000000] },
    { label: "Từ 13 - 20 triệu", value: "13to20", range: [13000000, 20000000] },
    { label: "Trên 20 triệu", value: "above20", range: [20000000, 100000000] },
  ];

  const handleFilterChange = (customBudget: [number, number] | null = null) => {
    onFilterChange({
      skills,
      fields,
      maxDuration: duration,
      budget: customBudget || budgetRange,
    });
  };

  const handleBudgetPresetChange = (value: string) => {
    const preset = budgetPresets.find((p) => p.value === value);
    if (preset) {
      setBudgetChecked(value);
      setBudgetRange(preset.range);
      handleFilterChange(preset.range);
    }
  };

  const handleBudgetSliderChange = (value: [number, number]) => {
    setBudgetChecked("");
    setBudgetRange(value);
    handleFilterChange(value);
  };

  return (
    <Form layout="vertical">
      <Form.Item style={{ marginBottom: 16 }}>
        <Title level={4} style={{ marginBottom: 8 }}>
          Kỹ năng
        </Title>
        <Select
          mode="multiple"
          allowClear
          placeholder="Chọn kỹ năng"
          value={skills}
          onChange={(value) => {
            setSkills(value);
            handleFilterChange();
          }}
        >
          {skillsList.map((skill) => (
            <Option key={skill}>{skill}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Title level={4} style={{ marginBottom: 8 }}>
          Chuyên ngành
        </Title>
        <Select
          mode="multiple"
          allowClear
          placeholder="Chọn chuyên ngành"
          value={fields}
          onChange={(value) => {
            setFields(value);
            handleFilterChange();
          }}
        >
          {fieldList.map((field) => (
            <Option key={field}>{field}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Title level={4} style={{ marginBottom: 8 }}>
          Thời gian làm việc (ngày)
        </Title>
        <Select
          allowClear
          placeholder="Chọn thời gian"
          value={duration ?? undefined}
          onChange={(value) => {
            setDuration(value);
            handleFilterChange();
          }}
        >
          {durationOptions.map((d) => (
            <Option key={d} value={d}>
              {d} ngày
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Title level={4} style={{ marginBottom: 8 }}>
          Ngân sách
        </Title>
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
            value={budgetRange[0]}
            formatter={(v) => `${Number(v).toLocaleString()}đ`}
            parser={(v) => parseInt(v?.replace(/[^\d]/g, "") || "0")}
            onChange={(val) =>
              val !== null && handleBudgetSliderChange([val, budgetRange[1]])
            }
            style={{ width: "50%" }}
          />
          <span>~</span>
          <InputNumber
            min={0}
            value={budgetRange[1]}
            formatter={(v) => `${Number(v).toLocaleString()}đ`}
            parser={(v) => parseInt(v?.replace(/[^\d]/g, "") || "0")}
            onChange={(val) =>
              val !== null && handleBudgetSliderChange([budgetRange[0], val])
            }
            style={{ width: "50%" }}
          />
        </div>

        <Slider
          range
          min={0}
          max={50000000}
          step={100000}
          value={budgetRange}
          onChange={handleBudgetSliderChange}
        />
      </Form.Item>
    </Form>
  );
};

export default SidebarFilter;
