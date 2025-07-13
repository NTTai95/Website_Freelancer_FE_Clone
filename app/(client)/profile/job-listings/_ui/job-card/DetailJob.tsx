import { getHighlightedText } from "@/utils/converter";
import { Collapse, Typography } from "antd"
import { motion } from "framer-motion"
import { FileOutlined } from "@ant-design/icons"

const { Paragraph, Link } = Typography;

const DetailJob = ({ job, keyword }: { job: any, keyword: any }) => {
    return (
        <Collapse
            className='!border-none !shadow-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-600 transition-all duration-300'
            items={[{
                key: '1', label: <p className="!text-white !font-medium">Chi tiết công việc</p>, children: <>
                    <motion.div
                        transition={{ duration: 0.3 }}
                        layout
                    >
                        <Paragraph className="!text-gray-700 !whitespace-pre-line !text-justify !leading-relaxed !font-light">
                            {getHighlightedText(job?.description, keyword, "!bg-blue-500 !text-white !px-1 !rounded-sm") || "Chưa có mô tả"}
                        </Paragraph>
                    </motion.div>

                    {job.document && (
                        <motion.div
                            className="!flex !items-center !p-3 !bg-white !rounded-xl !border !border-blue-200 !shadow-sm !w-fit"
                            whileHover={{
                                x: 5,
                                backgroundColor: '#dbeafe'
                            }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <FileOutlined className="!text-blue-500 !text-xl !mr-3" />
                            <Link
                                href={job.document}
                                target="_blank"
                                className="!text-blue-600 hover:!text-blue-800 !font-medium !text-base"
                            >
                                Tài liệu đính kèm
                            </Link>
                        </motion.div>
                    )}
                </>
            }]}
        />
    )
}

export default DetailJob