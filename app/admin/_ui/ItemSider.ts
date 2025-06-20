import React from 'react';
import {
  TeamOutlined, AppstoreOutlined, ProfileOutlined, ApartmentOutlined,
  TranslationOutlined, UserOutlined, FundOutlined, ContactsOutlined, ExceptionOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = NonNullable<MenuProps['items']>[number];

const items: MenuItem[] = [
  {
    key: '/admin/dashboard',
    label: 'Thống kê',
    icon: React.createElement(FundOutlined),
  },
  {
    key: 'group-1',
    label: 'Quản lý',
    type: 'submenu',
    icon: React.createElement(ContactsOutlined),
    children: [
      {
        key: '/admin/manager/users',
        label: 'Người dùng',
        icon: React.createElement(UserOutlined),
      },
      {
        key: '/admin/manager/languages',
        label: 'Ngôn ngữ',
        icon: React.createElement(TranslationOutlined),
      },
      {
        key: '/admin/manager/skills',
        label: 'Kỹ năng',
        icon: React.createElement(ApartmentOutlined),
      },
      {
        key: '/admin/manager/majors',
        label: 'Ngành nghề',
        icon: React.createElement(AppstoreOutlined),
      },
    ],
  },
  {
    key: 'group-2',
    label: 'Báo cáo',
    type: 'submenu',
    icon: React.createElement(ExceptionOutlined),
    children: [
      {
        key: '/admin/report/job-posts',
        label: 'Bài đăng',
        icon: React.createElement(ProfileOutlined),
      },
      {
        key: '/admin/report/users',
        label: 'Người dùng',
        icon: React.createElement(TeamOutlined),
      },
    ],
  },
];

export { items };