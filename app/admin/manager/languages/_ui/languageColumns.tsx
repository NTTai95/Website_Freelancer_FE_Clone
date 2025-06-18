import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Button, Dropdown, Tag, Tooltip } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ResponseRecord } from "@/types/respones/record";
import { apiSortLanguage } from "@/api/sort";

export const useLanguageColumns = ({ keyword }: { keyword: string }): ColumnsType<ResponseRecord.Language> => {
    const [sortableFields, setSortableFields] = useState<string[]>([]);

    useEffect(() => {
        apiSortLanguage().then((res) => {
            setSortableFields(res.data);
        });
    }, []);

    const isSortable = (field: string) => sortableFields.includes(field);

    return [
        {
            title: "ID",
            dataIndex: "id",
            width: 60,
        },
        {
            title: "Ngôn ngữ",
            dataIndex: "name",
            width: 500,
            render: (name: string) => (
                <Highlighter
                    searchWords={[keyword]}
                    highlightStyle={{ backgroundColor: "#ADDEFF", padding: 0 }}
                    autoEscape
                    textToHighlight={name}
                />
            ),
            sorter: isSortable("name"),
        },
        {
            title: "Mã iso",
            dataIndex: "iso",
            render: (name: string) => (
                <Highlighter
                    searchWords={[keyword]}
                    highlightStyle={{ backgroundColor: "#ADDEFF", padding: 0 }}
                    autoEscape
                    textToHighlight={name}
                />
            ),
            sorter: isSortable("iso")
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            sorter: isSortable("status"),
            render: (status: string) => (
                <Tag color={status === "ACTIVE" ? "green" : "red"}>
                    {status === "ACTIVE" ? "Đang hoạt động" : "Đã xóa"}
                </Tag>
            ),
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            sorter: isSortable("createdAt"),
        },
        {
            title: "Hành động",
            align: "right",
            render: () => (
                <Dropdown
                    arrow
                    menu={{
                        items: [
                            {
                                key: "edit",
                                label: <a href="#">Sửa</a>,
                            },
                            {
                                key: "delete",
                                label: <a href="#">Xóa</a>,
                            },
                        ],
                    }}
                >
                    <Button icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ];
};
