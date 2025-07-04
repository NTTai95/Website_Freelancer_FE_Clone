"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { useAuthorization } from "@/hooks/useAuthorization";
import { Avatar, Button, Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { CaretDownOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const itemsInfoAdmin: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <motion.div
                whileHover={{ x: 5 }}
                className="!px-4 !py-2"
            >
                <Link href={"/admin/me"}>Thông tin cá nhân</Link>
            </motion.div>
        ),
    },
    {
        key: '2',
        label: (
            <motion.div
                whileHover={{ x: 5 }}
                className="!px-4 !py-2"
            >
                <Link href={"/admin/change-password"}>Đổi mật khẩu</Link>
            </motion.div>
        ),
    },
    {
        key: '3',
        label: (
            <motion.div
                whileHover={{ x: 5 }}
                className="!px-4 !py-2 !text-red-500"
            >
                <Link href={"/logout"}>Đăng xuất</Link>
            </motion.div>
        ),
    },
];

const getClientMenuItems = (role: string | null, userId: number | null): MenuProps['items'] => [
    {
        key: '1',
        label: (
            <motion.div
                whileHover={{ x: 5 }}
                className="!px-4 !py-2"
            >
                <Link href={"/profile/personal-info"}>Thông tin cá nhân</Link>
            </motion.div>
        ),
    },
    {
        key: '2',
        label: (
            <motion.div
                whileHover={{ x: 5 }}
                className="!px-4 !py-2"
            >
                <Link href={"/change-password"}>Đổi mật khẩu</Link>
            </motion.div>
        ),
    },
    {
        key: '3',
        label: (
            <motion.div
                whileHover={{ x: 5 }}
                className="!px-4 !py-2 !text-red-500"
            >
                <Link href={"/logout"}>Đăng xuất</Link>
            </motion.div>
        ),
    },
];

const Info = ({ scrolled }: { scrolled: boolean }) => {
    const router = useRouter();
    const me = useSelector((state: RootState) => state.persistent.auth.me);
    const { role } = useSelector((state: RootState) => state.persistent.auth);
    const { isAuthenticated } = useAuthorization();

    if (!isAuthenticated) {
        return (
            <div className="!flex !gap-3">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        type={scrolled ? 'text' : 'text'}
                        className={`!font-medium ${scrolled ? '!text-gray-700' : '!text-blue-100'}`}
                        onClick={() => router.push("/login")}
                    >
                        Đăng nhập
                    </Button>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        type="primary"
                        className="!bg-blue-600 hover:!bg-blue-700 !font-medium"
                        onClick={() => router.push("/register")}
                    >
                        Đăng ký
                    </Button>
                </motion.div>
            </div>
        )
    }

    const InfoAdmin = () => (
        <Dropdown
            menu={{ items: itemsInfoAdmin }}
            trigger={['click']}
            placement="bottomRight"
            arrow
            overlayClassName="!rounded-lg !shadow-lg !overflow-hidden"
        >
            <motion.span
                className={`
                    !font-bold !flex !gap-2 !items-center !cursor-pointer
                    ${scrolled ? '!text-blue-600' : '!text-white'}
                `}
                whileHover={{ scale: 1.03 }}
            >
                {me?.fullName}
                <CaretDownOutlined className="!text-xs" />
            </motion.span>
        </Dropdown>
    );

    const clientMenuItems = getClientMenuItems(role, me?.id || null);

    return (
        <AuthGuard roles={["ROLE_FREELANCER", "ROLE_NHA_TUYEN_DUNG"]} fallback={<InfoAdmin />}>
            <Dropdown
                menu={{ items: clientMenuItems }}
                placement="bottomRight"
                arrow
                overlayClassName="!rounded-lg !shadow-lg !overflow-hidden"
            >
                <motion.span
                    className={`
                        !font-bold !flex !gap-2 !items-center !cursor-pointer
                        ${scrolled ? '!text-blue-600' : '!text-white'}
                    `}
                    whileHover={{ scale: 1.03 }}
                >
                    {me?.fullName}
                    <motion.div
                        whileHover={{ rotate: 10 }}
                    >
                        <Avatar
                            src={me?.avatar}
                            size={40}
                            shape="circle"
                            className={`!border ${scrolled ? '!border-blue-500' : '!border-white'
                                }`}
                        />
                    </motion.div>
                </motion.span>
            </Dropdown>
        </AuthGuard>
    )
}

export default Info;