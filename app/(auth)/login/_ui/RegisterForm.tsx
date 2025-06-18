'use client';

import { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, DatePicker, Select, Radio, Tooltip, notification } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { apiMetaRulesRegister } from '@/api/validation';
import { convertToAntdRules } from '@/utils/converter';
import { Rule } from 'antd/es/form';
import { AppDispatch } from '@/store';
import { addNotification } from '@/store/volatile/notificationSlice';
import { useDispatch } from 'react-redux';
import { apiRegister } from '@/api/auth';
import { handleLoginWithToken } from '@/store/persistent/auth';
import { useRouter } from 'next/navigation';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';

const optionsRole = [
    { value: "freelancer", label: "Freelancer" },
    { value: "employer", label: "Nhà tuyển dụng" }
];

const optionsGender = [
    { value: true, label: 'Nam' },
    { value: false, label: 'Nữ' }
];

export default function RegisterForm() {
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [rules, setRules] = useState<
        Record<'fullName' | 'email' | 'password' | 'isMale' | 'birthday', Rule[]>
        | null>(null);

    useEffect(() => {
        const fetchRules = async () => {
            const res = await apiMetaRulesRegister();
            const converted = convertToAntdRules(res.data) as Record<
                'fullName' | 'email' | 'password' | 'isMale' | 'birthday',
                Rule[]
            >;
            setRules(converted);
        };
        fetchRules();
    }, []);

    const openNotification = (description: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
        dispatch(addNotification({
            key: 'register-info',
            message: 'Thông báo!',
            description: description,
            type: type,
            duration: 3
        }));
    };

    const onFinish = (values: any) => {
        dispatch(showSpin({ delay: 1000 }));
        apiRegister(values, values.role).then(res => {
            dispatch(handleLoginWithToken(res.data)).then(role => {

                if (role === 'ROLE_FREELANCER' || role === 'ROLE_EMPLOYER') {
                    router.push('/');
                } else {
                    router.push('/admin');
                }
                dispatch(hideSpin());
            })
            openNotification("Đăng ký thành công!\nChào mừng bạn tham gia với chúng tôi!", 'success');
        }).catch(error => {
            dispatch(hideSpin());
            console.log(error);
            openNotification("Đăng ký thất bại!", 'error');
        }).finally(() => {
            dispatch(hideSpin());
        })

    };

    const onFinishFailed = (errorInfo: any) => {
        const values = errorInfo.values;
        if (values.fullName === undefined || values.email === undefined || values.password === undefined || values.isMale === undefined || values.birthday === undefined) {
            return;
        }
        if (values.role === undefined) {
            openNotification("Vui lòng chọn vai trò!");
        } else if (values.agree === undefined) {
            openNotification("Vui lòng đồng ý với điều khoản sử dụng!");
        }
    };

    return (
        <Form name="register" onFinish={onFinish} layout="vertical" variant='underlined' onFinishFailed={onFinishFailed}>
            {contextHolder}
            <Form.Item name="fullName" rules={rules?.fullName} hasFeedback>
                <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Họ và tên" className="border-gray-300" size="middle" />
            </Form.Item>
            <Form.Item name="email" rules={rules?.email} hasFeedback>
                <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Email" className="border-gray-300" size="middle" />
            </Form.Item>
            <Form.Item name="password" rules={rules?.password} hasFeedback>
                <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Mật khẩu" className="border-gray-300" size="middle" />
            </Form.Item>
            <Row gutter={16}>
                <Col span={14}>
                    <Form.Item name="birthday" rules={rules?.birthday} hasFeedback>
                        <DatePicker format={"DD/MM/YYYY"} className="w-full" placeholder="Ngày sinh" />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item name="isMale" label="Giới tính" layout='horizontal' initialValue={true}>
                        <Select options={optionsGender} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                name="role"
                rules={[{ required: true, message: '' }]}
                label={<p className="font-bold">
                    Chọn vai trò: <Tooltip title="Chọn vai trò của bạn trên hệ thống"><QuestionCircleOutlined /></Tooltip>
                </p>}
            >
                <Radio.Group
                    options={optionsRole}
                />
            </Form.Item>
            <Form.Item className="!my-1" name={"agree"} rules={[{ required: true, message: '' }]} valuePropName='checked'>
                <Checkbox className="!text-xs">
                    Bạn đã đọc và đồng ý với các <Link className="!underline" href="/">Chính sách</Link> của chúng tôi.
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size="middle" className="w-full">
                    Đăng ký
                </Button>
            </Form.Item>
        </Form>
    );
}
