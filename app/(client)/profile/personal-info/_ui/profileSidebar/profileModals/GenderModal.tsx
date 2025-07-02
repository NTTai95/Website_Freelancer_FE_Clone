import { Form, Select, Modal } from 'antd';
import { handleGenderUpdate } from '../profileApiHandlers';
import { AppDispatch } from '@/store';

const { Option } = Select;

export default function GenderModal({
    visible,
    onCancel,
    initialGender,
    dispatch,
    reloadData
}: {
    visible: boolean;
    onCancel: () => void;
    initialGender: boolean;
    dispatch: AppDispatch;
    reloadData: () => void;
}) {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
            .then(values =>
                handleGenderUpdate(values.isMale, dispatch, reloadData)
            )
            .then(success => success && onCancel());
    };

    return (
        <Modal
            title="Cập nhật giới tính"
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Cập nhật"
            cancelText="Hủy"
            afterClose={() => form.resetFields()}
        >
            <Form
                form={form}
                initialValues={{ isMale: initialGender }}
            >
                <Form.Item
                    name="isMale"
                    rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                >
                    <Select placeholder="Chọn giới tính">
                        <Option value={true}>Nam</Option>
                        <Option value={false}>Nữ</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}