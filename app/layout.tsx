// app/layout.tsx
'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme } from 'antd';
import viVN from 'antd/locale/vi_VN';
import lightTheme from '@/theme/light-theme';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, padding: 0 }}>
        <AntdRegistry>
          <ConfigProvider theme={{ ...lightTheme, algorithm: theme.defaultAlgorithm }} locale={viVN}>
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
