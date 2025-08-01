// layout.tsx
"use client";

import { ConfigProvider, Typography } from "antd";
import CardShadow from "@/components/ui/card-shadow";
import { ReactNode, createContext, useContext, useState } from "react";
import { MetaContext } from "./_ui/type";

type ManagerLayoutProps = {
    children: ReactNode;
};

const ManagerLayout = ({ children }: ManagerLayoutProps) => {
    const [pageTitle, setPageTitle] = useState("Quản lý");
    const [pageDescription, setPageDescription] = useState("");

    const setMeta = (title: string, description?: string) => {
        setPageTitle(title);
        if (description !== undefined) setPageDescription(description);
    };

    return (
        <MetaContext.Provider value={{ setMeta }}>
            <ConfigProvider theme={{ components: { Card: { bodyPadding: 0 } } }}>
                <Typography.Title className={"!my-1"} level={4}>{pageTitle}</Typography.Title>
                <Typography.Paragraph className={"!mt-1"}>{pageDescription}</Typography.Paragraph>
                <CardShadow styleBody={{ padding: 0 }}>
                    {children}
                </CardShadow>
            </ConfigProvider>
        </MetaContext.Provider>
    );
};
export default ManagerLayout;
