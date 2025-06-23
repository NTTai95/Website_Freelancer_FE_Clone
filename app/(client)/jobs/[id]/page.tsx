"use client";

import {
    faCoins,
    faCalendarDays,
    faClock,
    faLocationDot,
    faCalendarCheck,
    faCalendarWeek,
    faVenusMars,
    faMedal,
    faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Row,
    Col,
    Tag,
    Typography,
    Avatar,
    Descriptions,
    Button,
    Space,
    Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import CardShadow from "@/components/ui/card-shadow";
import RightSide from "./_ui/RightSide";

const { Title, Text, Paragraph } = Typography;

const JobDetail = () => {
    // 🔸 Mock dữ liệu kỹ năng và ngôn ngữ
    const skills = [
        "Java", "JavaScript", "ReactJs", "NodeJs", "MySQL",
        "Tailwind", "Git", "Docker", "Next.js", "GraphQL",
    ];

    const languages = [
        "Tiếng Anh", "Tiếng Đức", "Tiếng Nhật", "Tiếng Hàn", "Tiếng Trung",
        "Tiếng Pháp", "Tiếng Tây Ban Nha", "Tiếng Bồ Đào Nha", "Tiếng Nga", "Tiếng Ý",
    ];

    return (
        <div className="!max-w-[1280px] !mx-auto !px-4 !py-10">
            <Row gutter={32} align="top">
                {/* LEFT SIDE: JOB CONTENT */}
                <Col span={17}>
                    <CardShadow bodyPadding="32px">
                        <Space direction="vertical" size="large" className="!w-full !space-y-6">
                            <div>
                                <Tag color="blue" className="!text-sm !px-3 !py-1 !rounded-md">
                                    Phát triển phần mềm
                                </Tag>
                                <Title level={2} className="!mt-2 !mb-1 !text-[#1d1d1f]">
                                    Thiết kế Website Bán Trái Cây
                                </Title>
                            </div>

                            <div>
                                <Title level={4}>Mô tả công việc</Title>
                                <Paragraph className="!text-justify !leading-7 !text-[#4b4b4b]">
                                    Công việc thiết kế website bán trái cây bao gồm xây dựng một trang web thương mại điện tử thân thiện và dễ sử dụng, tích hợp chức năng giỏ hàng để khách hàng có thể chọn lựa và lưu giữ các sản phẩm mình muốn mua một cách thuận tiện; phát triển hệ thống đặt hàng trực tuyến cho phép khách hàng đặt mua trái cây nhanh chóng, đồng thời hỗ trợ đa dạng phương thức thanh toán bao gồm thanh toán online qua các cổng thanh toán uy tín hoặc thanh toán khi nhận hàng để tăng tính linh hoạt cho người dùng; đảm bảo tính năng giao hàng trong ngày dành cho những loại trái cây dễ hỏng, không thể bảo quản lâu nhằm giữ được độ tươi ngon và chất lượng sản phẩm khi đến tay khách hàng; tích hợp hệ thống nhận xét và đánh giá từ khách hàng để nâng cao trải nghiệm mua sắm, giúp người dùng khác có thể tham khảo và lựa chọn sản phẩm phù hợp, đồng thời hỗ trợ quản lý và phản hồi đánh giá nhằm cải thiện dịch vụ và chất lượng sản phẩm liên tục.
                                </Paragraph>
                            </div>

                            <Divider />

                            <Row gutter={32}>
                                <Col span={12}>
                                    <Title level={5}>Kỹ năng công việc</Title>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill, idx) => (
                                            <Tag key={idx} color="geekblue">
                                                {skill}
                                            </Tag>
                                        ))}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <Title level={5}>Ngôn ngữ yêu cầu</Title>
                                    <div className="flex flex-wrap gap-2">
                                        {languages.map((lang, idx) => (
                                            <Tag key={idx} color="geekblue">
                                                {lang}
                                            </Tag>
                                        ))}
                                    </div>
                                </Col>
                            </Row>

                            <div>
                                <Title level={5} className="!mb-1">
                                    Số lượng ứng tuyển
                                </Title>
                                <Text className="!text-base">15 người</Text>
                            </div>

                            <Divider />

                            <Title level={4}>Chi tiết công việc</Title>
                            <Descriptions
                                bordered
                                column={2}
                                size="middle"
                                labelStyle={{ fontWeight: 600 }}
                                className="!rounded-lg !overflow-hidden"
                            >
                                <Descriptions.Item
                                    label={
                                        <span className="flex items-center !gap-2">
                                            <FontAwesomeIcon icon={faCalendarDays} />
                                            Ngày bắt đầu
                                        </span>
                                    }
                                >
                                    15/02/2024
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <span className="flex items-center !gap-2">
                                            <FontAwesomeIcon icon={faCalendarCheck} />
                                            Ngày đóng tuyển
                                        </span>
                                    }
                                >
                                    20/03/2024
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <span className="flex items-center !gap-2">
                                            <FontAwesomeIcon icon={faClock} />
                                            Thời lượng
                                        </span>
                                    }
                                >
                                    60 giờ
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <span className="flex items-center !gap-2">
                                            <FontAwesomeIcon icon={faLocationDot} />
                                            Hình thức làm việc
                                        </span>
                                    }
                                >
                                    Làm việc từ xa
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <span className="flex items-center !gap-2">
                                            <FontAwesomeIcon icon={faCoins} />
                                            Ngân sách
                                        </span>
                                    }
                                >
                                    5.000.000 VNĐ
                                </Descriptions.Item>
                            </Descriptions>

                            <div className="!pt-6">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="!px-8 !rounded-lg !text-base"
                                >
                                    Ứng tuyển ngay
                                </Button>
                            </div>
                        </Space>
                    </CardShadow>
                </Col>

                {/* RIGHT SIDE: POSTER INFO */}
                <Col span={7} xs={24} lg={7} xl={7}>
                    <RightSide />
                </Col>
            </Row>
        </div>
    );
};

export default JobDetail;
