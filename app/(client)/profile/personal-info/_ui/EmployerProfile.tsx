"use client";

import { Card, Avatar, Descriptions, Tabs, List, Progress } from 'antd';
import {
    UserOutlined,
    ProjectOutlined,
    StarOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { apiGet } from '@/api/baseApi';

const { TabPane } = Tabs;

export default function EmployerProfile() {
    const [data, setData] = useState<any>();

    useEffect(() => {
        apiGet("/profile/my-info").then((res) => {
            setData(res.data);
        })
    }, []);

    const personalInfo = [
        { label: 'Họ và tên', value: data.fullName },
        { label: 'Email', value: data.email },
        { label: 'Số điện thoại', value: data.phone || 'Chưa cập nhật' },
        { label: 'Ngày sinh', value: new Date(data.birthday).toLocaleDateString() },
        { label: 'Giới tính', value: data.isMale ? 'Nam' : 'Nữ' },
        { label: 'Ngày tham gia', value: new Date(data.joinedAt).toLocaleDateString() },
        { label: 'Trạng thái', value: data.status },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Phần avatar và thông tin cơ bản */}
                    <div className="w-full md:w-1/4 flex flex-col items-center">
                        <Avatar
                            size={160}
                            src={data.avatar}
                            icon={<UserOutlined />}
                            className="mb-4"
                        />
                        <h2 className="text-2xl font-bold">{data.fullName}</h2>
                        <p className="text-gray-500 mb-4">Nhà tuyển dụng</p>

                        <div className="w-full mb-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Uy tín</span>
                                <span className="text-sm font-medium">{data.reputation}%</span>
                            </div>
                            <Progress percent={data.reputation} showInfo={false} />
                        </div>

                        <div className="w-full">
                            <p className="font-semibold">Giới thiệu</p>
                            <p className="text-gray-600">{data.bio || 'Chưa có giới thiệu'}</p>
                        </div>
                    </div>

                    {/* Phần chi tiết thông tin */}
                    <div className="w-full md:w-3/4">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Thông tin cá nhân" key="1">
                                <Descriptions bordered column={1}>
                                    {personalInfo.map((item, index) => (
                                        <Descriptions.Item key={index} label={item.label}>
                                            {item.value}
                                        </Descriptions.Item>
                                    ))}
                                </Descriptions>
                            </TabPane>

                            <TabPane tab="Công việc đã đăng" key="2">
                                <List
                                    dataSource={data.jobs}
                                    renderItem={(job: any) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<ProjectOutlined />}
                                                title={job.title}
                                                description={`${new Date(job.createdAt).toLocaleDateString()} - ${job.status}`}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </TabPane>

                            <TabPane tab="Đánh giá" key="3">
                                <List
                                    dataSource={data.reviews}
                                    renderItem={(review: any) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={`${review.rating} sao từ ${review.reviewerName}`}
                                                description={review.comment}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </Card>
        </div>
    );
}