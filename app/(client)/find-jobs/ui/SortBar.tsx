"use client";

import { apiSortJob } from "@/api/sort";
import { RequestPage } from "@/types/requests/page";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const fieldLabel: Record<string, string> = {
  budget: "Ngân sách",
  durationHours: "Thời gian",
  postedAt: "Ngày đăng",
  closedAt: "Hạn chót",
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
  >();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>("asc");

  useEffect(() => {
    apiSortJob().then((res) => {
      const allowedFields = ["budget", "durationHours", "postedAt", "closedAt"];
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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
        fontWeight: 500,
        paddingLeft: 10,
        marginBottom: 12,
        userSelect: "none",
      }}
    >
      {fields.map((field) => {
        const isActive = sortField === field;
        const isAsc = isActive && sortOrder === "asc";
        const isDesc = isActive && sortOrder === "desc";
        const isUndefined = !isActive || !sortOrder;

        return (
          <div
            key={field}
            onClick={() => handleClick(field)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: isActive && !isUndefined ? "#1890ff" : undefined,
            }}
          >
            <span>{fieldLabel[field] || field}</span>
            <span style={{ display: "flex", gap: 2, alignItems: "center" }}>
              <ArrowUpOutlined
                style={{
                  fontSize: 10,
                  color: isAsc && !isUndefined ? "#1890ff" : "#ccc",
                }}
              />
              <ArrowDownOutlined
                style={{
                  fontSize: 10,
                  color: isDesc && !isUndefined ? "#1890ff" : "#ccc",
                }}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
}
