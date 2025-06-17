'use client';

import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { metaRulesLogin } from '@/api/validation';
import { apiLogin } from '@/api/auth';
import { convertToAntdRules } from '@/utils/converter';
import { Rule } from 'antd/es/form';
import { useDispatch } from 'react-redux';
import { LoginRequest } from '@/types/requests/form';
import { handleLoginWithToken } from '@/store/persistent/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { showSpin, hideSpin } from '@/store/volatile/spinSlice';
import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';

const LoginForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [rules, setRules] = useState<Record<string, Rule[]>>({});
    const router = useRouter();

    const onFinish = (values: LoginRequest) => {
        dispatch(showSpin({ delay: 1000 }));
        apiLogin(values).then(res => {
            dispatch(handleLoginWithToken(res.data)).then(role => {
                dispatch(addMessage({
                    key: 'login-success',
                    type: 'success',
                    content: 'Đăng nhập thành công!',
                    duration: 5
                }));
                if (role === 'ROLE_FREELANCER' || role === 'ROLE_EMPLOYER') {
                    router.push('/');
                } else {
                    router.push('/admin');
                }
            })
        }).catch(err => {
            if (err.status === 403) {
                dispatch(addMessage({
                    key: 'login-error',
                    type: 'error',
                    content: err.data.message,
                    duration: 5
                }));
            }
        }).finally(() => {
            dispatch(hideSpin());
        })
    };

    const fetchMetaRule = async () => {
        return await metaRulesLogin().then(res =>
            convertToAntdRules(res.data) as Record<'email' | 'password', Rule[]>
        )
    };

    useEffect(() => {
        fetchMetaRule().then(res => setRules(res));
    }, [])

    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            variant='underlined'
        >
            <Form.Item
                name="email"
                rules={rules.email}
                hasFeedback
            >
                <Input
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    size="middle"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={rules.password}
                hasFeedback
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Mật khẩu"
                    size="middle"
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="middle"
                    className="w-full"
                >
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form >
    );
}

export default LoginForm;