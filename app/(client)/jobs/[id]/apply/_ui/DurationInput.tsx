import { Input, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Props {
    days: number;
    onChange: (value: number) => void;
}

const DurationInput = ({ days, onChange }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        onChange(value);
    };

    return (
        <>
            <Title level={4} className="!mb-4 flex items-center">
                <ClockCircleOutlined className="!text-blue-600 !mr-3" />
                Thời gian thực hiện
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Input type="number" placeholder="Nhập số ngày" onChange={handleChange} value={days} suffix="ngày" className="!h-12 !rounded-lg" />
                <div className="bg-gray-100 p-4 rounded-lg">
                    <Text className="!text-gray-700 !text-lg">
                        Tương đương: <strong>{days * 24} giờ</strong> (GMT+7)
                    </Text>
                </div>
            </div>
        </>
    );
};

export default DurationInput;
