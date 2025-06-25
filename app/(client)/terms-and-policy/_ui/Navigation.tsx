import React from 'react';
import { Anchor } from 'antd';

const Navigation = () => {
    return (
        <Anchor
            items={[
                { key: 'about', href: '#about', title: 'Giới thiệu' },
                { key: 'definition', href: '#definition', title: 'Định nghĩa' },
                { key: 'scope', href: '#scope', title: 'Phạm vi dịch vụ' },
                { key: 'price-service', href: '#price-service', title: 'Phí dịch vụ' },
                { key: 'payment-process', href: '#payment-process', title: 'Quy trình thanh toán' },
                { key: 'dispute-resolution', href: '#dispute-resolution', title: 'Giải quyết tranh chấp' },
                { key: 'right-and-obligation', href: '#right-and-obligation', title: 'Quyền và nghĩa vụ của người dùng' },
                { key: 'security', href: '#security', title: 'Quy định bảo mật' },
                { key: 'account-termination', href: '#account-termination', title: 'Chính sách xử lý tài khoản' },
                { key: 'general-terms', href: '#general-terms', title: 'Điều khoản chung' },
                { key: 'reputation-system', href: '#reputation-system', title: 'Hệ thống điểm uy tín' },
            ]}
        />
    );
};

export default Navigation;