// src/app/accept-milestones/[id]/_ui/DeleteMilestoneModal.tsx
"use client";

import { useState, useEffect } from "react";
import { Modal, Form, Select, message } from "antd";
import { useMilestones } from "../ContextMilestone";
import axios from "axios";
import { apiDelete } from "@/api/baseApi";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { addMessage } from "@/store/volatile/messageSlice";

interface DeleteMilestoneModalProps {
    visible: boolean;
    onCancel: () => void;
    milestone: any;
    jobMilestones: any[];
}

const DeleteMilestoneModal = ({
    visible,
    onCancel,
    milestone,
    jobMilestones,
}: DeleteMilestoneModalProps) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { fetchData } = useMilestones();
    const [availableMilestones, setAvailableMilestones] = useState<any[]>([]);
    // Thêm state để theo dõi milestone được chọn
    const [selectedTransferId, setSelectedTransferId] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (visible && milestone) {
            const otherMilestones = jobMilestones.filter(m => m.id !== milestone.id);
            setAvailableMilestones(otherMilestones);

            if (otherMilestones.length > 0) {
                // Thiết lập giá trị mặc định và state
                const defaultTransferId = otherMilestones[0].id;
                setSelectedTransferId(defaultTransferId);
                form.setFieldsValue({
                    transferToMilestoneId: defaultTransferId
                });
            } else {
                setSelectedTransferId(null);
            }
        }
    }, [visible, milestone, form, jobMilestones]);

    const handleSubmit = async () => {
        const values = await form.validateFields();
        setLoading(true);

        apiDelete(`/milestones/${milestone.id}/transfer-to-milestone/${values.transferToMilestoneId}`).then(() => {
            dispatch(addMessage({
                key: "deleteMilestone",
                type: "success",
                content: "Xóa giai đoạn thành công",
            }))
            fetchData();
            onCancel();
        }).catch(() => {
            dispatch(addMessage({
                key: "deleteMilestone",
                type: "error",
                content: "Xóa giai đoạn thất bại",
            }))
        }).finally(() => {
            setLoading(false);
        });
    };

    // Tính toán thông tin hiển thị dựa trên selection
    const targetMilestone = selectedTransferId
        ? availableMilestones.find(m => m.id === selectedTransferId)
        : null;

    const targetOrder = targetMilestone ? targetMilestone.order : '...';
    const newPercent = targetMilestone
        ? (Number(targetMilestone.percent) + Number(milestone.percent))
        : 0;

    return (
        <Modal
            title={`Xóa Giai đoạn`}
            open={visible}
            onCancel={onCancel}
            onOk={handleSubmit}
            confirmLoading={loading}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
        >
            <div className="!mb-4 !p-3 !bg-red-50 !rounded-md">
                <p className="!text-red-700">
                    <strong>Cảnh báo:</strong> Bạn sắp xóa giai đoạn này.
                    Tỷ trọng <span className="font-semibold">{milestone.percent}%</span> sẽ được chuyển sang giai đoạn khác.
                </p>
            </div>

            <Form form={form} layout="vertical">
                <Form.Item
                    label="Chọn giai đoạn để chuyển tỷ trọng"
                    name="transferToMilestoneId"
                    rules={[{ required: true, message: "Vui lòng chọn giai đoạn" }]}
                >
                    <Select
                        placeholder="Chọn giai đoạn"
                        // Cập nhật state khi người dùng thay đổi lựa chọn
                        onChange={(value) => setSelectedTransferId(value)}
                    >
                        {availableMilestones.map(m => (
                            <Select.Option key={m.id} value={m.id}>
                                Giai đoạn {m.order} (hiện tại: {m.percent}%)
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {availableMilestones.length > 0 && (
                    <div className="!mt-4 !p-3 !bg-blue-50 !rounded-md">
                        <p className="!text-blue-700">
                            Sau khi xóa:
                        </p>
                        <ul className="!list-disc !pl-5 !mt-2">
                            <li>
                                <span className="!font-semibold">Giai đoạn {milestone.order}</span> sẽ bị xóa
                            </li>
                            <li>
                                <span className="!font-semibold">Giai đoạn {targetOrder}</span>
                                sẽ có tỷ trọng mới:{" "}
                                <span className="!font-semibold">
                                    {newPercent}%
                                </span>
                            </li>
                        </ul>
                    </div>
                )}
            </Form>
        </Modal>
    );
};

export default DeleteMilestoneModal;