import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Button, Dropdown, Tag, Tooltip } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ResponseRecord } from "@/types/respones/record";
import { apiSortSkill } from "@/api/sort";

export const useSkillColumns = ({ keyword }: { keyword: string }): ColumnsType<ResponseRecord.Skill> => {
    const [sortableFields, setSortableFields] = useState<string[]>([]);

    useEffect(() => {
        apiSortSkill().then((res) => {
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
            title: "Kỹ năng",
            dataIndex: "name",
            width: 600,
            render: (_, record) => {
                const isLong = record.description.length > 60;
                const textToDisplay = isLong
                    ? `${record.description.slice(0, 60)}...`
                    : record.description;
                return (
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold text-base text-neutral-900">
                            <Highlighter
                                searchWords={[keyword]}
                                autoEscape
                                highlightStyle={{ backgroundColor: "#ADDEFF", padding: 0 }}
                                textToHighlight={record.name}
                            />
                        </span>
                        <span className="text-sm text-neutral-600">
                            {isLong ? (
                                <Tooltip
                                    title={
                                        <Highlighter
                                            searchWords={[keyword]}
                                            autoEscape
                                            highlightStyle={{ backgroundColor: "#ADDEFF", padding: 0 }}
                                            textToHighlight={record.description}
                                        />
                                    }
                                >
                                    <Highlighter
                                        searchWords={[keyword]}
                                        autoEscape
                                        highlightStyle={{ backgroundColor: "#ADDEFF", padding: 0 }}
                                        textToHighlight={textToDisplay}
                                    />
                                </Tooltip>
                            ) : (
                                <Highlighter
                                    searchWords={[keyword]}
                                    autoEscape
                                    highlightStyle={{ backgroundColor: "#ADDEFF", padding: 0 }}
                                    textToHighlight={record.description}
                                />
                            )}
                        </span>
                    </div>
                );
            },
            sorter: isSortable("name"),
            defaultSortOrder: "ascend"
        },
        {
            title: "Chuyên ngành",
            dataIndex: "majorName",
            sorter: isSortable("majorName"),
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
