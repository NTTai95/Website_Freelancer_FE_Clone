"use client";
import React from "react";
import {
    Flex
} from "antd";
import {
    UserOutlined,
    ShoppingCartOutlined,
    DollarCircleOutlined
} from "@ant-design/icons";
import CardStatistic from "./comon/CardStatistic";
import TopReputationTables from "./comon/TopReputationTables";

const dashboard = () => {
    return (
        <div>
            <Flex justify="space-between" style={{ width: "100%" }}>
                <CardStatistic
                    title="Tổng người dùng"
                    value={1200}
                    percentage={5.2}
                    isIncrease={true}
                    icon={<UserOutlined />}
                    color="#3b82f6"
                    bgColor="#dbeafe"
                />
                <CardStatistic
                    title="Đơn hàng mới"
                    value={134}
                    percentage={-3.1}
                    isIncrease={false}
                    icon={<ShoppingCartOutlined />}
                    color="#f97316"
                    bgColor="#ffedd5"
                />
                <CardStatistic
                    title="Doanh thu tháng"
                    value={4500000000000}
                    unit="VNĐ"
                    percentage={7.5}
                    isIncrease={true}
                    icon={<DollarCircleOutlined />}
                    color="#10b981"
                    bgColor="#d1fae5"
                />
            </Flex>
            <br />
            <TopReputationTables />
        </div>
    );
};

export default dashboard;