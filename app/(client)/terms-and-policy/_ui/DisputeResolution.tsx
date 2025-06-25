'use client';

import { Typography, Alert } from 'antd';
const { Title, Paragraph, Text } = Typography;

const DisputeResolution = () => {
    return (
        <section className="mb-10 px-4 md:px-8 lg:px-16" id="dispute-resolution">
            <Typography>
                <Title level={2}>Giải quyết tranh chấp</Title>

                {/* Giới thiệu */}
                <Paragraph className="ml-2">
                    Trong quá trình hợp tác giữa Freelancer và Nhà tuyển dụng, nếu xảy ra bất đồng hoặc tranh chấp, nền tảng sẽ hỗ trợ giải quyết dựa trên các nguyên tắc <Text strong>minh bạch, công bằng</Text> và <Text strong>dựa trên bằng chứng hợp lệ</Text>.
                </Paragraph>

                {/* 1. Quy trình giải quyết */}
                <Title level={4} className="mt-6">1. Quy trình giải quyết tranh chấp</Title>
                <ul className="list-disc ml-6 space-y-4 text-gray-800 leading-relaxed">

                    {/* Bước 1: Cung cấp bằng chứng */}
                    <li>
                        <Text strong>Cung cấp bằng chứng:</Text>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>Tin nhắn trao đổi trên nền tảng.</li>
                            <li>File công việc đã nộp hoặc nhận xét phản hồi.</li>
                            <li>Các tài liệu hoặc yêu cầu công việc đã đăng tải rõ ràng trên hệ thống.</li>
                        </ul>
                    </li>

                    {/* Bước 2: Xác minh và đánh giá */}
                    <li>
                        <Text strong>Xác minh và đánh giá:</Text>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>Nền tảng sẽ thu thập, đối chiếu và phân tích bằng chứng, thông tin giao dịch và tiến trình làm việc giữa hai bên.</li>
                            <li>Chỉ các thông tin và bằng chứng diễn ra trên hệ thống mới được công nhận hợp lệ.</li>
                            <li>
                                <Text type="danger">Các trao đổi qua kênh bên ngoài</Text> (như email, tin nhắn cá nhân, ứng dụng chat bên thứ ba…) sẽ <Text strong>không được chấp nhận</Text> trong quá trình giải quyết tranh chấp.
                            </li>
                        </ul>
                    </li>

                    {/* Bước 3: Ra quyết định */}
                    <li>
                        <Text strong>Ra quyết định:</Text>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>Nền tảng sẽ đưa ra quyết định cuối cùng về giải ngân, xử lý tài khoản vi phạm (nếu có) và thông báo cho cả hai bên.</li>
                            <li>
                                <Text strong>Quyết định của nền tảng là bắt buộc</Text> và có hiệu lực thi hành trong phạm vi hệ thống.
                            </li>
                        </ul>
                    </li>
                </ul>

                {/* 2. Giới hạn phạm vi */}
                <Title level={4} className="mt-8">2. Giới hạn phạm vi giải quyết</Title>
                <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-800 leading-relaxed">
                    <li>Chỉ áp dụng với công việc trong lĩnh vực công nghệ thông tin hoặc ngành nghề liên quan.</li>
                    <li>Các tranh chấp ngoài phạm vi chuyên môn hoặc dịch vụ của nền tảng sẽ không được tiếp nhận.</li>
                </ul>

                {/* 3. Cam kết công bằng */}
                <Title level={4} className="mt-8">3. Cam kết công bằng</Title>
                <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-800 leading-relaxed">
                    <li><Text strong>Trung lập</Text> – Không thiên vị.</li>
                    <li>Dựa trên <Text strong>bằng chứng cụ thể</Text>.</li>
                    <li><Text strong>Bảo vệ quyền lợi hợp pháp</Text> của cả hai bên.</li>
                </ul>

                {/* Lưu ý */}
                <div className="mt-8">
                    <Alert
                        message="Lưu ý"
                        description="Toàn bộ quy trình chỉ áp dụng trong khuôn khổ hệ thống. Các bên cần đảm bảo mọi trao đổi và nộp bằng chứng đều được thực hiện trực tiếp trên nền tảng."
                        type="info"
                        showIcon
                    />
                </div>
            </Typography>
        </section>
    );
};

export default DisputeResolution;
