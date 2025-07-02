import { useState, useContext } from 'react';
import {
    Avatar, Button, Divider, Input
} from 'antd';
import {
    UserOutlined, EditOutlined, MailOutlined,
    PhoneOutlined, CalendarOutlined, ManOutlined, WomanOutlined
} from '@ant-design/icons';
import ProfileContext from './ProfileContext';
import CardShadow from '@/components/ui/card-shadow';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import dayjs from 'dayjs';

import AvatarModal from './profileModals/AvatarModal';
import FullNameModal from './profileModals/FullNameModal';
import BioModal from './profileModals/BioModal';
import EmailModal from './profileModals/EmailModal';
import PhoneModal from './profileModals/PhoneModal';
import GenderModal from './profileModals/GenderModal';
import BirthdayModal from './profileModals/BirthdayModal';
import { useAuthorization } from '@/hooks/useAuthorization';

const { TextArea } = Input;

export default function ProfileSidebar({ data }: { data: any }) {
    const dispatch = useDispatch<AppDispatch>();
    const { reloadData } = useContext(ProfileContext);

    // Modal visibility states
    const [avatarModalVisible, setAvatarModalVisible] = useState(false);
    const [fullNameModalVisible, setFullNameModalVisible] = useState(false);
    const [bioModalVisible, setBioModalVisible] = useState(false);
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [phoneModalVisible, setPhoneModalVisible] = useState(false);
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [birthdayModalVisible, setBirthdayModalVisible] = useState(false);

    const auth = useAuthorization();

    return (
        <CardShadow className={`!w-full ${auth.hasRole(['ROLE_FREELANCER']) && 'md:!w-3/6'} !flex !flex-col !items-center`} styleBody={{ padding: "24px", width: "100%" }}>
            <div className="!flex !flex-col !items-center !w-full">
                {/* Avatar Section */}
                <div className="!relative !mb-4">
                    <Avatar
                        size={160}
                        src={data?.avatar}
                        icon={<UserOutlined />}
                        className="!shadow-md !cursor-pointer hover:!opacity-80 !transition-opacity"
                        onClick={() => setAvatarModalVisible(true)}
                    />
                </div>

                <AvatarModal
                    visible={avatarModalVisible}
                    onCancel={() => setAvatarModalVisible(false)}
                    dispatch={dispatch}
                    reloadData={reloadData}
                />

                {/* Name Section */}
                <div className="!flex !items-center !gap-2 !mb-2">
                    <h2 className="!text-2xl !font-bold !m-0">{data?.fullName}</h2>
                    <Button
                        type="text"
                        icon={<EditOutlined className="!text-blue-500" />}
                        onClick={() => {
                            setFullNameModalVisible(true);
                        }}
                        className="!p-1"
                    />
                </div>

                <FullNameModal
                    visible={fullNameModalVisible}
                    onCancel={() => setFullNameModalVisible(false)}
                    initialValue={data?.fullName}
                    dispatch={dispatch}
                    reloadData={reloadData}
                />

                {/* Role Section */}
                <p className="!text-gray-500 !mb-4">
                    {data?.role === 'freelancer' ? 'Freelancer' : 'Nhà tuyển dụng'}
                </p>

                {/* Reputation Section */}
                <div className="!w-full !mb-4">
                    <div className="!flex !justify-between !mb-1">
                        <span className="!text-sm !font-medium">Điểm uy tín</span>
                        <span className="!text-sm !font-medium">{data?.reputation}</span>
                    </div>
                    <Divider className="!border-4 !border-blue-900 !mt-1 !mb-2" />
                </div>

                {/* Basic Info Section */}
                <div className="!w-full !space-y-4 !mb-4">
                    {/* Email Field */}
                    <div className="!flex !flex-col">
                        <div className="!flex !items-center !justify-between !mb-1">
                            <span className="!text-sm !font-bold !text-gray-800">
                                <MailOutlined className="!mr-2" />
                                Email
                            </span>
                            <Button
                                type="text"
                                icon={<EditOutlined className="!text-blue-500" />}
                                onClick={() => setEmailModalVisible(true)}
                                className="!p-1"
                            />
                        </div>
                        <p className="!text-gray-800 !m-0 !break-all">
                            {data?.email || 'Chưa có'}
                        </p>
                    </div>

                    <EmailModal
                        visible={emailModalVisible}
                        onCancel={() => setEmailModalVisible(false)}
                        initialEmail={data?.email}
                        dispatch={dispatch}
                        reloadData={reloadData}
                    />

                    {/* Phone Field */}
                    <div className="!flex !flex-col">
                        <div className="!flex !items-center !justify-between !mb-1">
                            <span className="!text-sm !font-bold !text-gray-800">
                                <PhoneOutlined className="!mr-2" />
                                Điện thoại
                            </span>
                            <Button
                                type="text"
                                icon={<EditOutlined className="!text-blue-500" />}
                                onClick={() => setPhoneModalVisible(true)}
                                className="!p-1"
                            />
                        </div>
                        <p className="!text-gray-800 !m-0 !break-all">
                            {data?.phone || 'Chưa có'}
                        </p>
                    </div>

                    <PhoneModal
                        visible={phoneModalVisible}
                        onCancel={() => setPhoneModalVisible(false)}
                        initialPhone={data?.phone}
                        dispatch={dispatch}
                        reloadData={reloadData}
                    />

                    {/* Gender Field */}
                    <div className="!flex !flex-col">
                        <div className="!flex !items-center !justify-between !mb-1">
                            <span className="!text-sm !font-bold !text-gray-800">
                                {data?.isMale ? <ManOutlined className="!mr-2" /> : <WomanOutlined className="!mr-2" />}
                                Giới tính
                            </span>
                            <Button
                                type="text"
                                icon={<EditOutlined className="!text-blue-500" />}
                                onClick={() => setGenderModalVisible(true)}
                                className="!p-1"
                            />
                        </div>
                        <p className="!text-gray-800 !m-0">
                            {data?.isMale ? 'Nam' : 'Nữ'}
                        </p>
                    </div>

                    <GenderModal
                        visible={genderModalVisible}
                        onCancel={() => setGenderModalVisible(false)}
                        initialGender={data?.isMale}
                        dispatch={dispatch}
                        reloadData={reloadData}
                    />

                    {/* Birthday Field */}
                    <div className="!flex !flex-col">
                        <div className="!flex !items-center !justify-between !mb-1">
                            <span className="!text-sm !font-bold !text-gray-800">
                                <CalendarOutlined className="!mr-2" />
                                Ngày sinh
                            </span>
                            <Button
                                type="text"
                                icon={<EditOutlined className="!text-blue-500" />}
                                onClick={() => setBirthdayModalVisible(true)}
                                className="!p-1"
                            />
                        </div>
                        <p className="!text-gray-800 !m-0">
                            {data?.birthday ? dayjs(data.birthday, 'DD/MM/YYYY').format('DD/MM/YYYY') : 'Chưa có'}
                        </p>
                    </div>

                    <BirthdayModal
                        visible={birthdayModalVisible}
                        onCancel={() => setBirthdayModalVisible(false)}
                        initialBirthday={data?.birthday}
                        dispatch={dispatch}
                        reloadData={reloadData}
                    />
                </div>

                {/* Bio Section */}
                <div className="!w-full">
                    <div className="!flex !items-center !gap-2 !mb-2">
                        <p className="!font-semibold !m-0">Giới thiệu</p>
                        <Button
                            type="text"
                            icon={<EditOutlined className="!text-blue-500" />}
                            onClick={() => setBioModalVisible(true)}
                            className="!p-1"
                        />
                    </div>
                    <p className="!text-gray-600 !m-0 !whitespace-pre-line">
                        {data?.bio || 'Chưa có giới thiệu'}
                    </p>
                </div>

                <BioModal
                    visible={bioModalVisible}
                    onCancel={() => setBioModalVisible(false)}
                    initialBio={data?.bio}
                    dispatch={dispatch}
                    reloadData={reloadData}
                />
            </div>
        </CardShadow>
    );
}