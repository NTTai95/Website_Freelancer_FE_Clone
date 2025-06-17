import { Col, Row, Space, Typography } from "antd";
import { FacebookOutlined, MailOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";
import { Footer } from "antd/es/layout/layout";
import Link from "next/link";

const FooterCustom = () => {
    return (
        <Footer style={{ background: "#001529", padding: '40px 80px' }}>
            <Row gutter={[32, 32]} justify="space-between">
                <Col xs={24} md={8}>
                    <Typography.Title level={4} style={{ marginBottom: 16, color: "#fff" }}>Tự Do Freelancer</Typography.Title>
                    <Typography.Text style={{ color: "#fff" }}>
                        Nền tảng kết nối tự do sáng tạo, giúp bạn biến ý tưởng thành hiện thực một cách chuyên nghiệp.
                    </Typography.Text>
                </Col>

                <Col xs={24} md={8}>
                    <Typography.Title level={5} style={{ color: "#fff" }}>Liên kết nhanh</Typography.Title>
                    <Space direction="vertical">
                        <Link style={{ color: "#fff" }} href="/about">Về chúng tôi</Link>
                        <Link style={{ color: "#fff" }} href="/services">Dịch vụ</Link>
                        <Link style={{ color: "#fff" }} href="/portfolio">Dự án</Link>
                        <Link style={{ color: "#fff" }} href="/contact">Liên hệ</Link>
                    </Space>
                </Col>

                <Col xs={24} md={8}>
                    <Typography.Title level={5} style={{ color: "#fff" }}>Kết nối với chúng tôi</Typography.Title>
                    <Space>
                        <Link style={{ color: "#fff" }} href="mailto:hello@freelancer.vn"><MailOutlined /></Link>
                        <Link style={{ color: "#fff" }} href="https://facebook.com" target="_blank"><FacebookOutlined /></Link>
                        <Link style={{ color: "#fff" }} href="https://twitter.com" target="_blank"><TwitterOutlined /></Link>
                        <Link style={{ color: "#fff" }} href="https://linkedin.com" target="_blank"><LinkedinOutlined /></Link>
                    </Space>
                </Col>
            </Row>

            <Row justify="center" style={{ marginTop: 40 }}>
                <Typography.Text style={{ color: "#fff" }} type="secondary">© {new Date().getFullYear()} Tự Do Freelancer. All rights reserved.</Typography.Text>
            </Row>
        </Footer>
    );
}

export default FooterCustom;