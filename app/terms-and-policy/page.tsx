import React from "react";
import { Anchor, Row, Col, Table } from 'antd';

const TermsAndPolicy = () => {
    return (
        <div>
            <div id='about' className="w-full bg-gray-900 py-15">
                <img src="https://create-react-app.dev/img/logo.svg" alt="Logo" className="w-52 h-52 mx-auto" />
                <h1 className="text-4xl text-center my-5 font-bold text-amber-50 animate-gradient uppercase">Chào mừng bạn đến với nền tảng việc làm Freelancer</h1>
                <h5 className="text-center text-2xl text-amber-50">Việc sử dụng nền tảng đồng nghĩa với việc bạn đồng ý với các điều khoản và chính sách được quy định dưới đây</h5>
            </div>
            <div className="container mx-auto mt-10 px-4">
                <Row>
                    <Col span={5}>
                        <div className="sticky scrollbar-thin-custom">
                            <Anchor
                                style={{
                                    height: '100vh',
                                    overflowY: 'auto',
                                    position: 'sticky',
                                    top: 0
                                }}
                                items={[
                                    {
                                        key: 'about',
                                        href: '#about',
                                        title: 'Giới thiệu',
                                    },
                                    {
                                        key: 'definition',
                                        href: '#definition',
                                        title: 'Định nghĩa',
                                        children: [
                                            {
                                                key: "definition-freelancer",
                                                href: "#definition-freelancer",
                                                title: 'Freelancer',
                                            },
                                            {
                                                key: "definition-employer",
                                                href: "#definition-employer",
                                                title: 'Nhà tuyển dụng',
                                            },
                                            {
                                                key: "definition-platform",
                                                href: "#definition-platform",
                                                title: 'Hệ thống',
                                            }
                                        ]
                                    },
                                    {
                                        key: 'scope',
                                        href: '#scope',
                                        title: 'Phạm vi dịch vụ',
                                    },
                                    {
                                        key: 'price-service',
                                        href: '#price-service',
                                        title: 'Phí dịch vụ',
                                    },
                                    {
                                        key: 'payment-process',
                                        href: '#payment-process',
                                        title: 'Quy trình thanh toán ',
                                    },
                                    {
                                        key: 'dispute-resolution',
                                        href: '#dispute-resolution',
                                        title: 'Giải quyết tranh chấp',
                                        children: [
                                            {
                                                key: "dispute-resolution-process",
                                                href: "#dispute-resolution-process",
                                                title: 'Quy trình giải quyết tranh chấp',
                                            },
                                            {
                                                key: "limits-of-settlement",
                                                href: "#limits-of-settlement",
                                                title: 'Giới hạn phạm vi giải quyết',
                                            },
                                            {
                                                key: "commitment-to-fairness",
                                                href: "#commitment-to-fairness",
                                                title: 'Cam kết công bằng',
                                            }
                                        ]
                                    },
                                    {
                                        key: 'right-and-obligation',
                                        href: '#right-and-obligation',
                                        title: 'Quyền và nghĩa vụ của người dùng',
                                        children: [
                                            {
                                                key: "for-freelancer",
                                                href: "#for-freelancer",
                                                title: 'Đối với Freelancer',
                                            },
                                            {
                                                key: "for-employer",
                                                href: "#for-employer",
                                                title: 'Đối với Nhà tuyển dụng',
                                            },
                                            {
                                                key: "mutual-commitment",
                                                href: "#mutual-commitment",
                                                title: 'Cam kết chung',
                                            }
                                        ]
                                    },
                                    {
                                        key: 'security',
                                        href: '#security',
                                        title: 'Quy định bảo mật',
                                        children: [
                                            {
                                                key: "personal-info-security",
                                                href: "#personal-info-security",
                                                title: 'Thông tin cá nhân',
                                            },
                                            {
                                                key: "financial-security",
                                                href: "#financial-security",
                                                title: 'Tài chính và giao dịch',
                                            }, {
                                                key: "content-security",
                                                href: "#content-security",
                                                title: 'Sản phẩm và nội dung',
                                            },
                                            {
                                                key: "system-commitment",
                                                href: "#system-commitment",
                                                title: 'Cam kết của hệ thống',
                                            }
                                        ]
                                    },
                                    {
                                        key: 'account-termination',
                                        href: '#account-termination',
                                        title: 'Chính sách xử lý tài khoản',
                                        children: [
                                            {
                                                key: "termination-cases",
                                                href: "#termination-cases",
                                                title: 'Trường hợp xử lý',
                                            },
                                            {
                                                key: "termination-process",
                                                href: "#termination-process",
                                                title: 'Quy trình xử lý',
                                            },
                                            {
                                                key: "post-termination-responsibility",
                                                href: "#post-termination-responsibility",
                                                title: 'Trách nhiệm sau khi kết thúc',
                                            }
                                        ]
                                    },
                                    {
                                        key: 'general-terms',
                                        href: '#general-terms',
                                        title: 'Điều khoản chung',
                                        children: [
                                            {
                                                key: "term-effectiveness",
                                                href: "#term-effectiveness",
                                                title: 'Hiệu lực của điều khoản',
                                            },
                                            {
                                                key: "legal-binding",
                                                href: "#legal-binding",
                                                title: 'Ràng buộc pháp lý',
                                            },
                                            {
                                                key: "applicable-law",
                                                href: "#applicable-law",
                                                title: 'Luật áp dụng',
                                            },
                                            {
                                                key: "severability",
                                                href: "#severability",
                                                title: 'Điều khoản tách biệt',
                                            },
                                            {
                                                key: "entire-agreement",
                                                href: "#applicable-law",
                                                title: 'Toàn bộ thỏa thuận',
                                            }
                                        ]
                                    },
                                    {
                                        key: 'reputation-system',
                                        href: '#reputation-system',
                                        title: 'Hệ thống điểm uy tín',
                                    },
                                ]}
                            />
                        </div>
                    </Col>
                    <Col span={19} className="pl-4">
                        <div className="mb-5" id="definition">
                            <p className="text-2xl font-bold">ĐỊNH NGHĨA</p>
                            <div className="space-y-1 ml-4 mt-2 text-base">
                                <div id="definition-freelancer">
                                    <h2 className="text-xl font-semibold">Freelancer</h2>
                                    <p className="ml-4 text-gray-800 text-base">Cá nhân đăng ký tài khoản để tìm kiếm và thực hiện công việc trên nền tảng.</p>
                                    <p className="mt-2 ml-4 font-semibold text-gray-800">Vai trò & Nhiệm vụ:</p>
                                    <ul className="list-disc ml-12 mt-2 space-y-1 text-gray-800">
                                        <li>Cập nhật đầy đủ thông tin hồ sơ cá nhân, kỹ năng và kinh nghiệm.</li>
                                        <li>Ứng tuyển vào các công việc phù hợp.</li>
                                        <li>Hoàn thành công việc đúng thời hạn, đúng yêu cầu của nhà tuyển dụng.</li>
                                        <li>Giao tiếp rõ ràng và minh bạch trong suốt quá trình hợp tác.</li>
                                        <li>Tuân thủ quy tắc đạo đức nghề nghiệp và nội quy nền tảng.</li>
                                    </ul>
                                </div>
                                <div id="definition-employer">
                                    <h2 className="text-xl font-semibold">Nhà tuyển dụng</h2>
                                    <p className="ml-4 text-gray-800 text-base">Cá nhân hoặc tổ chức đăng bài tuyển dụng công việc lên nền tảng để tìm kiếm Freelancer phù hợp.</p>
                                    <p className="mt-2 ml-4 font-semibold text-gray-800">Vai trò & Nhiệm vụ:</p>
                                    <ul className="list-disc ml-12 mt-2 space-y-1 text-gray-800">
                                        <li>Tạo bài đăng công việc rõ ràng, minh bạch về yêu cầu, thời gian và chi phí.</li>
                                        <li>Lựa chọn Freelancer phù hợp dựa trên hồ sơ, đánh giá và kỹ năng.</li>
                                        <li>Cung cấp thông tin, tài liệu liên quan đến công việc đúng hạn.</li>
                                        <li>Xác nhận từng giai đoạn công việc để giải ngân đúng tiến độ.</li>
                                        <li>Đánh giá Freelancer sau mỗi dự án để đảm bảo tính minh bạch cộng đồng.</li>
                                    </ul>
                                </div>
                                <div id="definition-platform">
                                    <h2 className="text-xl font-semibold">Nền tảng (Hệ thống)</h2>
                                    <p className="ml-4 text-gray-800 text-base">Dịch vụ trung gian kỹ thuật và vận hành, kết nối nhà tuyển dụng và Freelancer.</p>
                                    <p className="mt-2 ml-4 font-semibold text-gray-800">Vai trò & Nhiệm vụ:</p>
                                    <ul className="list-disc ml-12 mt-2 space-y-1 text-gray-800">
                                        <li>Cung cấp hạ tầng công nghệ để hỗ trợ kết nối, tuyển chọn và làm việc.</li>
                                        <li>Nhận và giữ tạm thời khoản thanh toán từ nhà tuyển dụng.</li>
                                        <li>Thực hiện giải ngân đúng theo tiến độ đã cam kết giữa các bên.</li>
                                        <li>Giám sát hoạt động của người dùng để ngăn ngừa hành vi vi phạm.</li>
                                        <li>Can thiệp và xử lý các tranh chấp một cách công bằng, khách quan.</li>
                                        <li>Quản lý hệ thống điểm uy tín và kiểm soát chất lượng cộng đồng.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="mb-5" id="scope">
                            <p className="text-2xl font-bold">PHẠM VI HOẠT ĐỘNG</p>
                            <div className="space-y-1 ml-4 mt-2 text-base">
                                <h2 className="mt-2 text-xl font-semibold text-gray-800">1. Nền tảng đóng vai trò trung gian, cho phép:</h2>
                                <ul className="list-disc ml-12 space-y-1 mt-2 text-gray-800">
                                    <li>Nhà tuyển dụng đăng dự án, công việc.</li>
                                    <li>Freelancer tìm kiếm, ứng tuyển và thực hiện công việc phù hợp.</li>
                                    <li>
                                        Sau khi hai bên đạt thỏa thuận, nhà tuyển dụng sẽ chuyển trước 100% chi phí dự án cho nền tảng.
                                    </li>
                                    <li>
                                        Nền tảng giữ tiền tạm thời, và sẽ giải ngân theo từng giai đoạn:
                                        <ul className="list-disc ml-4 mt-2 space-y-1">
                                            <li>Dựa trên tiến độ công việc.</li>
                                            <li>Xác nhận hoàn thành từ cả hai bên.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        Việc giải ngân được thực hiện minh bạch và theo thỏa thuận đã ký kết, đảm bảo quyền lợi cho cả Freelancer và nhà tuyển dụng.
                                    </li>
                                </ul>
                                <div className="mb-5" id="scope">
                                    <h2 className="mt-4 text-xl font-semibold text-gray-800">2. Phạm vi hoạt động của nền tảng:</h2>
                                    <ul className="list-disc ml-8 space-y-1 mt-4 text-gray-800">
                                        <li>Nền tảng hiện chỉ phục vụ trong lĩnh vực công nghệ thông tin (CNTT) và các ngành nghề liên quan gần với CNTT, bao gồm nhưng không giới hạn:
                                            <ul className="list-disc ml-4 mt-2 space-y-2">
                                                <li>Lập trình phần mềm, thiết kế website, phát triển ứng dụng.</li>
                                                <li>Thiết kế đồ họa kỹ thuật số, UI/UX.</li>
                                                <li>Viết nội dung công nghệ, quản trị hệ thống, SEO/Marketing số, v.v.</li>
                                            </ul>
                                        </li>
                                        <li>Nền tảng chỉ hỗ trợ giải quyết tranh chấp liên quan đến lĩnh vực công nghệ thông tin. Các tranh chấp ngoài phạm vi này sẽ không được xử lý hoặc chuyển về cơ chế tự thỏa thuận giữa hai bên.</li>
                                    </ul>

                                    <h2 className="mt-4 text-xl font-semibold text-gray-800">3. Về khu vực người dùng:</h2>
                                    <ul className="list-disc ml-8 space-y-2 mt-4 text-gray-800">
                                        <li>Nền tảng hiện tại chỉ dành cho người dùng tại Việt Nam.</li>
                                        <li>Các chính sách, tính năng và điều khoản dành cho người dùng quốc tế chưa được áp dụng tại thời điểm hiện tại.</li>
                                        <li>Trong tương lai, chúng tôi sẽ mở rộng hệ thống để phục vụ người dùng ngoài nước, đồng thời cập nhật thêm các điều khoản và chính sách phù hợp theo khu vực và ngôn ngữ.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="mb-5" id="price-service">
                            <h2 className="text-2xl font-bold">PHÍ DỊCH VỤ</h2>
                            <div className="space-y-1 ml-4 mt-2 text-base">
                                <ul className="list-disc space-y-1 ml-12 mt-2 text-gray-800">
                                    <li>
                                        Phí dịch vụ được áp dụng đối với <span className="font-semibold">Freelancer</span>, và chỉ được khấu trừ khi Freelancer nhận được khoản thanh toán từ nhà tuyển dụng thông qua nền tảng.
                                    </li>
                                    <li>
                                        Mức phí nền tảng thu là <span className="font-semibold">3%</span> trên tổng số tiền mà Freelancer được chi trả trong mỗi lần giao dịch.
                                    </li>
                                    <li>
                                        Khoản phí này sẽ được tự động khấu trừ trước khi hệ thống chuyển tiền vào tài khoản của Freelancer.
                                    </li>
                                    <li>
                                        <span className="font-semibold">Ví dụ minh họa:</span>
                                        <ul className="list-disc ml-12 space-y-1 mt-2">
                                            <li>
                                                Nếu Freelancer nhận được <span className="font-semibold">10.000.000 VNĐ</span> từ nhà tuyển dụng, nền tảng sẽ trừ <span className="font-semibold">3%</span> (tương đương <span className="font-semibold">300.000 VNĐ</span>), Freelancer thực nhận là <span className="font-semibold">9.700.000 VNĐ</span>.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        Mức phí có thể được điều chỉnh trong tương lai và sẽ được thông báo công khai trên nền tảng ít nhất <span className="font-semibold">7 ngày</span> trước khi áp dụng thay đổi.
                                    </li>
                                    <li className="italic">
                                        <span className="font-bold text-red-500">Lưu ý:</span> Phí dịch vụ này đã bao gồm toàn bộ chi phí vận hành nền tảng, bảo mật hệ thống và hỗ trợ xử lý tranh chấp.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mb-5" id="payment-process">
                            <h2 className="text-2xl font-bold">QUY TRÌNH THANH TOÁN</h2>
                            <div className="space-y-1 ml-4 mt-2 text-base">
                                <ul className="list-disc space-y-2 ml-12 mt-2 text-gray-800">
                                    <li>
                                        <strong>Bước 1: Nhà tuyển dụng thanh toán trước</strong>
                                        <ul className="list-disc space-y-2 ml-12 text-base">
                                            <li>Trước khi bắt đầu dự án, nhà tuyển dụng cần chuyển khoản 100% số tiền thỏa thuận cho hệ thống.</li>
                                            <li>Khoản tiền này sẽ được nền tảng giữ tạm thời để đảm bảo an toàn cho cả hai bên.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>Bước 2: Hệ thống giữ tiền trong quá trình làm việc</strong>
                                        <ul className="list-disc space-y-2 ml-12">
                                            <li>Khi Freelancer bắt đầu thực hiện công việc, số tiền trên không được giải ngân ngay.</li>
                                            <li>Hệ thống giữ ở trạng thái "đang bảo lưu", đảm bảo nhà tuyển dụng chỉ chi trả khi công việc được hoàn thành đúng cam kết.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>Bước 3: Hoàn tất công việc và thanh toán</strong>
                                        <ul className="list-disc space-y-2 ml-12">
                                            <li>Sau khi Freelancer hoàn thành công việc, hai bên xác nhận tiến độ hoặc kết thúc dự án:</li>
                                            <li>Hệ thống sẽ khấu trừ 3% phí dịch vụ từ khoản tiền được trả cho Freelancer.</li>
                                            <li>Số tiền còn lại sẽ được chuyển vào số dư tài khoản của Freelancer trên nền tảng.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>Bước 4: Giải quyết tranh chấp (nếu có)</strong>
                                        <ul className="list-disc space-y-2 ml-12">
                                            <li>Nếu một trong hai bên phát sinh tranh chấp, hệ thống sẽ:</li>
                                            <li>Yêu cầu hai bên cung cấp bằng chứng, thông tin liên quan đến quá trình làm việc.</li>
                                            <li>Tiến hành đánh giá, phân tích và ra quyết định cuối cùng dựa trên nguyên tắc công bằng và trung lập.</li>
                                            <li>Khoản tiền sẽ được hoàn trả cho bên không vi phạm, hoặc xử lý theo tỷ lệ nếu cả hai bên đều có trách nhiệm.</li>
                                        </ul>
                                    </li>
                                    <li className="italic">
                                        <strong className="text-red-600">Lưu ý quan trọng:</strong>
                                        <ul className="list-disc space-y-2 ml-8">
                                            <li>Nền tảng không sở hữu hay sử dụng số tiền của hai bên trong quá trình làm việc.</li>
                                            <li>Chúng tôi chỉ giữ tạm thời số tiền nhằm đảm bảo an toàn giao dịch, tăng độ tin cậy và ngăn ngừa rủi ro giữa Freelancer và nhà tuyển dụng.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mb-5" id="dispute-resolution">
                            <h2 className="text-2xl font-bold">GIẢI QUYẾT TRANH CHẤP</h2>
                            <div className="ml-4 mt-2 text-base">
                                <p className="mt-2 ml-2 text-gray-800">
                                    Trong quá trình hợp tác giữa Freelancer và Nhà tuyển dụng, nếu xảy ra bất đồng hoặc tranh chấp, nền tảng sẽ hỗ trợ giải quyết dựa trên các nguyên tắc minh bạch, công bằng và dựa trên bằng chứng hợp lệ.
                                </p>
                                <h3 id="dispute-resolution-process" className="text-xl font-semibold mt-4 ml-4 text-gray-800">1. Quy trình giải quyết tranh chấp:</h3>
                                <ul className="list-disc space-y-2 ml-12 mt-2 text-gray-800">
                                    <li>
                                        <span className="font-semibold">Cung cấp bằng chứng:</span>
                                        <ul className="list-disc space-y-2 ml-8 mt-2">
                                            <li>Tin nhắn trao đổi trên nền tảng.</li>
                                            <li>File công việc đã nộp hoặc nhận xét phản hồi.</li>
                                            <li>Các tài liệu hoặc yêu cầu công việc đã đăng tải rõ ràng trên hệ thống.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="font-semibold">Xác minh và đánh giá:</span>
                                        <ul className="list-disc space-y-2 ml-8 mt-2">
                                            <li>Nền tảng sẽ thu thập, đối chiếu và phân tích bằng chứng, thông tin giao dịch và tiến trình làm việc giữa hai bên.</li>
                                            <li>Chỉ các thông tin và bằng chứng diễn ra trên hệ thống mới được công nhận hợp lệ.</li>
                                            <li>Các trao đổi qua kênh bên ngoài (như email, tin nhắn cá nhân, ứng dụng chat bên thứ ba…) sẽ không được chấp nhận trong quá trình giải quyết tranh chấp.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="font-semibold">Ra quyết định:</span>
                                        <ul className="list-disc space-y-2 ml-12 mt-2">
                                            <li>Sau khi đánh giá, nền tảng sẽ đưa ra quyết định cuối cùng về việc giải ngân khoản tiền, xử lý tài khoản vi phạm (nếu có), và thông báo cho cả hai bên.</li>
                                            <li>Quyết định của nền tảng mang tính bắt buộc và có hiệu lực thi hành trong phạm vi hệ thống.</li>
                                        </ul>
                                    </li>
                                </ul>

                                <h3 id="limits-of-settlement" className="text-xl font-semibold mt-4 ml-4 text-gray-800">2. Giới hạn phạm vi giải quyết:</h3>
                                <ul className="list-disc space-y-2 ml-16 mt-2 text-gray-800">
                                    <li>Nền tảng chỉ giải quyết các tranh chấp liên quan đến công việc thuộc lĩnh vực công nghệ thông tin hoặc các ngành nghề gần với CNTT.</li>
                                    <li>Các tranh chấp ngoài phạm vi chuyên môn hoặc dịch vụ của nền tảng sẽ không được tiếp nhận.</li>
                                </ul>

                                <h3 id="commitment-to-fairness" className="text-xl font-semibold mt-4 ml-4 text-gray-800">3. Cam kết công bằng:</h3>
                                <ul className="list-disc space-y-2 ml-16 mt-2 text-gray-800">
                                    <li>Trung lập – Không thiên vị.</li>
                                    <li>Dựa trên bằng chứng cụ thể.</li>
                                    <li>Bảo vệ quyền lợi hợp pháp của cả hai bên.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mb-5" id="right-and-obligation">
                            <h2 className="text-2xl font-bold">QUYỀN VÀ NGHĨA VỤ CỦA NGƯỜI DÙNG</h2>
                            <p className="ml-4 mt-4 text-base">
                                Mỗi người dùng khi tham gia và sử dụng nền tảng (bao gồm Freelancer và Nhà tuyển dụng) cần tuân thủ các quy định sau để đảm bảo môi trường làm việc chuyên nghiệp, minh bạch và công bằng.
                            </p>
                            <div className="space-y-2 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">1. Đối với Freelancer:</h3>
                                <ul className="ml-12 mt-2 space-y-2 text-gray-800">
                                    <li>
                                        <h4 className="font-medium">Quyền lợi:</h4>
                                        <ul className="list-disc ml-12 mt-2 space-y-2">
                                            <li>Được ứng tuyển và thực hiện các công việc đã được đăng tải công khai trên nền tảng.</li>
                                            <li>Được nhận thanh toán đúng theo tiến độ và thỏa thuận sau khi hoàn thành công việc.</li>
                                            <li>Được hỗ trợ giải quyết tranh chấp một cách công bằng và bảo mật thông tin cá nhân.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <h4 className="font-medium">Nghĩa vụ:</h4>
                                        <ul className="list-disc ml-12 mt-2 space-y-2">
                                            <li>Cung cấp thông tin cá nhân trung thực và đầy đủ trong hồ sơ cá nhân (họ tên, số điện thoại, kỹ năng, kinh nghiệm, v.v.).</li>
                                            <li>Cam kết thực hiện công việc đúng tiến độ, đúng chất lượng như đã thỏa thuận trong hợp đồng hoặc thông tin dự án.</li>
                                            <li>Không được yêu cầu thanh toán bên ngoài nền tảng nhằm tránh rủi ro, gian lận hoặc vi phạm chính sách.</li>
                                            <li>Phải tôn trọng và giao tiếp chuyên nghiệp với nhà tuyển dụng trong suốt quá trình làm việc.</li>
                                            <li>Chịu sự quản lý và can thiệp của hệ thống nếu xảy ra tranh chấp liên quan đến dự án thực hiện trên nền tảng.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-1 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">2. Đối với Nhà tuyển dụng:</h3>
                                <ul className="ml-12 mt-2 space-y-2 text-gray-800">
                                    <li>
                                        <h4 className="font-medium">Quyền lợi:</h4>
                                        <ul className="list-disc ml-12 mt-2 space-y-2">
                                            <li>Được đăng tuyển các dự án hợp pháp trong lĩnh vực công nghệ thông tin hoặc lĩnh vực gần với CNTT.</li>
                                            <li>Được chọn lọc Freelancer phù hợp với yêu cầu công việc.</li>
                                            <li>Được quyền phản hồi, đánh giá kết quả làm việc của Freelancer.</li>
                                            <li>Được hỗ trợ bảo vệ quyền lợi và xử lý tranh chấp công bằng nếu có phát sinh.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <h4 className="font-medium">Nghĩa vụ:</h4>
                                        <ul className="list-disc ml-12 mt-2 space-y-2">
                                            <li>Thanh toán đầy đủ và đúng hạn cho dự án trước khi Freelancer bắt đầu làm việc.</li>
                                            <li>Đánh giá trung thực và công bằng kết quả làm việc của Freelancer sau mỗi giai đoạn.</li>
                                            <li>Không được ép buộc Freelancer làm việc ngoài phạm vi mô tả công việc ban đầu nếu chưa có thỏa thuận mới rõ ràng.</li>
                                            <li>Phải xác minh kỹ lưỡng và cung cấp thông tin cá nhân đúng sự thật khi đăng ký tài khoản và sử dụng nền tảng.</li>
                                            <li>Tôn trọng Freelancer, giao tiếp văn minh, hỗ trợ trao đổi rõ ràng trong quá trình hợp tác.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-1 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">3. Cam kết chung:</h3>
                                <ul className="list-disc ml-12 mt-2 space-y-2 text-gray-800">
                                    <li>Hai bên phải tôn trọng lẫn nhau trong quá trình làm việc và tuân thủ nội quy của nền tảng.</li>
                                    <li>Mọi tranh chấp phát sinh trong quá trình hợp tác sẽ do nền tảng đứng ra xử lý, quyết định của nền tảng là cuối cùng và có hiệu lực thi hành.</li>
                                    <li>Việc sử dụng nền tảng đồng nghĩa với việc đồng ý tuân thủ các chính sách, điều khoản sử dụng đã công bố.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mb-5" id="security">
                            <h2 className="text-2xl font-bold text-gray-800">QUY ĐỊNH BẢO MẬT</h2>
                            <p className="space-y-2 ml-4 mt-2 text-gray-800 text-base">
                                Nền tảng cam kết tuân thủ nghiêm ngặt các quy định về bảo mật thông tin, nhằm đảm bảo an toàn tuyệt đối cho người dùng trong suốt quá trình sử dụng dịch vụ.
                            </p>
                            <div className="space-y-2 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">1. Bảo mật thông tin cá nhân</h3>
                                <ul className="list-disc ml-12 mt-2 space-y-2 text-gray-800">
                                    <li>Mọi thông tin cá nhân do người dùng cung cấp (bao gồm họ tên, số điện thoại, email, tài khoản ngân hàng, v.v.) đều được lưu trữ và bảo mật tuyệt đối.</li>
                                    <li>Không chia sẻ, trao đổi hay cung cấp thông tin người dùng cho bên thứ ba dưới bất kỳ hình thức nào nếu không có sự đồng ý rõ ràng bằng văn bản hoặc thông báo chính thức từ chính chủ sở hữu.</li>
                                </ul>
                            </div>

                            <div className="space-y-2 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">2. Bảo mật tài chính và giao dịch</h3>
                                <ul className="list-disc ml-12 mt-2 space-y-2 text-gray-800">
                                    <li>Tất cả các giao dịch tài chính giữa Nhà tuyển dụng và Freelancer đều được mã hóa và bảo vệ an toàn thông qua hệ thống.</li>
                                    <li>Mọi thông tin liên quan đến tài khoản thanh toán, số dư, lịch sử giao dịch chỉ hiển thị cho chính chủ tài khoản và không tiết lộ cho bất kỳ bên nào khác, trừ khi có yêu cầu pháp lý chính thức hoặc sự cho phép của người dùng.</li>
                                </ul>
                            </div>

                            <div className="space-y-1 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">3. Bảo mật sản phẩm và nội dung công việc</h3>
                                <ul className="list-disc ml-12 mt-2 space-y-2 text-gray-800">
                                    <li>Các sản phẩm, tài liệu, bản thiết kế, mã nguồn, hoặc bất kỳ nội dung nào được Freelancer gửi cho Nhà tuyển dụng (hoặc ngược lại) thông qua nền tảng đều được bảo mật hoàn toàn.</li>
                                    <li>Nền tảng chỉ lưu trữ dữ liệu cho mục đích phục vụ công việc và tranh chấp (nếu có), tuyệt đối không sử dụng, sao chép hay phát tán nội dung đó dưới bất kỳ hình thức nào.</li>
                                </ul>
                            </div>

                            <div className="space-y-2 ml-4 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">4. Cam kết của hệ thống</h3>
                                <ul className="list-disc ml-12 mt-2 space-y-2 text-gray-800">
                                    <li>Nền tảng sử dụng các công nghệ mã hóa hiện đại, tường lửa và hệ thống bảo vệ nhiều lớp để ngăn chặn truy cập trái phép và đảm bảo dữ liệu luôn được an toàn.</li>
                                    <li>Mọi hành vi xâm nhập trái phép, khai thác hoặc làm rò rỉ dữ liệu người dùng sẽ bị xử lý nghiêm theo quy định của pháp luật.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mb-5" id="account-termination">
                            <h2 className="text-2xl font-bold text-gray-800">CHÍNH SÁCH XỬ LÝ TÀI KHOẢN</h2>
                            <div className="space-y-1 mt-2 text-base">
                                <p className="ml-4 mt-4 text-gray-800">
                                    Nền tảng có quyền tạm ngừng hoặc chấm dứt tài khoản người dùng trong các trường hợp vi phạm chính sách nhằm đảm bảo môi trường làm việc công bằng, minh bạch và chuyên nghiệp.
                                </p>
                                <div className="space-y-2 ml-4 text-base">
                                    <h3 className="text-xl font-semibold text-gray-800">1. Các trường hợp tạm ngừng hoặc chấm dứt tài khoản</h3>
                                    <ul className="list-disc ml-12 mt-2 space-y-2 text-gray-800">
                                        <li>Người dùng có hành vi gian lận, cung cấp thông tin sai lệch, vi phạm điều khoản sử dụng sẽ bị khóa tài khoản vĩnh viễn.</li>
                                        <li>Nếu có khiếu nại, tranh chấp hoặc dấu hiệu bất thường trong hành vi sử dụng, nền tảng có quyền tạm thời khóa tài khoản để điều tra và làm rõ sự việc.</li>
                                        <li>Người dùng có thái độ không hợp tác, thiếu chuyên nghiệp, vi phạm nhiều lần dù đã được cảnh báo sẽ bị khóa tài khoản.</li>
                                        <li>Những hành vi lạm dụng hệ thống, sử dụng tài khoản cho mục đích xấu, hoặc gây ảnh hưởng đến uy tín của nền tảng cũng sẽ bị xử lý nghiêm.</li>
                                    </ul>
                                </div>

                                <div className="space-y-2 ml-4 mt-2 text-base">
                                    <h3 className="text-xl font-semibold text-gray-800">2. Quy trình xử lý</h3>
                                    <ul className="list-disc ml-12 mt-4 space-y-2 text-gray-800">
                                        <li>Mọi hành vi vi phạm trước khi khóa tài khoản đều sẽ được nền tảng thông báo công khai đến người dùng qua email hoặc hệ thống thông báo nội bộ.</li>
                                        <li>Trường hợp khóa tài khoản tạm thời, người dùng có thể liên hệ với quản trị viên (Admin) để làm rõ và cam kết tuân thủ chính sách nếu muốn mở lại tài khoản.</li>
                                        <li>Người dùng phải ký cam kết tuân thủ nội quy, thể hiện thiện chí hợp tác, thì mới được xem xét mở khóa tài khoản.</li>
                                    </ul>
                                </div>

                                <div className="space-y-2 ml-4 mt-2 text-base">
                                    <h3 className="text-xl font-semibold text-gray-800">3. Trách nhiệm sau khi tài khoản bị chấm dứt</h3>
                                    <ul className="list-disc ml-12 mt-4 space-y-2 text-gray-800">
                                        <li>Khi tài khoản bị chấm dứt, người dùng sẽ mất quyền truy cập toàn bộ hệ thống, bao gồm lịch sử giao dịch, thông tin liên lạc và số dư (nếu có).</li>
                                        <li>Nếu có khoản tiền đang được giữ, hệ thống sẽ giải quyết công bằng sau khi điều tra hoàn tất, dựa trên quy định và bằng chứng hợp lệ.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <div className="mb-5" id="general-terms">
                            <h2 className="text-2xl font-bold text-gray-800">ĐIỀU KHOẢN CHUNG</h2>
                            <p className="ml-4 mt-4 text-gray-800 text-base">
                                Các điều khoản và chính sách sử dụng dưới đây được thiết lập để đảm bảo quyền lợi và nghĩa vụ cho tất cả người dùng của nền tảng. Bằng việc sử dụng dịch vụ, bạn đồng ý tuân thủ và chịu ràng buộc bởi các điều khoản này.
                            </p>

                            <div className="space-y-2 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">1. Hiệu lực và thay đổi điều khoản</h3>
                                <ul className="list-disc ml-12 mt-4 space-y-2 text-gray-800">
                                    <li>Chính sách và điều khoản này có hiệu lực ngay khi được đăng tải trên website.</li>
                                    <li>Nền tảng có quyền cập nhật, điều chỉnh hoặc thay đổi nội dung chính sách bất kỳ lúc nào nhằm phù hợp với thay đổi về pháp luật, kỹ thuật, hoặc định hướng vận hành.</li>
                                    <li>Tất cả các thay đổi sẽ được thông báo rõ ràng trên hệ thống. Người dùng có trách nhiệm theo dõi và cập nhật thông tin chính sách mới nhất.</li>
                                </ul>
                            </div>

                            <div className="space-y-2 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">2. Ràng buộc pháp lý</h3>
                                <ul className="list-disc ml-12 mt-4 space-y-2 text-gray-800">
                                    <li>Việc bạn tiếp tục truy cập và sử dụng nền tảng sau khi có thay đổi trong điều khoản đồng nghĩa với việc bạn đồng ý và chấp nhận những thay đổi đó, bao gồm cả việc ràng buộc pháp lý liên quan đến các nghĩa vụ và quyền lợi của bạn.</li>
                                    <li>Nếu bạn không đồng ý với bất kỳ điều khoản nào, bạn có quyền ngừng sử dụng nền tảng và yêu cầu chấm dứt tài khoản theo quy định tại mục 9.</li>
                                </ul>
                            </div>

                            <div className="space-y-2 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">3. Luật áp dụng</h3>
                                <ul className="list-disc ml-12 mt-4 space-y-2 text-gray-800">
                                    <li>Tất cả các điều khoản và chính sách được điều chỉnh và giải thích theo pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.</li>
                                    <li>Trong trường hợp có tranh chấp không thể giải quyết qua thương lượng, vụ việc sẽ được chuyển đến cơ quan có thẩm quyền tại Việt Nam để xử lý.</li>
                                </ul>
                            </div>

                            <div className="space-y-2 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">4. Điều khoản tách biệt</h3>
                                <ul className="list-disc ml-12 mt-4 space-y-2 text-gray-800">
                                    <li>Nếu bất kỳ điều khoản nào trong văn bản này bị tuyên bố là không hợp lệ, vô hiệu hoặc không thể thực thi bởi một cơ quan có thẩm quyền, thì các điều khoản còn lại vẫn giữ nguyên hiệu lực và tiếp tục được áp dụng.</li>
                                </ul>
                            </div>

                            <div className="space-y-2 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">5. Toàn bộ thỏa thuận</h3>
                                <ul className="list-disc ml-12 mt-4 space-y-2 text-gray-800">
                                    <li>Văn bản chính sách và điều khoản này cấu thành toàn bộ thỏa thuận giữa nền tảng và người dùng, thay thế tất cả các thỏa thuận miệng hoặc văn bản trước đó (nếu có).</li>
                                </ul>
                            </div>

                            <div className="ml-4 mt-4 italic">
                                <p className="text-gray-800">
                                    <span className="text-base text-red-500 font-semibold">Lưu ý: </span>
                                    Việc truy cập và sử dụng nền tảng đồng nghĩa với việc bạn đã đọc, hiểu và đồng ý với toàn bộ nội dung của Chính sách và Điều khoản sử dụng. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận hỗ trợ để được giải đáp.
                                </p>
                            </div>
                        </div>

                        <div className="mb-5" id="reputation-system">
                            <h2 className="text-2xl font-bold text-gray-800">HỆ THỐNG ĐIỂM UY TÍN</h2>
                            <p className="ml-4 mt-4 text-gray-800">
                                Để đảm bảo chất lượng dịch vụ và xây dựng môi trường làm việc chuyên nghiệp, minh bạch trên nền tảng,
                                chúng tôi áp dụng hệ thống điểm uy tín cho các Freelancer. Hệ thống này giúp đánh giá và phản ánh mức độ tin cậy
                                cũng như hiệu quả công việc của Freelancer trong suốt quá trình làm việc.
                            </p>

                           <div className="space-y-2 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">1. Cấp độ vi phạm và điểm trừ uy tín</h3>
                                <p className="mt-4 text-gray-800">
                                    Nếu Freelancer vi phạm các quy định hoặc có hành vi không phù hợp, điểm uy tín sẽ bị trừ theo mức độ vi phạm như sau:
                                </p>
                                <div className="mt-4">
                                    <Table
                                        dataSource={[
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
                                        ]}
                                        columns={[
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
                                        ]}
                                        pagination={false}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">2. Cơ chế cộng và trừ điểm uy tín</h3>
                                <ul className="list-disc ml-12 mt-4 space-y-2 text-gray-800">
                                    <li>
                                        <strong>Cộng điểm uy tín:</strong> Người dùng (bao gồm Freelancer và Nhà tuyển dụng) có thể đánh giá lẫn nhau sau mỗi dự án hoặc giai đoạn công việc. Mỗi điểm đánh giá tích cực (trên thang điểm 5) tương ứng với việc cộng 2 điểm uy tín cho người được đánh giá.
                                    </li>
                                    <li>
                                        <strong>Trừ điểm uy tín:</strong> Nếu Freelancer bị đánh dấu trễ hẹn trong từng giai đoạn dự án, họ sẽ bị trừ 1 điểm uy tín cho mỗi lần trễ.
                                    </li>
                                    <li>
                                        Đánh giá xấu (điểm thấp) từ Nhà tuyển dụng hoặc Freelancer cũng ảnh hưởng đến điểm uy tín. Mỗi điểm đánh giá xấu sẽ khiến người bị đánh giá bị trừ 4 điểm uy tín.
                                    </li>
                                </ul>
                            </div>

                          <div className="space-y-2 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">3. Ngưỡng điểm uy tín và khởi tạo</h3>
                                <ul className="list-disc ml-12 mt-4 space-y-2 text-gray-800">
                                    <li>Điểm uy tín thấp nhất: 0 điểm (không thể âm điểm).</li>
                                    <li>Điểm uy tín khởi đầu: Mỗi người dùng khi đăng ký và tham gia nền tảng sẽ bắt đầu với 0 điểm uy tín.</li>
                                </ul>
                            </div>

                           <div className="space-y-2 ml-4 mt-2 text-base">
                                <h3 className="text-xl font-semibold text-gray-800">4. Lợi ích của điểm uy tín cao</h3>
                                <ul className="list-disc ml-12 mt-4 space-y-2 text-gray-800">
                                    <li>Freelancer có điểm uy tín cao sẽ được ưu tiên hiển thị trong kết quả tìm kiếm, giúp họ tiếp cận nhiều nhà tuyển dụng hơn.</li>
                                    <li>Điểm uy tín cũng là căn cứ để nền tảng đánh giá và ưu tiên hỗ trợ trong các trường hợp giải quyết tranh chấp.</li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    );
};

export default TermsAndPolicy;