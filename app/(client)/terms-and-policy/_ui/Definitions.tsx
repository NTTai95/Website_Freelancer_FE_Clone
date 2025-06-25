'use client';

import { Typography, Alert } from 'antd';
const { Title, Paragraph, Text } = Typography;

const Definitions = () => {
    return (
        <section className="mb-10 px-4 md:px-8 lg:px-16" id="definition">
            <Typography>
                <Title level={2}>Định nghĩa</Title>

                {/* Freelancer */}
                <div id="definition-freelancer" className="mt-6 space-y-2">
                    <Title level={4}>Freelancer</Title>
                    <Paragraph className="ml-2">
                        Cá nhân đăng ký tài khoản để tìm kiếm và thực hiện công việc trên nền tảng.
                    </Paragraph>
                    <Text strong className="ml-2">Vai trò & Nhiệm vụ:</Text>
                    <ul className="list-disc ml-8 text-gray-800 leading-relaxed mt-2">
                        <li>Cập nhật đầy đủ thông tin hồ sơ cá nhân, kỹ năng và kinh nghiệm.</li>
                        <li>Ứng tuyển vào các công việc phù hợp.</li>
                        <li>Hoàn thành công việc đúng thời hạn, đúng yêu cầu của nhà tuyển dụng.</li>
                        <li>Giao tiếp rõ ràng và minh bạch trong suốt quá trình hợp tác.</li>
                        <li><Text strong>Tuân thủ quy tắc đạo đức nghề nghiệp và nội quy nền tảng.</Text></li>
                    </ul>
                </div>

                {/* Employer */}
                <div id="definition-employer" className="mt-6 space-y-2">
                    <Title level={4}>Nhà tuyển dụng</Title>
                    <Paragraph className="ml-2">
                        Cá nhân hoặc tổ chức đăng bài tuyển dụng công việc lên nền tảng để tìm kiếm Freelancer phù hợp.
                    </Paragraph>
                    <Text strong className="ml-2">Vai trò & Nhiệm vụ:</Text>
                    <ul className="list-disc ml-8 text-gray-800 leading-relaxed mt-2">
                        <li>Tạo bài đăng công việc rõ ràng, minh bạch về yêu cầu, thời gian và chi phí.</li>
                        <li>Lựa chọn Freelancer phù hợp dựa trên hồ sơ, đánh giá và kỹ năng.</li>
                        <li>Cung cấp thông tin, tài liệu liên quan đến công việc đúng hạn.</li>
                        <li>Xác nhận từng giai đoạn công việc để giải ngân đúng tiến độ.</li>
                        <li><Text strong>Đánh giá Freelancer sau mỗi dự án để đảm bảo tính minh bạch cộng đồng.</Text></li>
                    </ul>
                </div>

                {/* Platform */}
                <div id="definition-platform" className="mt-6 space-y-2">
                    <Title level={4}>Nền tảng (Hệ thống)</Title>
                    <Paragraph className="ml-2">
                        Dịch vụ trung gian kỹ thuật và vận hành, kết nối nhà tuyển dụng và Freelancer.
                    </Paragraph>
                    <Text strong className="ml-2">Vai trò & Nhiệm vụ:</Text>
                    <ul className="list-disc ml-8 text-gray-800 leading-relaxed mt-2">
                        <li>Cung cấp hạ tầng công nghệ để hỗ trợ kết nối, tuyển chọn và làm việc.</li>
                        <li>Nhận và giữ tạm thời khoản thanh toán từ nhà tuyển dụng.</li>
                        <li>Thực hiện giải ngân đúng theo tiến độ đã cam kết giữa các bên.</li>
                        <li>Giám sát hoạt động của người dùng để ngăn ngừa hành vi vi phạm.</li>
                        <li>Can thiệp và xử lý các tranh chấp một cách công bằng, khách quan.</li>
                        <li><Text strong>Quản lý hệ thống điểm uy tín và kiểm soát chất lượng cộng đồng.</Text></li>
                    </ul>
                </div>

                {/* Lưu ý */}
                <div className="mt-8">
                    <Alert
                        message="Lưu ý"
                        description="Các định nghĩa trong phần này là cơ sở để hiểu đúng các điều khoản chính sách khác. Nếu có sự khác biệt trong cách hiểu, định nghĩa tại đây sẽ được ưu tiên."
                        type="info"
                        showIcon
                    />
                </div>
            </Typography>
        </section>
    );
};

export default Definitions;
