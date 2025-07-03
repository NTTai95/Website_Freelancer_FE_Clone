import { Card, Statistic, Row, Col } from 'antd';
import {
    DollarOutlined,
    ProjectOutlined,
    CheckCircleOutlined,
    MessageOutlined
} from '@ant-design/icons';

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <Row gutter={16} className="mb-6">
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Thu nhập"
                            value={1250}
                            prefix={<DollarOutlined />}
                            suffix="$"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Dự án đang làm"
                            value={3}
                            prefix={<ProjectOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Dự án hoàn thành"
                            value={24}
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Tin nhắn mới"
                            value={5}
                            prefix={<MessageOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Card title="Hoạt động gần đây">
                {/* Nội dung hoạt động */}
                <p>Bạn đã hoàn thành dự án "Thiết kế website"</p>
                <p>Nhận được đánh giá 5 sao từ khách hàng</p>
            </Card>
        </div>
    );
}