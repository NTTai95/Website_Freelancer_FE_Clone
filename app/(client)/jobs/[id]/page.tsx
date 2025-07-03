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
    Badge
} from "antd";
import React, { useEffect, useState } from "react";
import CardShadow from "@/components/ui/card-shadow";
import RightSide from "./_ui/RightSide";
import { useParams, useRouter } from "next/navigation";
import { apiGet } from "@/api/baseApi";

const { Title, Text, Paragraph } = Typography;

const JobDetail = () => {
    const params = useParams();
    const id = params?.id;
    const [job, setJob] = useState<any>();
    const router = useRouter();
    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        apiGet(`/jobs/${id}/public`).then((res) => {
            setJob(res.data);
        }).catch((err) => {
            router.push("/find-jobs");
        });

        apiGet(`/jobs/${id}/is-apply`).then((res) => {
            setIsApplied(res.data as boolean);
        })
    }, []);

    return (
        <div className="!mx-auto !px-16 !py-10">
            <Row gutter={32} align="top">
                {/* LEFT SIDE: JOB CONTENT - MODERN DESIGN */}
                <Col xs={24} lg={17} className="!mb-8 lg:!mb-0">
                    <CardShadow styleBody={{ padding: "32px" }} className="!rounded-xl !border-0 !shadow-xl">
                        <Space direction="vertical" size="small" className="!w-full !space-y-6">
                            {/* Job Header with Status Badge */}
                            <div className="!flex !justify-between !items-start">
                                <div>
                                    <Tag color="blue" className="!text-sm !px-3 !py-1.5 !rounded-lg !bg-blue-100 !border-0 !text-blue-700 !font-medium">
                                        {job?.majorName}
                                    </Tag>

                                    <Title level={2} className="!mt-4 !mb-3 !text-gray-800 !font-bold">
                                        {job?.title}
                                    </Title>
                                </div>

                                <div className="!bg-gradient-to-r !from-blue-50 !to-indigo-50 !px-4 !py-2 !rounded-lg !border !border-blue-100">
                                    <Text strong className="!text-blue-600 !text-lg">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(job?.budget || 0)}
                                    </Text>
                                </div>

                            </div>

                            <Divider className="!my-2 !border-gray-200" />

                            {/* Job Description */}
                            <div>
                                <Title level={4} className=" !text-gray-800 !font-semibold">
                                    Mô tả công việc
                                </Title>
                                <Paragraph className="!text-justify !leading-7 !text-gray-600 !text-base whitespace-pre-line">
                                    {job?.description}
                                </Paragraph>
                            </div>

                            {/* Skills & Languages */}
                            <div className="flex flex-col !gap-6 !mt-8">
                                <div>
                                    <Title level={5} className="!mb-3 !text-gray-700 !font-bold !flex !items-center !gap-2">
                                        <span className="!w-2 !h-2 !rounded-full !bg-blue-500"></span>
                                        Kỹ năng yêu cầu
                                    </Title>
                                    <div className="!flex !flex-wrap !gap-2">
                                        {job?.skills?.map((skill: string, idx: number) => (
                                            <Tag
                                                key={idx}
                                                className="!px-3 !py-1.5 !rounded-lg !bg-blue-50 !border-0 !text-blue-700 !font-medium"
                                            >
                                                {skill}
                                            </Tag>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <Title level={5} className="!mb-3 !text-gray-700 !font-bold !flex !items-center !gap-2">
                                        <span className="!w-2 !h-2 !rounded-full !bg-blue-500"></span>
                                        Ngôn ngữ yêu cầu
                                    </Title>
                                    <div className="!flex !flex-wrap !gap-2">
                                        {job?.languages?.map((lang: string, idx: number) => (
                                            <Tag
                                                key={idx}
                                                className="!px-3 !py-1.5 !rounded-lg !bg-indigo-50 !border-0 !text-indigo-700 !font-medium"
                                            >
                                                {lang}
                                            </Tag>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="!bg-blue-50 !p-4 !rounded-xl !mt-6">
                                <div className="!flex !items-center !gap-3">
                                    <div className="!bg-blue-100 !p-3 !rounded-lg">
                                        <FontAwesomeIcon icon={faCalendarCheck} className="!text-blue-600 !text-lg" />
                                    </div>
                                    <div>
                                        <Text strong className="!block !text-gray-800">Số lượng ứng tuyển</Text>
                                        <Text className="!text-blue-600 !text-xl !font-bold">{job?.countApply} ứng viên</Text>
                                    </div>
                                </div>
                            </div>

                            <Divider className="!my-2 !border-gray-200" />

                            {/* Job Details */}
                            <div>
                                <Title level={4} className="!mb-4 !text-gray-800 !font-semibold !pb-2">
                                    Chi tiết công việc
                                </Title>

                                <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-4 !mt-6">
                                    <DetailCard
                                        icon={faCalendarCheck}
                                        title="Ngày đóng tuyển"
                                        value={job?.closedAt}
                                        color="blue"
                                    />

                                    <DetailCard
                                        icon={faClock}
                                        title="Thời lượng"
                                        value={`${job?.duration} giờ`}
                                        color="indigo"
                                    />

                                    <DetailCard
                                        icon={faCoins}
                                        title="Ngân sách"
                                        value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(job?.budget || 0)}
                                        color="green"
                                    />

                                    {/* <DetailCard
                                        icon={faLocationDot}
                                        title="Địa điểm"
                                        value={job?.location || "Làm việc từ xa"}
                                        color="purple"
                                    /> */}
                                </div>
                            </div>

                            {/* Apply Button */}
                            <div className="!pt-8 !text-center">
                                {isApplied ?
                                    <>
                                        <Button
                                            disabled
                                            type="primary"
                                            size="large"
                                            className={`!px-12 !py-5 !h-auto !rounded-xl !text-base !font-bold !border-0 !transition-all !bg-gray-300 !text-gray-500 !cursor-not-allowed !shadow-none}`}
                                        >
                                            Ứng tuyển ngay
                                        </Button>

                                        <Text className="!block !mt-4 !text-gray-500">
                                            Bạn đã ứng tuyển vào công việc này
                                        </Text>

                                    </> : <>
                                        <Button
                                            type="primary"
                                            size="large"
                                            className="!px-12 !py-5 !h-auto !rounded-xl !text-base !font-bold !bg-gradient-to-r !from-blue-600 !to-indigo-700 !border-0 !shadow-lg hover:!shadow-xl !transition-all"
                                            onClick={() => router.push(`./${job?.id}/apply`)}
                                        >
                                            Ứng tuyển ngay
                                        </Button>

                                        <Text className="!block !mt-4 !text-gray-500">
                                            Ưu tiên ứng viên có portfolio và kinh nghiệm tương tự
                                        </Text>
                                    </>}
                            </div>
                        </Space>
                    </CardShadow>
                </Col>

                {/* RIGHT SIDE: POSTER INFO */}
                <Col xs={24} lg={7} className="!sticky !top-24">
                    <RightSide job={job} />
                </Col>
            </Row>
        </div>
    );
};

// Reusable Detail Card Component
const DetailCard = ({ icon, title, value, color }: {
    icon: any,
    title: string,
    value: string,
    color: 'blue' | 'indigo' | 'green' | 'purple'
}) => {
    const colorClasses = {
        blue: "!bg-blue-100 !text-blue-600",
        indigo: "!bg-indigo-100 !text-indigo-600",
        green: "!bg-green-100 !text-green-600",
        purple: "!bg-purple-100 !text-purple-600",
    };

    return (
        <div className="!p-4 !rounded-xl !bg-white !border !border-gray-100 !shadow-sm hover:!shadow-md !transition-shadow">
            <div className="!flex !items-center !gap-3">
                <div className={`!p-3 !rounded-lg ${colorClasses[color]}`}>
                    <FontAwesomeIcon icon={icon} className="!text-lg" />
                </div>
                <div>
                    <Text className="!block !text-gray-500 !text-sm">{title}</Text>
                    <Text strong className="!block !text-gray-800 !text-base">{value}</Text>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;