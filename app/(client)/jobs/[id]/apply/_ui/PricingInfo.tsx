import { Typography, Statistic, Card, InputNumber, Form } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { useEffect, useState, useMemo } from 'react';
import { apiGet } from '@/api/baseApi';
import { motion } from 'framer-motion';

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
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
        >
            <Card className="!border-0 !rounded-xl !bg-gradient-to-br !from-blue-50 !to-purple-50 !shadow-md">
                <div className="!p-4">
                    <Title level={4} className="!mb-4 flex items-center !text-blue-700">
                        <DollarOutlined className="!text-blue-600 !mr-2 !text-xl" />
                        Thông tin giá thầu
                    </Title>

                    <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-4">
                        <motion.div
                            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                            className="!p-4 !bg-white !rounded-xl !border !border-blue-200 !shadow-sm"
                        >
                            <Form.Item
                                name="bidAmount"
                                label={<span className="!text-blue-700 !font-medium">Giá đề xuất</span>}
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
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    className="!w-full !h-12 !rounded-lg !border-blue-200 hover:!border-blue-400 focus:!border-blue-500 !font-medium !text-blue-800"
                                    size="large"
                                />
                            </Form.Item>
                            <div className="!text-right !text-blue-700 !font-semibold !text-lg">
                                {initialAmount.toLocaleString()} VNĐ
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                            className="!p-4 !bg-white !rounded-xl !border !border-blue-200 !shadow-sm"
                        >
                            <Statistic
                                title={<span className="!text-blue-700">Phí dịch vụ</span>}
                                value={serviceFee}
                                precision={1}
                                suffix="%"
                                valueStyle={{ color: '#4f46e5', fontSize: '1.5rem', fontWeight: 600 }}
                            />
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                            className="!p-4 !bg-white !rounded-xl !border !border-blue-200 !shadow-sm"
                        >
                            <Statistic
                                title={<span className="!text-blue-700">Thực nhận</span>}
                                value={finalAmount}
                                precision={0}
                                suffix="VNĐ"
                                valueStyle={{ color: '#7c3aed', fontSize: '1.5rem', fontWeight: 600 }}
                            />
                        </motion.div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default PricingInfo;