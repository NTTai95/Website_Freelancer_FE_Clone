"use client";

import React, { useMemo, ReactElement, isValidElement, cloneElement } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { items } from './_ui/ItemSider';
import { useRouter, usePathname } from 'next/navigation';
import HeaderAuth from '../_ui/Header';

const { Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    minHeight: 'calc(100vh - 64px)',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
};

const extractAllKeys = (menuItems: typeof items): string[] => {
    const keys: string[] = [];
    menuItems.forEach(item => {
        if (item && item.key) keys.push(String(item.key));
        if (item && 'children' in item && item.children) {
            item.children.forEach(child => {
                if (child?.key) keys.push(String(child.key));
            });
        }

    }); return keys;
};

const AdminLayout = ({ children }: { children: ReactElement }) => {
    const router = useRouter();
    const pathname = usePathname();

    const allMenuKeys = useMemo(() => extractAllKeys(items), []);

    const selectedKey = useMemo(() => {
        const matchedKey = allMenuKeys.find((key) => pathname.startsWith(key));
        return matchedKey || pathname;
    }, [pathname, allMenuKeys]);

    const defaultOpenKeys = useMemo(() => {
        return items
            .filter((item) => !!item && 'children' in item && !!item.children)
            .map(item => item?.key as string);
    }, []);

    return (
        <Layout>
            <HeaderAuth />
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="3rem"
                    style={siderStyle}>
                    <Menu
                        style={{ height: '100%', borderRight: 0 }}
                        theme="light"
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        defaultOpenKeys={defaultOpenKeys}
                        items={items}
                        onClick={(info) => {
                            router.push(info.key);
                        }}
                    />
                </Sider>
                <Layout style={{ padding: '1rem' }}>
                    <Content>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
