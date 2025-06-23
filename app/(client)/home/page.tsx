'use client';

import { Card, Avatar, Form, Input, InputNumber, Button, DatePicker, Tag, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import dayjs from 'dayjs';

const ApplyJobPage = () => {
  const [form] = Form.useForm();

  const jobInfo = {
    title: 'Thiết kế giao diện website bán hàng',
    description: 'Cần một freelancer thiết kế UI/UX cho website bán hàng chuyên nghiệp.',
    budget: 500,
    postedDate: '2024-06-20',
    skills: ['Figma', 'Photoshop', 'HTML', 'CSS'],
    languages: ['Tiếng Việt', 'English'],
    category: 'Thiết kế đồ họa',
    workingHours: 40,
    closingDate: '2024-07-01',
  };

  const employer = {
    name: 'Nguyễn Văn A',
    age: 35,
    reputation: 4.8,
    avatar: '',
  };

  const handleSubmit = (values: any) => {
    console.log('Thông tin ứng tuyển:', values);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Job Info */}
      <Card title="Thông tin công việc" className="rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-2">{jobInfo.title}</h2>
        <p className="text-gray-700 mb-4">{jobInfo.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p><span className="font-medium">Ngân sách:</span> ${jobInfo.budget}</p>
          <p><span className="font-medium">Ngày đăng:</span> {dayjs(jobInfo.postedDate).format('DD/MM/YYYY')}</p>
          <p><span className="font-medium">Ngành nghề:</span> {jobInfo.category}</p>
          <p><span className="font-medium">Thời gian làm việc:</span> {jobInfo.workingHours} giờ</p>
          <p><span className="font-medium">Ngày đóng tuyển:</span> {dayjs(jobInfo.closingDate).format('DD/MM/YYYY')}</p>
          <div>
            <span className="font-medium">Kỹ năng:</span>
            <div className="mt-1 space-x-1">
              {jobInfo.skills.map((skill) => (
                <Tag key={skill} color="blue">{skill}</Tag>
              ))}
            </div>
          </div>
          <div>
            <span className="font-medium">Ngôn ngữ:</span>
            <div className="mt-1 space-x-1">
              {jobInfo.languages.map((lang) => (
                <Tag key={lang} color="green">{lang}</Tag>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Employer Info */}
      <Card title="Thông tin nhà tuyển dụng" className="rounded-2xl shadow-md">
        <div className="flex items-center gap-4">
          <Avatar size={64} icon={<UserOutlined />} src={employer.avatar} />
          <div>
            <p className="text-lg font-medium">{employer.name}</p>
            <p className="text-sm text-gray-600">Tuổi: {employer.age}</p>
            <p className="text-sm text-gray-600">Điểm uy tín: {employer.reputation}</p>
          </div>
        </div>
      </Card>

      {/* Apply Form */}
      <Card title="Form ứng tuyển" className="rounded-2xl shadow-md">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Form.Item
            label="Nội dung ứng tuyển"
            name="coverLetter"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
            className="md:col-span-2"
          >
            <Input.TextArea rows={4} placeholder="Tôi đã có kinh nghiệm làm các dự án tương tự..." />
          </Form.Item>

          <Form.Item
            label="Giá đề xuất ($)"
            name="bidPrice"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <InputNumber
              className="w-full"
              min={1}
              placeholder="Nhập giá đề xuất"
            />
          </Form.Item>

          <Form.Item
            label="Thời gian hoàn thành (giờ)"
            name="estimatedHours"
            rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
          >
            <InputNumber
              className="w-full"
              min={1}
              placeholder="Số giờ bạn cần để hoàn thành"
            />
          </Form.Item>

          <Form.Item className="md:col-span-2">
            <Button type="primary" htmlType="submit" className="px-6">
              Gửi ứng tuyển
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ApplyJobPage;
