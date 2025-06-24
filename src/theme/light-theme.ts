
import type { ThemeConfig } from 'antd';
// theme/lightTheme.ts
const lightTheme: ThemeConfig = {
  token: {
    "colorPrimary": "#355a8e",
    "colorInfo": "#355a8e",
    "colorPrimaryHover": "#1d4ed8",
    "colorPrimaryActive": "#1e40af",
    "colorPrimaryBorder": "#e2e8f0",
    "colorSuccess": "#10b981",
    "colorWarning": "#f59e0b",
    "colorError": "#ef4444",
    "borderRadius": 8,
    "fontSize": 14,
    "wireframe": false,
    "fontFamily": 'var(--font-space-grotesk), sans-serif',
  },
  components: {
    Layout: {
      "headerBg": "#01204b"
    },
    Menu: {
      "darkItemBg": "#01204b",
      "darkItemSelectedBg": "#01204b",
      "darkItemSelectedColor": "#6ea9fc"
    }
  }
};
export default lightTheme;
