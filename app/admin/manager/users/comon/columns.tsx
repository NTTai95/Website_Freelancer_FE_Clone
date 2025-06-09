import { ColumnsType } from "antd/lib/table";
import { Avatar, Button, Dropdown, Image, Space, Tag, Typography } from "antd";
import { MoreOutlined, UserOutlined } from "@ant-design/icons";
import { statusColor, statusLabel, User } from "./constants";
import { useRouter } from "next/navigation";
import { MenuProps } from "antd/lib";

const { Title } = Typography;

const router = useRouter();

export const columns: ColumnsType<User> = [
    {
        title: "Người dùng",
        dataIndex: "user",
        key: "user",
        render: ({ user }) => {
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
        width: 350,
        align: "center",
        fixed: "left",
    },
    {
        title: "Số điện thoại",
        dataIndex: "phone",
        key: "phone",
        width: 140,
    },
    {
        title: "Vai trò",
        dataIndex: "role",
        key: "role",
        filters: [
            { text: "Người làm việc", value: "Freelancer" },
            { text: "Nhà tuyển dụng", value: "Employer" },
        ],
        onFilter: (value, record) => record.role === value,
        width: 120,
        align: "center",
        render: (role: User["role"]) => (
            <Tag
                style={{
                    fontSize: 14,
                    padding: "2px 12px",
                    minWidth: 90,
                    textAlign: "center",
                }}
                color={role === "Freelancer" ? "#1d4ed8" : "#ea580c"}
            >
                {role}
            </Tag>
        ),
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        filters: [
            { text: "Hoạt động", value: "active" },
            { text: "Tạm ngừng", value: "paused" },
            { text: "Bị vô hiệu hóa", value: "disabled" },
        ],
        onFilter: (value, record) => record.status === value,
        render: (status: User["status"]) => (
            <Tag
                style={{
                    fontSize: 14,
                    padding: "2px 12px",
                    minWidth: 110,
                    textAlign: "center",
                }}
                color={statusColor[status]}
            >
                {statusLabel[status]}
            </Tag>
        ),
        width: 140,
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
                {
                    key: "delete",
                    label: "Xóa",
                    onClick: () => console.log("Xóa:", record.id),
                },
            ];

            return (
                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                    <Button icon={<MoreOutlined />} shape="circle" />
                </Dropdown>
            );
        },
        width: 60,
        align: "center",
        fixed: "right",
    },
];