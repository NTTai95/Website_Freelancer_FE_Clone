"use client";
import React, { useState } from "react";
import {
    Table,
    Input,
    Tag,
    Dropdown,
    Button,
    Avatar,
    Typography,
    Card,
    ConfigProvider,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { MoreOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { mockData } from "./comon/MockupData";
import type { User } from "./comon/constants";
import { statusLabel, statusColor } from "./comon/constants";
import CardShadow from "@/components/ui/card-shadow";
import { pageApi } from "@/api/page/pageApi";
import { table } from "console";
import TableUser from "./comon/TableUser";

const { Title } = Typography;

const UserManagementPage: React.FC = () => {
    const [search, setSearch] = useState("");

    return (
        <ConfigProvider theme={{ components: { Card: { bodyPadding: 0 } } }}>
            <CardShadow>
                <Input.Search
                    placeholder="Tìm theo tên, email..."
                    allowClear
                    onSearch={e => {
                        setSearch(e);
                    }}
                    style={{ margin: 10, width: "30%" }}
                    size="large"
                />
                <div style={{ clear: "both" }} />
                <TableUser keyword={search} />
            </CardShadow>
        </ConfigProvider>
    );
};

export default UserManagementPage;
