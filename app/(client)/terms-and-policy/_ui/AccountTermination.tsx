'use client';

import { Alert, Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;

const AccountTermination = () => {
    return (
        <section className="mb-10 px-4 md:px-8 lg:px-16" id="account-termination">
            <Typography>
                <Title level={2}>Chính sách xử lý tài khoản</Title>

                {/* Giới thiệu chung */}
                <Paragraph className="text-gray-800">
                    Nền tảng có quyền tạm ngừng hoặc chấm dứt tài khoản người dùng trong các trường hợp vi phạm chính sách, nhằm đảm bảo môi trường làm việc công bằng, minh bạch và chuyên nghiệp.
                </Paragraph>

                {/* Mục 1 */}
                <div className="mt-6">
                    <Title level={4}>1. Các trường hợp tạm ngừng hoặc chấm dứt tài khoản</Title>
                    <ul className="list-disc ml-8 mt-2 space-y-2 text-gray-800 leading-relaxed">
                        <li>
                            Người dùng có hành vi gian lận, cung cấp thông tin sai lệch, vi phạm điều khoản sử dụng sẽ bị <Text strong>khóa tài khoản vĩnh viễn</Text>.
                        </li>
                        <li>
                            Nếu có khiếu nại, tranh chấp hoặc dấu hiệu bất thường trong hành vi sử dụng, nền tảng có quyền <Text strong>tạm thời khóa tài khoản</Text> để điều tra và làm rõ sự việc.
                        </li>
                        <li>
                            Người dùng có thái độ không hợp tác, thiếu chuyên nghiệp, vi phạm nhiều lần dù đã được cảnh báo sẽ bị khóa tài khoản.
                        </li>
                        <li>
                            Hành vi lạm dụng hệ thống, sử dụng tài khoản cho mục đích xấu, hoặc gây ảnh hưởng đến uy tín của nền tảng cũng sẽ bị xử lý nghiêm.
                        </li>
                    </ul>
                </div>

                {/* Mục 2 */}
                <div className="mt-8">
                    <Title level={4}>2. Quy trình xử lý</Title>
                    <ul className="list-disc ml-8 mt-2 space-y-2 text-gray-800 leading-relaxed">
                        <li>
                            Mọi hành vi vi phạm trước khi khóa tài khoản đều sẽ được thông báo đến người dùng qua email hoặc hệ thống thông báo nội bộ.
                        </li>
                        <li>
                            Trường hợp khóa tài khoản tạm thời, người dùng có thể liên hệ với <Text strong>quản trị viên</Text> để làm rõ và cam kết tuân thủ chính sách nếu muốn mở lại tài khoản.
                        </li>
                        <li>
                            Người dùng phải <Text strong>ký cam kết</Text> tuân thủ nội quy và thể hiện thiện chí hợp tác thì mới được xem xét mở khóa tài khoản.
                        </li>
                    </ul>
                </div>

                {/* Mục 3 */}
                <div className="mt-8">
                    <Title level={4}>3. Trách nhiệm sau khi tài khoản bị chấm dứt</Title>
                    <ul className="list-disc ml-8 mt-2 space-y-2 text-gray-800 leading-relaxed">
                        <li>
                            Khi tài khoản bị chấm dứt, người dùng sẽ mất quyền truy cập toàn bộ hệ thống, bao gồm <Text strong>lịch sử giao dịch, thông tin liên lạc và số dư (nếu có)</Text>.
                        </li>
                        <li>
                            Nếu có khoản tiền đang được giữ, hệ thống sẽ <Text strong>giải quyết công bằng</Text> sau khi điều tra hoàn tất, dựa trên quy định và bằng chứng hợp lệ.
                        </li>
                    </ul>
                </div>
            </Typography>
            <div className="mt-8">
                <Alert
                    className="mt-8"
                    type="info"
                    message="Lưu ý"
                    description="Việc bị khóa tài khoản có thể ảnh hưởng đến uy tín và quyền lợi của người dùng. Vui lòng tuân thủ đúng quy định để tránh xử lý không mong muốn."
                    showIcon
                />
            </div>
        </section>
    );
};

export default AccountTermination;
