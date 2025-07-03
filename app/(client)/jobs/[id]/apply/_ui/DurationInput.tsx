import { Form, InputNumber, Typography, Space } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

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
        <Form.Item
            label={
                <Title level={5} className="!mb-0 flex items-center">
                    <ClockCircleOutlined className="!mr-2" />
                    Thời gian thực hiện
                </Title>
            }
        >
            <Form.Item name={"estimatedHours"} noStyle hidden>
                <InputNumber min={0} max={MAX_HOURS} />
            </Form.Item>

            <Space size="large">
                <div>
                    <Text className="!mr-2">Tuần</Text>
                    <InputNumber
                        min={0}
                        value={weeks}
                        onChange={(v) => setWeeks(v || 0)}
                        style={{ width: 80 }}
                    />
                </div>
                <div>
                    <Text className="!mr-2">Ngày</Text>
                    <InputNumber
                        min={0}
                        max={6}
                        value={days}
                        onChange={(v) => setDays(v || 0)}
                        style={{ width: 80 }}
                    />
                </div>
                <div>
                    <Text className="!mr-2">Giờ</Text>
                    <InputNumber
                        min={0}
                        max={23}
                        value={hours}
                        onChange={(v) => setHours(v || 0)}
                        style={{ width: 80 }}
                    />
                </div>
                <div>
                    <Text>
                        Tổng: <strong>{(weeks * 7 * 24 + days * 24 + hours).toLocaleString()}</strong> giờ
                    </Text>
                </div>
            </Space>
        </Form.Item>
    );
}
