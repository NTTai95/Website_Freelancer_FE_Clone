'use client';

import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { apiMetaRulesLogin } from '@/api/validation';
import { apiLogin } from '@/api/auth';
import { convertToAntdRules } from '@/utils/converter';
import { Rule } from 'antd/es/form';
import { useDispatch } from 'react-redux';
import { RequestForm } from '@/types/requests/form';
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

    const onFinish = (values: RequestForm.Login) => {
        dispatch(showSpin({ delay: 500 }));
        apiLogin(values).then(res => {
            dispatch(handleLoginWithToken(res.data)).then(role => {
                dispatch(addMessage({
                    key: 'login-success',
                    type: 'success',
                    content: 'Đăng nhập thành công!',
                    duration: 5
                }));
                const referrer = document.referrer;

                if (referrer && referrer.includes(window.location.hostname)) {
                    router.back();
                } else {
                    if (role === 'ROLE_FREELANCER' || role === 'ROLE_NHA_TUYEN_DUNG') {
                        router.push('/');
                    } else {
                        router.push('/admin');
                    }
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
            dispatch(hideSpin());
        });
    };

    const fetchMetaRule = async () => {
        return await apiMetaRulesLogin().then(res =>
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