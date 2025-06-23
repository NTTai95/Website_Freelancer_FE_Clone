'use client';

import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

const Banner = () => {
    return (
        <div
            id="about"
            className="w-full bg-gray-900 !py-20 !px-4 text-center flex flex-col items-center justify-center"
        >
            <img
                src="/logo-text.png"
                alt="Logo"
                className="w-36 h-36 md:w-48 md:h-48 mb-6 !brightness-250 hover:scale-105"
            />

            <Title
                level={2}
                className="!mt-15 !text-3xl md:!text-5xl !text-amber-50 font-extrabold uppercase tracking-wide animate-fadeIn mb-4"
            >
                Chào mừng đến với nền tảng Freelancer
            </Title>

            <Paragraph className="!text-lg md:text-xl !text-amber-100 max-w-5xl animate-fadeIn delay-100">
                Việc sử dụng nền tảng đồng nghĩa với việc bạn đồng ý với các điều khoản và chính sách được quy định bên dưới.
            </Paragraph>
        </div>
    );
};

export default Banner;
