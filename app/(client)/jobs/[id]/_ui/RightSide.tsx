"use client";

import {
  CalendarOutlined,
  UserOutlined,
  CrownOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined
} from "@ant-design/icons";
import { Avatar, Space, Typography, Button, Divider, Tooltip } from "antd";
import CardShadow from "@/components/ui/card-shadow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faEnvelope, faMedal, faPhone, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

const RightSide = ({ job }: { job: any }) => {
  const router = useRouter();
  return (
    <div className="space-y-6 !w-full">
      {/* Card thông tin người đăng - Modern Design */}
      <CardShadow className="!border-0 !bg-gradient-to-br !from-white !to-blue-50">
        <Space direction="vertical" size="small" className="!w-full">
          <div className="!flex !justify-center !relative">
            <div className="!absolute !-top-6">
              <Avatar
                size={90}
                icon={<UserOutlined />}
                className="!shadow-lg hover:cursor-pointer hover:!shadow-blue-300 transition"
                src={job?.employerAvatar || null}
                onClick={() => router.push(`/employers/${job?.employerId}`)}
              />
            </div>
          </div>

          <div className="!mt-18 !text-center">
            <Title
              level={4}
              className="!mb-3 !text-slate-800 !font-bold !tracking-tight hover:cursor-pointer hover:!text-blue-800"
              onClick={() => router.push(`/employers/${job?.employerId}`)}
            >
              {job?.employerFullName}
            </Title>

            <div className="!flex !justify-center">
              <Tooltip title="Điểm uy tín người đăng">
                <div className="!bg-gradient-to-r !from-blue-600 !to-indigo-700 !text-white !px-5 !py-2 !rounded-full !font-semibold !shadow-lg !flex !items-center !gap-2">
                  <FontAwesomeIcon icon={faMedal} className="!text-yellow-300" />
                  <span>{new Intl.NumberFormat('vi-VN').format(job?.employerReputation || 0)}</span>
                </div>
              </Tooltip>
            </div>
          </div>

          <Divider className="!border-slate-200" />

          <Space direction="vertical" className="!w-full" size="small">
            <InfoItem
              icon={<FontAwesomeIcon icon={faCalendarDay} className="!text-indigo-600" />}
              value={job?.employerBirthday || 'Chưa cập nhật'}
            />

            <InfoItem
              icon={<FontAwesomeIcon icon={faVenusMars} className="!text-indigo-600" />}
              value={job?.isMale ? "Nam" : "Nữ"}
            />

            <InfoItem
              icon={<FontAwesomeIcon icon={faPhone} className="!text-indigo-600" />}
              value={job?.phone || "Chưa cập nhật"}
            />

            <InfoItem
              icon={<FontAwesomeIcon icon={faEnvelope} className="!text-indigo-600" />}
              value={job?.email || "Chưa cập nhật"}
            />
          </Space>
        </Space>
      </CardShadow>
    </div>
  );
};

// Reusable Info Item Component
const InfoItem = ({ icon, value }: { icon: React.ReactNode; value: string }) => (
  <div className="!flex !items-center !gap-3 !p-3 !rounded-xl !bg-white !border !border-slate-100 !hover:border-indigo-200 !transition-all">
    <div className="!bg-blue-50 !p-2 !rounded-lg !text-lg">
      {icon}
    </div>
    <Text strong className="!text-slate-700 !text-base">
      {value}
    </Text>
  </div>
);

export default RightSide;