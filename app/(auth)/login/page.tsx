'use client';

import { Divider, Tabs, TabsProps } from 'antd';
import LoginForm from './_ui/LoginForm';
import SocialLogin from './_ui/SocialLogin';
import ForgotPasswordLink from './_ui/ForgotPasswordLink';
import CardShadow from '@/components/ui/card-shadow';
import RegisterForm from './_ui/RegisterForm';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

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
    const router = useRouter();
    const pathname = usePathname();

    const onchange = (key: string) => {
        router.replace("/" + key);
    }


    return (
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
    );
}