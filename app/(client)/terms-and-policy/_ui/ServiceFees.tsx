'use client';

import { Typography, Alert } from 'antd';
const { Title, Paragraph, Text } = Typography;

const ServiceFees = () => {
    return (
        <section className="mb-10 px-4 md:px-8 lg:px-16" id="price-service">
            <Typography>
                <Title level={2}>Phí dịch vụ</Title>

                <ul className="list-disc ml-8 space-y-3 text-gray-800 leading-relaxed">
                    <li>
                        Phí dịch vụ được áp dụng đối với <Text strong>Freelancer</Text>, và chỉ được khấu trừ khi Freelancer nhận được khoản thanh toán từ nhà tuyển dụng thông qua nền tảng.
                    </li>

                    <li>
                        Mức phí nền tảng thu là <Text strong>3%</Text> trên tổng số tiền mà Freelancer được chi trả trong mỗi lần giao dịch.
                    </li>

                    <li>
                        Khoản phí này sẽ được <Text strong>tự động khấu trừ</Text> trước khi hệ thống chuyển tiền vào tài khoản của Freelancer.
                    </li>

                    <li>
                        <Text strong>Ví dụ minh họa:</Text>
                        <ul className="list-disc ml-8 mt-2 space-y-2">
                            <li>
                                Nếu Freelancer nhận được <Text strong>10.000.000 VNĐ</Text> từ nhà tuyển dụng, nền tảng sẽ trừ <Text strong>3%</Text> (tương đương <Text strong>300.000 VNĐ</Text>), Freelancer thực nhận là <Text strong>9.700.000 VNĐ</Text>.
                            </li>
                        </ul>
                    </li>

                    <li>
                        Mức phí có thể được điều chỉnh trong tương lai và sẽ được thông báo công khai trên nền tảng ít nhất <Text strong>7 ngày</Text> trước khi áp dụng thay đổi.
                    </li>
                </ul>

                <div className="mt-6">
                    <Alert
                        message="Lưu ý"
                        description="Phí dịch vụ đã bao gồm toàn bộ chi phí vận hành nền tảng, bảo mật hệ thống và hỗ trợ xử lý tranh chấp."
                        type="info"
                        showIcon
                    />
                </div>
            </Typography>
        </section>
    );
};

export default ServiceFees;
