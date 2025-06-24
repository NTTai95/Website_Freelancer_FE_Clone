import { Col, Layout, Row } from "antd";
import Banner from "./_ui/Banner";
import Navigation from "./_ui/Navigation";

const LayoutTermsAndPolicy = ({ children }: { children: React.ReactNode }) => {
    return (
        <Layout>
            <Banner />
            <Layout className="container !my-8">
                <Row>
                    <Col span={4}>
                        <Navigation />
                    </Col>
                    <Col span={20} className={"!px-15 border-l border-gray-400"}>
                        {children}
                    </Col>
                </Row>
            </Layout>
        </Layout>)
};

export default LayoutTermsAndPolicy;