import { Modal, Form, Input, DatePicker, Row, Col } from 'antd';
import ImageActionPanel from './ImageActionPanel';
import { Certification } from './types';

interface CertificationModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    loading: boolean;
    editingCert: Certification | null;
    form: any;
    frontImage?: string;
    backImage?: string;
    onImageChange: (file: File, isFront: boolean) => Promise<void>;
    onRemoveImage: (isFront: boolean) => void;
}

const CertificationModal = ({
    visible,
    onOk,
    onCancel,
    loading,
    editingCert,
    form,
    frontImage,
    backImage,
    onImageChange,
    onRemoveImage,
}: CertificationModalProps) => {
    return (
        <Modal
            title={editingCert ? "Chỉnh sửa chứng chỉ" : "Thêm chứng chỉ"}
            open={visible}
            onOk={onOk}
            onCancel={onCancel}
            confirmLoading={loading}
            okText={editingCert ? "Cập nhật" : "Thêm"}
            cancelText="Hủy"
            width={800}
        >
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Tên chứng chỉ"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên chứng chỉ' }]}
                        >
                            <Input placeholder="Tên chứng chỉ" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Tổ chức cấp"
                            name="issueBy"
                            rules={[{ required: true, message: 'Vui lòng nhập tổ chức cấp' }]}
                        >
                            <Input placeholder="Tổ chức cấp" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Ngày cấp"
                            name="issueDate"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày cấp' }]}
                        >
                            <DatePicker format="DD/MM/YYYY" className="!w-full" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Ngày hết hạn"
                            name="expiryDate"
                            dependencies={['issueDate']}
                            rules={[
                                {
                                    validator: (_, value) => {
                                        const issueDate = form.getFieldValue('issueDate');
                                        if (!value || !issueDate || value.isAfter(issueDate)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Ngày hết hạn phải sau ngày cấp'));
                                    },
                                },
                            ]}
                        >
                            <DatePicker format="DD/MM/YYYY" className="!w-full" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="Liên kết chứng chỉ"
                    name="link"
                >
                    <Input placeholder="https://example.com/certificate" />
                </Form.Item>

                <div className="font-medium mb-2">Hình ảnh chứng chỉ</div>
                <Row gutter={16}>
                    <Col span={12}>
                        <ImageActionPanel
                            imageUrl={frontImage}
                            onRemove={() => onRemoveImage(true)}
                            onChange={(file) => onImageChange(file, true)}
                            label="Mặt trước"
                        />
                    </Col>
                    <Col span={12}>
                        <ImageActionPanel
                            imageUrl={backImage}
                            onRemove={() => onRemoveImage(false)}
                            onChange={(file) => onImageChange(file, false)}
                            label="Mặt sau"
                        />
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default CertificationModal;