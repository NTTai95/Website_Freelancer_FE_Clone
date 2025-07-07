import { motion } from 'framer-motion';
import Link from 'next/link';
import { MenuProps } from 'antd';

// Menu cho Admin
export const itemsInfoAdmin: MenuProps['items'] = [
    {
        key: '1', label: (
            <motion.div whileHover={{ x: 5 }} className="!px-4 !py-2" >
                <Link href="/admin/me" > Thông tin cá nhân </Link>
            </motion.div>
        )
    },
    {
        key: '2', label: (
            <motion.div whileHover={{ x: 5 }
            } className="!px-4 !py-2" >
                <Link href="/admin/change-password" > Đổi mật khẩu </Link>
            </motion.div>
        )
    },
    {
        key: '3', label: (
            <motion.div whileHover={{ x: 5 }
            } className="!px-4 !py-2 !text-red-500" >
                <Link href="/logout" > Đăng xuất </Link>
            </motion.div>
        )
    }
];

// Menu cho Client
export const getClientMenuItems = (): MenuProps['items'] => [
    {
        key: '1', label: (
            <motion.div whileHover={{ x: 5 }} className="!px-4 !py-2" >
                <Link href="/profile/personal-info" > Thông tin cá nhân </Link>
            </motion.div>
        )
    },
    {
        key: '2', label: (
            <motion.div whileHover={{ x: 5 }
            } className="!px-4 !py-2" >
                <Link href="/change-password" > Đổi mật khẩu </Link>
            </motion.div>
        )
    },
    {
        key: '3', label: (
            <motion.div whileHover={{ x: 5 }
            } className="!px-4 !py-2 !text-red-500" >
                <Link href="/logout" > Đăng xuất </Link>
            </motion.div>
        )
    }
];