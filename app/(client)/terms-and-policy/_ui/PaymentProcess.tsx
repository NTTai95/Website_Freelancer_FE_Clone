'use client';

import { Typography, Alert } from 'antd';
const { Title, Paragraph, Text } = Typography;

const PaymentProcess = () => {
    return (
        <section className="mb-10 px-4 md:px-8 lg:px-16" id="payment-process">
            <Typography>
                <Title level={2}>Quy trình thanh toán</Title>

                {/* Step 1 */}
                <div className="mt-6">
                    <Text strong>Bước 1: Nhà tuyển dụng thanh toán trước</Text>
                    <ul className="list-disc ml-8 mt-2 space-y-1 text-gray-800 leading-relaxed">
                        <li>Trước khi bắt đầu dự án, nhà tuyển dụng cần chuyển khoản <Text strong>100% số tiền thỏa thuận</Text> cho hệ thống.</li>
                        <li>Khoản tiền này được nền tảng <Text strong>giữ tạm thời</Text> để đảm bảo an toàn cho cả hai bên.</li>
                    </ul>
                </div>

                {/* Step 2 */}
                <div className="mt-6">
                    <Text strong>Bước 2: Hệ thống giữ tiền trong quá trình làm việc</Text>
                    <ul className="list-disc ml-8 mt-2 space-y-1 text-gray-800 leading-relaxed">
                        <li>Số tiền <Text strong>không được giải ngân ngay</Text> khi Freelancer bắt đầu thực hiện công việc.</li>
                        <li>Tiền được giữ ở trạng thái “<Text italic>đang bảo lưu</Text>” để đảm bảo chi trả công bằng khi công việc hoàn thành đúng cam kết.</li>
                    </ul>
                </div>

                {/* Step 3 */}
                <div className="mt-6">
                    <Text strong>Bước 3: Hoàn tất công việc và thanh toán</Text>
                    <ul className="list-disc ml-8 mt-2 space-y-1 text-gray-800 leading-relaxed">
                        <li>Sau khi Freelancer hoàn thành công việc và hai bên xác nhận:</li>
                        <li>Hệ thống sẽ <Text strong>khấu trừ 3%</Text> phí dịch vụ từ số tiền thanh toán.</li>
                        <li>Phần còn lại được chuyển vào <Text strong>số dư tài khoản Freelancer</Text> trên nền tảng.</li>
                    </ul>
                </div>

                {/* Step 4 */}
                <div className="mt-6">
                    <Text strong>Bước 4: Giải quyết tranh chấp (nếu có)</Text>
                    <ul className="list-disc ml-8 mt-2 space-y-1 text-gray-800 leading-relaxed">
                        <li>Trong trường hợp phát sinh tranh chấp, hệ thống sẽ:</li>
                        <li>Yêu cầu hai bên cung cấp bằng chứng liên quan đến quá trình làm việc.</li>
                        <li>Đánh giá và đưa ra quyết định cuối cùng dựa trên nguyên tắc công bằng, trung lập.</li>
                        <li>Số tiền sẽ được hoàn trả cho bên không vi phạm hoặc chia theo tỷ lệ hợp lý nếu cả hai bên đều có trách nhiệm.</li>
                    </ul>
                </div>

                {/* Lưu ý */}
                <div className="mt-8">
                    <Alert
                        type="info"
                        message={<Text strong className="text-red-600">Lưu ý quan trọng</Text>}
                        description={
                            <div className="space-y-1 mt-2 text-sm text-gray-800">
                                <p>Nền tảng <Text strong>không sở hữu hoặc sử dụng</Text> số tiền của hai bên trong quá trình làm việc.</p>
                                <p>Chúng tôi chỉ <Text strong>giữ tạm thời</Text> khoản thanh toán nhằm đảm bảo giao dịch an toàn, tăng độ tin cậy và giảm rủi ro.</p>
                            </div>
                        }
                        showIcon
                    />
                </div>
            </Typography>
        </section>
    );
};

export default PaymentProcess;
