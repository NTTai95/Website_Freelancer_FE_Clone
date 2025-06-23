'use client';

import React from 'react';
import { Typography, Table, Alert } from 'antd';

const { Title, Paragraph, Text } = Typography;

const ReputationSystem = () => {
    const violationData = [
        {
            key: '1',
            level: 'Cấp 1 – Nhẹ',
            impact: 'Vi phạm nhỏ, ảnh hưởng ít đến dự án',
            points: '-2 điểm',
        },
        {
            key: '2',
            level: 'Cấp 2 – Trung bình',
            impact: 'Chậm deadline không báo trước, không phản hồi tin nhắn',
            points: '-5 điểm',
        },
        {
            key: '3',
            level: 'Cấp 3 – Nặng',
            impact: 'Từ chối hoàn thành công việc không lý do, làm sai cam kết',
            points: '-10 điểm',
        },
        {
            key: '4',
            level: 'Cấp 4 – Nghiêm trọng',
            impact: 'Giao sai sản phẩm, gây thiệt hại cho nhà tuyển dụng',
            points: '-20 điểm',
        },
        {
            key: '5',
            level: 'Cấp 5 – Đặc biệt',
            impact: 'Gian lận, lừa đảo, vi phạm đạo đức nghề nghiệp',
            points: 'Trừ toàn bộ điểm uy tín',
        },
    ];

    const columns = [
        {
            title: 'Cấp độ vi phạm',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: 'Mức độ ảnh hưởng',
            dataIndex: 'impact',
            key: 'impact',
        },
        {
            title: 'Số điểm bị trừ',
            dataIndex: 'points',
            key: 'points',
        },
    ];

    return (
        <section className="mb-10 px-4 md:px-8 lg:px-16" id="reputation-system">
            <Typography>
                <Title level={2}>Hệ thống điểm uy tín</Title>

                <Paragraph>
                    Để đảm bảo chất lượng dịch vụ và xây dựng môi trường làm việc chuyên nghiệp, minh bạch trên nền tảng,
                    chúng tôi áp dụng hệ thống điểm uy tín cho các Freelancer. Hệ thống này giúp đánh giá và phản ánh mức độ tin cậy
                    cũng như hiệu quả công việc của Freelancer trong suốt quá trình làm việc.
                </Paragraph>

                {/* 1. Cấp độ vi phạm */}
                <Title level={4}>1. Cấp độ vi phạm và điểm trừ uy tín</Title>
                <Paragraph>
                    Nếu Freelancer vi phạm các quy định hoặc có hành vi không phù hợp, điểm uy tín sẽ bị trừ theo mức độ vi phạm như sau:
                </Paragraph>

                <Table
                    columns={columns}
                    dataSource={violationData}
                    pagination={false}
                    className="mt-4"
                    size="middle"
                />

                {/* 2. Cơ chế cộng và trừ điểm */}
                <Title level={4} className="mt-8">2. Cơ chế cộng và trừ điểm uy tín</Title>
                <ul className="list-disc ml-8 mt-2 text-gray-800 leading-relaxed space-y-2">
                    <li>
                        <Text strong>Cộng điểm uy tín:</Text> Người dùng có thể đánh giá lẫn nhau sau mỗi dự án. Mỗi đánh giá tích cực (trên thang 5 điểm)
                        tương ứng cộng <Text strong>+2 điểm uy tín</Text>.
                    </li>
                    <li>
                        <Text strong>Trừ điểm uy tín:</Text> Nếu Freelancer bị đánh dấu trễ hẹn trong từng giai đoạn dự án, sẽ bị trừ <Text strong>-1 điểm</Text> mỗi lần trễ.
                    </li>
                    <li>
                        Đánh giá xấu (điểm thấp) sẽ bị <Text strong>trừ 4 điểm</Text> uy tín.
                    </li>
                </ul>

                {/* 3. Ngưỡng điểm uy tín */}
                <Title level={4} className="mt-8">3. Ngưỡng điểm uy tín và khởi tạo</Title>
                <ul className="list-disc ml-8 mt-2 text-gray-800 leading-relaxed space-y-2">
                    <li>Điểm uy tín thấp nhất: <Text strong>0 điểm</Text> (không âm).</li>
                    <li>Mỗi người dùng bắt đầu với <Text strong>0 điểm uy tín</Text> khi đăng ký.</li>
                </ul>

                {/* 4. Lợi ích của điểm cao */}
                <Title level={4} className="mt-8">4. Lợi ích của điểm uy tín cao</Title>
                <ul className="list-disc ml-8 mt-2 text-gray-800 leading-relaxed space-y-2">
                    <li>Freelancer có điểm uy tín cao sẽ được ưu tiên trong kết quả tìm kiếm.</li>
                    <li>Được nền tảng ưu tiên hỗ trợ trong quá trình giải quyết tranh chấp.</li>
                </ul>

                <div className="mt-8">
                    <Alert
                        message="Lưu ý"
                        description="Hệ thống điểm uy tín được cập nhật định kỳ. Người dùng nên theo dõi và cải thiện điểm số để nâng cao khả năng tiếp cận công việc."
                        type="info"
                        showIcon
                    />
                </div>
            </Typography>
        </section>
    );
};

export default ReputationSystem;
