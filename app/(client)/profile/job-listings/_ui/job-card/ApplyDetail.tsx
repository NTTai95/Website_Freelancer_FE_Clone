import { Status } from "@/types/status";
import { Collapse, Divider, Tag, Typography } from "antd";
import { motion } from "framer-motion";
import { formatCurrency } from "../format";
import { CalendarOutlined, ClockCircleOutlined, DollarOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const ApplyDetail = ({ job }: { job: any }) => {
    return (
        <Collapse
            className='!mt-4 !border-none !shadow-lg bg-gradient-to-r to-cyan-500 via-blue-600 from-indigo-700 hover:to-cyan-400 hover:via-blue-500 hover:from-indigo-600 transition-all duration-300'
            items={[{
                key: '1',
                label: (
                    <div className="!m-0 !flex !justify-between !items-center">
                        <p className="!text-white font-medium">
                            Chi tiết ứng tuyển
                        </p>
                        <Tag
                            color={Status.Meta[job.applyStatus.toUpperCase()].color}
                            className="!text-sm !font-bold !px-4 !rounded-full !shadow-md !border-0"
                        >
                            {Status.Meta[job.applyStatus.toUpperCase()].label}
                        </Tag>
                    </div>
                ),
                children: (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="!grid grid-cols-3 !gap-5">
                            {[
                                {
                                    title: 'Giá đề xuất',
                                    value: formatCurrency(job.bidAmount),
                                    icon: <DollarOutlined />
                                },
                                {
                                    title: 'Thời gian đề xuất',
                                    value: `${job.estimatedHours} giờ`,
                                    icon: <ClockCircleOutlined />
                                },
                                {
                                    title: 'Ngày ứng tuyển',
                                    value: job.applyCreatedAt,
                                    icon: <CalendarOutlined />
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="!bg-white !p-5 !rounded-xl !shadow-md !border !border-indigo-100"
                                >
                                    <Text className="!block !text-indigo-400 !font-medium !text-sm !mb-1">
                                        {item.icon} {item.title}
                                    </Text>
                                    <Title level={4} className="!m-0 !text-indigo-700 !font-bold">
                                        {item.value}
                                    </Title>
                                </motion.div>
                            ))}
                        </div>

                        <Divider className="!my-4 !border-indigo-200" />

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Title level={5} className="!mb-4 !text-indigo-800 !font-bold">
                                Nội dung ứng tuyển
                            </Title>
                            <div className="!whitespace-pre-line !text-gray-700">
                                {job.applyContent}
                            </div>
                        </motion.div>
                    </motion.div>
                )
            }]}
        />
    );
};

export default ApplyDetail;