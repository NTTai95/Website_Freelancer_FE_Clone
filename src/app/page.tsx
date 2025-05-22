"use client";
import TableLanguages from "@/features/languages/table-languages";
import TableIndustries from "@/features/industries/table-industries";
import TableSkills from "@/features/skills/table-skills";
import { useState } from "react";
import "antd/dist/reset.css";
export default function Home() {
  const [selectedTable, setSelectedTable] = useState<string>("languages");
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Sidebar trái */}
        <div className="w-1/4 rounded bg-gray-100 p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold">Danh mục</h2>
          <ul className="space-y-2">
            <li
              className="cursor-pointer hover:text-blue-600"
              onClick={() => setSelectedTable("languages")}
            >
              Ngôn ngữ
            </li>
            <li
              className="cursor-pointer hover:text-blue-600"
              onClick={() => setSelectedTable("industries")}
            >
              Ngành nghề
            </li>
            <li
              className="cursor-pointer hover:text-blue-600"
              onClick={() => setSelectedTable("skills")}
            >
              Kỹ năng
            </li>
          </ul>
        </div>

        {/* Nội dung bên phải */}
        <div className="w-3/4 space-y-6">
          {selectedTable === "languages" && <TableLanguages />}
          {selectedTable === "industries" && <TableIndustries />}
          {selectedTable === "skills" && <TableSkills />}
        </div>
      </div>
    </div>
  );
}
