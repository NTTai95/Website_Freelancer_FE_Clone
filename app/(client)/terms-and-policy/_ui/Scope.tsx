'use client';

import React from 'react';
import { Typography, Alert } from 'antd';
const { Title, Paragraph, Text } = Typography;

const Scope = () => {
    return (
        <section className="mb-10 px-4 md:px-8 lg:px-16" id="scope">
            <Typography>
                <Title level={2}>Phạm vi hoạt động</Title>

                {/* 1. Trung gian kết nối */}
                <div className="mt-6 space-y-2">
                    <Title level={4}>1. Nền tảng đóng vai trò trung gian</Title>
                    <ul className="list-disc ml-6 text-gray-800 leading-relaxed">
                        <li>Cho phép nhà tuyển dụng đăng dự án, công việc.</li>
                        <li>Freelancer tìm kiếm, ứng tuyển và thực hiện công việc phù hợp.</li>
                        <li>
                            Sau khi hai bên đạt thỏa thuận, nhà tuyển dụng chuyển trước 100% chi phí dự án cho nền tảng.
                        </li>
                        <li>
                            Nền tảng giữ tiền tạm thời và giải ngân theo từng giai đoạn:
                            <ul className="list-disc ml-6 mt-1 space-y-1">
                                <li>Dựa trên tiến độ công việc.</li>
                                <li>Xác nhận hoàn thành từ cả hai bên.</li>
                            </ul>
                        </li>
                        <li>
                            Việc giải ngân được thực hiện minh bạch và theo thỏa thuận, đảm bảo quyền lợi cho cả Freelancer và nhà tuyển dụng.
                        </li>
                    </ul>
                </div>

                {/* 2. Phạm vi ngành nghề */}
                <div className="mt-6 space-y-2">
                    <Title level={4}>2. Phạm vi hoạt động ngành nghề</Title>
                    <ul className="list-disc ml-6 text-gray-800 leading-relaxed">
                        <li>
                            Nền tảng hiện chỉ phục vụ lĩnh vực công nghệ thông tin (CNTT) và các ngành liên quan gần với CNTT, bao gồm nhưng không giới hạn:
                            <ul className="list-disc ml-6 mt-1 space-y-1">
                                <li>Lập trình phần mềm, thiết kế website, phát triển ứng dụng.</li>
                                <li>Thiết kế đồ họa kỹ thuật số, UI/UX.</li>
                                <li>Viết nội dung công nghệ, quản trị hệ thống, SEO/Marketing số, v.v.</li>
                            </ul>
                        </li>
                        <li>
                            Nền tảng chỉ hỗ trợ xử lý tranh chấp thuộc lĩnh vực CNTT. Các tranh chấp ngoài phạm vi sẽ không được giải quyết và chuyển về cơ chế tự thỏa thuận giữa hai bên.
                        </li>
                    </ul>
                </div>

                {/* 3. Khu vực người dùng */}
                <div className="mt-6 space-y-2">
                    <Title level={4}>3. Khu vực người dùng</Title>
                    <ul className="list-disc ml-6 text-gray-800 leading-relaxed">
                        <li>Nền tảng hiện chỉ dành cho người dùng tại Việt Nam.</li>
                        <li>Các chính sách, tính năng và điều khoản dành cho người dùng quốc tế chưa được áp dụng tại thời điểm hiện tại.</li>
                        <li>
                            <Text strong>Trong tương lai:</Text> hệ thống sẽ mở rộng phục vụ người dùng quốc tế, đồng thời cập nhật thêm chính sách phù hợp theo khu vực và ngôn ngữ.
                        </li>
                    </ul>
                </div>

                {/* Optional Note */}
                <div className="mt-8">
                    <Alert
                        message="Lưu ý"
                        description="Chính sách có thể được điều chỉnh theo từng giai đoạn để phù hợp với quy định pháp lý và sự mở rộng của nền tảng."
                        type="info"
                        showIcon
                    />
                </div>
            </Typography>
        </section>
    );
};

export default Scope;
