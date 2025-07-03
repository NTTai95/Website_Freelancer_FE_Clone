"use client";

import { Avatar, Col, Input, Menu, Row } from 'antd';
import React from 'react';
import { Header } from 'antd/es/layout/layout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AuthGuard } from '@/components/AuthGuard';
import Info from './Info';
import { useAuthorization } from '@/hooks/useAuthorization';
import { DownOutlined } from '@ant-design/icons';

const HeaderAuth = () => {
    const { hasRole, isAuthenticated } = useAuthorization();
    const pathname = usePathname();

    const baseItems = [
        { key: '/home', label: <Link href="/home">Trang chủ</Link> },
        { key: '/terms-and-policy', label: <Link href="/terms-and-policy">Chính sách</Link> },
        { key: '/about', label: <Link href="/about">Giới thiệu</Link> },
        { key: '/contact', label: <Link href="/contact">Liên hệ</Link> },
    ];

    const roleItems = [
        ...(hasRole(['ROLE_QUAN_TRI']) ? [{
            key: 'admin',
            label: <span>Quản trị <DownOutlined /></span>,
            children: [
                { key: '/admin/dashboard', label: <Link href="/admin/dashboard">Bảng điều khiển</Link> },
                { key: '/admin/manager', label: <Link href="/admin/manager">Quản lý</Link> },
                { key: '/admin/reports', label: <Link href="/admin/reports">Báo cáo</Link> },
            ]
        }] : []),

        ...(hasRole(['ROLE_FREELANCER']) ? [{
            key: 'freelancer',
            label: 'Công việc',
            children: [
                { key: '/find-jobs', label: <Link href="/find-jobs">Tìm việc</Link> },
            ]
        }] : []),

        ...(hasRole(['ROLE_NHA_TUYEN_DUNG']) ? [{
            key: 'employer',
            label: 'Freelancer',
            children: [
                { key: '/talents/search', label: <Link href="/talents/search">Tìm tài năng</Link> },
                { key: '/jobs/create', label: <Link href="/jobs/create">Thêm công việc</Link> },
            ]
        }] : []),
    ];

    return (
        <Header>
            <Row justify={'space-between'} gutter={64}>
                <Col flex={0.3}>
                    <Avatar shape="square" size={52} src="/logo.png" className="brightness-150" />
                </Col>
                <Col flex="auto">
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[pathname]}
                        items={[
                            ...baseItems,
                            ...(isAuthenticated ? roleItems : []),
                        ]}
                    />
                </Col>
                <Col flex={2} className="flex items-center">
                    <AuthGuard roles={["ROLE_FREELANCER"]}>
                        <Input.Search enterButton size='middle' placeholder="Tìm kiếm công việc..." />
                    </AuthGuard>
                    <AuthGuard roles={["ROLE_NHA_TUYEN_DUNG"]}>
                        <Input.Search enterButton size='middle' placeholder="Tìm kiếm freelancer..." />
                    </AuthGuard>
                </Col>
                <Col flex={0.4} className="flex justify-evenly items-center">
                    <Info />
                </Col>
            </Row>
        </Header>
    );
};

export default HeaderAuth;
