"use client";

import { apiFilterJob, FilterMap } from "@/api/filter";
import { RequestPage } from "@/types/requests/page";
import { Checkbox, Form, InputNumber, Select, Slider, Typography } from "antd";
import React, { useEffect, useState } from "react";

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
    { label: "Tất cả", value: "all", range: [0, 999999999] },
    { label: "Dưới 2 triệu", value: "below2", range: [0, 2000000] },
    { label: "Từ 2 - 4 triệu", value: "2to4", range: [2000000, 4000000] },
    { label: "Từ 4 - 7 triệu", value: "4to7", range: [4000000, 7000000] },
    { label: "Từ 7 - 13 triệu", value: "7to13", range: [7000000, 13000000] },
    { label: "Từ 13 - 20 triệu", value: "13to20", range: [13000000, 20000000] },
    { label: "Trên 20 triệu", value: "above20", range: [20000000, 999999999] },
  ];

  const durationPresets = [
    { label: "Tất cả", value: "all", range: [0, 999] },
    { label: "Dưới 50 giờ", value: "under10", range: [0, 50] },
    { label: "50 – 100 giờ", value: "10to30", range: [50, 100] },
    { label: "100 – 200 giờ", value: "30to60", range: [100, 200] },
    { label: "Trên 200 giờ", value: "above60", range: [200, 999] },
  ];

  const handleBudgetPresetChange = (value: string) => {
    const preset = budgetPresets.find((p) => p.value === value);
    if (preset) {
      setBudgetChecked(value);
      setBudgetRange(preset.range);
      handleFilterChange();
    }
  };

  const handleBudgetSliderChange = (value: [number?, number?] | number) => {
    if (Array.isArray(value) && value.length === 2) {
      onFilterChange({
        minBudget: value[0] ?? undefined,
        maxBudget: value[1] ?? undefined,
      });
    }
  };

  const handleDurationPresetChange = (value: string) => {
    const preset = durationPresets.find((p) => p.value === value);
    if (preset) {
      setDurationChecked(value);
      setDurationRange(preset.range as [number, number]);
      handleFilterChange();
    }
  };

  const handleDurationSliderChange = (value: number) => {
    onFilterChange({
      maxDurationHours: value ?? undefined,
    });
  };

  return (
    <Form layout="vertical">
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
        <Title level={4}>Thời gian làm việc (giờ)</Title>

        <div style={{ display: "flex", gap: 8, marginTop: 4, marginBottom: 8 }}>
          <InputNumber
            min={1}
            max={8760}
            onChange={(val) => val && handleDurationSliderChange(val)}
          />
        </div>

        <Slider
          range={false}
          min={1}
          max={8760}
          step={100}
          defaultValue={8760}
          onChange={handleDurationSliderChange}
        />
      </Form.Item>

      <Form.Item>
        <Title level={4}>Ngân sách</Title>
        {budgetPresets.map((preset) => (
          <div key={preset.value} style={{ marginBottom: 6 }}>
            <Checkbox onChange={() => handleBudgetPresetChange(preset.value)}>
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
            formatter={(v) => `${Number(v).toLocaleString()}đ`}
            onChange={(val) =>
              val !== null && handleBudgetSliderChange([val, undefined])
            }
            style={{ width: "50%" }}
          />
          <span>~</span>
          <InputNumber
            min={0}
            max={100000000}
            formatter={(v) => `${Number(v).toLocaleString()}đ`}
            onChange={(val) =>
              val !== null && handleBudgetSliderChange([undefined, val])
            }
            style={{ width: "50%" }}
          />
        </div>

        <Slider
          range
          min={0}
          max={100000000}
          step={1000000}
          onChange={(value) => {
            handleBudgetSliderChange(value as [number, number]);
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default SidebarFilter;
