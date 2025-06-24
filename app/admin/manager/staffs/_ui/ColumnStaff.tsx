// /admin/manager/clients/_ui/ColumnClient.tsx
import { ColumnsType } from 'antd/es/table';
import { ResponseRecord } from '@/types/respones/record';
import { Tag, Flex, Dropdown, Button } from 'antd';
import { Status } from '@/types/status';
import { useEffect, useState } from 'react';
import { apiSortStaff } from '@/api/sort';
import { MoreOutlined } from '@ant-design/icons';
import { getHighlightedText } from '@/utils/converter';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { usePageContext } from './PageContext';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import { apiActiveStaff } from '@/api/changeState';
import { addMessage } from '@/store/volatile/messageSlice';

export const useColumnStaff = ({ keyword, onEdit, onInvalid }: { keyword: string, onEdit: (staffId: number) => void, onInvalid: (staffId: number) => void }): ColumnsType<ResponseRecord.Staff> => {
    const [sortableFields, setSortableFields] = useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const { reloadData, reloadFilter } = usePageContext();

    useEffect(() => {
        apiSortStaff().then((res) => {
            setSortableFields(res.data);
        });
    }, []);

    const onActive = (id: number) => {
        dispatch(showSpin());
        apiActiveStaff(id).then(() => {
            dispatch(addMessage({
                key: "major-active",
                type: "success",
                content: "Khôi phục ngành nghề thành công!",
            }));
            dispatch(hideSpin());
            reloadData?.();
            reloadFilter?.();
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
            title: 'Nhân viên',
            dataIndex: 'staff',
            render: (_, record) => {
                return (
                    <Flex align="start" vertical>
                        <div className="font-bold">
                            {getHighlightedText(record.fullName, keyword)}
                        </div>
                        <div className="text-gray-600">
                            {getHighlightedText(record.email, keyword)}
                        </div>
                    </Flex>
                );
            },
            sorter: isSortable("fullname") || isSortable("email"),
        },
        {
            title: 'Vai trò',
            dataIndex: ['role', 'name'],
            sorter: isSortable("role"),
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            sorter: isSortable("birthday"),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: string) => (
                <Tag color={Status.Meta[status].color}>
                    {Status.Meta[status].label}
                </Tag>
            ),
            sorter: isSortable("status"),
        },
        {
            title: 'Ngày tham gia',
            dataIndex: 'joinedAt',
            sorter: isSortable("joinedAt"),
        },
        {
            title: "Hành động",
            dataIndex: 'action',
            align: 'end',
            render: (_, record) => (
                <Dropdown
                    arrow
                    menu={{
                        items: [
                            {
                                key: "detail",
                                label: <p onClick={() => { }}>Xem chi tiết</p>,
                            },
                            ...(!(record.role.code === 'QUAN_TRI') ? [
                                (record.status === Status.User.ACTIVE)
                                    ? {
                                        key: "invalid",
                                        label: <p onClick={() => onInvalid(record.id)}>Vô hiệu</p>,
                                    }
                                    : {
                                        key: "restore",
                                        label: <p onClick={() => onActive(record.id)}>Khôi phục</p>,
                                    },
                                {
                                    key: "edit",
                                    label: <p onClick={() => onEdit(record.id)}>Chỉnh sửa</p>,
                                }
                            ] : [])
                        ],
                    }}
                >
                    <Button icon={<MoreOutlined />} />
                </Dropdown >
            ),
        }
    ];
}
