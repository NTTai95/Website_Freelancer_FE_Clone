import React from "react";
import { Card, ConfigProvider } from "antd";

type CardShadowProps = {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
};

const CardShadow = ({ children, style, className }: CardShadowProps) => {
    return (
        <Card style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', ...style }} className={className}>
            {children}
        </Card>
    );
};

export default CardShadow;
