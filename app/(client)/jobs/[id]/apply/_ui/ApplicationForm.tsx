import { Alert, Button, Form, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Props {
    onCancel: () => void;
    onFinish: () => void;
    form: any;
}

const ApplicationForm = ({ onCancel, onFinish, form }: Props) => (
    <Form form={form} layout="vertical" onFinish={onFinish}>
        <Title level={4} className="!mb-4 flex items-center">
            <InfoCircleOutlined className="!text-blue-600 !mr-3" />
            Nội dung ứng tuyển
        </Title>

        <Alert
            message="Hãy mô tả chi tiết về cách bạn sẽ thực hiện dự án này, kinh nghiệm liên quan và lý do bạn phù hợp."
            className="!bg-gray-300 !mb-6 !rounded-lg"
            showIcon
        />

        <Form.Item
            name="applicationContent"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung ứng tuyển' }]}
        >
            <TextArea rows={6} placeholder="Mô tả chi tiết..." className="!rounded-lg !border-gray-300 hover:!border-blue-500 focus:!border-blue-500 !shadow-sm" />
        </Form.Item>

        <div className="flex flex-col sm:flex-row justify-end gap-3 !my-6">
            <Button onClick={onCancel} className="!h-11 !px-6 !rounded-lg !border-gray-300 !text-gray-700 hover:!bg-gray-50">
                Hủy bỏ
            </Button>
            <Button type="primary" htmlType="submit" className="!h-11 !px-6 !rounded-lg !bg-blue-800 hover:!bg-blue-400 !shadow-md">
                Ứng tuyển
            </Button>
        </div>
    </Form>
);

export default ApplicationForm;
