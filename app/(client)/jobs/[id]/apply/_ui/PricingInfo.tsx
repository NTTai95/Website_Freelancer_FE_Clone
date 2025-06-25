import { Typography, Statistic, Card, InputNumber, Form } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title } = Typography;

const PricingInfo = () => {
    const [initialAmount, setInitialAmount] = useState<number>(0);
    const serviceFeePercentage = 2;
    const finalAmount = initialAmount * (1 - serviceFeePercentage / 100);

    return (
        <Card className="!border !border-solid !border-gray-200 !rounded-lg !shadow-sm !mb-6">
            <div className="p-4">
                <Title level={4} className="!mb-4 flex items-center !text-gray-800">
                    <DollarOutlined className="!text-blue-600 mr-2" />
                    Thông tin giá thầu
                </Title>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="!p-4 !bg-blue-50 !rounded-lg !border !border-blue-200">
                        <Form.Item label="Giá ban đầu" className="!mb-2">
                            <InputNumber
                                min={0}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                onChange={(value) => setInitialAmount(value || 0)}
                                className="!w-full"
                                size="large"
                            />
                        </Form.Item>
                        <div className="text-right text-blue-700 font-semibold">
                            {initialAmount.toLocaleString()} VNĐ
                        </div>
                    </div>

                    <Statistic
                        title="Phí dịch vụ"
                        value={serviceFeePercentage}
                        precision={1}
                        suffix="%"
                        className="!p-4 !bg-blue-50 !rounded-lg !border !border-blue-200"
                        valueStyle={{ color: '#1d4ed8' }}
                    />

                    <Statistic
                        title="Thực nhận"
                        value={finalAmount}
                        precision={0}
                        suffix="VNĐ"
                        className="!p-4 !bg-blue-50 !rounded-lg !border !border-blue-200"
                        valueStyle={{ color: '#1d4ed8' }}
                    />
                </div>
            </div>
        </Card>
    );
};
export default PricingInfo;