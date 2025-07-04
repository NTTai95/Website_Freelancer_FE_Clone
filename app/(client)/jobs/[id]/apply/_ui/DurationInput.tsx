import { Form, InputNumber, Typography, Space } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const MAX_HOURS = 365 * 24; // Giới hạn tối đa trong 1 năm

export default function DurationInput({ form }: { form: any }) {
    const [weeks, setWeeks] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);

    const totalDuration = Form.useWatch("estimatedHours", form) || 0;

    useEffect(() => {
        const total: number = Math.min(totalDuration, MAX_HOURS);
        const w = Math.floor(total / (7 * 24));
        const rem = total % (7 * 24);
        const d = Math.floor(rem / 24);
        const h = rem % 24;

        setWeeks(w);
        setDays(d);
        setHours(h);
    }, [totalDuration]);

    useEffect(() => {
        let h = hours;
        let d = days;
        let w = weeks;

        if (h >= 24) {
            d += Math.floor(h / 24);
            h = h % 24;
        }

        if (d >= 7) {
            w += Math.floor(d / 7);
            d = d % 7;
        }

        let total = w * 7 * 24 + d * 24 + h;

        if (total > MAX_HOURS) {
            total = MAX_HOURS;
            const nw = Math.floor(total / (7 * 24));
            const rem = total % (7 * 24);
            const nd = Math.floor(rem / 24);
            const nh = rem % 24;

            if (nw !== weeks) setWeeks(nw);
            if (nd !== days) setDays(nd);
            if (nh !== hours) setHours(nh);
        } else {
            if (h !== hours) setHours(h);
            if (d !== days) setDays(d);
            if (w !== weeks) setWeeks(w);
        }

        form.setFieldsValue({ duration: total });
    }, [weeks, days, hours]);

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
        >
            <Form.Item
                label={
                    <Title level={5} className="!mb-0 flex items-center !text-blue-700">
                        <ClockCircleOutlined className="!text-blue-600 !mr-2 !text-lg" />
                        Thời gian thực hiện
                    </Title>
                }
            >
                <Form.Item name={"estimatedHours"} noStyle hidden>
                    <InputNumber min={0} max={MAX_HOURS} />
                </Form.Item>

                <Space size="large" className="!mt-4">
                    {['weeks', 'days', 'hours'].map((unit, index) => {
                        const config: any = {
                            weeks: { label: 'Tuần', min: 0, max: 52, value: weeks, setter: setWeeks },
                            days: { label: 'Ngày', min: 0, max: 6, value: days, setter: setDays },
                            hours: { label: 'Giờ', min: 0, max: 23, value: hours, setter: setHours }
                        }[unit];

                        return (
                            <motion.div
                                key={unit}
                                whileHover={{ y: -3 }}
                                className="!p-3 !bg-blue-50 !rounded-lg !border !border-blue-100"
                            >
                                <Text className="!mr-2 !text-blue-700 !font-medium">{config.label}</Text>
                                <InputNumber
                                    min={config.min}
                                    max={config.max}
                                    value={config.value}
                                    onChange={(v) => config.setter(v || 0)}
                                    className="!rounded-lg !border-blue-200 hover:!border-blue-400 focus:!border-blue-500 !font-medium !text-blue-800"
                                    style={{ width: 90 }}
                                />
                            </motion.div>
                        );
                    })}

                    <div className="!p-3 !bg-blue-100 !rounded-lg !border !border-blue-200">
                        <Text className="!text-blue-800">
                            Tổng: <strong className="!text-blue-700">{(weeks * 7 * 24 + days * 24 + hours).toLocaleString()}</strong> giờ
                        </Text>
                    </div>
                </Space>
            </Form.Item>
        </motion.div>
    );
}
