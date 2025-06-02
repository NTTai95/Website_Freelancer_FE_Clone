"use client";

import React from 'react';
import { Divider, Layout, Menu } from 'antd';
import { items } from './comon/ItemSider';
import { useRouter, usePathname } from 'next/navigation';
import CardBreadcrumb from './comon/card-bread-crumb';

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();

    const defaultOpenKeys = items
        .filter((item) => !!item && 'children' in item && !!item.children)
        .map(item => item?.key as string);

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="3rem"
                style={siderStyle}>
                <Menu
                    style={{ height: '100%', borderRight: 0 }}
                    theme="light"
                    selectedKeys={[pathname]}
                    defaultOpenKeys={defaultOpenKeys}
                    mode="inline"
                    items={items}
                    onClick={(info) => {
                        const path = info.key;
                        router.push(path);
                    }}
                />
            </Sider>
            <Layout>
                <Header style={{ position: "sticky", top: 0, zIndex: 9999 }}>Header</Header>
                <Layout style={{ padding: '1rem' }}>
                    <CardBreadcrumb pathname={pathname} />
                    <Divider />
                    <Content>{children}</Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
