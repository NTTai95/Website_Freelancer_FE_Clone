'use client';

import React from 'react';
import { Typography, Alert } from 'antd';

const { Title, Paragraph, Text } = Typography;

const RightsAndObligations = () => {
    return (
        <section className="mb-10 px-4 md:px-8 lg:px-16" id="right-and-obligation">
            <Typography>
                <Title level={2}>Quyền và Nghĩa vụ của Người dùng</Title>

                <Paragraph className="ml-2">
                    Mỗi người dùng khi tham gia và sử dụng nền tảng (bao gồm Freelancer và Nhà tuyển dụng) cần tuân thủ các quy định sau để đảm bảo môi trường làm việc chuyên nghiệp, minh bạch và công bằng.
                </Paragraph>

                {/* Freelancer */}
                <div className="mt-6">
                    <Title level={4}>1. Đối với Freelancer</Title>

                    <Text strong className="ml-2">Quyền lợi:</Text>
                    <ul className="list-disc ml-8 mt-2 space-y-1 text-gray-800 leading-relaxed">
                        <li>Được ứng tuyển và thực hiện các công việc đã được đăng tải công khai trên nền tảng.</li>
                        <li>Được nhận thanh toán đúng theo tiến độ và thỏa thuận sau khi hoàn thành công việc.</li>
                        <li>Được hỗ trợ giải quyết tranh chấp một cách công bằng và bảo mật thông tin cá nhân.</li>
                    </ul>

                    <Text strong className="ml-2 mt-4 block">Nghĩa vụ:</Text>
                    <ul className="list-disc ml-8 mt-2 space-y-1 text-gray-800 leading-relaxed">
                        <li>Cung cấp thông tin cá nhân trung thực và đầy đủ (họ tên, số điện thoại, kỹ năng, kinh nghiệm...)</li>
                        <li>Cam kết thực hiện công việc đúng tiến độ, đúng chất lượng như đã thỏa thuận.</li>
                        <li><Text strong>Không được yêu cầu thanh toán bên ngoài nền tảng</Text> nhằm tránh rủi ro, gian lận hoặc vi phạm chính sách.</li>
                        <li>Tôn trọng và giao tiếp chuyên nghiệp với nhà tuyển dụng.</li>
                        <li>Tuân thủ sự quản lý của hệ thống nếu xảy ra tranh chấp liên quan đến dự án.</li>
                    </ul>
                </div>

                {/* Nhà tuyển dụng */}
                <div className="mt-6">
                    <Title level={4}>2. Đối với Nhà tuyển dụng</Title>

                    <Text strong className="ml-2">Quyền lợi:</Text>
                    <ul className="list-disc ml-8 mt-2 space-y-1 text-gray-800 leading-relaxed">
                        <li>Được đăng tuyển các dự án hợp pháp trong lĩnh vực CNTT hoặc liên quan.</li>
                        <li>Được chọn lọc Freelancer phù hợp với yêu cầu công việc.</li>
                        <li>Được quyền phản hồi, đánh giá kết quả làm việc của Freelancer.</li>
                        <li>Được hỗ trợ bảo vệ quyền lợi và xử lý tranh chấp nếu có phát sinh.</li>
                    </ul>

                    <Text strong className="ml-2 mt-4 block">Nghĩa vụ:</Text>
                    <ul className="list-disc ml-8 mt-2 space-y-1 text-gray-800 leading-relaxed">
                        <li><Text strong>Thanh toán đầy đủ và đúng hạn</Text> cho dự án trước khi Freelancer bắt đầu làm việc.</li>
                        <li>Đánh giá trung thực, công bằng sau mỗi giai đoạn.</li>
                        <li>Không ép buộc Freelancer làm ngoài phạm vi mô tả nếu chưa có thỏa thuận mới rõ ràng.</li>
                        <li>Cung cấp thông tin cá nhân đúng sự thật khi đăng ký tài khoản.</li>
                        <li>Tôn trọng Freelancer, giao tiếp văn minh và minh bạch.</li>
                    </ul>
                </div>

                {/* Cam kết chung */}
                <div className="mt-6">
                    <Title level={4}>3. Cam kết chung</Title>
                    <ul className="list-disc ml-8 mt-2 space-y-1 text-gray-800 leading-relaxed">
                        <li>Hai bên phải tôn trọng lẫn nhau và tuân thủ nội quy của nền tảng.</li>
                        <li>Mọi tranh chấp phát sinh sẽ được nền tảng đứng ra xử lý, <Text strong>quyết định của nền tảng là cuối cùng và có hiệu lực thi hành.</Text></li>
                        <li>Việc sử dụng nền tảng đồng nghĩa với việc đồng ý tuân thủ tất cả chính sách và điều khoản đã công bố.</li>
                    </ul>
                </div>

                {/* Lưu ý */}
                <div className="mt-8">
                    <Alert
                        message="Lưu ý"
                        description="Hệ thống có quyền điều chỉnh, bổ sung nội dung chính sách và nghĩa vụ nếu phát sinh yêu cầu vận hành thực tế."
                        type="info"
                        showIcon
                    />
                </div>
            </Typography>
        </section>
    );
};

export default RightsAndObligations;
