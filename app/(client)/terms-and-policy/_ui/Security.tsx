'use client';

import { Typography, Alert } from 'antd';
const { Title, Paragraph, Text } = Typography;

const Security = () => {
    return (
        <section className="mb-10 px-4 md:px-8 lg:px-16" id="security">
            <Typography>
                <Title level={2}>Quy định bảo mật</Title>

                {/* Giới thiệu */}
                <Paragraph>
                    Nền tảng cam kết tuân thủ nghiêm ngặt các quy định về bảo mật thông tin, nhằm đảm bảo an toàn tuyệt đối cho người dùng trong suốt quá trình sử dụng dịch vụ.
                </Paragraph>

                {/* 1. Bảo mật thông tin cá nhân */}
                <div className="mt-6 space-y-2">
                    <Title level={4}>1. Bảo mật thông tin cá nhân</Title>
                    <ul className="list-disc ml-6 text-gray-800 leading-relaxed">
                        <li>
                            Mọi thông tin cá nhân do người dùng cung cấp (bao gồm họ tên, số điện thoại, email, tài khoản ngân hàng, v.v.) đều được lưu trữ và bảo mật tuyệt đối.
                        </li>
                        <li>
                            Không chia sẻ, trao đổi hay cung cấp thông tin người dùng cho bên thứ ba dưới bất kỳ hình thức nào nếu không có sự đồng ý rõ ràng bằng văn bản hoặc thông báo chính thức từ chính chủ sở hữu.
                        </li>
                    </ul>
                </div>

                {/* 2. Bảo mật tài chính và giao dịch */}
                <div className="mt-6 space-y-2">
                    <Title level={4}>2. Bảo mật tài chính và giao dịch</Title>
                    <ul className="list-disc ml-6 text-gray-800 leading-relaxed">
                        <li>
                            Tất cả các giao dịch tài chính giữa Nhà tuyển dụng và Freelancer đều được mã hóa và bảo vệ an toàn thông qua hệ thống.
                        </li>
                        <li>
                            Mọi thông tin liên quan đến tài khoản thanh toán, số dư, lịch sử giao dịch chỉ hiển thị cho chính chủ tài khoản và không tiết lộ cho bất kỳ bên nào khác, trừ khi có yêu cầu pháp lý chính thức hoặc sự cho phép của người dùng.
                        </li>
                    </ul>
                </div>

                {/* 3. Bảo mật sản phẩm và nội dung công việc */}
                <div className="mt-6 space-y-2">
                    <Title level={4}>3. Bảo mật sản phẩm và nội dung công việc</Title>
                    <ul className="list-disc ml-6 text-gray-800 leading-relaxed">
                        <li>
                            Các sản phẩm, tài liệu, bản thiết kế, mã nguồn, hoặc bất kỳ nội dung nào được Freelancer gửi cho Nhà tuyển dụng (hoặc ngược lại) thông qua nền tảng đều được bảo mật hoàn toàn.
                        </li>
                        <li>
                            Nền tảng chỉ lưu trữ dữ liệu cho mục đích phục vụ công việc và tranh chấp (nếu có), tuyệt đối không sử dụng, sao chép hay phát tán nội dung đó dưới bất kỳ hình thức nào.
                        </li>
                    </ul>
                </div>

                {/* 4. Cam kết của hệ thống */}
                <div className="mt-6 space-y-2">
                    <Title level={4}>4. Cam kết của hệ thống</Title>
                    <ul className="list-disc ml-6 text-gray-800 leading-relaxed">
                        <li>
                            Nền tảng sử dụng các công nghệ mã hóa hiện đại, tường lửa và hệ thống bảo vệ nhiều lớp để ngăn chặn truy cập trái phép và đảm bảo dữ liệu luôn được an toàn.
                        </li>
                        <li>
                            <Text strong>Mọi hành vi xâm nhập trái phép, khai thác hoặc làm rò rỉ dữ liệu người dùng sẽ bị xử lý nghiêm theo quy định của pháp luật.</Text>
                        </li>
                    </ul>
                </div>

                {/* Lưu ý (nếu có) */}
                <div className="mt-8">
                    <Alert
                        message="Lưu ý"
                        description="Người dùng nên thay đổi mật khẩu định kỳ và không chia sẻ thông tin đăng nhập cho bất kỳ ai để đảm bảo an toàn tuyệt đối cho tài khoản."
                        type="info"
                        showIcon
                    />
                </div>
            </Typography>
        </section>
    );
};

export default Security;
