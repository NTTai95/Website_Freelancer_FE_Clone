'use client';

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import HeaderPublic from "./comon/Header";
import FooterCustom from "./comon/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout>
            <HeaderPublic />
            <Content style={{ minHeight: "100vh" }}>{children}</Content>
            <FooterCustom />
        </Layout>
    );
}