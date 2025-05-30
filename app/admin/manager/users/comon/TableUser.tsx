import { Table, Tooltip } from "antd";

import { ColumnsType } from "antd/lib/table";
import { Avatar, Button, Dropdown, Image, Space, Tag, Typography } from "antd";
import { MoreOutlined, UserOutlined } from "@ant-design/icons";
import { statusColor, statusLabel, User } from "./constants";
import { useRouter } from "next/navigation";
import { MenuProps } from "antd/lib";

import { pageApi } from "@/api/response/pageApi";
import { RecordUser } from "@/api/response/types/record";
import { useEffect, useState } from "react";
import { TablePaginationConfig } from 'antd/es/table';
import dayjs from "dayjs";

const { Title } = Typography;

const filterOptions = await pageApi.user.getFilter().then(res => res.data);

const textStatus: { [key: string]: string } = {
    ACTIVE: 'Hoạt động',
    DISABLED: 'Bị vô hiệu hóa'
}

const TableUser = ({ keyword = "" }: { keyword?: string }) => {
    const [data, setData] = useState<RecordUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const [filter, setFilter] = useState<{ role: number; status: string }>({
        role: -1,
        status: '',
    });

    const handleTableChange = (newPagination: TablePaginationConfig) => {
        setPagination(newPagination);
    }

    useEffect(() => {
        setLoading(true);

        pageApi.user.getPage({ page: (pagination.current! - 1), size: pagination.pageSize, keyword: keyword, role: filter.role, status: filter.status }).then((res) => {
            console.log(pagination);
            console.log(res);

            setData(res.data.content);

            setPagination({
                ...pagination,
                total: res.data.totalElements,
            });
        })

        setLoading(false);
    }, [pagination.size, pagination.current, keyword, filterOptions])

    const router = useRouter();

    const columns: ColumnsType<RecordUser> = [
        {
            title: "Người dùng",
            key: "user",
            render: (user: RecordUser) => {
                return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                            size={50}
                            src={user.avatar}
                            icon={<UserOutlined />}
                        />
                        <div style={{ marginLeft: 10 }}>
                            <Title className="text-left !mb-0" level={5} onClick={
                                () => router.push(`/${user.role}/${user.id}`)
                            }>{user.fullName}</Title>
                            <Typography.Text type="secondary">{user.email}</Typography.Text>
                        </div>
                    </div>
                );
            },
            width: 250,
            align: "left",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            width: 50,
            align: "left",
        },
        {
            title: "Tuổi",
            dataIndex: "age",
            key: "age",
            width: 0,
            align: "center",
        },
        {
            title: "Ngày tham gia",
            dataIndex: "joinDate",
            key: "joinDate",
            width: 0,
            align: "center",
            render: (date: string) => {
                return <Tooltip title={dayjs(date).format("DD/MM/YYYY HH:mm:ss")}>{dayjs(date).format("DD/MM/YYYY")}</Tooltip>
            }
        },
        {
            title: "Vai trò",
            key: "role",
            dataIndex: "role",
            filters: filterOptions?.role.map((role) => ({ text: role.name, value: role.id })),
            filterMultiple: false,
            width: 0,
            align: "center",
            render: (role: User["role"]) => (
                <Tag
                    style={{
                        fontSize: 14,
                        padding: "2px 12px",
                        minWidth: 130,
                        textAlign: "center",
                    }}
                    color={role === "Freelancer" ? "#1d4ed8" : "#ea580c"}
                >
                    {role}
                </Tag>
            )
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            filters: filterOptions?.status.map((s) => ({ text: textStatus[s], value: s })),
            filterMultiple: false,
            onFilter: (value, record) => record.status === value,
            render: (status: RecordUser["status"]) => (
                <Tag
                    style={{
                        fontSize: 14,
                        padding: "2px 12px",
                        minWidth: 120,
                        textAlign: "center",
                    }}
                    color={statusColor[status]}
                >
                    {statusLabel[status]}
                </Tag>
            ),
            width: 0,
            align: "center",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => {
                const menuItems: MenuProps["items"] = [
                    {
                        key: "view",
                        label: "Xem chi tiết trang cá nhân",
                        onClick: () => router.push(`/profile-detail/${record.id}`),
                    },
                    {
                        key: "toggle-status",
                        label:
                            record.status === "DISABLED"
                                ? "Cho phép hoạt động"
                                : "Vô hiệu hóa tài khoản",
                        onClick: () =>
                            console.log(
                                `${record.status === "DISABLED" ? "Kích hoạt" : "Vô hiệu hóa"
                                }:`,
                                record.id
                            ),
                    },
                ];

                return (
                    <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                        <Button icon={<MoreOutlined />} shape="circle" />
                    </Dropdown>
                );
            },
            width: 10,
            align: "center",
        },
    ];

    return (<Table<RecordUser>
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
    />)
}

export default TableUser;
