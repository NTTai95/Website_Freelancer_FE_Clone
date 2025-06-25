import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Button, Dropdown, Tooltip } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { ResponseRecord } from "@/types/respones/record";
import { apiSortRole } from "@/api/sort";
import { getHighlightedText } from "@/utils/converter";

export const useRoleColumns = ({ keyword, onEdit, onDelete }: { keyword: string, onEdit: (id: number) => void, onDelete: (id: number) => void }): ColumnsType<ResponseRecord.Role> => {
    const [sortableFields, setSortableFields] = useState<string[]>([]);

    useEffect(() => {
        apiSortRole().then((res) => {
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
            title: "vai trò",
            dataIndex: "name",
            width: 1000,
            render: (_, record) => {
                const isLong = record.description.length > 120;
                const textToDisplay = isLong
                    ? `${record.description.slice(0, 120)}...`
                    : record.description;
                return (
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold text-base text-neutral-900">
                            {getHighlightedText(record.name, keyword)}
                        </span>
                        <span className="text-sm text-neutral-600">
                            {isLong ? (
                                <Tooltip
                                    title={getHighlightedText(record.description, keyword)}
                                >
                                    {getHighlightedText(textToDisplay, keyword)}
                                </Tooltip>
                            ) : (
                                getHighlightedText(record.description, keyword)
                            )}
                        </span>
                    </div>
                );
            },
            sorter: isSortable("name") || isSortable("description")
        },
        {
            title: "Số lượng người dùng",
            dataIndex: "countUsers",
            width: 200,
            sorter: isSortable("countUser"),
            align: "center"
        },
        {
            title: "Hành động",
            align: "right",
            render: (_, record) => (
                <Dropdown
                    arrow
                    menu={{
                        items: [
                            {
                                key: "edit",
                                label: <p onClick={() => onEdit(record.id)}>Chỉnh sửa</p>,
                            },
                            ...(Number(record.countUsers) < 1 ? [{
                                key: "delete",
                                label: <p onClick={() => onDelete(record.id)}>Xóa</p>,
                            }] : [])
                        ],
                    }}
                >
                    <Button icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ];
};
