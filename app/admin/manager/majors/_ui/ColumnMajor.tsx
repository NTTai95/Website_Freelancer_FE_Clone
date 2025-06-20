import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Button, Dropdown, Tag, Tooltip } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ResponseRecord } from "@/types/respones/record";
import { apiSortMajor } from "@/api/sort";
import { Status } from "@/types/status";
import { apiActiveMajor } from "@/api/changeState";
import { addMessage } from "@/store/volatile/messageSlice";
import { hideSpin, showSpin } from "@/store/volatile/spinSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { RequestPage } from "@/types/requests/page";

export const useMajorColumns = ({ keyword, onEdit, onDelete, fetchData }: { keyword: string, onEdit: (id: number) => void, onDelete: (id: number) => void, fetchData: ({ page, sortField, sortType }: RequestPage.Major) => void; }): ColumnsType<ResponseRecord.Major> => {
    const [sortableFields, setSortableFields] = useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        apiSortMajor().then((res) => {
            setSortableFields(res.data);
        });
    }, []);

    const onActive = (id: number) => {
        dispatch(showSpin());
        apiActiveMajor(id).then(() => {
            dispatch(addMessage({
                key: "major-active",
                type: "success",
                content: "Khôi phục ngành nghề thành công!",
            }));
            dispatch(hideSpin());
            fetchData({});
        }).catch(() => {
            dispatch(addMessage({
                key: "major-active",
                type: "error",
                content: "Khôi phục ngành nghề thất bại!",
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
            title: "ngành nghề",
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
                                    styles={{ body: { minWidth: '450px', whiteSpace: 'normal' } }}
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
                            (record.status === Status.Major.ACTIVE)
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
