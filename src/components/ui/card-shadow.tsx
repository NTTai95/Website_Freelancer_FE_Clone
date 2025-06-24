"use client";

import React from "react";
import { Card } from "antd";

type CardShadowProps = {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    bodyPadding?: string | number; // mới
};

const CardShadow = ({
    children,
    style,
    className = "",
    bodyPadding = "24px", // mặc định padding
}: CardShadowProps) => {
    return (
        <Card
            style={style}
            className={`${className} shadow-lg !rounded-2xl`}
            styles={{ body: { padding: bodyPadding } }}
        >
            {children}
        </Card>
    );
};

export default CardShadow;
