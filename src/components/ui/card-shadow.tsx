"use client";

import React from "react";
import { Card, ConfigProvider } from "antd";

type CardShadowProps = {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    styleBody?: React.CSSProperties;
};

const CardShadow = ({
    children,
    style,
    className = "",
    styleBody, // mặc định padding
}: CardShadowProps) => {
    return (
        <ConfigProvider theme={{ hashed: false }}>
            <Card
                style={style}
                rootClassName={`${className} shadow-lg !rounded-2xl`}
                styles={{ body: styleBody }}
            >
                {children}
            </Card>
        </ConfigProvider>
    );
};

export default CardShadow;
