"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faCalendarDays, faClock, faLocationPin, faCalendar, faCalendarWeek, faVenusMars, faMedal, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Avatar, Tag, Card, Button } from "antd";
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import React, { useEffect } from "react";
import CardShadow from "@/components/ui/card-shadow";
import { apiJobDetail } from "@/api/detail";
import { ResponseDetail } from "@/types/respones/detail";
import { useParams } from "next/navigation";

const jobDetail = () => {
    const [data, setData] = React.useState<ResponseDetail.Job>();
    const params = useParams();
    const id = params.id;
    const fetchData = async () => {
        console.log(id);
        if (typeof id === 'string') {
            apiJobDetail(parseInt(id)).then((res) => {
                console.log(res.data);
                setData(res.data);
            })
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="!max-w-screen-xl !mx-auto !mt-3">
            <Row gutter={32}>
                <Col className='ml-5' span={19}>
                    <div className='!mb-6'>
                        <Tag className="!text-xl !p-1 !mb-1 font-bold" color="blue">{data?.major.name}</Tag>
                        <p className="text-xl !inline font-semibold">{data?.title}</p>
                    </div>
                    <p className="text-base font-bold">Mô tả công việc</p>
                    <p className="text-base mt-3">{data?.description}</p>
                    <div className="!mt-6">
                        <p className="text-xl font-bold my-2">Kỹ năng công việc</p>
                        {data?.skills.map((skill) => (
                            <Tag className="!text-base p-3 !text-blue mx-5" color="geekblue">{skill.name}</Tag>
                        ))}
                    </div>

                    <div className="!mt-6">
                        <p className="text-base font-bold my-2">Ngôn ngữ</p>
                        {data?.languages.map((language) => (
                            <Tag className="!text-base p-3 !text-blue mx-5" color="geekblue">{language.name}</Tag>
                        ))}
                    </div>
                    <div className="flex items-center mb-2 !mt-6">
                        <p className="text-base font-bold mr-2">Số lượng ứng tuyển:</p>
                        <p className="text-base">{data?.countApplies} người</p>
                    </div>
                    <div className="!mt-6">
                        <p className="text-base font-bold my-2">Tóm tắt</p>
                        <Row>
                            <Col span={8}>
                                <div className="flex items-center gap-x-3 ml-2 my-5">
                                    <FontAwesomeIcon icon={faLocationPin} className="!text-3xl" />
                                    <div>
                                        <p className="block text-base font-bold m-0">Hình thức làm việc</p>
                                        <p className="text-base m-0">Làm việc từ xa</p>
                                    </div>
                                </div>

                                {data?.document &&
                                    <div className="flex items-center gap-x-3">
                                        <FontAwesomeIcon icon={faClock} className="!text-3xl" />
                                        <div>
                                            <p className="block text-base font-bold m-0">Tài liệu</p>
                                            <a href={data?.document}>nmb</a>
                                        </div>
                                    </div>}
                            </Col>
                            <Col span={8}>
                                <div className="flex items-center gap-x-3">
                                    <FontAwesomeIcon icon={faCoins} className="!text-3xl" />
                                    <div>
                                        <p className="block text-base font-bold m-0">Số giờ làm việc</p>
                                        <p className="text-base m-0">{data?.durationHours}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-x-3 ml-2 my-5">
                                    <FontAwesomeIcon icon={faCalendar} className="!text-3xl" />
                                    <div>
                                        <p className="block text-base font-bold m-0">Ngày đóng tuyển dụng</p>
                                        <p className="text-base m-0">12/01</p>
                                    </div>
                                </div>


                            </Col>
                            <Col span={8}>
                                <div className="flex items-center gap-x-3">
                                    <FontAwesomeIcon icon={faClock} className="!text-3xl" />
                                    <div>
                                        <p className="block text-base font-bold m-0">Ngân sách dự án</p>
                                        <p className="text-base m-0">{data?.budget}</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Button color="primary" variant="solid">
                        Ứng tuyển ngay
                    </Button>
                    {/* </div> */}
                </Col>
                <Col span={5}>
                    <CardShadow className={"text-center h-[60vh]"}>
                        <Avatar src={data?.employerAvatar} shape="circle" size={64} icon={<UserOutlined />} />
                        <p className="text-xl my-4">{data?.employerFullName}</p>
                        <div className="flex flex-col items-start gap-y-6 pl-1.5">
                            <p className="!text-sm p-3 !text-blue" color="geekblue"><FontAwesomeIcon icon={faCalendarWeek} className="!text-lg" />Tuổi: {data?.employerAge}</p>
                            <p className="!text-sm p-3 !text-blue" color="geekblue"><FontAwesomeIcon icon={faVenusMars} className="!text-lg" /> Giới tính: {data?.isMale ? "Nam" : "Nữ"}</p>
                            <p className="!text-sm p-3 !text-blue" color="geekblue"><FontAwesomeIcon icon={faMedal} className="!text-lg" /> Điểm uy tín: {data?.employerRequtation}</p>
                        </div>
                    </CardShadow>
                </Col>
            </Row>
        </div >
    )
}

export default jobDetail;