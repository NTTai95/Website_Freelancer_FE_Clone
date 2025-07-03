import { Alert, Button, Form, Space, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ApplicationForm = ({ handleFillApply }: { handleFillApply: () => void }) => (
    <>
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
            name="content"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung ứng tuyển' }, { min: 100, message: 'Nội dung ứng tuyển phải có ít nhất 100 ký tự' }, { max: 10000, message: 'Nội dung ứng tuyển không được quá 10000 ký tự' }]}
        >
            <TextArea showCount rows={10} placeholder="Mô tả chi tiết..." className="!rounded-lg !border-gray-300 hover:!border-blue-500 focus:!border-blue-500 !shadow-sm" />
        </Form.Item>

        <Space align="center" size="middle" className="mt-4">
            <Form.Item className="!mb-0">
                <Button
                    type="primary"
                    htmlType="submit"
                    className="!h-11 !px-6 !rounded-lg !bg-blue-800 hover:!bg-blue-600 !shadow-md"
                >
                    Nộp ứng tuyển
                </Button>
            </Form.Item>

            <Button
                onClick={handleFillApply}
                type="default"
                className="!h-11 !px-6 !rounded-lg !bg-gray-100 !text-blue-800 hover:!bg-blue-50 !border-blue-800 !shadow-md"
            >
                Hỗ trợ AI
            </Button>
        </Space>
    </>
);

export default ApplicationForm;
