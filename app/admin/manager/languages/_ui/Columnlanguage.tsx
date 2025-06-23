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
import { apiActiveLanguage } from "@/api/changeState";
import { addMessage } from "@/store/volatile/messageSlice";
import { usePageContext } from "./PageContext";

export const useLanguageColumns = ({ keyword, onEdit, onInvalid }: { keyword: string, onEdit: (id: number) => void, onInvalid: (id: number) => void; }): ColumnsType<ResponseRecord.Language> => {
    const [sortableFields, setSortableFields] = useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const { reloadData, reloadFilter } = usePageContext();

    useEffect(() => {
        apiSortLanguage().then((res) => {
            setSortableFields(res.data);
        });
    }, []);

    const onActive = (id: number) => {
        dispatch(showSpin());
        apiActiveLanguage(id).then(() => {
            dispatch(addMessage({
                key: "language-active",
                type: "success",
                content: "Khôi phục ngôn ngữ thành công!",
            }));
            dispatch(hideSpin());
            reloadData?.();
            reloadFilter?.();
        }).catch(() => {
            dispatch(addMessage({
                key: "language-active",
                type: "error",
                content: "Khôi phục ngôn ngữ thất bại!",
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
