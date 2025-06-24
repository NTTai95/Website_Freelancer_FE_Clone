'use client';

import { Divider, Row, Col, Tabs, TabsProps } from 'antd';
import { FileSearchOutlined, ReconciliationOutlined, AuditOutlined } from '@ant-design/icons';
import LoginForm from './_ui/LoginForm';
import SocialLogin from './_ui/SocialLogin';
import ForgotPasswordLink from './_ui/ForgotPasswordLink';
import CardShadow from '@/components/ui/card-shadow';
import RegisterForm from './_ui/RegisterForm';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { hideSpin } from '@/store/volatile/spinSlice';

const items: TabsProps['items'] = [
    {
        key: 'login',
        label: 'Đăng nhập',
        children: <>
            <LoginForm />
            <ForgotPasswordLink />
        </>,
    },
    {
        key: 'register',
        label: 'Đăng ký',
        children: <RegisterForm />
    }
];

export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const pathname = usePathname();

    const onchange = (key: string) => {
        router.replace("/" + key);
    }

    useEffect(() => {
        return () => {
            dispatch(hideSpin());
        };
    })

    return (
        <div className={"h-screen relative"}>
            <div className="absolute flex items-center w-full h-full bg-[#06055A]">
                <img src={"/banner_login3.gif"} alt="" className="!ml-15 h-full object-contain object-left" />
            </div>
            <Row className="h-full">
                <Col span={12}>
                    <div className="flex flex-col items-center !pt-40 !font-serif">
                        <p className="drop-shadow-2xl uppercase !font-black !text-6xl !mb-20">
                            Freelancer
                        </p>
                        <div>
                            <p className="text-2xl font-bold !mb-2">
                                Tự do làm việc - Chủ động tuyển chọn
                            </p>
                            <ul className="!ml-5 text-lg">
                                <li><FileSearchOutlined /><span className="!ml-2"> Tìm việc linh hoạt</span></li>
                                <li><ReconciliationOutlined /><span className="!ml-2"> Tuyển người hiệu quả</span></li>
                                <li><AuditOutlined /><span className="!ml-2"> Quản lý dễ dàng</span></li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col span={12} className={"!flex justify-end items-center"}>
                    <div className={"w-[60%] overflow-hidden !pr-10"}>
                        <motion.div
                            initial={{ opacity: 0, x: 200 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <CardShadow>
                                <Tabs activeKey={pathname.includes("login") ? "login" : "register"} items={items} onChange={onchange} />
                                <Divider className={"!border-gray-500 !mt-1"}>Hoặc</Divider>
                                <SocialLogin />
                            </CardShadow>
                        </motion.div>
                    </div>
                </Col>
            </Row>
        </div >
    );
}