import { apiPut } from "@/api/baseApi";
import { AppDispatch } from "@/store";
import { addMessage } from "@/store/volatile/messageSlice";
import { hideSpin, showSpin } from "@/store/volatile/spinSlice";
import { Status } from "@/types/status";
import { Button, Space, Tag } from "antd";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useMilestones } from "../ContextMilestone";

const ActionFreelancer = ({ milestone }: { milestone: any }) => {
    const normalizedStatus = milestone?.status.toLowerCase();
    const { fetchData, data } = useMilestones();
    const dispatch = useDispatch<AppDispatch>();

    const handleAccept = () => {
        dispatch(showSpin());
        apiPut(`/milestones/${milestone?.id}/accept`)
            .then(() => {
                dispatch(
                    addMessage({
                        key: "milestone-accept",
                        type: "success",
                        content: "Chấp nhận giai đoạn thành công!",
                    })
                )
                fetchData(data?.job?.id);
            })
            .catch(() =>
                dispatch(
                    addMessage({
                        key: "milestone-accept",
                        type: "error",
                        content: "Chấp nhận giai đoạn thất bại!",
                    })
                )
            )
            .finally(() => dispatch(hideSpin()));
    };

    const handleReject = () => {
        dispatch(showSpin());
        apiPut(`/milestones/${milestone?.id}/reject`)
            .then(() => {
                dispatch(
                    addMessage({
                        key: "milestone-reject",
                        type: "success",
                        content: "Từ chối giai đoạn thành công!",
                    })
                )
                fetchData(data?.job?.id);
            })
            .catch(() =>
                dispatch(
                    addMessage({
                        key: "milestone-reject",
                        type: "error",
                        content: "Từ chối giai đoạn thất bại!",
                    })
                )
            )
            .finally(() => dispatch(hideSpin()));
    };

    return (
        <div className="!flex !items-center">
            {normalizedStatus === "pending" ? (
                <Space>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            type="primary"
                            className="!bg-gradient-to-r !from-blue-500 !to-indigo-600 !hover:from-blue-600 !hover:to-indigo-700 !text-white"
                            onClick={handleAccept}
                        >
                            Chấp nhận
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            danger
                            className="!bg-gradient-to-r !from-red-500 !to-orange-500 !hover:from-red-600 !hover:to-orange-600 !text-white"
                            onClick={handleReject}
                        >
                            Từ chối
                        </Button>
                    </motion.div>
                </Space>
            ) : normalizedStatus === "doing" ? (
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        type="primary"
                        className="!bg-gradient-to-r !from-green-500 !to-teal-600 !hover:from-green-600 !hover:to-teal-700 !text-white"
                    >
                        Nộp sản phẩm
                    </Button>
                </motion.div>
            ) : (
                <motion.div whileHover={{ scale: 1.05 }}>
                    <Tag
                        color={Status.Meta[milestone?.status.toUpperCase()].color}
                        className="!py-1 !px-3 !rounded-full !font-medium !text-sm"
                    >
                        {Status.Meta[milestone?.status.toUpperCase()].label}
                    </Tag>
                </motion.div>
            )}
        </div>
    );
}

export default ActionFreelancer;