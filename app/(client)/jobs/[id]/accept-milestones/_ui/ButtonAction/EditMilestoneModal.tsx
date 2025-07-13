// src/app/accept-milestones/[id]/_ui/EditMilestoneModal.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { Modal, Form, Input, DatePicker, Upload, UploadFile, message } from "antd";
import { useMilestones } from "../ContextMilestone";
import dayjs from "dayjs";
import axios from "axios";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { apiPut } from "@/api/baseApi";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { addMessage } from "@/store/volatile/messageSlice";
import { motion } from "framer-motion";
import { RcFile } from "antd/es/upload";
import { InboxOutlined } from "@ant-design/icons";

dayjs.extend(customParseFormat);

const { TextArea } = Input;
const { Dragger } = Upload;

interface EditMilestoneModalProps {
    visible: boolean;
    onCancel: () => void;
    milestone: any;
}

const EditMilestoneModal = ({
    visible,
    onCancel,
    milestone,
}: EditMilestoneModalProps) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { data: contextData, fetchData } = useMilestones();
    const dispatch = useDispatch<AppDispatch>();

    // Lấy thông tin job từ context
    const job = useMemo(() => contextData?.job, [contextData]);

    // Tính toán deadline của job: closedAt + workingHours
    const jobDeadline = useMemo(() => {
        if (!job?.closedAt || !job?.workingHours) return null;

        const closedAt = dayjs(job.closedAt, "DD/MM/YYYY HH:mm:ss");
        return closedAt.add(job.workingHours, 'hour');
    }, [job]);

    useEffect(() => {
        if (visible && milestone) {
            // Initialize form values
            form.setFieldsValue({
                content: milestone.content,
                startAt: dayjs(milestone.startAt, "DD/MM/YYYY HH:mm:ss"),
                endAt: dayjs(milestone.endAt, "DD/MM/YYYY HH:mm:ss"),
            });
            setFileList([]);
        }
    }, [visible, milestone, form]);

    const handleSubmit = async (values: any) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('content', values.content);
        formData.append('startAt', values.startAt.format("DD/MM/YYYY HH:mm:ss"));
        formData.append('endAt', values.endAt.format("DD/MM/YYYY HH:mm:ss"));

        // Add files if any
        fileList.forEach(file => {
            if (file.originFileObj) {
                formData.append('attachments', file.originFileObj as RcFile);
            }
        });

        try {
            await apiPut(`/milestones/${milestone.id}`, formData);

            dispatch(
                addMessage({
                    key: "milestone-edit",
                    type: "success",
                    content: "Chỉnh sửa giai đoạn thành công!",
                })
            );
        } catch (error) {
            dispatch(
                addMessage({
                    key: "milestone-edit",
                    type: "error",
                    content: "Chỉnh sửa giai đoạn thất bại!",
                })
            );
        } finally {
            setLoading(false);
            fetchData();
            onCancel();
        }
    };

    // Custom validation rules
    const validateStartDate = (_: any, value: dayjs.Dayjs) => {
        if (!value) {
            return Promise.reject('Vui lòng chọn thời gian bắt đầu');
        }

        if (value.isBefore(dayjs(), 'minute')) {
            return Promise.reject('Thời gian bắt đầu phải sau thời điểm hiện tại');
        }

        return Promise.resolve();
    };

    const validateEndDate = (_: any, value: dayjs.Dayjs) => {
        if (!value) {
            return Promise.reject('Vui lòng chọn thời gian kết thúc');
        }

        const startAt = form.getFieldValue('startAt');

        if (startAt && value.isBefore(startAt)) {
            return Promise.reject('Thời gian kết thúc phải sau thời gian bắt đầu');
        }

        if (jobDeadline && value.isAfter(jobDeadline)) {
            return Promise.reject(
                `Thời gian kết thúc không được vượt quá ${jobDeadline.format('DD/MM/YYYY HH:mm:ss')}`
            );
        }

        return Promise.resolve();
    };

    const beforeUpload = (file: RcFile) => {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            dispatch(addMessage({ key: "upload-file", content: 'File phải nhỏ hơn 5MB!', type: "error" }));
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    return (
        <Modal
            title={
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="!text-xl !font-bold !text-gray-800"
                >
                    Chỉnh sửa Giai đoạn
                </motion.div>
            }
            open={visible}
            onCancel={onCancel}
            onOk={() => form.submit()}
            confirmLoading={loading}
            width={700}
            okText="Cập nhật"
            cancelText="Hủy"
            className="!rounded-lg overflow-hidden"
            footer={
                <motion.div
                    className="!flex !justify-end !gap-3 !py-3 !px-6 !border-t"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <button
                        onClick={onCancel}
                        className="!px-4 !py-2 !rounded-lg !border !border-gray-300 hover:!bg-gray-50 !text-gray-700 !transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={() => form.submit()}
                        disabled={loading}
                        className="!px-4 !py-2 !rounded-lg !bg-blue-600 hover:!bg-blue-700 !text-white !transition-colors !font-medium"
                    >
                        {loading ? 'Đang xử lý...' : 'Cập nhật'}
                    </button>
                </motion.div>
            }
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="!pt-4"
                >
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Form.Item
                            label={<span className="!font-medium !text-gray-700">Nội dung</span>}
                            name="content"
                            rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
                        >
                            <TextArea
                                rows={4}
                                placeholder="Mô tả công việc của giai đoạn này"
                                className="!rounded-lg !border-gray-300 hover:!border-blue-400 focus:!border-blue-500 !shadow-sm"
                            />
                        </Form.Item>
                    </motion.div>

                    <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-6 !mt-2">
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Form.Item
                                label={<span className="!font-medium !text-gray-700">Thời gian bắt đầu</span>}
                                name="startAt"
                                rules={[
                                    { required: true },
                                    { validator: validateStartDate }
                                ]}
                            >
                                <DatePicker
                                    showTime
                                    format="DD/MM/YYYY HH:mm:ss"
                                    className="!w-full !rounded-lg !border-gray-300 hover:!border-blue-400 focus:!border-blue-500 !shadow-sm"
                                    placeholder="Chọn ngày bắt đầu"
                                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                                />
                            </Form.Item>
                        </motion.div>

                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Form.Item
                                label={<span className="!font-medium !text-gray-700">Thời gian kết thúc</span>}
                                name="endAt"
                                rules={[
                                    { required: true },
                                    { validator: validateEndDate }
                                ]}
                                dependencies={['startAt']}
                            >
                                <DatePicker
                                    showTime
                                    format="DD/MM/YYYY HH:mm:ss"
                                    className="!w-full !rounded-lg !border-gray-300 hover:!border-blue-400 focus:!border-blue-500 !shadow-sm"
                                    placeholder="Chọn ngày kết thúc"
                                    disabledDate={(current) => {
                                        const startAt = form.getFieldValue('startAt');
                                        if (startAt) {
                                            return current && current < startAt.startOf('day');
                                        }
                                        return false;
                                    }}
                                />
                            </Form.Item>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="!mt-4"
                    >
                        <Form.Item
                            label={<span className="!font-medium !text-gray-700">Tệp đính kèm</span>}
                        >
                            <Dragger
                                fileList={fileList}
                                beforeUpload={beforeUpload}
                                onChange={({ fileList }) => setFileList(fileList)}
                                multiple={true}
                                maxCount={3}
                                className="!rounded-lg !border-dashed !border-gray-300 hover:!border-blue-400 !bg-gray-50"
                            >
                                <p className="ant-upload-drag-icon !text-blue-500">
                                    <InboxOutlined className="!text-2xl" />
                                </p>
                                <p className="ant-upload-text !font-medium !text-gray-700">
                                    Kéo thả file vào đây hoặc click để chọn file
                                </p>
                                <p className="ant-upload-hint !text-gray-500">
                                    Hỗ trợ file DOC, PDF, JPG, PNG. Tối đa 5MB/file
                                </p>
                            </Dragger>
                            <p className={"text-gray-600 italic"}>*Nếu đã có tài liệu thì file mới tải lên sẽ ghi đè file hiện tại!</p>
                        </Form.Item>
                    </motion.div>

                    {jobDeadline && (
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="!mt-4 !p-4 !bg-blue-50 !rounded-lg !border !border-blue-100"
                        >
                            <p className="!text-blue-700 !text-sm !flex !items-start">
                                <span className="!font-medium !mr-2">📌 Lưu ý:</span>
                                Thời hạn tối đa cho toàn bộ công việc là đến
                                <span className="!font-semibold !ml-1">{jobDeadline.format('DD/MM/YYYY HH:mm:ss')}</span>
                            </p>
                        </motion.div>
                    )}
                </Form>
            </motion.div>
        </Modal>
    );
};

export default EditMilestoneModal;