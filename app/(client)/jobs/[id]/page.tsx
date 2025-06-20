"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faCalendarDays, faClock, faLocationPin, faCalendar, faCalendarWeek, faVenusMars, faMedal, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Avatar, Tag, Card, Button } from "antd";
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import React from "react";
import CardShadow from "@/components/ui/card-shadow";

const jobDetail = () => {
    return (
        <div className="container mx-auto mt-10 px-4">
            <Row gutter={32}>
                <Col span={19}>
                    <Tag className="!text-base !p-1 !mb-1 font-bold" color="blue">Phát triển phần mềm</Tag>
                    <p className="text-xl !inline font-semibold">Thiết kế Website Bán Trái Cây</p>
                    <p className="text-2xl font-bold">Mô tả công việc</p>
                    <p className="text-base">Công việc thiết kế website bán trái cây bao gồm xây dựng một trang web thương mại điện tử thân thiện và dễ sử dụng,
                        tích hợp chức năng giỏ hàng để khách hàng có thể chọn lựa và lưu giữ các sản phẩm mình muốn mua một cách thuận tiện;
                        phát triển hệ thống đặt hàng trực tuyến cho phép khách hàng đặt mua trái cây nhanh chóng, đồng thời hỗ trợ đa dạng phương thức thanh toán bao gồm
                        thanh toán online qua các cổng thanh toán uy tín hoặc thanh toán khi nhận hàng để tăng tính linh hoạt cho người dùng; đảm bảo tính năng giao hàng trong ngày
                        dành cho những loại trái cây dễ hỏng, không thể bảo quản lâu nhằm giữ được độ tươi ngon và chất lượng sản phẩm khi đến tay khách hàng;
                        tích hợp hệ thống nhận xét và đánh giá từ khách hàng để nâng cao trải nghiệm mua sắm, giúp người dùng khác có thể tham khảo và lựa chọn sản phẩm phù hợp,
                        đồng thời hỗ trợ quản lý và phản hồi đánh giá nhằm cải thiện dịch vụ và chất lượng sản phẩm liên tục.</p>
                    <div>
                        <p className="text-xl font-bold my-2">Kỹ năng công việc</p>
                        <Tag className="!text-base p-3 !text-blue mx-5" color="geekblue">Java</Tag>
                        <Tag className="!text-base p-3 !text-blue mx-5" color="geekblue">JavaScript</Tag>
                        <Tag className="!text-base p-3 !text-blue mx-6" color="geekblue">ReactJs</Tag>
                    </div>

                    <div>
                        <p className="text-xl font-bold my-2">Ngôn ngữ</p>
                        <Tag className="!text-base p-3 !text-blue mx-5" color="geekblue">Tiếng Anh</Tag>
                        <Tag className="!text-base p-3 !text-blue mx-5" color="geekblue">Tiếng Đức</Tag>
                        <Tag className="!text-base p-3 !text-blue mx-5" color="geekblue">Tiếng Nhật</Tag>
                        <Tag className="!text-base p-3 !text-blue mx-5" color="geekblue">Tiếng Hàn</Tag>
                    </div>
                    <div className="flex items-center my-2">
                        <p className="text-xl font-bold mr-2">Số lượng ứng tuyển:</p>
                        <p className="text-base">15 người</p>
                    </div>
                    <div>
                        <p className="text-xl font-bold my-2">Tóm tắt</p>
                        <Row>
                            <Col span={8}>
                                <div className="flex items-center gap-x-3 ml-2">
                                    <FontAwesomeIcon icon={faCalendarDays} className="!text-3xl" />
                                    <div>
                                        <p className="block text-base font-bold m-0">Ngày bắt đầu</p>
                                        <p className="text-base m-0">15/02/2024</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-x-3 ml-2 my-5">
                                    <FontAwesomeIcon icon={faLocationPin} className="!text-3xl" />
                                    <div>
                                        <p className="block text-base font-bold m-0">Hình thức làm việc</p>
                                        <p className="text-base m-0">Làm việc từ xa</p>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="flex items-center gap-x-3">
                                    <FontAwesomeIcon icon={faCoins} className="!text-3xl" />
                                    <div>
                                        <p className="block text-base font-bold m-0">Ngày bắt đầu</p>
                                        <p className="text-base m-0">15/02/2024</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-x-3 ml-2 my-5">
                                    <FontAwesomeIcon icon={faCalendar} className="!text-3xl" />
                                    <div>
                                        <p className="block text-base font-bold m-0">Ngày đóng tuyển dụng</p>
                                        <p className="text-base m-0">20/03/2024</p>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="flex items-center gap-x-3">
                                    <FontAwesomeIcon icon={faClock} className="!text-3xl" />
                                    <div>
                                        <p className="block text-base font-bold m-0">Ngày bắt đầu</p>
                                        <p className="text-base m-0">15/02/2024</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Button color="primary" variant="solid">
                        Ứng tuyển ngay
                    </Button>
                </Col>
                <Col span={5}>
                    <CardShadow className={"text-center h-[60vh]"}>
                        <Avatar shape="circle" size={64} icon={<UserOutlined />} />
                        <p className="text-xl my-4">Lưu Thanh Quang</p>
                        <div className="flex flex-col items-start gap-y-6 pl-1.5">
                            <p className="!text-sm p-3 !text-blue" color="geekblue"><FontAwesomeIcon icon={faCalendarWeek} className="!text-lg"/> Tuổi: 36</p>
                            <p className="!text-sm p-3 !text-blue" color="geekblue"><FontAwesomeIcon icon={faVenusMars} className="!text-lg" /> Giới tính: Nam</p>
                            <p className="!text-sm p-3 !text-blue" color="geekblue"><FontAwesomeIcon icon={faMedal} className="!text-lg" /> Điểm uy tín: 20</p>
                            <p className="!text-sm p-3 !text-blue" color="geekblue"><FontAwesomeIcon icon={faFileLines} className="!text-lg"/> Tổng bài đăng: 19</p>
                        </div>
                    </CardShadow>
                </Col>
            </Row>
        </div >
    )
}

export default jobDetail;