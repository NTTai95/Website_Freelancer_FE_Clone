'use client';

import CardShadow from "@/components/ui/card-shadow";
import { Button, Col, Input, Row, Tag } from "antd";
import { motion } from "framer-motion";

const ForgotPasswordPage = () => {
    return (
        <div className={"w-[60%] overflow-hidden !pr-10"}>
            <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                <CardShadow>
                    <div className="flex flex-col items-center">
                        <Tag className="!text-black block text-center !text-xl font-semibold" color="blue">QUÊN MẬT KHẨU</Tag>
                        <p className="text-base text-center !text-gray-700 !my-3">Bạn không nhớ mật khẩu?<br />Đừng lo, chúng tôi sẽ giúp bạn.</p>
                    </div>
                    <p className="text-base !mb-2">Email</p>
                    <Input placeholder="Nhập email của bạn vào đây" />
                    <Button className="!mx-auto !block !my-3 !w-full" color="primary" variant="solid">
                        Gửi
                    </Button>
                </CardShadow>
            </motion.div>
        </div>
    )
}
export default ForgotPasswordPage;