import { Alert, Button, Form, Space, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { InfoCircleOutlined, RobotOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title } = Typography;

const ApplicationForm = ({ handleFillApply }: { handleFillApply: () => void }) => {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <Title level={4} className="!mb-4 flex items-center !text-blue-700">
                <InfoCircleOutlined className="!text-blue-600 !mr-3 !text-xl" />
                Nội dung ứng tuyển
            </Title>

            <Alert
                message="Hãy mô tả chi tiết về cách bạn sẽ thực hiện dự án này, kinh nghiệm liên quan và lý do bạn phù hợp."
                className="!bg-blue-50 !text-blue-700 !mb-6 !rounded-lg !border !border-blue-200"
                icon={<InfoCircleOutlined className="!text-blue-500" />}
            />

            <Form.Item
                name="content"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung ứng tuyển' }, { min: 100, message: 'Nội dung ứng tuyển phải có ít nhất 100 ký tự' }, { max: 10000, message: 'Nội dung ứng tuyển không được quá 10000 ký tự' }]}
            >
                <TextArea
                    showCount
                    rows={10}
                    placeholder="Mô tả chi tiết..."
                    className="!rounded-xl !border-gray-300 hover:!border-blue-400 focus:!border-blue-500 !shadow-sm !transition-all !duration-300 !p-4"
                />
            </Form.Item>

            <Space align="center" size="middle" className="!mt-6">
                <Form.Item className="!mb-0">
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="!h-12 !px-8 !rounded-xl !bg-gradient-to-r !from-blue-600 !to-purple-600 hover:!from-blue-700 hover:!to-purple-700 !shadow-lg !font-medium !text-lg !border-0"
                        >
                            Nộp ứng tuyển
                        </Button>
                    </motion.div>
                </Form.Item>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        onClick={handleFillApply}
                        type="default"
                        className="!h-12 !px-8 !rounded-xl !bg-gradient-to-r !from-cyan-50 !to-blue-50 !text-blue-700 hover:!text-blue-800 hover:!from-cyan-100 hover:!to-blue-100 !border-blue-300 !shadow-md !font-medium !text-lg"
                        icon={<RobotOutlined />}
                    >
                        Hỗ trợ AI
                    </Button>
                </motion.div>
            </Space>
        </motion.div>
    );
};

export default ApplicationForm;
