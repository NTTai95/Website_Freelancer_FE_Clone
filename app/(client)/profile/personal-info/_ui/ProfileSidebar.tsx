import { useState, useContext } from 'react';
import {
    Avatar, Button, DatePicker, Divider, Form, Input, Modal, Select, Upload, message
} from 'antd';
import {
    UserOutlined, EditOutlined, UploadOutlined, MailOutlined,
    PhoneOutlined, CalendarOutlined, ManOutlined, WomanOutlined
} from '@ant-design/icons';
import ProfileContext from './ProfileContext';
import CardShadow from '@/components/ui/card-shadow';
import ImgCrop from 'antd-img-crop';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import {
    handleAvatarUpdate, handleFullNameUpdate, handleBioUpdate,
    handleEmailUpdate, handlePhoneUpdate, handleGenderUpdate,
    handleBirthdayUpdate
} from './profileSidebar/profileApiHandlers';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

export default function ProfileSidebar({ data }: { data: any }) {
    const dispatch = useDispatch<AppDispatch>();
    const { reloadData } = useContext(ProfileContext);

    // Modal states
    const [avatarModalVisible, setAvatarModalVisible] = useState(false);
    const [fullNameModalVisible, setFullNameModalVisible] = useState(false);
    const [bioModalVisible, setBioModalVisible] = useState(false);
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [phoneModalVisible, setPhoneModalVisible] = useState(false);
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [birthdayModalVisible, setBirthdayModalVisible] = useState(false);

    // Form states
    const [fileList, setFileList] = useState<any[]>([]);
    const [formFullName] = Form.useForm();
    const [formBio] = Form.useForm();
    const [formEmail] = Form.useForm();
    const [formPhone] = Form.useForm();
    const [formGender] = Form.useForm();
    const [formBirthday] = Form.useForm();

    const handleBeforeUpload = (file: any) => {
        setFileList([file]);
        return false;
    };

    const handleUpload = async () => {
        if (fileList.length === 0) return;

        const success = await handleAvatarUpdate(fileList[0], dispatch, reloadData);
        if (success) {
            setAvatarModalVisible(false);
            setFileList([]);
        }
    };

    return (
        <CardShadow className="!w-full md:!w-3/6 !flex !flex-col !items-center" styleBody={{ padding: "24px", width: "100%" }}>
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

                {/* Avatar Modal */}
                <Modal
                    title="Cập nhật ảnh đại diện"
                    open={avatarModalVisible}
                    onCancel={() => setAvatarModalVisible(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setAvatarModalVisible(false)}>
                            Hủy
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            onClick={handleUpload}
                            disabled={fileList.length === 0}
                        >
                            Cập nhật
                        </Button>,
                    ]}
                >
                    <div className="!flex !flex-col !items-center !space-y-4">
                        {fileList.length > 0 && (
                            <img
                                src={URL.createObjectURL(fileList[0])}
                                alt="Avatar Preview"
                                className="!w-32 !h-32 !rounded-full !object-cover"
                            />
                        )}
                        <ImgCrop rotationSlider>
                            <Upload
                                beforeUpload={handleBeforeUpload}
                                fileList={fileList}
                                onRemove={() => setFileList([])}
                                maxCount={1}
                                showUploadList={false}
                                className="!mt-2"
                            >
                                <Button icon={<UploadOutlined />}>Chọn Ảnh</Button>
                            </Upload>
                        </ImgCrop>
                    </div>
                </Modal>

                {/* Name Section */}
                <div className="!flex !items-center !gap-2 !mb-2">
                    <h2 className="!text-2xl !font-bold !m-0">{data?.fullName}</h2>
                    <Button
                        type="text"
                        icon={<EditOutlined className="!text-blue-500" />}
                        onClick={() => {
                            formFullName.setFieldsValue({ fullName: data?.fullName });
                            setFullNameModalVisible(true);
                        }}
                        className="!p-1"
                    />
                </div>

                {/* Full Name Modal */}
                <Modal
                    title="Cập nhật họ tên"
                    open={fullNameModalVisible}
                    onOk={() => {
                        formFullName.validateFields()
                            .then(values => handleFullNameUpdate(values.fullName, dispatch, reloadData))
                            .then(success => success && setFullNameModalVisible(false));
                    }}
                    onCancel={() => setFullNameModalVisible(false)}
                    okText="Cập nhật"
                    cancelText="Hủy"
                >
                    <Form form={formFullName}>
                        <Form.Item
                            name="fullName"
                            rules={[
                                { required: true, message: "Vui lòng nhập họ tên" },
                                {
                                    pattern: /^[A-Za-zÀ-ỹ\s]+$/u,
                                    message: "Họ tên chỉ được chứa chữ cái và khoảng trắng",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập họ tên của bạn" />
                        </Form.Item>
                    </Form>
                </Modal>

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
                                onClick={() => {
                                    formEmail.setFieldsValue({ email: data?.email, password: '' });
                                    setEmailModalVisible(true);
                                }}
                                className="!p-1"
                            />
                        </div>
                        <p className="!text-gray-800 !m-0 !break-all">
                            {data?.email || 'Chưa có'}
                        </p>
                    </div>

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
                                onClick={() => {
                                    formPhone.setFieldsValue({ phone: data?.phone });
                                    setPhoneModalVisible(true);
                                }}
                                className="!p-1"
                            />
                        </div>
                        <p className="!text-gray-800 !m-0 !break-all">
                            {data?.phone || 'Chưa có'}
                        </p>
                    </div>

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
                                onClick={() => {
                                    formGender.setFieldsValue({ isMale: data?.isMale });
                                    setGenderModalVisible(true);
                                }}
                                className="!p-1"
                            />
                        </div>
                        <p className="!text-gray-800 !m-0">
                            {data?.isMale ? 'Nam' : 'Nữ'}
                        </p>
                    </div>

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
                                onClick={() => {
                                    formBirthday.setFieldsValue({
                                        birthday: data?.birthday ? dayjs(data.birthday, 'DD/MM/YYYY') : null
                                    });
                                    setBirthdayModalVisible(true);
                                }}
                                className="!p-1"
                            />
                        </div>
                        <p className="!text-gray-800 !m-0">
                            {data?.birthday ? dayjs(data.birthday, 'DD/MM/YYYY').format('DD/MM/YYYY') : 'Chưa có'}
                        </p>
                    </div>
                </div>

                {/* Email Modal */}
                <Modal
                    title="Cập nhật email"
                    open={emailModalVisible}
                    onOk={() => {
                        formEmail.validateFields()
                            .then(values =>
                                handleEmailUpdate(values.email, values.password, dispatch, reloadData)
                            )
                            .then(success => success && setEmailModalVisible(false));
                    }}
                    onCancel={() => setEmailModalVisible(false)}
                    okText="Cập nhật"
                    cancelText="Hủy"
                >
                    <Form form={formEmail} layout="vertical">
                        <Form.Item
                            name="email"
                            label="Email mới"
                            rules={[
                                { required: true, message: "Vui lòng nhập email" },
                                { type: 'email', message: "Email không hợp lệ" },
                            ]}
                        >
                            <Input placeholder="Nhập email mới" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[
                                { required: true, message: "Vui lòng nhập mật khẩu" },
                                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                            ]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu để xác nhận" />
                        </Form.Item>
                    </Form>
                </Modal>


                {/* Phone Modal */}
                <Modal
                    title="Cập nhật số điện thoại"
                    open={phoneModalVisible}
                    onOk={() => {
                        formPhone.validateFields()
                            .then(values => handlePhoneUpdate(values.phone, dispatch, reloadData))
                            .then(success => success && setPhoneModalVisible(false));
                    }}
                    onCancel={() => setPhoneModalVisible(false)}
                    okText="Cập nhật"
                    cancelText="Hủy"
                >
                    <Form form={formPhone}>
                        <Form.Item
                            name="phone"
                            rules={[
                                { required: true, message: "Vui lòng nhập số điện thoại" },
                                {
                                    pattern: /^(0|\+84)(\d{9,10})$/,
                                    message: "Số điện thoại không hợp lệ (VD: 0912345678 hoặc +84912345678)"
                                },
                            ]}
                        >
                            <Input placeholder="Nhập số điện thoại của bạn" />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Gender Modal */}
                <Modal
                    title="Cập nhật giới tính"
                    open={genderModalVisible}
                    onOk={() => {
                        formGender.validateFields()
                            .then(values => handleGenderUpdate(values.isMale, dispatch, reloadData))
                            .then(success => success && setGenderModalVisible(false));
                    }}
                    onCancel={() => setGenderModalVisible(false)}
                    okText="Cập nhật"
                    cancelText="Hủy"
                >
                    <Form form={formGender}>
                        <Form.Item
                            name="isMale"
                            rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                        >
                            <Select placeholder="Chọn giới tính">
                                <Option value={true}>Nam</Option>
                                <Option value={false}>Nữ</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Birthday Modal */}
                <Modal
                    title="Cập nhật ngày sinh"
                    open={birthdayModalVisible}
                    onOk={() => {
                        formBirthday.validateFields()
                            .then(values => handleBirthdayUpdate(values.birthday, dispatch, reloadData))
                            .then(success => success && setBirthdayModalVisible(false));
                    }}
                    onCancel={() => setBirthdayModalVisible(false)}
                    okText="Cập nhật"
                    cancelText="Hủy"
                >
                    <Form form={formBirthday}>
                        <Form.Item
                            name="birthday"
                            rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
                        >
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Bio Section */}
                <div className="!w-full">
                    <div className="!flex !items-center !gap-2 !mb-2">
                        <p className="!font-semibold !m-0">Giới thiệu</p>
                        <Button
                            type="text"
                            icon={<EditOutlined className="!text-blue-500" />}
                            onClick={() => {
                                formBio.setFieldsValue({ bio: data?.bio });
                                setBioModalVisible(true);
                            }}
                            className="!p-1"
                        />
                    </div>
                    <p className="!text-gray-600 !m-0 !whitespace-pre-line">
                        {data?.bio || 'Chưa có giới thiệu'}
                    </p>
                </div>

                {/* Bio Modal */}
                <Modal
                    title="Cập nhật giới thiệu"
                    open={bioModalVisible}
                    onOk={() => {
                        formBio.validateFields()
                            .then(values => handleBioUpdate(values.bio, dispatch, reloadData))
                            .then(success => success && setBioModalVisible(false));
                    }}
                    onCancel={() => setBioModalVisible(false)}
                    okText="Cập nhật"
                    cancelText="Hủy"
                >
                    <Form form={formBio}>
                        <Form.Item
                            name="bio"
                            rules={[
                                { required: true, message: "Vui lòng nhập giới thiệu!" },
                                { max: 10000, message: 'Tối đa 10000 ký tự' }
                            ]}
                        >
                            <TextArea rows={6} placeholder="Giới thiệu về bản thân" autoSize />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </CardShadow>
    );
}