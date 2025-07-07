"use client";
import { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, DatePicker, Tag, Typography, message, Alert, Upload, Skeleton } from 'antd';
import { UploadOutlined, FileTextOutlined, FlagOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;
const { TextArea } = Input;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const hoverEffect = {
  scale: 1.01,
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  transition: { duration: 0.3 }
};

export default function WorkSubmissionPage() {
    const [form] = Form.useForm();
    const [submissionStatus, setSubmissionStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
    const [submissionDate, setSubmissionDate] = useState<string>(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    const [fileList, setFileList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Simulate API call
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

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
                return <Tag color="green" className="!text-base !py-1 !px-3 !rounded-md">Đã chấp nhận</Tag>;
            case 'rejected':
                return <Tag color="red" className="!text-base !py-1 !px-3 !rounded-md">Đã từ chối</Tag>;
            default:
                return <Tag color="orange" className="!text-base !py-1 !px-3 !rounded-md">Đang xem xét</Tag>;
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

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto !px-4">
                <Skeleton active paragraph={{ rows: 10 }} />
            </div>
        );
    }

    return (
        <div className="mx-auto !py-8 !px-16">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <Card
                    className="!shadow-xl !rounded-xl !overflow-hidden !border-0"
                    headStyle={{ 
                        backgroundColor: '#1890ff', 
                        borderBottom: 'none',
                        borderTopLeftRadius: '12px',
                        borderTopRightRadius: '12px'
                    }}
                    title={
                        <div className="flex items-center">
                            <FileTextOutlined className="!mr-3 !text-white !text-xl" />
                            <Title level={3} className="!mb-0 !font-bold !text-xl !text-white">Nộp sản phẩm</Title>
                        </div>
                    }
                >
                    {/* Alert cảnh báo quan trọng */}
                    <motion.div whileHover={hoverEffect}>
                        <Alert
                            message={<span className="!text-base !font-bold">LƯU Ý QUAN TRỌNG</span>}
                            description="Mỗi sản phẩm chỉ được nộp DUY NHẤT 1 lần. Sau khi nộp, bạn sẽ không thể chỉnh sửa hoặc thay đổi thông tin. Vui lòng kiểm tra kỹ trước khi nhấn nút 'Nộp sản phẩm'."
                            type="warning"
                            showIcon
                            className="!mb-6 !rounded-lg !border-l-4 !border-yellow-500"
                        />
                    </motion.div>
                    
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        className="!space-y-6"
                    >
                        {/* Thông tin sản phẩm */}
                        <motion.div 
                            className="!p-5 !bg-white !rounded-xl !border !border-gray-100"
                            whileHover={hoverEffect}
                        >
                            <Title level={4} className="!font-bold !text-xl !mb-4 !text-blue-600">
                                <FlagOutlined className="!mr-2" /> Thông tin sản phẩm
                            </Title>

                            <Form.Item
                                name="productName"
                                label={<Text strong className="!text-base">Tên sản phẩm</Text>}
                                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                            >
                                <Input
                                    placeholder="Nhập tên sản phẩm"
                                    size="large"
                                    className="!rounded-lg !py-2 hover:!border-blue-500 focus:!border-blue-500 !shadow-sm"
                                />
                            </Form.Item>

                            <Form.Item
                                name="productDescription"
                                label={<Text strong className="!text-base">Mô tả sản phẩm</Text>}
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Mô tả chi tiết về sản phẩm của bạn..."
                                    className="!rounded-lg hover:!border-blue-500 focus:!border-blue-500 !shadow-sm"
                                />
                            </Form.Item>
                        </motion.div>

                        {/* Thông tin giai đoạn */}
                        <motion.div 
                            className="!p-5 !bg-gradient-to-r !from-blue-50 !to-blue-100 !rounded-xl !border !border-blue-200"
                            whileHover={hoverEffect}
                        >
                            <Title level={4} className="!font-bold !text-xl !mb-4 !text-blue-600">
                                <FlagOutlined className="!mr-2" /> Giai đoạn hiện tại
                            </Title>
                            <div className="space-y-4">
                                <div>
                                    <Text strong className="!block !mb-2 !text-base !text-blue-800">Tên giai đoạn:</Text>
                                    <Text className="!text-base !font-medium !text-blue-900">{selectedStage.name}</Text>
                                </div>
                                <div>
                                    <Text strong className="!block !mb-2 !text-base !text-blue-800">Mô tả giai đoạn:</Text>
                                    <div className="!p-3 !bg-white !rounded-lg !border !border-blue-200">
                                        <Text className="!text-base !text-gray-700 whitespace-pre-line">{selectedStage.description}</Text>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Upload sản phẩm */}
                        <motion.div 
                            className="!p-5 !bg-white !rounded-xl !border !border-gray-100"
                            whileHover={hoverEffect}
                        >
                            <Form.Item
                                label={<Text strong className="!text-base">Tải lên sản phẩm</Text>}
                                required
                            >
                                <Upload {...uploadProps} maxCount={1}>
                                    <motion.div whileHover={{ scale: 1.02 }}>
                                        <Button
                                            icon={<UploadOutlined />}
                                            size="large"
                                            className="!w-full !rounded-lg !border-dashed !border-2 !border-blue-300 !bg-blue-50 hover:!bg-blue-100 !text-blue-600 !h-14"
                                        >
                                            <span className="!font-medium">Chọn file</span>
                                        </Button>
                                    </motion.div>
                                </Upload>
                                <Text type="secondary" className="!mt-2 !block !text-sm">
                                    Chỉ được tải lên 1 file duy nhất (định dạng: .zip, .rar, .pdf, .docx, .xlsx)
                                </Text>
                            </Form.Item>
                        </motion.div>

                        {/* Thông tin xét duyệt */}
                        <motion.div 
                            className="!p-5 !bg-gradient-to-r !from-blue-50 !to-indigo-50 !rounded-xl !border !border-blue-200"
                            whileHover={hoverEffect}
                        >
                            <Title level={4} className="!font-bold !text-xl !mb-4 !text-blue-600">
                                <FlagOutlined className="!mr-2" /> Thông tin xét duyệt
                            </Title>

                            <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-4">
                                <div className='!my-3'>
                                    <Text strong className="!block !mb-1 !text-base !text-blue-800">Ngày nộp:</Text>
                                    <Text className="!text-base !font-medium !text-blue-900">
                                        {dayjs(submissionDate).format('DD/MM/YYYY HH:mm')}
                                    </Text>
                                </div>
                                <div className='!my-3'>
                                    <Text strong className="!block !mb-1 !text-base !text-blue-800">Trạng thái:</Text>
                                    {getStatusTag()}
                                </div>
                            </div>
                        </motion.div>

                        {/* Nút submit */}
                        <Form.Item className="!mt-8">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    type="primary" 
                                    htmlType="submit"
                                    size="large"
                                    className="!w-full !bg-gradient-to-r !from-blue-600 !to-indigo-600 hover:!from-blue-700 hover:!to-indigo-700 !rounded-lg !h-14 !font-bold !text-lg !border-0 !shadow-lg"
                                >
                                    Nộp sản phẩm
                                </Button>
                            </motion.div>
                        </Form.Item>
                    </Form>
                </Card>
            </motion.div>
        </div>
    );
}