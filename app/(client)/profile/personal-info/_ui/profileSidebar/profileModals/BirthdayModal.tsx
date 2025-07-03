import { Form, DatePicker, Modal } from 'antd';
import { handleBirthdayUpdate } from '../profileApiHandlers';
import { AppDispatch } from '@/store';
import dayjs from 'dayjs';

export default function BirthdayModal({
    visible,
    onCancel,
    initialBirthday,
    dispatch,
    reloadData
}: {
    visible: boolean;
    onCancel: () => void;
    initialBirthday: string;
    dispatch: AppDispatch;
    reloadData: () => void;
}) {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
            .then(values =>
                handleBirthdayUpdate(values.birthday, dispatch, reloadData)
            )
            .then(success => success && onCancel());
    };

    return (
        <Modal
            title="Cập nhật ngày sinh"
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Cập nhật"
            cancelText="Hủy"
            afterClose={() => form.resetFields()}
        >
            <Form
                form={form}
                initialValues={{
                    birthday: initialBirthday
                        ? dayjs(initialBirthday, 'DD/MM/YYYY')
                        : null
                }}
            >
                <Form.Item
                    name="birthday"
                    rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
                >
                    <DatePicker format="DD/MM/YYYY" />
                </Form.Item>
            </Form>
        </Modal>
    );
}