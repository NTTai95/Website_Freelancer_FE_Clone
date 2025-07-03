import { Form, Input, Modal } from 'antd';
import { handleEmailUpdate } from '../profileApiHandlers';
import { AppDispatch } from '@/store';

export default function EmailModal({
    visible,
    onCancel,
    initialEmail,
    dispatch,
    reloadData
}: {
    visible: boolean;
    onCancel: () => void;
    initialEmail: string;
    dispatch: AppDispatch;
    reloadData: () => void;
}) {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
            .then(values =>
                handleEmailUpdate(
                    values.email,
                    values.password,
                    dispatch,
                    reloadData
                )
            )
            .then(success => success && onCancel());
    };

    return (
        <Modal
            title="Cập nhật email"
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Cập nhật"
            cancelText="Hủy"
            afterClose={() => form.resetFields()}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{ email: initialEmail }}
            >
                <Form.Item
                    name="email"
                    label="Email mới"
                    rules={[
                        { required: true, message: "Vui lòng nhập email" },
                        { type: 'email', message: "Email không hợp lệ" },
                    ]}
                >
                    <Input placeholder="Nhập email mới" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu" },
                        { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                    ]}
                >
                    <Input.Password placeholder="Nhập mật khẩu để xác nhận" />
                </Form.Item>
            </Form>
        </Modal>
    );
}