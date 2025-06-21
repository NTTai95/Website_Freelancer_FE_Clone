"use client";

import Image from "next/image";
import styles from "./home.module.scss";
import {
    Row,
    Col,
    Button,
    Carousel,
    Card,
    Flex,
    Collapse,
    CollapseProps,
    Tag,
} from "antd";
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import {
    CustomerServiceFilled,
    CarryOutFilled,
    FundFilled,
    PieChartFilled,
    TrademarkCircleFilled,
    ProjectFilled,
    SafetyCertificateFilled,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCoins,
    faUserTie,
    faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";

// Dynamically import FancyText to avoid SSR issues
const FancyText = dynamic(
    () => import("@carefully-coded/react-text-gradient"),
    {
        ssr: false,
    }
);

const { Meta } = Card;
const items: CollapseProps["items"] = [
    {
        key: "1",
        label: "...",
        children: (
            <p>
                Số người ứng tuyển: 100
                <br />
                Số người hoàn thành công việc: 100
                <br />
                Tỉ lệ thành công: 100%
            </p>
        ),
        showArrow: false,
    },
];
const items2: CollapseProps["items"] = [
    {
        key: "2",
        label: "...",
        children: (
            <p>
                Số người ứng tuyển: 100
                <br />
                Số người hoàn thành công việc: 100
                <br />
                Tỉ lệ thành công: 100%
            </p>
        ),
        showArrow: false,
    },
];
const items3: CollapseProps["items"] = [
    {
        key: "3",
        label: "...",
        children: (
            <p>
                Số người ứng tuyển: 100
                <br />
                Số người hoàn thành công việc: 100
                <br />
                Tỉ lệ thành công: 100%
            </p>
        ),
        showArrow: false,
    },
];
const onChange = (key: string | string[]) => {
    console.log(key);
};

export default function Home() {
    return (
        <>
            <div className="position-relative">
                <Carousel className={styles.banner} arrows autoplay infinite>
                    <div>
                        <video className={styles.video} autoPlay loop muted playsInline>
                            <source src="/assets/video/banner.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div>
                        <Image
                            src="/assets/images/header2.jpg"
                            alt="Header 2"
                            width={1920}
                            height={700}
                            style={{ objectFit: "cover", objectPosition: "center" }}
                        />
                    </div>
                    <div>
                        <Image
                            src="/assets/images/header3.jpg"
                            alt="Header 3"
                            width={1920}
                            height={700}
                            style={{ objectFit: "cover", objectPosition: "center" }}
                        />
                    </div>
                    <div>
                        <Image
                            src="/assets/images/banner1.jpg"
                            alt="Banner 1"
                            width={1920}
                            height={700}
                            style={{ objectFit: "cover", objectPosition: "center" }}
                        />
                    </div>
                </Carousel>
                <div className={styles["context-banner"]}>
                    <div className={styles["container-banner"]}>
                        <FancyText
                            className={styles.logo}
                            gradient={{ from: "#cb5eee", to: "#4be1ec", type: "linear" }}
                            animateTo={{ from: "#4be1ec", to: "#cb5eee" }}
                            animateDuration={1500}
                        >
                            FREELANCER
                        </FancyText>
                        <h3>
                            Chào mừng đến với{" "}
                            <span className={styles.highlight}>Freelancer</span>, nền tảng
                            hàng đầu kết nối{" "}
                            <span className={styles.highlight}>chuyên gia</span> và{" "}
                            <span className={styles.highlight}>doanh nghiệp</span>. Dù bạn là
                            freelancer đang tìm kiếm cơ hội mới hay là nhà tuyển dụng muốn hợp
                            tác với những tài năng hàng đầu, chúng tôi mang đến một môi trường{" "}
                            <span className={styles.highlight}>chuyên nghiệp, linh hoạt</span>{" "}
                            và <span className={styles.highlight}>hiệu quả</span>. <br />
                            Hãy bắt đầu hành trình của bạn ngay hôm nay và tạo nên dấu ấn
                            trong lĩnh vực của mình!
                        </h3>
                    </div>
                </div>
            </div>

            <div className={`container mt-5 ${styles.view}`}>
                <div className={styles.card2}>
                    <p className={styles.title}>Nâng Tầm Công Việc Của Bạn</p>
                    <Row justify="space-around">
                        <Col span={6}>
                            <Card
                                className={styles.cardContent}
                                hoverable
                                cover={
                                    <FontAwesomeIcon icon={faCoins} className={styles.icon2} />
                                }
                            >
                                <p className={styles.title2}>Tham Gia Miễn Phí</p>
                                <p className={styles.description}>
                                    Đăng ký tài khoản và khám phá hồ sơ của các tài năng hàng đầu,
                                    tìm kiếm dự án hoặc đặt lịch tư vấn.
                                </p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                className={styles.cardContent}
                                hoverable
                                cover={
                                    <FontAwesomeIcon icon={faUserTie} className={styles.icon3} />
                                }
                            >
                                <p className={styles.title2}>Thuê Người Giỏi</p>
                                <p className={styles.description}>
                                    Việc tìm kiếm nhân tài chưa bao giờ dễ dàng hơn. Đăng bài
                                    tuyển dụng hoặc để chúng tôi giúp bạn tìm người phù hợp!
                                </p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                className={styles.cardContent}
                                hoverable
                                cover={
                                    <FontAwesomeIcon
                                        icon={faBriefcase}
                                        className={styles.icon2}
                                    />
                                }
                            >
                                <p className={styles.title2}>Làm Việc Với Chuyên Gia</p>
                                <p className={styles.description}>
                                    Freelancer giúp bạn tối ưu chi phí với mức phí giao dịch thấp,
                                    mang lại hiệu quả.
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </div>

                <div className={styles.card2}>
                    <p className={styles.title}>Top chuyên ngành nổi bật</p>
                    <Row justify="space-around">
                        <Col span={6}>
                            <Card
                                className={styles.cardContent}
                                style={{ width: 300 }}
                                cover={<img src="/assets/images/lap-trinh-web-4.jpeg" />}
                                actions={[
                                    <Collapse
                                        defaultActiveKey={["1"]}
                                        onChange={onChange}
                                        items={items}
                                    />,
                                ]}
                            >
                                <p className={styles.title2}>Lập Trình Web</p>
                                <p className={styles.description}>
                                    Lập trình web giúp xây dựng các website thương mại, mạng xã
                                    hội, blog, và các hệ thống quản lý trên nền tảng web.
                                </p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                className={styles.cardContent}
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        style={{ height: "199px" }}
                                        src="/assets/images/thiet-ke-database.webp"
                                    />
                                }
                                actions={[
                                    <Collapse
                                        defaultActiveKey={["2"]}
                                        onChange={onChange}
                                        items={items2}
                                    />,
                                ]}
                            >
                                <p className={styles.title2}>Thiết Kế Database</p>
                                <p className={styles.description}>
                                    Thiết kế database là quá trình xây dựng cấu trúc lưu trữ dữ
                                    liệu cho hệ thống, đảm bảo dữ liệu được tổ chức hợp lý và dễ
                                    truy xuất.
                                </p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                className={styles.cardContent}
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        style={{ height: "199px" }}
                                        src="/assets/images/laptrinhmobile.jpg"
                                    />
                                }
                                actions={[
                                    <Collapse
                                        defaultActiveKey={["3"]}
                                        onChange={onChange}
                                        items={items3}
                                    />,
                                ]}
                            >
                                <p className={styles.title2}>Lập Trình Mobile</p>
                                <p className={styles.description}>
                                    Lập trình mobile là quá trình phát triển ứng dụng chạy trên
                                    thiết bị di động như điện thoại và máy tính bảng.
                                </p>
                            </Card>
                        </Col>
                    </Row>
                    <Row justify="space-around">
                        <Col span={6}>
                            <Card
                                className={styles.cardContent}
                                style={{ width: 300 }}
                                cover={<img src="/assets/images/lap-trinh-web-4.jpeg" />}
                                actions={[
                                    <Collapse
                                        defaultActiveKey={["1"]}
                                        onChange={onChange}
                                        items={items}
                                    />,
                                ]}
                            >
                                <p className={styles.title2}>Lập Trình Web</p>
                                <p className={styles.description}>
                                    Lập trình web giúp xây dựng các website thương mại, mạng xã
                                    hội, blog, và các hệ thống quản lý trên nền tảng web.
                                </p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                className={styles.cardContent}
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        style={{ height: "199px" }}
                                        src="/assets/images/thiet-ke-database.webp"
                                    />
                                }
                                actions={[
                                    <Collapse
                                        defaultActiveKey={["2"]}
                                        onChange={onChange}
                                        items={items2}
                                    />,
                                ]}
                            >
                                <p className={styles.title2}>Thiết Kế Database</p>
                                <p className={styles.description}>
                                    Thiết kế database là quá trình xây dựng cấu trúc lưu trữ dữ
                                    liệu cho hệ thống, đảm bảo dữ liệu được tổ chức hợp lý và dễ
                                    truy xuất.
                                </p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                className={styles.cardContent}
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        style={{ height: "199px" }}
                                        src="/assets/images/laptrinhmobile.jpg"
                                    />
                                }
                                actions={[
                                    <Collapse
                                        defaultActiveKey={["3"]}
                                        onChange={onChange}
                                        items={items3}
                                    />,
                                ]}
                            >
                                <p className={styles.title2}>Lập Trình Mobile</p>
                                <p className={styles.description}>
                                    Lập trình mobile là quá trình phát triển ứng dụng chạy trên
                                    thiết bị di động như điện thoại và máy tính bảng.
                                </p>
                            </Card>
                        </Col>
                    </Row>
                    <Flex gap="small" wrap>
                        <Button className={styles.viewAllBtn} type="primary">
                            Xem tất cả
                        </Button>
                    </Flex>

                    <div className={styles.card2}>
                        <p className={styles.title}>Top Freelancer nổi bật</p>
                        <Row justify="space-around">
                            <Col span={6}>
                                <Card
                                    className={styles.cardContent}
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                        />
                                    }
                                >
                                    <Tag color="orange">JavaScript</Tag>
                                    <Tag color="red">MySQL</Tag>
                                    <Tag color="blue">React</Tag>
                                    <Tag color="green">Spring Boot</Tag>
                                    <p className={styles.title2}>Nguyễn Văn A</p>
                                    <p className={styles.description}>Điểm uy tín: 9.5</p>
                                    <p className={styles.description}>Số lượng dự án: 10</p>
                                    <p className={styles.description}>
                                        Thời gian làm việc: 100 giờ
                                    </p>
                                    <p className={styles.description}>
                                        Thu nhập trung bình: 10.000.000/dự án
                                    </p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card
                                    className={styles.cardContent}
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                        />
                                    }
                                >
                                    <Tag color="orange">JavaScript</Tag>
                                    <Tag color="red">MySQL</Tag>
                                    <Tag color="blue">React</Tag>
                                    <Tag color="green">Spring Boot</Tag>
                                    <p className={styles.title2}>Nguyễn Văn A</p>
                                    <p className={styles.description}>Điểm uy tín: 9.5</p>
                                    <p className={styles.description}>Số lượng dự án: 10</p>
                                    <p className={styles.description}>
                                        Thời gian làm việc: 100 giờ
                                    </p>
                                    <p className={styles.description}>
                                        Thu nhập trung bình: 10.000.000/dự án
                                    </p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card
                                    className={styles.cardContent}
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                        />
                                    }
                                >
                                    <Tag color="orange">JavaScript</Tag>
                                    <Tag color="red">MySQL</Tag>
                                    <Tag color="blue">React</Tag>
                                    <Tag color="green">Spring Boot</Tag>
                                    <p className={styles.title2}>Nguyễn Văn A</p>
                                    <p className={styles.description}>Điểm uy tín: 9.5</p>
                                    <p className={styles.description}>Số lượng dự án: 10</p>
                                    <p className={styles.description}>
                                        Thời gian làm việc: 100 giờ
                                    </p>
                                    <p className={styles.description}>
                                        Thu nhập trung bình: 10.000.000/dự án
                                    </p>
                                </Card>
                            </Col>
                        </Row>
                        <Row justify="space-around">
                            <Col span={6}>
                                <Card
                                    className={styles.cardContent}
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                        />
                                    }
                                >
                                    <Tag color="orange">JavaScript</Tag>
                                    <Tag color="red">MySQL</Tag>
                                    <Tag color="blue">React</Tag>
                                    <Tag color="green">Spring Boot</Tag>
                                    <p className={styles.title2}>Nguyễn Văn A</p>
                                    <p className={styles.description}>Điểm uy tín: 9.5</p>
                                    <p className={styles.description}>Số lượng dự án: 10</p>
                                    <p className={styles.description}>
                                        Thời gian làm việc: 100 giờ
                                    </p>
                                    <p className={styles.description}>
                                        Thu nhập trung bình: 10.000.000/dự án
                                    </p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card
                                    className={styles.cardContent}
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                        />
                                    }
                                >
                                    <Tag color="orange">JavaScript</Tag>
                                    <Tag color="red">MySQL</Tag>
                                    <Tag color="blue">React</Tag>
                                    <Tag color="green">Spring Boot</Tag>
                                    <p className={styles.title2}>Nguyễn Văn A</p>
                                    <p className={styles.description}>Điểm uy tín: 9.5</p>
                                    <p className={styles.description}>Số lượng dự án: 10</p>
                                    <p className={styles.description}>
                                        Thời gian làm việc: 100 giờ
                                    </p>
                                    <p className={styles.description}>
                                        Thu nhập trung bình: 10.000.000/dự án
                                    </p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card
                                    className={styles.cardContent}
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                        />
                                    }
                                >
                                    <Tag color="orange">JavaScript</Tag>
                                    <Tag color="red">MySQL</Tag>
                                    <Tag color="blue">React</Tag>
                                    <Tag color="green">Spring Boot</Tag>
                                    <p className={styles.title2}>Nguyễn Văn A</p>
                                    <p className={styles.description}>Điểm uy tín: 9.5</p>
                                    <p className={styles.description}>Số lượng dự án: 10</p>
                                    <p className={styles.description}>
                                        Thời gian làm việc: 100 giờ
                                    </p>
                                    <p className={styles.description}>
                                        Thu nhập trung bình: 10.000.000/dự án
                                    </p>
                                </Card>
                            </Col>
                        </Row>
                        <Flex gap="small" wrap>
                            <Button className={styles.viewAllBtn} type="primary">
                                Xem tất cả
                            </Button>
                        </Flex>
                    </div>
                </div>

                <div className={styles.card}>
                    <Row>
                        <Col span={10}>
                            <div className={styles.cardContent}>
                                <p className={styles.title}>Dành Cho Doanh Nghiệp</p>
                                <p className={styles.title2}>
                                    Tìm{" "}
                                    <span className={styles.highlight}>nhân tài hàng đầu</span> dễ
                                    dàng. Hợp tác với các{" "}
                                    <span className={styles.highlight}>chuyên gia</span> để thúc
                                    đẩy <span className={styles.highlight}>doanh nghiệp</span> của
                                    bạn.
                                </p>
                                <div className={styles.item}>
                                    <PieChartFilled className={styles.icon} />
                                    <p className={styles.text}>
                                        Kết nối với top 1% nhân tài trên{" "}
                                        <span className={styles.name}>Freelancer</span> và sử dụng
                                        các công cụ quản lý nhân sự hiện đại.
                                    </p>
                                </div>
                                <div className={styles.item}>
                                    <FundFilled className={styles.icon} />
                                    <p className={styles.text}>
                                        Lấp đầy khoảng trống kỹ năng với chuyên gia phù hợp, giúp
                                        hoạt động doanh nghiệp hiệu quả hơn.
                                    </p>
                                </div>
                                <div className={styles.item}>
                                    <CarryOutFilled className={styles.icon} />
                                    <p className={styles.text}>
                                        Kiểm soát toàn bộ quy trình – từ tuyển dụng, giao việc đến
                                        quản lý thanh toán, tất cả trên một nền tảng.
                                    </p>
                                </div>
                                <div className={styles.item}>
                                    <CustomerServiceFilled className={styles.icon} />
                                    <p className={styles.text}>
                                        Đồng hành cùng{" "}
                                        <span className={styles.name}>Freelancer</span> để được hỗ
                                        trợ toàn diện, tối ưu nguồn lực và tập trung phát triển
                                        chiến lược.
                                    </p>
                                </div>
                                <Button className={styles.btn}>Tìm Hiểu Thêm</Button>
                            </div>
                        </Col>
                        <Col span={14}>
                            <div className={styles.cardImg}>
                                <Image
                                    src="/assets/images/doanhnghiep.jpg"
                                    alt="Tuyển dụng"
                                    width={800}
                                    height={500}
                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        filter: "brightness(0.8)",
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className={`${styles.card} mt-5`}>
                    <Row>
                        <Col span={14}>
                            <div className={styles.cardImg}>
                                <Image
                                    src="/assets/images/contain3.jpg"
                                    alt="Freelancer"
                                    width={800}
                                    height={500}
                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        filter: "brightness(0.8)",
                                    }}
                                />
                            </div>
                        </Col>
                        <Col span={10}>
                            <div className={styles.cardContent}>
                                <p className={styles.title}>Dành Cho Freelancer</p>
                                <p className={styles.title2}>
                                    Phát triển{" "}
                                    <span className={styles.highlight}>sự nghiệp freelance</span>{" "}
                                    với các dự án{" "}
                                    <span className={styles.highlight}>chất lượng cao</span>, thu
                                    nhập ổn định và{" "}
                                    <span className={styles.highlight}>nhiều cơ hội</span> phát
                                    triển.
                                </p>
                                <div className={styles.item}>
                                    <TrademarkCircleFilled className={styles.icon} />
                                    <p className={styles.text}>
                                        Hợp tác với khách hàng lớn – Làm việc với thương hiệu lớn và
                                        mở rộng tầm ảnh hưởng của bạn.
                                    </p>
                                </div>
                                <div className={styles.item}>
                                    <ProjectFilled className={styles.icon} />
                                    <p className={styles.text}>
                                        Chọn dự án phù hợp – Tự chủ thời gian và làm công việc bạn
                                        yêu thích.
                                    </p>
                                </div>
                                <div className={styles.item}>
                                    <SafetyCertificateFilled className={styles.icon} />
                                    <p className={styles.text}>
                                        Thanh toán nhanh chóng, an toàn – Hệ thống thanh toán minh
                                        bạch và bảo mật.
                                    </p>
                                </div>
                                <Button className={styles.btn}>Tìm Hiểu Thêm</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}


