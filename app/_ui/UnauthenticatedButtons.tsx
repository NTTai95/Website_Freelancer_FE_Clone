import { Button } from 'antd';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const UnauthenticatedButtons = ({ scrolled }: { scrolled: boolean }) => {
    const router = useRouter();

    return (
        <div className="!flex !gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                    type="text"
                    className={`!font-medium ${scrolled ? '!text-gray-700' : '!text-blue-100'}`}
                    onClick={() => router.push("/login")}
                >
                    Đăng nhập
                </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                    type="primary"
                    className="!bg-blue-600 hover:!bg-blue-700 !font-medium"
                    onClick={() => router.push("/register")}
                >
                    Đăng ký
                </Button>
            </motion.div>
        </div>
    );
};