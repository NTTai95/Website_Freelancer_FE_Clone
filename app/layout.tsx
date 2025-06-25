// /app/layout.tsx
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme } from 'antd';
import viVN from 'antd/locale/vi_VN';
import lightTheme from '@/theme/light-theme';
import GlobalSpin from './_ui/GlobalSpin';
import StoreProvider from './_ui/StoreProvider'
import GlobalMessage from './_ui/GlobalMessage';
import GlobalNotification from './_ui/GlobalNotification';
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import './globals.css';
import { fonts } from '@/lib/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="vi" className={fonts.spaceGrotesk.variable}>
      <body style={{ margin: 0, padding: 0 }}>
        <AntdRegistry>
          <ConfigProvider theme={{ ...lightTheme, algorithm: theme.defaultAlgorithm }} locale={viVN}>
            <StoreProvider>
              <GlobalSpin />
              <GlobalMessage />
              <GlobalNotification />
              {children}
            </StoreProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
