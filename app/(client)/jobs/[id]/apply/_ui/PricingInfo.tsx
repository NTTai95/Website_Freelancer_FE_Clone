import { Typography, Statistic, Card, InputNumber, Form } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { useEffect, useState, useMemo } from 'react';
import { apiGet } from '@/api/baseApi';

const { Title } = Typography;

interface Props {
    form: any;
}

const PricingInfo = ({ form }: Props) => {
    const [serviceFee, setServiceFee] = useState<number>(0);

    const initialAmount: number = Form.useWatch("bidAmount", form) || 0;

    const finalAmount = useMemo(() => {
        return initialAmount * (1 - serviceFee / 100);
    }, [initialAmount, serviceFee]);

    useEffect(() => {
        apiGet("/service-fee")
            .then((res) => {
                const feeValue = Number(res?.data);
                if (!isNaN(feeValue)) {
                    setServiceFee(feeValue);
                }
            })
            .catch((err) => {
                console.error("Failed to fetch service fee:", err);
            });
    }, []);

    return (
        <Card className="!border !border-solid !border-gray-200 !rounded-lg !shadow-sm !mb-6">
            <div className="p-4">
                <Title level={4} className="!mb-4 flex items-center !text-gray-800">
                    <DollarOutlined className="!text-blue-600 mr-2" />
                    Thông tin giá thầu
                </Title>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="!p-4 !bg-blue-50 !rounded-lg !border !border-blue-200">
                        <Form.Item
                            name="bidAmount"
                            label="Giá đề xuất"
                            className="!mb-2"
                            rules={[
                                { required: true, message: 'Vui lòng nhập giá đề xuất' },
                                { type: 'number', message: 'Vui lòng chỉ nhập số!' },
                            ]}
                        >
                            <InputNumber
                                min={0}
                                max={100000000}
                                step={1000}
                                formatter={(value) =>
                                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }
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
                        value={serviceFee}
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