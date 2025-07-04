"use client";
import { useEffect, useState } from "react";
import { Layout, Row, Col, Card, Typography, Button, Tag, Rate } from "antd";
import "antd/dist/reset.css";

const { Title, Paragraph, Text } = Typography;

export default function FreelancerProfile() {
  const [skills, setSkills] = useState<string[]>([
    "JavaScript",
    "React",
    "Node.js",
    "CSS",
    "HTML",
    "Git",
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkills((prev) => [...prev, "TypeScript"]);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx>{`
        .profile-text {
          text-align: center;
        }
        @media (min-width: 768px) {
          .profile-text {
            text-align: center;
          }
        }
      `}</style>
      <Layout
        style={{
          minHeight: "100vh",
          background: "#f0f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 1000, padding: "24px" }}>
          <Card style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <img
                src="/assets/images/user.png"
                alt="Profile Picture"
                style={{ width: 128, height: 128, borderRadius: "50%" }}
              />
              <div className="profile-text" style={{ flex: 1 }}>
                <Title level={3}>Nguyen Van A</Title>
                <Paragraph style={{ color: "#595959" }}>
                  Senior Web Developer
                </Paragraph>
                <Paragraph style={{ color: "#8c8c8c" }}>
                  Ninh Kiều Cần Thơ | Có thể làm việc 30+ giờ/tuần
                </Paragraph>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <Rate
                    disabled
                    defaultValue={5}
                    style={{ color: "#fadb14" }}
                  />
                  <Text style={{ marginLeft: 8, color: "#595959" }}>
                    (4.9 - 50 đánh giá)
                  </Text>
                </div>
                <Button
                  type="primary"
                  style={{
                    marginTop: 16,
                    background: "blue",
                    borderColor: "#16a34a",
                  }}
                >
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
          </Card>

          {/* Main Layout: Sidebar and Body */}
          <Row gutter={[24, 24]}>
            {/* Sidebar (4/12 columns, equivalent to md:span-8 in Ant Design's 24-column system) */}
            <Col xs={24} md={8}>
              <Card style={{ marginBottom: 24 }}>
                <Title level={4}>Kĩ Năng</Title>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {skills.map((skill, index) => (
                    <Tag key={skill} color="blue">
                      {skill}
                    </Tag>
                  ))}
                </div>
              </Card>

              <Card style={{ marginBottom: 24 }}>
                <Title level={4}>Học Vấn</Title>
                <Paragraph>Phát Triển Phần Mềm (Java)</Paragraph>
                <Paragraph style={{ color: "#8c8c8c" }}>
                  Cao Đẳng FPT Polytechnic | 2023 - 2025
                </Paragraph>
              </Card>

              <Card>
                <Title level={4}>Ngôn Ngữ</Title>
                <Paragraph>English: IELTS 7.0</Paragraph>
                <Paragraph>Spanish: Cơ bản</Paragraph>
              </Card>
            </Col>

            {/* Body (8/12 columns, equivalent to md:span-16 in Ant Design's system) */}
            <Col xs={24} md={16}>
              <Card style={{ marginBottom: 24 }}>
                <Title level={4}>Giới Thiệu</Title>
                <Paragraph>
                  Tôi là một nhà phát triển web đầy nhiệt huyết với hơn 8 năm
                  kinh nghiệm trong việc xây dựng các ứng dụng web có thể mở
                  rộng. Tôi chuyên về JavaScript, React và Node.js, cung cấp các
                  giải pháp chất lượng cao cho khách hàng trong nhiều ngành khác
                  nhau.
                </Paragraph>
              </Card>

              <Card style={{ marginBottom: 24 }}>
                <Title level={4}>Kinh Nghiệm</Title>
                <div style={{ marginBottom: 16 }}>
                  <Title level={5}>Front-End Website Development</Title>
                  <Paragraph style={{ color: "#8c8c8c" }}>
                    Công ty: ABC Corp | Thời gian: 7/2024 - 1/2025
                  </Paragraph>
                  <Paragraph>
                    Phát triển một nền tảng thương mại điện tử hoàn toàn đáp ứng
                    bằng React và Shopify.
                  </Paragraph>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rate
                      disabled
                      defaultValue={5}
                      style={{ color: "#fadb14" }}
                    />
                    <Text style={{ marginLeft: 8, color: "#595959" }}>
                      "Kĩ năng tốt, thân thiện, nhiệt huyết!"
                    </Text>
                  </div>
                </div>
                <div>
                  <Title level={5}>Front-End Website Development</Title>
                  <Paragraph style={{ color: "#8c8c8c" }}>
                    Công ty: Mixi Corp | Thời gian: 3/2025 - 6/2025
                  </Paragraph>
                  <Paragraph>
                    Thiết kế và phát triển trang web danh mục đầu tư cá nhân
                    bằng cách sử dụng HTML, CSS và JavaScript.
                  </Paragraph>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rate
                      disabled
                      defaultValue={4}
                      style={{ color: "#fadb14" }}
                    />
                    <Text style={{ marginLeft: 8, color: "#595959" }}>
                      "Tinh thần làm việc cao, có trách nhiệm"
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
}
