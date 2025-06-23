// /admin/manager/clients/_ui/ColumnClient.tsx
import { ColumnsType } from 'antd/es/table';
import { ResponseRecord } from '@/types/respones/record';
import { Tag, Flex, Dropdown, Button } from 'antd';
import { Status } from '@/types/status';
import { useEffect, useState } from 'react';
import { apiSortStaff } from '@/api/sort';
import { MoreOutlined } from '@ant-design/icons';
import { getHighlightedText } from '@/utils/converter';

export const useColumnStaff = ({ keyword, onEdit }: { keyword: string, onEdit: (skillId: number) => void }): ColumnsType<ResponseRecord.Staff> => {
    const [sortableFields, setSortableFields] = useState<string[]>([]);

    useEffect(() => {
        apiSortStaff().then((res) => {
            setSortableFields(res.data);
        });
    }, []);

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
                            ...(record.role.code !== 'QUAN_TRI' ? [{
                                key: "disable",
                                label: <p>Vô hiệu hóa</p>,
                            }, {
                                key: "edit",
                                label: <p onClick={() => onEdit(record.id)}>Chỉnh sửa</p>,
                            }] : [])
                        ],
                    }}
                >
                    <Button icon={<MoreOutlined />} />
                </Dropdown>
            ),
        }
    ];
}
