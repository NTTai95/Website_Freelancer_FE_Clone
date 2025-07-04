"use client";

import { useState } from 'react';
import { Card, Button, Modal, Form, Input, Select, Tag, Divider, Typography, Space, message, Steps } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, LinkOutlined, CalendarOutlined, FileTextOutlined, FlagOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Step } = Steps;

interface ProductSubmission {
    content: string;
    createdAt: string;
    status: 'pending' | 'approved' | 'rejected';
    description: string;
    productLink: string;
    rejectionReason?: string;
    stage: 'initial' | 'progress' | 'final'; // Thêm trường giai đoạn
}

const ProductReviewPage = () => {
    const [form] = Form.useForm();
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [submission, setSubmission] = useState<ProductSubmission>({
        content: 'Thiết kế logo công ty ABC theo yêu cầu',
        createdAt: '2023-05-15T10:30:00Z',
        status: 'pending',
        description: 'Logo được thiết kế với tông màu xanh dương chủ đạo, thể hiện sự chuyên nghiệp và đáng tin cậy. Phông chữ được lựa chọn kỹ lưỡng để phù hợp với ngành nghề kinh doanh.',
        productLink: 'https://drive.google.com/drive/folders/12345abcde',
        stage: 'progress' // Giá trị mặc định
    });

    const statusOptions: SelectProps['options'] = [
        {
            value: 'pending',
            label: 'Đang xem xét',
            icon: <ClockCircleOutlined />
        },
        {
            value: 'approved',
            label: 'Chấp nhận',
            icon: <CheckCircleOutlined />
        },
        {
            value: 'rejected',
            label: 'Từ chối',
            icon: <CloseCircleOutlined />
        }
    ];

    const handleStatusChange = (value: string) => {
        if (value === 'rejected') {
            setIsRejectModalVisible(true);
        } else {
            setSubmission({ ...submission, status: value as any });
            message.success(`Đã cập nhật trạng thái thành ${value === 'approved' ? 'Chấp nhận' : 'Đang xem xét'}`);
        }
    };

    const handleRejectConfirm = (values: { rejectionReason: string }) => {
        setSubmission({
            ...submission,
            status: 'rejected',
            rejectionReason: values.rejectionReason
        });
        setIsRejectModalVisible(false);
        message.warning('Đã từ chối sản phẩm');
    };

    const getStatusTag = () => {
        switch (submission.status) {
            case 'approved':
                return <Tag icon={<CheckCircleOutlined />} color="success" className="text-sm py-1 px-3">Đã chấp nhận</Tag>;
            case 'rejected':
                return <Tag icon={<CloseCircleOutlined />} color="error" className="text-sm py-1 px-3">Đã từ chối</Tag>;
            default:
                return <Tag icon={<ClockCircleOutlined />} color="processing" className="text-sm py-1 px-3">Đang xem xét</Tag>;
        }
    };

    const getStageLabel = (stage: string) => {
        switch (stage) {
            case 'initial': return 'Giai đoạn đầu';
            case 'progress': return 'Giai đoạn triển khai';
            case 'final': return 'Giai đoạn hoàn thiện';
            default: return stage;
        }
    };

    const getStageTag = (stage: string) => {
        switch (stage) {
            case 'initial':
                return <Tag icon={<FlagOutlined />} color="blue" className="text-sm py-1 px-3"></Tag>;
            case 'progress':
                return <Tag icon={<FlagOutlined />} color="orange" className="text-sm py-1 px-3"></Tag>;
            case 'final':
                return <Tag icon={<FlagOutlined />} color="green" className="text-sm py-1 px-3"></Tag>;
            default:
                return <Tag icon={<FlagOutlined />} color="default" className="text-sm py-1 px-3">{stage}</Tag>;
        }
    };

    const getCurrentStep = () => {
        switch (submission.stage) {
            case 'initial': return 0;
            case 'progress': return 1;
            case 'final': return 2;
            default: return 0;
        }
    };

    return (
        <div>
            <div className="max-h-full">
                <Card
                    title={<Title level={3} className="!mb-0 font-bold text-xl">Xét duyệt sản phẩm</Title>}
                    className="shadow-lg rounded-lg overflow-hidden"
                    headStyle={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #1b4775' }}
                >
                    {/* Phần Steps hiển thị tiến trình */}
                    <div className="!my-6">
                        <Steps current={getCurrentStep()} className="px-4">
                            <Step />
                            <Step />
                            <Step />
                        </Steps>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Thông tin sản phẩm */}
                        <Card
                            title={
                                <div className="flex items-center">
                                    <FileTextOutlined className="!mr-2 text-blue-500" />
                                    <span className="font-medium !text-xl">Thông tin sản phẩm</span>
                                </div>
                            }
                            className="lg:col-span-2 border-0 shadow-sm"
                        >
                            <div className="space-y-6">
                                <div className='!mb-5'>
                                    <Text strong className="block text-gray-600 !mb-1 !text-base">Tên sản phẩm</Text>
                                    <Text className="text-gray-800">{submission.content}</Text>
                                </div>

                                <div className='!mb-5'>
                                    <Text strong className="block text-gray-600 !mb-1 !text-base">Mô tả sản phẩm</Text>
                                    <Text className="text-gray-800 whitespace-pre-line">{submission.description}</Text>
                                </div>

                                <div>
                                    <Text strong className="block text-gray-600 !text-base !mb-1">Link sản phẩm</Text>
                                    <a
                                        href={submission.productLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline flex items-center"
                                    >
                                        <LinkOutlined className="mr-1" />
                                        {submission.productLink}
                                    </a>
                                </div>
                            </div>
                        </Card>

                        {/* Thông tin xét duyệt */}
                        <Card
                            title={
                                <div className="flex items-center">
                                    <CalendarOutlined className="!mr-2 text-blue-500" />
                                    <span className="font-medium !text-xl">Thông tin xét duyệt</span>
                                </div>
                            }
                            className="border-0 shadow-sm"
                        >
                            <div className="space-y-6">
                                <div className='!mb-5'>
                                    <Text strong className="block text-gray-600 !text-base !mb-1">Ngày nộp</Text>
                                    <Text className="text-gray-800">
                                        {new Date(submission.createdAt).toLocaleDateString('vi-VN', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </Text>
                                </div>

                                <div className='!mb-5'>
                                    <Text strong className="block text-gray-600 !text-base !mb-1">Giai đoạn hiện tại</Text>
                                    <div className="mt-1">{getStageTag(submission.stage)}</div>
                                </div>

                                <div className='!mb-5'>
                                    <Text strong className="block text-gray-600 !text-base !mb-1">Trạng thái hiện tại</Text>
                                    <div className="mt-1">{getStatusTag()}</div>
                                </div>

                                <Divider className="my-4" />

                                <div>
                                    <Text strong className="block text-gray-600 !mb-2 !text-base">Thay đổi trạng thái</Text>
                                    <Form form={form} layout="vertical">
                                        <Form.Item name="status" className="mb-0">
                                            <Select
                                                placeholder="Chọn trạng thái"
                                                options={statusOptions}
                                                onChange={handleStatusChange}
                                                value={submission.status}
                                                className="w-full"
                                            />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Card>
            </div>

            {/* Modal từ chối */}
            <Modal
                title={<span className="text-lg font-semibold">Lý do từ chối sản phẩm</span>}
                visible={isRejectModalVisible}
                onCancel={() => setIsRejectModalVisible(false)}
                footer={null}
                centered
                width={600}
            >
                <Form onFinish={handleRejectConfirm}>
                    <Form.Item
                        name="rejectionReason"
                        rules={[{ required: true, message: 'Vui lòng nhập lý do từ chối' }]}
                    >
                        <TextArea
                            rows={5}
                            placeholder="Nhập lý do từ chối sản phẩm này..."
                            className="mt-2 text-base"
                        />
                    </Form.Item>

                    <div className="flex justify-end space-x-3 mt-6">
                        <Button
                            onClick={() => setIsRejectModalVisible(false)}
                            className="px-6 h-10 !mr-2"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            danger
                            htmlType="submit"
                            className="px-6 h-10"
                        >
                            Xác nhận từ chối
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductReviewPage;