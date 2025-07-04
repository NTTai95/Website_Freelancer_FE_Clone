import { Form, Input, Modal } from 'antd';
import { handlePhoneUpdate } from '../profileApiHandlers';
import { AppDispatch } from '@/store';

export default function PhoneModal({
    visible,
    onCancel,
    initialPhone,
    dispatch,
    reloadData
}: {
    visible: boolean;
    onCancel: () => void;
    initialPhone: string;
    dispatch: AppDispatch;
    reloadData: () => void;
}) {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
            .then(values =>
                handlePhoneUpdate(values.phone, dispatch, reloadData)
            )
            .then(success => success && onCancel());
    };

    return (
        <Modal
            title="Cập nhật số điện thoại"
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Cập nhật"
            cancelText="Hủy"
            afterClose={() => form.resetFields()}
        >
            <Form
                form={form}
                initialValues={{ phone: initialPhone }}
            >
                <Form.Item
                    name="phone"
                    rules={[
                        { required: true, message: "Vui lòng nhập số điện thoại" },
                        {
                            pattern: /^(0|\+84)(\d{9,10})$/,
                            message: "Số điện thoại không hợp lệ (VD: 0912345678 hoặc +84912345678)"
                        },
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại của bạn" />
                </Form.Item>
            </Form>
        </Modal>
    );
}