'use client';

import CardShadow from "@/components/ui/card-shadow";
import { Button, Col, Input, Row, Tag } from "antd";
import { motion } from "framer-motion";
import {FileSearchOutlined, ReconciliationOutlined, AuditOutlined} from '@ant-design/icons';

const ForgotPasswordPage = () => {
    return (
        <div className={"h-screen relative"}>
            <div className="absolute flex items-center w-full h-full bg-[#06055A]">
                <img src={"/banner_login3.gif"} alt="" className="!ml-15 h-full object-contain object-left" />
            </div>
            <Row className="h-full">
                <Col span={12}>
                </Col>
                
                <Col span={12} className={"!flex justify-end items-center"}>
                         <div className={"w-[60%] overflow-hidden !pr-10"}>
            <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                <CardShadow>
                    <div className="flex flex-col items-center">
                        <Tag className="!text-black block text-center !text-xl font-semibold h-max" color="blue">ĐỔI MẬT KHẨU</Tag>
                        <p className="text-base text-center !text-gray-500 !my-3">Đặt lại mật khẩu, bảo vệ hành trình của bạn.</p>
                    </div>
                    <p className="text-base !my-2 font-bold">Nhập mật khẩu mới</p>
                    <Input placeholder="Nhập mật khẩu mới" />
                    <p className="text-base !my-2 font-bold">Xác nhận mật khẩu</p>
                    <Input placeholder="Xác nhận mật khẩu" />
                    <Button className="!mx-auto !block !my-3 !w-full" color="primary" variant="solid">
                        Đổi mật khẩu
                    </Button>
                </CardShadow>
            </motion.div>
        </div>
                </Col>
            </Row>
        </div >
    );
}
export default ForgotPasswordPage;