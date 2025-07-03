import { DatePicker, Form, Input, InputNumber, Modal, Row, Col, Divider } from "antd";
import { Education } from "./types";

interface EducationModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    loading: boolean;
    editingEdu: Education | null;
    form: any;
}

const EducationModal = ({ visible, onOk, onCancel, loading, editingEdu, form }: EducationModalProps) => {
    return (
        <Modal
            title={editingEdu ? "Chỉnh sửa học vấn" : "Thêm học vấn"}
            open={visible}
            onOk={onOk}
            onCancel={onCancel}
            confirmLoading={loading}
            okText={editingEdu ? "Cập nhật" : "Thêm"}
            cancelText="Hủy"
            width={800}
            style={{ top: 20 }}
            okButtonProps={{ className: "bg-blue-500 hover:bg-blue-600" }}
        >
            <Divider className="mt-0 mb-4" />
            <Form
                form={form}
                layout="vertical"
                className="px-1"
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="degree"
                            label="Bằng cấp"
                            rules={[{ required: true, message: 'Vui lòng nhập bằng cấp' }]}
                        >
                            <Input
                                placeholder="Ví dụ: Cử nhân Khoa học Máy tính"
                                className="py-2"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="schoolName"
                            label="Trường/Đại học"
                            rules={[{ required: true, message: 'Vui lòng nhập tên trường' }]}
                        >
                            <Input
                                placeholder="Ví dụ: Đại học Bách Khoa Hà Nội"
                                className="py-2"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="major"
                            label="Chuyên ngành"
                            rules={[{ required: true, message: 'Vui lòng nhập chuyên ngành' }]}
                        >
                            <Input
                                placeholder="Ví dụ: Công nghệ thông tin"
                                className="py-2"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="startDate"
                            label="Ngày bắt đầu"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
                        >
                            <DatePicker
                                format="DD/MM/YYYY"
                                placeholder="Chọn ngày"
                                className="w-full py-2"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="endDate"
                            label="Ngày kết thúc"
                            dependencies={['startDate']}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        const startDate = getFieldValue('startDate');
                                        if (!value || !startDate || value.isAfter(startDate)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Ngày kết thúc phải sau ngày bắt đầu'));
                                    },
                                }),
                            ]}
                        >
                            <DatePicker
                                format="DD/MM/YYYY"
                                placeholder="Chưa tốt nghiệp"
                                className="w-full py-2"
                                popupClassName="z-1050"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="gpa"
                            label="Điểm trung bình (GPA)"
                            rules={[
                                { type: 'number', min: 0, max: 10, message: 'GPA phải từ 0.00 đến 10.00' }
                            ]}
                        >
                            <InputNumber
                                min={0}
                                max={10}
                                step={0.01}
                                placeholder="0.00 - 10.00"
                                className="w-full"
                                formatter={(value: any) =>
                                    value !== undefined ? parseFloat(value).toFixed(2) : ''
                                }
                                parser={(value) => {
                                    const parsed = parseFloat((value || '').replace(/[^\d.]/g, ''));
                                    return isNaN(parsed) ? 0 : parseFloat(parsed.toFixed(2));
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Mô tả chi tiết"
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="Mô tả thành tích, dự án, nghiên cứu liên quan..."
                                style={{ resize: 'none' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default EducationModal;