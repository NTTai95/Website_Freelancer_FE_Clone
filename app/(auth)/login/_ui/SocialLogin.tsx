'use client';

import { Button } from 'antd';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

export default function SocialLogin() {
    return (
        <div className="flex flex-col gap-y-3">
            <Button
                size="large"
                icon={<GoogleOutlined />}
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
                Đăng nhập bằng Google
            </Button>
            <Button
                size="large"
                icon={<FacebookOutlined />}
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
                Đăng nhập bằng Facebook
            </Button>
        </div>
    );
}