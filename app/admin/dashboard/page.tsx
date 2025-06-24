"use client";
import React from "react";
import { Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMoneyBill, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import CardStatistic from "./comon/CardStatistic";
import TopReputationTables from "./comon/TopReputationTables";
import { MyPieChart, BasicPie } from "./comon/MyPieChart";
import { ParetoChart } from "./comon/ParetoChart";
import ColumnChart from "./comon/ColumnChart";
const dashboard = () => {
    return (
        <div>
            <Row gutter={35}>
                <Col span={8}>
                    <CardStatistic
                        title="Doanh thu theo năm"
                        value={4500000000}
                        unit="VNĐ"
                        percentage={2.5}
                        isIncrease={true}
                        icon={<FontAwesomeIcon icon={faCoins} className="!text-3xl" />}
                        color="#a61436"
                        bgColor="#e6c8cf"
                    />
                </Col>
                <Col span={8}>
                    <CardStatistic
                        title="Tiền hôm nay"
                        value={134000000}
                        unit="VNĐ"
                        percentage={2.7}
                        isIncrease={true}
                        icon={<FontAwesomeIcon icon={faMoneyBill} className="!text-3xl" />}
                        color="#0c4978"
                        bgColor="#cadeed"
                    />
                </Col>

                <Col span={8}>
                    <CardStatistic
                        title="Tổng số bài đăng"
                        value={134}
                        percentage={3.6}
                        isIncrease={true}
                        icon={<FontAwesomeIcon icon={faBriefcase} className="!text-3xl" />}
                        color="#27521d"
                        bgColor="#c5ebd7"
                    />
                </Col>
            </Row>
            <br />
            <div className="mb-6">
                <ColumnChart />
            </div>
            <TopReputationTables />
            <br />
            <div className="mt-3">
                <Row gutter={30}>
                    <Col span={14}>
                        <ParetoChart />
                    </Col>
                    <Col span={10}>
                        <MyPieChart />
                    </Col>
                </Row>
            </div>
            <div className="py-5">
                <Row gutter={30}>
                    <Col span={10}>
                        <BasicPie />
                    </Col>
                    <Col span={14}>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default dashboard;