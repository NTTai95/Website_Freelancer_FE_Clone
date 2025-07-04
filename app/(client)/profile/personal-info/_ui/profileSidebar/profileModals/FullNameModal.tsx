import { Form, Input, Modal } from 'antd';
import { handleFullNameUpdate } from '../profileApiHandlers';
import { AppDispatch } from '@/store';

export default function FullNameModal({
    visible,
    onCancel,
    initialValue,
    dispatch,
    reloadData
}: {
    visible: boolean;
    onCancel: () => void;
    initialValue: string;
    dispatch: AppDispatch;
    reloadData: () => void;
}) {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
            .then(values =>
                handleFullNameUpdate(values.fullName, dispatch, reloadData)
            )
            .then(success => success && onCancel());
    };

    return (
        <Modal
            title="Cập nhật họ tên"
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Cập nhật"
            cancelText="Hủy"
            afterClose={() => form.resetFields()}
        >
            <Form
                form={form}
                initialValues={{ fullName: initialValue }}
            >
                <Form.Item
                    name="fullName"
                    rules={[
                        { required: true, message: "Vui lòng nhập họ tên" },
                        {
                            pattern: /^[A-Za-zÀ-ỹ\s]+$/u,
                            message: "Họ tên chỉ được chứa chữ cái và khoảng trắng",
                        },
                    ]}
                >
                    <Input placeholder="Nhập họ tên của bạn" />
                </Form.Item>
            </Form>
        </Modal>
    );
}