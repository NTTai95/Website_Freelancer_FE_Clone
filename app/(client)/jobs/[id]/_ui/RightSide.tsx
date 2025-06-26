"use client";

import {
  CalendarOutlined,
  UserOutlined,
  TrophyOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Avatar, Space, Typography, Tag, Divider } from "antd";
import CardShadow from "@/components/ui/card-shadow";
import { useIsEmployer } from "@/hooks/useAuth";
import { ResponseDetail } from "@/types/respones/detail";

const { Title, Text } = Typography;

const RightSide = ({ job }: { job: ResponseDetail.Job }) => {
  const languages = [
    { name: "Tiếng Anh", level: "Thành thạo" },
    { name: "Tiếng Đức", level: "Trung bình" },
    { name: "Tiếng Nhật", level: "Khá" },
    { name: "Tiếng Hàn", level: "Cơ bản" },
  ];


  return (
    <div className="space-y-6">
      {/* Card thông tin người đăng */}
      <CardShadow className="text-center sticky top-6 !p-6">
        <Space direction="vertical" size="large" className="w-full">
          <Avatar
            size={120}
            icon={<UserOutlined />}
            className="ring-4 ring-blue-100"
          />

          <div>
            <Title level={4} className="!mb-2 !text-blue-900">
              {job?.employerFullName}
            </Title>

            <div className="mb-4 mt-4">
              <div className="bg-blue-900 text-white px-4 py-2 rounded-full text-center font-semibold shadow-lg">
                🏆 {job?.document}
              </div>
            </div>
          </div>

          <Space direction="vertical" className="w-full" size="middle">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <CalendarOutlined className="text-blue-600 text-lg" />
              <Text strong className="text-gray-800">{job?.employerAge}</Text>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <UserOutlined className="text-blue-600 text-lg" />
              <Text strong className="text-gray-800">{job?.isMale}</Text>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <TrophyOutlined className="text-blue-600 text-lg" />
              <Text strong className="text-gray-800">{job?.employerReputation}</Text>
            </div>
          </Space>
        </Space>
      </CardShadow>

      {/* Card ngôn ngữ */}
      <CardShadow className="shadow-lg !p-6">
        <Title level={4} className="!text-blue-900 !mb-4">
          <GlobalOutlined className="mr-2" />
          Ngôn ngữ
        </Title>

        <Space direction="vertical" className="w-full" size="middle">
          {languages.map((lang, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <GlobalOutlined className="text-blue-600" />
                <Text strong>{lang.name}</Text>
              </div>
              <Tag color="blue">{lang.level}</Tag>
            </div>
          ))}
        </Space>
      </CardShadow>
    </div>
  );
};

export default RightSide;
