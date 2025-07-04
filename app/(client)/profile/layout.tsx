"use client";

import React from 'react';
import { Layout, Menu, Avatar, Typography } from 'antd';
import type { MenuProps } from 'antd';
import {
    DashboardOutlined,
    ProjectOutlined,
    MessageOutlined,
    StarOutlined,
    SettingOutlined,
    UserOutlined,
    SolutionOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthGuard } from '@/components/AuthGuard';
import { useAuthorization } from '@/hooks/useAuthorization';

const { Sider, Content } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { role } = useAuthorization();

    // Lấy phần cuối cùng của URL để làm selectedKey cho Menu
    const pathSegments = pathname.split('/');
    const selectedKey = pathSegments[pathSegments.length - 1] || 'dashboard';

    // Menu items chung cho cả 2 role
    const commonItems: MenuItem[] = [
        getItem(<Link href="/profile/dashboard">Dashboard</Link>, 'dashboard', <DashboardOutlined />),
        getItem(<Link href="/profile/messages">Tin nhắn</Link>, 'messages', <MessageOutlined />),
        getItem(<Link href="/profile/reviews">Đánh giá</Link>, 'reviews', <StarOutlined />),
        getItem(<Link href="/profile/settings">Cài đặt</Link>, 'settings', <SettingOutlined />),
    ];

    // Menu items dành cho Freelancer
    const freelancerItems: MenuItem[] = [
        getItem(<Link href="/profile/personal-info">Thông tin cá nhân</Link>, 'personal-info', <UserOutlined />),
        getItem(<Link href="/profile/applied-jobs">Công việc đã ứng tuyển</Link>, 'applied-jobs', <SolutionOutlined />),
    ];

    // Menu items dành cho Employer
    const employerItems: MenuItem[] = [
        getItem(<Link href="/profile/personal-info">Thông tin cá nhân</Link>, 'personal-info', <UserOutlined />),
        getItem(<Link href="/profile/my-jobs">Công việc</Link>, 'my-jobs', <UnorderedListOutlined />),
    ];

    // Kết hợp menu items dựa trên role
    const items: MenuItem[] = [
        ...commonItems,
        ...(role === 'ROLE_FREELANCER' ? freelancerItems : []),
        ...(role === 'ROLE_NHA_TUYEN_DUNG' ? employerItems : []),
    ];

    return (
        <Layout className="!min-h-screen">
            <Sider
                width={250}
                className="!bg-white shadow-md"
                breakpoint="lg"
                collapsedWidth="0"
            >
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={items}
                    className="border-r-0"
                />
            </Sider>

            <Layout>
                <Content className="!p-6 bg-gray-50">
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}