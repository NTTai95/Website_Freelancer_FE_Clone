import { Form, Input, Modal } from 'antd';
import { handleBioUpdate } from '../profileApiHandlers';
import { AppDispatch } from '@/store';

const { TextArea } = Input;

export default function BioModal({
    visible,
    onCancel,
    initialBio,
    dispatch,
    reloadData
}: {
    visible: boolean;
    onCancel: () => void;
    initialBio: string;
    dispatch: AppDispatch;
    reloadData: () => void;
}) {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
            .then(values =>
                handleBioUpdate(values.bio, dispatch, reloadData)
            )
            .then(success => success && onCancel());
    };

    return (
        <Modal
            title="Cập nhật giới thiệu"
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Cập nhật"
            cancelText="Hủy"
            afterClose={() => form.resetFields()}
        >
            <Form
                form={form}
                initialValues={{ bio: initialBio }}
            >
                <Form.Item
                    name="bio"
                    rules={[
                        { required: true, message: "Vui lòng nhập giới thiệu!" },
                        { max: 10000, message: 'Tối đa 10000 ký tự' }
                    ]}
                >
                    <TextArea rows={6} placeholder="Giới thiệu về bản thân" autoSize />
                </Form.Item>
            </Form>
        </Modal>
    );
}