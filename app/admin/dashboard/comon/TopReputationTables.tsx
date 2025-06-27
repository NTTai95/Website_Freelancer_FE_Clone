import React from "react";
import { Table, Avatar, Row, Col } from "antd";
import type { ColumnsType } from "antd/es/table";
import CardShadow from "@/components/ui/card-shadow";

type UserReputation = {
    key: number;
    rank: number;
    name: string;
    avatar: string;
    reputation: number;
};

const columns: ColumnsType<UserReputation> = [
    {
        title: "🏅 Rank",
        dataIndex: "rank",
        key: "rank",
        width: 70,
        align: "center",
        render: (rank) => <span className="font-bold text-blue-600">{rank}</span>,
    },
    {
        title: "👤 Người dùng",
        dataIndex: "name",
        key: "name",
        render: (_, record) => (
            <div className="flex items-center gap-3">
                <Avatar size={40} src={record.avatar} />
                <span className="font-medium">{record.name}</span>
            </div>
        ),
    },
    {
        title: "✨ Uy tín",
        dataIndex: "reputation",
        key: "reputation",
        align: "right",
        render: (rep) => (
            <span className="text-green-600 font-semibold">
                {rep.toLocaleString("vi-VN")}
            </span>
        ),
    },
];

// Dữ liệu mẫu
const freelancers: UserReputation[] = Array.from({ length: 5 }, (_, i) => ({
    key: i,
    rank: i + 1,
    name: `Freelancer ${i + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
    reputation: Math.floor(Math.random() * 10000) + 1000,
}));

const employers: UserReputation[] = Array.from({ length: 5 }, (_, i) => ({
    key: i,
    rank: i + 1,
    name: `Employer ${i + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${i + 20}`,
    reputation: Math.floor(Math.random() * 10000) + 1000,
}));

const TopReputationTables = () => {
    return (
        <div className="!mt-5">
            <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                    <CardShadow className="p-4">
                        <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b !pb-2 text-center">
                            🎯 Top 5 Freelancers uy tín nhất
                        </h2>
                        <Table
                            columns={columns}
                            dataSource={freelancers}
                            pagination={false}
                            size="middle"
                            rowKey="key"
                            className="rounded-lg overflow-hidden"
                        />
                    </CardShadow>
                </Col>

                <Col xs={24} md={12}>
                    <CardShadow className="p-4">
                        <h2 className="text-2xl font-bold text-purple-700 mb-4 border-b !pb-2 text-center">
                            🏆 Top 5 Employers uy tín nhất
                        </h2>
                        <Table
                            columns={columns}
                            dataSource={employers}
                            pagination={false}
                            size="middle"
                            rowKey="key"
                            className="rounded-lg overflow-hidden"
                        />
                    </CardShadow>
                </Col>
            </Row>
        </div>
    );
};

export default TopReputationTables;
