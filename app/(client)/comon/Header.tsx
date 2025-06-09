"use client"

import { Avatar, Button, Col, Input, Menu, Row } from 'antd';
import React from 'react';
import { Header } from 'antd/es/layout/layout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const HeaderPublic = () => {
    const pathname = usePathname();
    return (
        <Header>
            <Row justify={'space-between'} gutter={64}>
                <Col flex={0.3}>
                    <Avatar shape="square" size={52} src={"/logo.png"} className={"brightness-220"} />
                </Col>
                <Col flex={"auto"}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[pathname]}
                        items={[
                            { key: '/home', label: <Link href={"/home"}>Trang chủ</Link> },
                            { key: '/terms-policy', label: <Link href={"/terms-policy"}>Chính sách</Link> },
                            { key: '/about', label: <Link href={"/about"}>Giới thiệu</Link> },
                            { key: '/contact', label: <Link href={"/contact"}>Liên hệ</Link> },
                        ]}
                    />
                </Col>
                <Col flex={2} className={"flex items-center"}>
                    <Input.Search enterButton size='middle' placeholder="Tìm kiếm công việc..." />
                </Col>
                <Col flex={0.4} className={"flex justify-evenly items-center"}>
                    <Button type='primary'>Đăng nhập</Button>
                    <Button type='default'>Đăng ký</Button>
                </Col>
            </Row>
        </Header>
    )
}

export default HeaderPublic;