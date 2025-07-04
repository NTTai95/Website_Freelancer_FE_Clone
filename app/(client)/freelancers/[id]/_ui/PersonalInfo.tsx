/**
 * @file PersonalInfo.tsx
 * @description Component hiển thị thông tin cá nhân chi tiết của freelancer.
 * Tương tự employer nhưng có thêm logic tính tuổi từ birthday và sử dụng data structure khác.
 * Bao gồm avatar, bio, thông tin cá nhân và liên hệ với copy-to-clipboard functionality.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {object} props.data - Dữ liệu profile freelancer từ API
 * @returns {React.ReactElement} Card thông tin cá nhân với interactive elements
 */
'use client';

import { Card, Tag, Typography, Avatar, Rate, Divider } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, ManOutlined, WomanOutlined, CopyOutlined } from '@ant-design/icons';
import { ResponseDetail } from '@/types/respones/detail';
import { message } from 'antd';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/store/volatile/messageSlice';

const { Text, Title } = Typography;

interface PersonalInfoProps {
  data: ResponseDetail.Freelancer;
}

export default function PersonalInfo({ data }: PersonalInfoProps) {
  const personalData = data;
  const dispatch = useDispatch<AppDispatch>();

  const calculateAge = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday.split('/').reverse().join('-'));
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const getReputationLevel = (reputation: number) => {
    if (reputation >= 800) return { text: 'Uy tín cao', color: 'gold' };
    if (reputation >= 500) return { text: 'Uy tín tốt', color: 'green' };
    return { text: 'Uy tín thấp', color: 'orange' };
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      dispatch(addMessage({ content: `Đã sao chép ${type}!`, type: 'success', key: 'copy-to-clipboard' }));
    });
  };

  const reputationLevel = getReputationLevel(personalData.reputation);

  return (
    <Card className="!shadow-md !border-0 hover:!shadow-xl !transition-all !duration-300 !transform hover:!-translate-y-1">
      <div className="!space-y-8">
        <div className="!text-center group">
          <div className="!relative !inline-block">
            <Avatar
              size={80}
              src={personalData.avatar}
              className="!mb-4 !border-4 !border-blue-100 !transition-all !duration-300 group-hover:!border-blue-300 group-hover:!shadow-lg"
            />
            <div className="!absolute !inset-0 !rounded-full !bg-blue-500 !opacity-0 group-hover:!opacity-10 !transition-opacity !duration-300"></div>
          </div>
          <Title level={3} className="!mb-2 !text-gray-900 !font-bold !transition-colors !duration-300 hover:!text-blue-600 !cursor-default">
            {personalData.fullName}
          </Title>
          <div className="!flex !items-center !justify-center !gap-2 !mb-4">
            <Rate disabled defaultValue={4.2} allowHalf className="!text-sm !transition-transform !duration-300 hover:!scale-110" />
            <Text className="!text-gray-500 !text-sm">(4.2/5)</Text>
          </div>
          <Tag
            color={reputationLevel.color}
            className="!px-4 !py-2 !text-sm !font-semibold !text-center !transition-all !duration-300 hover:!scale-105 hover:!shadow-md !cursor-pointer"
          >
            {reputationLevel.text} • {personalData.reputation} điểm
          </Tag>
        </div>

        <Divider className="!my-6 !transition-colors !duration-300 hover:!border-blue-300" />

        <div className="!bg-gradient-to-r !from-blue-50 !to-indigo-50 !p-5 !rounded-lg !border-l-4 !border-blue-500 !transition-all !duration-300 hover:!from-blue-100 hover:!to-indigo-100 hover:!border-l-6 hover:!shadow-md !transform hover:!scale-[1.02]">
          <Text className="!text-gray-700 !text-sm !leading-relaxed !italic">
            &ldquo;{personalData.bio}&rdquo;
          </Text>
        </div>

        <Divider className="!my-6 !transition-colors !duration-300 hover:!border-blue-300" />

        <div className="!space-y-5">
          <Title level={4} className="!mb-4 !text-gray-900 !font-bold !flex !items-center !gap-2 !transition-colors !duration-300 hover:!text-blue-600">
            <UserOutlined className="!text-blue-600 !mr-1 !transition-transform !duration-300 hover:!scale-125 hover:!rotate-12" />
            Thông tin cá nhân
          </Title>

          <div className="!space-y-4">
            <div className="!flex !items-center !justify-between !p-2 !rounded-lg !transition-all !duration-300 hover:!bg-blue-50 hover:!shadow-sm group">
              <div className="!flex !items-center !gap-2">
                <CalendarOutlined className="!text-green-600 !text-sm !mr-1 !transition-all !duration-300 group-hover:!scale-125 group-hover:!text-green-700" />
                <Text className="!text-gray-600 !text-sm !font-medium !transition-colors !duration-300 group-hover:!text-gray-800">Tuổi:</Text>
              </div>
              <Text className="!text-gray-900 !font-semibold !text-sm !transition-colors !duration-300 group-hover:!text-blue-600">
                {calculateAge(personalData.birthday)} tuổi
              </Text>
            </div>

            <div className="!flex !items-center !justify-between !p-2 !rounded-lg !transition-all !duration-300 hover:!bg-blue-50 hover:!shadow-sm group">
              <div className="!flex !items-center !gap-2">
                {personalData.isMale ?
                  <ManOutlined className="!text-blue-600 !text-sm !mr-1 !transition-all !duration-300 group-hover:!scale-125 group-hover:!text-blue-700" /> :
                  <WomanOutlined className="!text-pink-600 !text-sm !mr-1 !transition-all !duration-300 group-hover:!scale-125 group-hover:!text-pink-700" />
                }
                <Text className="!text-gray-600 !text-sm !font-medium !transition-colors !duration-300 group-hover:!text-gray-800">Giới tính:</Text>
              </div>
              <Tag
                color={personalData.isMale ? 'blue' : 'pink'}
                className="!text-xs !font-medium !transition-all !duration-300 hover:!scale-110 hover:!shadow-sm"
              >
                {personalData.isMale ? 'Nam' : 'Nữ'}
              </Tag>
            </div>

            <div className="!flex !items-center !justify-between !p-2 !rounded-lg !transition-all !duration-300 hover:!bg-blue-50 hover:!shadow-sm group">
              <div className="!flex !items-center !gap-2">
                <CalendarOutlined className="!text-orange-600 !text-sm !mr-1 !transition-all !duration-300 group-hover:!scale-125 group-hover:!text-orange-700" />
                <Text className="!text-gray-600 !text-sm !font-medium !transition-colors !duration-300 group-hover:!text-gray-800">Tham gia:</Text>
              </div>
              <Text className="!text-gray-900 !text-sm !transition-colors !duration-300 group-hover:!text-blue-600">
                {new Date(personalData.joinedAt).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </Text>
            </div>
          </div>
        </div>

        <Divider className="!my-6 !transition-colors !duration-300 hover:!border-blue-300" />

        <div className="!space-y-5">
          <Title level={4} className="!mb-4 !text-gray-900 !font-bold !flex !items-center !gap-2 !transition-colors !duration-300 hover:!text-red-600">
            <MailOutlined className="!text-red-600 !mr-1 !transition-transform !duration-300 hover:!scale-125 hover:!rotate-12" />
            Thông tin liên hệ
          </Title>

          <div className="!space-y-4">
            <div
              className="!p-4 !bg-gray-50 !rounded-lg !transition-all !duration-300 hover:!bg-red-50 hover:!shadow-md hover:!border-red-200 !border !border-transparent !cursor-pointer group !transform hover:!scale-[1.02]"
              onClick={() => copyToClipboard(personalData.email, 'email')}
            >
              <div className="!flex !items-center !gap-2 !mb-2">
                <MailOutlined className="!text-red-600 !text-sm !mr-1 !transition-all !duration-300 group-hover:!scale-125 group-hover:!text-red-700" />
                <Text className="!text-gray-600 !text-sm !font-medium !transition-colors !duration-300 group-hover:!text-red-700">Email:</Text>
                <CopyOutlined className="!text-gray-400 !text-xs !ml-auto !opacity-0 group-hover:!opacity-100 !transition-all !duration-300 hover:!text-red-600" />
              </div>
              <Text className="!text-blue-600 !text-xs !break-all !font-medium !transition-colors !duration-300 group-hover:!text-red-600">
                {personalData.email}
              </Text>
            </div>

            <div
              className="!p-4 !bg-gray-50 !rounded-lg !transition-all !duration-300 hover:!bg-green-50 hover:!shadow-md hover:!border-green-200 !border !border-transparent !cursor-pointer group !transform hover:!scale-[1.02]"
              onClick={() => copyToClipboard(personalData.phone, 'số điện thoại')}
            >
              <div className="!flex !items-center !gap-2 !mb-2">
                <PhoneOutlined className="!text-green-600 !text-sm !mr-1 !transition-all !duration-300 group-hover:!scale-125 group-hover:!text-green-700" />
                <Text className="!text-gray-600 !text-sm !font-medium !transition-colors !duration-300 group-hover:!text-green-700">Điện thoại:</Text>
                <CopyOutlined className="!text-gray-400 !text-xs !ml-auto !opacity-0 group-hover:!opacity-100 !transition-all !duration-300 hover:!text-green-600" />
              </div>
              <Text className="!text-blue-600 !text-sm !font-semibold !transition-colors !duration-300 group-hover:!text-green-600">
                {personalData.phone}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}