"use client";
import { useState } from 'react';
import { Card, Form, Input, Select, Button, DatePicker, Tag, Typography, message, Alert, Upload } from 'antd';
import { UploadOutlined, FileTextOutlined, FlagOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function WorkSubmissionPage() {
    const [form] = Form.useForm();
    const [submissionStatus, setSubmissionStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
    const [submissionDate, setSubmissionDate] = useState<string>(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    const [fileList, setFileList] = useState<any[]>([]);

    
    // Giả lập dữ liệu giai đoạn đã chọn từ trang trước
    const selectedStage = {
        id: 2,
        name: "Giai đoạn 2: Thiết kế chi tiết",
        description: `Giai đoạn thiết kế chi tiết là bước quan trọng trong quá trình phát triển sản phẩm. Ở giai đoạn này, freelancer sẽ tập trung vào việc phát triển các chi tiết cụ thể của sản phẩm dựa trên bản thảo ban đầu đã được phê duyệt.

        Các công việc chính trong giai đoạn này bao gồm:
        - Thiết kế giao diện chi tiết
        - Xây dựng các chức năng cốt lõi
        - Tối ưu hóa trải nghiệm người dùng
        - Đảm bảo tính thẩm mỹ và nhất quán trong thiết kế
        
        Yêu cầu đối với sản phẩm nộp lên:
        - File thiết kế đầy đủ các màn hình/chức năng
        - Tài liệu mô tả chi tiết thiết kế
        - Báo cáo tiến độ công việc
        
        Lưu ý quan trọng:
        - Sản phẩm phải đáp ứng đúng yêu cầu đã thống nhất
        - Đảm bảo chất lượng và tính thống nhất
        - Tuân thủ các quy chuẩn thiết kế đã đề ra
        
        Thời gian hoàn thành dự kiến: 10-14 ngày làm việc.`
    };

    const onFinish = (values: any) => {
        if (fileList.length === 0) {
            message.error('Vui lòng tải lên file sản phẩm');
            return;
        }
        console.log('Submitted values:', values);
        message.success('Sản phẩm đã được nộp thành công!');
        setSubmissionStatus('pending');
        setSubmissionDate(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    };

    const getStatusTag = () => {
        switch (submissionStatus) {
            case 'approved':
                return <Tag color="green">Đã chấp nhận</Tag>;
            case 'rejected':
                return <Tag color="red">Đã từ chối</Tag>;
            default:
                return <Tag color="orange">Đang xem xét</Tag>;
        }
    };

    const uploadProps = {
        onRemove: (file: any) => {
            setFileList([]);
        },
        beforeUpload: (file: any) => {
            setFileList([file]);
            return false;
        },
        fileList,
    };

    return (
        <div className="">
            <div className="max-w mx-auto !px-5">
                <Card
                    className="shadow-lg rounded-lg overflow-hidden border-0"
                    headStyle={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}
                    title={
                        <div className="flex items-center">
                            <FileTextOutlined className="!mr-2 text-blue-500" />
                            <Title level={3} className="!mb-0 font-bold !text-xl">Nộp sản phẩm</Title>
                        </div>
                    }
                >
                    {/* Alert cảnh báo quan trọng */}
                    <Alert
                        message="LƯU Ý QUAN TRỌNG"
                        description="Mỗi sản phẩm chỉ được nộp DUY NHẤT 1 lần. Sau khi nộp, bạn sẽ không thể chỉnh sửa hoặc thay đổi thông tin. Vui lòng kiểm tra kỹ trước khi nhấn nút 'Nộp sản phẩm'."
                        type="warning"
                        showIcon
                        className="!mb-6 !text-base"
                    />
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        className="space-y-6"
                    >
                        {/* Thông tin sản phẩm */}
                        <div>
                            <Title level={4} className="font-bold !text-xl mb-4">Thông tin sản phẩm</Title>

                            <Form.Item
                                name="productName"
                                label={<Text strong>Tên sản phẩm</Text>}
                                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                                className="text-base"
                            >
                                <Input
                                    placeholder="Nhập tên sản phẩm"
                                    size="large"
                                    className="rounded-md"
                                />
                            </Form.Item>

                            <Form.Item
                                name="productDescription"
                                label={<Text strong>Mô tả sản phẩm</Text>}
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}
                                className="text-base"
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Mô tả chi tiết về sản phẩm của bạn..."
                                    className="rounded-md"
                                />
                            </Form.Item>
                        </div>

                        {/* Thông tin giai đoạn */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <Title level={4} className="font-bold !text-xl mb-4">Giai đoạn hiện tại</Title>
                            <div className="space-y-4">
                                <div>
                                    <Text strong className="block !mb-2 !text-base">Tên giai đoạn:</Text>
                                    <Text className="!text-base">{selectedStage.name}</Text>
                                </div>
                                <div>
                                    <Text strong className="block !mb-2 !text-base">Mô tả giai đoạn:</Text>
                                    <Text className="!text-base whitespace-pre-line">{selectedStage.description}</Text>
                                </div>
                            </div>
                        </div>

                        {/* Upload sản phẩm */}
                        <Form.Item
                            label={<Text strong>Tải lên sản phẩm</Text>}
                            required
                            className="text-base"
                        >
                            <Upload {...uploadProps} maxCount={1}>
                                <Button
                                    icon={<UploadOutlined />}
                                    size="large"
                                    className="w-full rounded-md"
                                >
                                    Chọn file
                                </Button>
                            </Upload>
                            <Text type="secondary" className="!mt-2 block">
                                Chỉ được tải lên 1 file duy nhất (định dạng: .zip, .rar, .pdf, .docx, .xlsx)
                            </Text>
                        </Form.Item>

                        {/* Thông tin xét duyệt */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <Title level={4} className="font-bold !text-xl mb-4">Thông tin xét duyệt</Title>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className='!my-3'>
                                    <Text strong className="block !mb-1">Ngày nộp:</Text>
                                    <Text>{dayjs(submissionDate).format('DD/MM/YYYY HH:mm')}</Text>
                                </div>
                                <div className='!my-3'>
                                    <Text strong className="block !mb-1 !text-base">Trạng thái:</Text>
                                    {getStatusTag()}
                                </div>
                            </div>
                        </div>

                        {/* Nút submit */}
                        <Form.Item className="mt-8">
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="!mt-5 w-full bg-blue-600 hover:bg-blue-700 rounded-md h-12 font-medium"
                            >
                                Nộp sản phẩm
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
}