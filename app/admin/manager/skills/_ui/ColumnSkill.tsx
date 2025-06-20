"use client";

import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Button, Dropdown, Tag, Tooltip } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ResponseRecord } from "@/types/respones/record";
import { apiSortSkill } from "@/api/sort";
import { Status } from "@/types/status";
import { RequestPage } from "@/types/requests/page";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { hideSpin, showSpin } from "@/store/volatile/spinSlice";
import { apiActiveMajor } from "@/api/changeState";
import { addMessage } from "@/store/volatile/messageSlice";

export const useSkillColumns = ({ keyword, onEdit, onDelete, fetchData }: { keyword: string, onEdit: (skillId: number) => void, onDelete: (id: number) => void, fetchData: ({ page, sortField, sortType }: RequestPage.Skill) => void; }): ColumnsType<ResponseRecord.Skill> => {
    const [sortableFields, setSortableFields] = useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        apiSortSkill().then((res) => {
            setSortableFields(res.data);
        });
    }, []);

    const onActive = (id: number) => {
        dispatch(showSpin());
        apiActiveMajor(id).then(() => {
            dispatch(addMessage({
                key: "major-active",
                type: "success",
                content: "Khôi phục kỹ năng thành công!",
            }));
            dispatch(hideSpin());
            fetchData({});
        }).catch(() => {
            dispatch(addMessage({
                key: "major-active",
                type: "error",
                content: "Khôi phục kỹ năng thất bại!",
            }));
        })
    };

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
                const isLong = record.description.length > 70;
                const textToDisplay = isLong
                    ? `${record.description.slice(0, 70)}...`
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
            title: "ngành nghề",
            dataIndex: "majorName",
            sorter: isSortable("majorName"),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            sorter: isSortable("status"),
            render: (status: string) => (
                <Tag color={Status.Meta[status].color}>
                    {Status.Meta[status].label}
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
            render: (_, record) => (
                <Dropdown
                    arrow
                    menu={{
                        items: [
                            {
                                key: "edit",
                                label: <p onClick={() => onEdit(record.id)}>Chỉnh sửa</p>,
                            },
                            (record.status === Status.Skill.ACTIVE)
                                ? {
                                    key: "delete",
                                    label: <p onClick={() => onDelete(record.id)}>Xóa</p>,
                                }
                                : {
                                    key: "restore",
                                    label: <p onClick={() => onActive(record.id)}>Khôi phục</p>,
                                }
                        ],
                    }}
                >
                    <Button icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ];
};
