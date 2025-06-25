// /admin/manager/clients/_ui/ColumnClient.tsx
import { ColumnsType } from 'antd/es/table';
import { ResponseRecord } from '@/types/respones/record';
import { Tag, Avatar, Flex, Dropdown, Button } from 'antd';
import { Status } from '@/types/status';
import { useEffect, useState } from 'react';
import { apiSortClient } from '@/api/sort';
import { MoreOutlined } from '@ant-design/icons';
import { getHighlightedText } from '@/utils/converter';



export const useColumnClient = ({ keyword }: { keyword: string }): ColumnsType<ResponseRecord.Client> => {
  const [sortableFields, setSortableFields] = useState<string[]>([]);

  useEffect(() => {
    apiSortClient().then((res) => {
      setSortableFields(res.data);
    });
  }, []);

  const isSortable = (field: string) => sortableFields.includes(field);

  return [
    {
      title: 'Người dùng',
      dataIndex: 'client',
      render: (_, record) => {
        return (
          <Flex gap={10} align="center">
            <Avatar src={record.avatar} size="large" />
            <Flex align="start" vertical>
              <div className="font-bold">
                {getHighlightedText(record.fullName, keyword)}
              </div>
              <div className="text-gray-600">
                {getHighlightedText(record.email, keyword)}
              </div>
            </Flex>
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
      title: 'Giới tính',
      dataIndex: 'isMale',
      render: (isMale: boolean) => (isMale ? 'Nam' : 'Nữ'),
      align: 'center',
      sorter: isSortable("isMale"),
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      sorter: isSortable("birthday"),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
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
              {
                key: "disable",
                label: <p>Vô hiệu hóa</p>,
              },
            ],
          }}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    }
  ];
}
