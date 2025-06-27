"use client";
import React, { useRef } from "react";
import { Row, Col, Spin } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMoneyBill, faBriefcase, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { easeOut, motion, useInView } from "framer-motion";
import CardStatistic from "./comon/CardStatistic";
import TopReputationTables from "./comon/TopReputationTables";
import { MyPieChart, BasicPie } from "./comon/MyPieChart";
import { ParetoChart } from "./comon/ParetoChart";
import ColumnChart from "./comon/ColumnChart";

// Animation variants
const cardVariants = {
    offscreen: {
        y: 50,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring" as const,
            bounce: 0.4,
            duration: 0.8
        }
    }
};

const chartVariants = {
    offscreen: {
        scale: 0.95,
        opacity: 0
    },
    onscreen: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easeOut
        }
    }
};

const Dashboard = () => {
    // Refs for scroll-triggered animations
    const cardRowRef = useRef(null);
    const columnChartRef = useRef(null);
    const tableRef = useRef(null);
    const chartsRow1Ref = useRef(null);
    const chartsRow2Ref = useRef(null);

    // Check if elements are in view
    const cardRowInView = useInView(cardRowRef, { once: true, amount: 0.1 });
    const columnChartInView = useInView(columnChartRef, { once: true, amount: 0.1 });
    const tableInView = useInView(tableRef, { once: true, amount: 0.1 });
    const chartsRow1InView = useInView(chartsRow1Ref, { once: true, amount: 0.1 });
    const chartsRow2InView = useInView(chartsRow2Ref, { once: true, amount: 0.1 });

    return (
        <div className="dashboard-container">
            {/* First Row of Cards - Animated when scrolled into view */}
            <motion.div
                ref={cardRowRef}
                initial="offscreen"
                animate={cardRowInView ? "onscreen" : "offscreen"}
                variants={{
                    onscreen: {
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
            >
                <Row gutter={[24, 24]} className="!mb-6">
                    <Col xs={24} sm={12} md={8}>
                        <motion.div variants={cardVariants}>
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
                        </motion.div>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <motion.div variants={cardVariants}>
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
                        </motion.div>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <motion.div variants={cardVariants}>
                            <CardStatistic
                                title="Tổng số bài đăng"
                                value={434}
                                percentage={2.1}
                                isIncrease={true}
                                icon={<FontAwesomeIcon icon={faBriefcase} className="!text-3xl" />}
                                color="#27521d"
                                bgColor="#c5ebd7"
                            />
                        </motion.div>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <motion.div variants={cardVariants}>
                            <CardStatistic
                                title="Tổng số giao dịch"
                                value={6880}
                                percentage={2.3}
                                isIncrease={true}
                                icon={<FontAwesomeIcon icon={faMoneyBillTransfer} className="!text-3xl" />}
                                color="#a36124"
                                bgColor="#f5e8dc"
                            />
                        </motion.div>
                    </Col>
                </Row>
            </motion.div>

            {/* Column Chart - Animated when scrolled into view */}
            <motion.div
                ref={columnChartRef}
                initial="offscreen"
                animate={columnChartInView ? "onscreen" : "offscreen"}
                variants={chartVariants}
                className="mb-6"
            >
                <ColumnChart />
            </motion.div>

            {/* Top Reputation Table - Animated when scrolled into view */}
            <motion.div
                ref={tableRef}
                initial={{ opacity: 0, y: 20 }}
                animate={tableInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
            >
                <TopReputationTables />
            </motion.div>

            {/* Pareto and Pie Charts - Animated when scrolled into view */}
            <motion.div
                ref={chartsRow1Ref}
                initial="offscreen"
                animate={chartsRow1InView ? "onscreen" : "offscreen"}
                variants={{
                    onscreen: {
                        transition: {
                            staggerChildren: 0.2
                        }
                    }
                }}
                className="!mt-5"
            >
                <Row gutter={[30, 30]}>
                    <Col xs={24} lg={14}>
                        <motion.div variants={chartVariants}>
                            <ParetoChart />
                        </motion.div>
                    </Col>
                    <Col xs={24} lg={10}>
                        <motion.div variants={chartVariants}>
                            <MyPieChart />
                        </motion.div>
                    </Col>
                </Row>
            </motion.div>

            {/* Basic Pie and Placeholder - Animated when scrolled into view */}
            <motion.div
                ref={chartsRow2Ref}
                initial="offscreen"
                animate={chartsRow2InView ? "onscreen" : "offscreen"}
                variants={{
                    onscreen: {
                        transition: {
                            staggerChildren: 0.2
                        }
                    }
                }}
                className="!py-6"
            >
                <Row gutter={[30, 30]}>
                    <Col xs={24} lg={10}>
                        <motion.div variants={chartVariants}>
                            <BasicPie />
                        </motion.div>
                    </Col>

                </Row>
            </motion.div>
        </div>
    );
};

export default Dashboard;