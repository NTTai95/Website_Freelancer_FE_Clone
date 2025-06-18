"use client";

import React from "react";
import { Card, ConfigProvider } from "antd";

type CardShadowProps = {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
};

const CardShadow = ({ children, style, className }: CardShadowProps) => {
    return (
        <Card style={style} className={className+" shadow-lg"}>
            {children}
        </Card>
    );
};

export default CardShadow;
