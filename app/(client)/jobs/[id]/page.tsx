"use client";

import {
    faCoins,
    faCalendarDays,
    faClock,
    faLocationDot,
    faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Row,
    Col,
    Tag,
    Typography,
    Descriptions,
    Button,
    Space,
    Divider,
} from "antd";
import React, { useEffect, useState } from "react";
import CardShadow from "@/components/ui/card-shadow";
import RightSide from "./_ui/RightSide";
import { ResponseDetail } from "@/types/respones/detail";
import { apiJobDetail } from "@/api/detail";
import { useParams, useRouter } from "next/navigation";
import { apiGet } from "@/api/baseApi";

const { Title, Text, Paragraph } = Typography;

const JobDetail = () => {
    const params = useParams();
    const id = params?.id;
    const [job, setJob] = useState<any>();
    const router = useRouter();

    useEffect(() => {
        apiGet(`/jobs/${id}/public`).then((res) => {
            setJob(res.data);
        }).catch((err) => {
            router.push("/find-jobs");
        });
    }, []);

    return (
        <div className="!max-w-[1280px] !mx-auto !px-4 !py-10">
            <Row gutter={32} align="top">
                {/* LEFT SIDE: JOB CONTENT */}
                <Col span={17}>
                    <CardShadow styleBody={{ padding: "32px" }}>
                        <Space direction="vertical" size="large" className="!w-full !space-y-6">
                            <div>
                                <Tag color="blue" className="!text-sm !px-3 !py-1 !rounded-md">
                                    {job?.majorName}
                                </Tag>
                                <Title level={2} className="!mt-2 !mb-1 !text-[#1d1d1f]">
                                    {job?.title}
                                </Title>
                            </div>

                            <div>
                                <Title level={4}>Mô tả công việc</Title>
                                <Paragraph className="!text-justify !leading-7 !text-[#4b4b4b]">
                                    {job?.description}
                                </Paragraph>
                            </div>

                            <Divider />

                            <Row gutter={32}>
                                <Col span={12}>
                                    <Title level={5}>Kỹ năng công việc</Title>
                                    <div className="flex flex-wrap gap-2">
                                        {job?.skills?.map((skill: string, idx: number) => (
                                            <Tag key={idx} color="geekblue">
                                                {skill}
                                            </Tag>
                                        ))}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <Title level={5}>Ngôn ngữ yêu cầu</Title>
                                    <div className="flex flex-wrap gap-2">
                                        {job?.languages?.map((lang: string, idx: number) => (
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
                                <Text className="!text-base">{job?.countApply}</Text>
                            </div>
                            <Divider />

                            <Title level={4}>Chi tiết công việc</Title>
                            <Descriptions
                                bordered
                                column={2}
                                size="middle"
                                styles={{ label: { fontWeight: 600 } }}
                                className="!rounded-lg !overflow-hidden"
                            >
                                <Descriptions.Item
                                    label={
                                        <span className="flex items-center !gap-2">
                                            <FontAwesomeIcon icon={faCalendarCheck} />
                                            Ngày đóng tuyển
                                        </span>
                                    }
                                >
                                    {job?.closedAt}
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <span className="flex items-center !gap-2">
                                            <FontAwesomeIcon icon={faClock} />
                                            Thời lượng
                                        </span>
                                    }
                                >
                                    {job?.duration} giờ
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <span className="flex items-center !gap-2">
                                            <FontAwesomeIcon icon={faCoins} />
                                            Ngân sách
                                        </span>
                                    }
                                >
                                    {job?.budget}
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
                    <RightSide job={job} />
                </Col>
            </Row>
        </div>
    );
};

export default JobDetail;
