// ActionEmployer.tsx
import { Button, Space, Tooltip } from "antd";
import { motion } from "framer-motion";
import {
    EditOutlined,
    ScissorOutlined,
    MergeCellsOutlined,
    CreditCardOutlined,
    EyeOutlined
} from "@ant-design/icons";
import { useMilestones } from "../ContextMilestone";

const ActionEmployer = ({ milestone, canCombined, onEditClick, onSplitClick, onDeleteClick }: { milestone: any, canCombined: boolean, onEditClick: () => void; onSplitClick: () => void; onDeleteClick: () => void; }) => {
    const { fetchData, data } = useMilestones();

    if (data?.job?.status === 'PREPARING') {
        return (
            <Space wrap className="!gap-2">
                {/* Edit Button */}
                <Tooltip title="Chỉnh sửa giai đoạn" placement="top">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            type="default"
                            icon={<EditOutlined className="!text-blue-500" />}
                            className="!flex !items-center !font-medium !rounded-lg !px-4 !py-2 
                                      !border !border-blue-500 !text-blue-500 hover:!bg-blue-50 
                                      !shadow-sm hover:!shadow-md transition-all"
                            onClick={onEditClick}
                        >
                            Chỉnh sửa
                        </Button>
                    </motion.div>
                </Tooltip>

                {/* Split Button */}
                <Tooltip title="Tách giai đoạn" placement="top">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            type="default"
                            icon={<ScissorOutlined className="!text-green-500" />}
                            className="!flex !items-center !font-medium !rounded-lg !px-4 !py-2 
                                      !border !border-green-500 !text-green-500 hover:!bg-green-50 
                                      !shadow-sm hover:!shadow-md transition-all"
                            onClick={onSplitClick}
                        >
                            Tách giai đoạn
                        </Button>
                    </motion.div>
                </Tooltip>

                {/* Delete Button */}
                {canCombined && (
                    <Tooltip title="Xóa giai đoạn" placement="top">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                type="default"
                                icon={<MergeCellsOutlined className="!text-red-500" />}
                                className="!flex !items-center !font-medium !rounded-lg !px-4 !py-2 
                                          !border !border-red-500 !text-red-500 hover:!bg-red-50 
                                          !shadow-sm hover:!shadow-md transition-all"
                                onClick={onDeleteClick}
                            >
                                Xóa giai đoạn
                            </Button>
                        </motion.div>
                    </Tooltip>
                )}
            </Space>
        );
    }

    if (data?.job?.status === 'IN_PROGRESS') {
        if (milestone?.status === 'UNPAID') {
            return (
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                        type="primary"
                        icon={<CreditCardOutlined />}
                        className="!font-medium !rounded-lg !px-5 !py-2.5 !h-auto
                                  !bg-gradient-to-r !from-blue-500 !to-teal-500 hover:!from-blue-600 hover:!to-teal-600
                                  !border-0 !text-white !shadow-md hover:!shadow-lg transition-all"
                    >
                        Thanh toán
                    </Button>
                </motion.div>
            );
        }

        if (milestone?.status === 'REVIEWING') {
            return (
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        className="!font-medium !rounded-lg !px-5 !py-2.5 !h-auto
                                  !bg-gradient-to-r !from-purple-500 !to-cyan-500 hover:!from-purple-600 hover:!to-cyan-600
                                  !border-0 !text-white !shadow-md hover:!shadow-lg transition-all"
                    >
                        Xem sản phẩm
                    </Button>
                </motion.div>
            );
        }
    }

    return null;
}

export default ActionEmployer;