import { Col, Row } from "antd";
import { FileSearchOutlined, ReconciliationOutlined, AuditOutlined } from '@ant-design/icons';

const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={"h-screen relative"}>
            <div className="absolute flex items-center w-full h-full bg-[#06055A]">
                <img src={"/banner_login3.gif"} alt="" className="!ml-15 h-full object-contain object-left" />
            </div>
            <Row className="h-full">
                <Col span={12}>
                    <div className="flex flex-col items-center !pt-40 !font-serif">
                        <p className="drop-shadow-2xl uppercase !font-black !text-6xl !mb-20">
                            Freelancer
                        </p>
                        <div>
                            <p className="text-2xl font-bold !mb-2">
                                Tự do làm việc - Chủ động tuyển chọn
                            </p>
                            <ul className="!ml-5 text-lg">
                                <li><FileSearchOutlined /><span className="!ml-2"> Tìm việc linh hoạt</span></li>
                                <li><ReconciliationOutlined /><span className="!ml-2"> Tuyển người hiệu quả</span></li>
                                <li><AuditOutlined /><span className="!ml-2"> Quản lý dễ dàng</span></li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col span={12} className={"!flex justify-end items-center"}>
                    {children}
                </Col>
            </Row>
        </div >
    );
}

export default LayoutAuth;