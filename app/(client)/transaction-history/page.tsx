"use client"

import { Table, Card, DatePicker, Select, Space, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

interface PaymentHistory {
    key: string;
    date: Date;
    amount: number;
    transactionId: string;
}

const PaymentHistoryPage = () => {
    const columns: ColumnsType<PaymentHistory> = [
        {
            title: 'STT',
            key: 'stt',
            render: (_, __, index) => index + 1,
            width: 70,
            align: 'center',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'date',
            key: 'date',
            render: (date: Date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
            sorter: (a, b) => a.date.getTime() - b.date.getTime(),
        },
        {
            title: 'Số tiền thay đổi',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => (
                <span className={`font-medium ${amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {amount > 0 ? '+' : ''}{amount.toLocaleString()} VNĐ
                </span>
            ),
            sorter: (a, b) => a.amount - b.amount,
        },
    ];

    // Sample data
    const data: PaymentHistory[] = [
        {
            key: '1',
            date: new Date('2023-05-15'),
            amount: 300000,
            transactionId: 'TXN12345',
        },
        {
            key: '2',
            date: new Date('2023-05-10'),
            amount: 500000,
            transactionId: 'TXN12346',
        },
        {
            key: '3',
            date: new Date('2023-05-05'),
            amount: -200000,
            transactionId: 'TXN12347',
        }, 
        {
            key: '4',
            date: new Date('2023-05-01'),
            amount: 400000,
            transactionId: 'TXN12348',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="shadow-sm rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <Title level={3} className="mb-4 md:mb-0">Lịch sử thanh toán</Title>
                    <Space size="middle" className="flex flex-col sm:flex-row">
                        <RangePicker
                            className="w-full sm:w-auto !my-4 !border-blue-500"
                            placeholder={['Từ ngày', 'Đến ngày']}
                            format="DD/MM/YYYY"
                        />
                    </Space>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: true }}
                    className="rounded-lg overflow-hidden"
                />
            </Card>
        </div>
    );
};

export default PaymentHistoryPage;