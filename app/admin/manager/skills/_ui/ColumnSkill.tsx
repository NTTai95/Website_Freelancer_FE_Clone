// app\admin\manager\skills\_ui\TableSkill.tsx
"use client";

import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Button, Dropdown, Tag, Tooltip } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { ResponseRecord } from "@/types/respones/record";
import { apiSortSkill } from "@/api/sort";
import { Status } from "@/types/status";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { hideSpin, showSpin } from "@/store/volatile/spinSlice";
import { apiActiveSkill } from "@/api/changeState";
import { addMessage } from "@/store/volatile/messageSlice";
import { getHighlightedText } from "@/utils/converter";
import { usePageContext } from "./PageContext";

export const useSkillColumns = ({ keyword, onEdit, onInvalid }: { keyword: string, onEdit: (skillId: number) => void, onInvalid: (id: number) => void; }): ColumnsType<ResponseRecord.Skill> => {
    const [sortableFields, setSortableFields] = useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const { reloadData, reloadFilter } = usePageContext();

    useEffect(() => {
        apiSortSkill().then((res) => {
            setSortableFields(res.data);
        });
    }, []);

    const onActive = (id: number) => {
        dispatch(showSpin());
        apiActiveSkill(id).then(() => {
            dispatch(addMessage({
                key: "skill-active",
                type: "success",
                content: "Khôi phục kỹ năng thành công!",
            }));
            dispatch(hideSpin());
            reloadData?.();
            reloadFilter?.();
        }).catch(() => {
            dispatch(addMessage({
                key: "skill-active",
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
                                    key: "invalid",
                                    label: <p onClick={() => onInvalid(record.id)}>Vô hiệu</p>,
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
