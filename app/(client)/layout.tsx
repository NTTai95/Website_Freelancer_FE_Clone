'use client';

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import FooterCustom from "../_ui/Footer";
import HeaderAuth from "../_ui/Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout>
            <Layout>
                <HeaderAuth />
                <Content style={{ minHeight: "100vh" }}>{children}</Content>
            </Layout>
            <FooterCustom />
        </Layout>
    );
}