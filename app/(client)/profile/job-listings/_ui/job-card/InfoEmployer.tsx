import { Avatar } from "antd";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const InfoEmployer = ({ job }: { job: any }) => {
    const router = useRouter();
    return (
        <motion.div
            className="!flex !items-center !gap-3 !p-3 !bg-white !rounded-xl !border !border-blue-100 !shadow-sm !w-fit hover:!bg-blue-50 !transition-colors !cursor-pointer"
            whileHover={{
                x: 5,
                boxShadow: '0 4px 14px -2px rgba(59, 130, 246, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(`/employers/${job.employerId}`)}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Avatar
                    src={job.employerAvatar}
                    shape="circle"
                    size={48}
                    className="!border-2 !border-blue-200 !shadow"
                />
            </motion.div>

            <div className="!flex !flex-col">
                <motion.p
                    className="!text-blue-700 !font-bold !mb-0 hover:!underline"
                    whileHover={{ x: 2 }}
                >
                    {job.employerFullName}
                </motion.p>
                <motion.p
                    className="!text-gray-500 !text-sm !font-medium !mb-0 !flex !items-center"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                >
                    <span className="!mr-2">✉️</span>
                    {job.employerEmail}
                </motion.p>
            </div>

            <motion.div
                className="!text-blue-500 !ml-2"
                animate={{
                    x: [0, 5, 0],
                    transition: {
                        repeat: Infinity,
                        duration: 1.5
                    }
                }}
            >
                →
            </motion.div>
        </motion.div>
    );
};

export default InfoEmployer;