import CardShadow from "@/components/ui/card-shadow";
import { ConfigProvider } from "antd";

const layoutManager = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConfigProvider theme={{ components: { Card: { bodyPadding: 0 } } }}>
            <CardShadow>
                {children}
            </CardShadow>
        </ConfigProvider>);
}

export default layoutManager;
