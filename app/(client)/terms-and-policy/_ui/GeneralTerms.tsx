'use client';

import { Typography, Alert } from 'antd';
const { Title, Paragraph, Text } = Typography;

const GeneralTerms = () => {
    return (
        <section className="mb-10 px-4 md:px-8 lg:px-16" id="general-terms">
            <Typography>
                <Title level={2}>Điều khoản chung</Title>

                <Paragraph className="mt-4">
                    Các điều khoản và chính sách sử dụng dưới đây được thiết lập để đảm bảo quyền lợi và nghĩa vụ cho tất cả người dùng của nền tảng.
                    Bằng việc sử dụng dịch vụ, bạn đồng ý tuân thủ và chịu ràng buộc bởi các điều khoản này.
                </Paragraph>

                {/* Điều khoản 1 */}
                <div className="mt-6 space-y-2">
                    <Title level={4}>1. Hiệu lực và thay đổi điều khoản</Title>
                    <ul className="list-disc ml-6 text-gray-800 leading-relaxed">
                        <li>Chính sách và điều khoản này có hiệu lực ngay khi được đăng tải trên website.</li>
                        <li>Nền tảng có quyền cập nhật, điều chỉnh hoặc thay đổi nội dung chính sách bất kỳ lúc nào nhằm phù hợp với thay đổi về pháp luật, kỹ thuật hoặc định hướng vận hành.</li>
                        <li>Tất cả các thay đổi sẽ được thông báo rõ ràng trên hệ thống. Người dùng có trách nhiệm theo dõi và cập nhật thông tin chính sách mới nhất.</li>
                    </ul>
                </div>

                {/* Điều khoản 2 */}
                <div className="mt-6 space-y-2">
                    <Title level={4}>2. Ràng buộc pháp lý</Title>
                    <ul className="list-disc ml-6 text-gray-800 leading-relaxed">
                        <li>Việc bạn tiếp tục truy cập và sử dụng nền tảng sau khi có thay đổi trong điều khoản đồng nghĩa với việc bạn đồng ý và chấp nhận những thay đổi đó, bao gồm cả việc ràng buộc pháp lý liên quan đến các nghĩa vụ và quyền lợi của bạn.</li>
                        <li>Nếu bạn không đồng ý với bất kỳ điều khoản nào, bạn có quyền ngừng sử dụng nền tảng và yêu cầu chấm dứt tài khoản theo quy định tại mục 9.</li>
                    </ul>
                </div>

                {/* Điều khoản 3 */}
                <div className="mt-6 space-y-2">
                    <Title level={4}>3. Luật áp dụng</Title>
                    <ul className="list-disc ml-6 text-gray-800 leading-relaxed">
                        <li>Tất cả các điều khoản và chính sách được điều chỉnh và giải thích theo pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.</li>
                        <li>Trong trường hợp có tranh chấp không thể giải quyết qua thương lượng, vụ việc sẽ được chuyển đến cơ quan có thẩm quyền tại Việt Nam để xử lý.</li>
                    </ul>
                </div>

                {/* Điều khoản 4 */}
                <div className="mt-6 space-y-2">
                    <Title level={4}>4. Điều khoản tách biệt</Title>
                    <ul className="list-disc ml-6 text-gray-800 leading-relaxed">
                        <li>Nếu bất kỳ điều khoản nào trong văn bản này bị tuyên bố là không hợp lệ, vô hiệu hoặc không thể thực thi bởi một cơ quan có thẩm quyền, thì các điều khoản còn lại vẫn giữ nguyên hiệu lực và tiếp tục được áp dụng.</li>
                    </ul>
                </div>

                {/* Điều khoản 5 */}
                <div className="mt-6 space-y-2">
                    <Title level={4}>5. Toàn bộ thỏa thuận</Title>
                    <ul className="list-disc ml-6 text-gray-800 leading-relaxed">
                        <li>Văn bản chính sách và điều khoản này cấu thành toàn bộ thỏa thuận giữa nền tảng và người dùng, thay thế tất cả các thỏa thuận miệng hoặc văn bản trước đó (nếu có).</li>
                    </ul>
                </div>

                {/* Lưu ý */}
                <div className="mt-8">
                    <Alert
                        message="Lưu ý"
                        description={
                            <Paragraph className="mb-0">
                                Việc truy cập và sử dụng nền tảng đồng nghĩa với việc bạn đã đọc, hiểu và đồng ý với toàn bộ nội dung của Chính sách và Điều khoản sử dụng.
                                Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận hỗ trợ để được giải đáp.
                            </Paragraph>
                        }
                        type="info"
                        showIcon
                    />
                </div>
            </Typography>
        </section>
    );
};

export default GeneralTerms;
