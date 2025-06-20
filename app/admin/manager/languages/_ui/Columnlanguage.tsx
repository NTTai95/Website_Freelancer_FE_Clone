import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Button, Dropdown, Tag, Tooltip } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ResponseRecord } from "@/types/respones/record";
import { apiSortLanguage } from "@/api/sort";
import { Status } from "@/types/status";
import { RequestPage } from "@/types/requests/page";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { hideSpin, showSpin } from "@/store/volatile/spinSlice";
import { apiActiveMajor } from "@/api/changeState";
import { addMessage } from "@/store/volatile/messageSlice";

export const useLanguageColumns = ({ keyword, onEdit, onDelete, fetchData }: { keyword: string, onEdit: (id: number) => void, onDelete: (id: number) => void, fetchData: ({ page, sortField, sortType }: RequestPage.Language) => void; }): ColumnsType<ResponseRecord.Language> => {
    const [sortableFields, setSortableFields] = useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        apiSortLanguage().then((res) => {
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
                            (record.status === Status.Language.ACTIVE)
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
