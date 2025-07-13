"use client";

import { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, InputNumber, Upload, UploadFile, Row, Col } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";
import { motion } from "framer-motion";
import { useMilestones } from "../ContextMilestone";
import { apiPost } from "@/api/baseApi";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { addMessage } from "@/store/volatile/messageSlice";

dayjs.extend(customParseFormat);

const { TextArea } = Input;
const { Dragger } = Upload;

interface SplitMilestoneModalProps {
    visible: boolean;
    onCancel: () => void;
    milestone: any;
}

const SplitMilestoneModal = ({
    visible,
    onCancel,
    milestone,
}: SplitMilestoneModalProps) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { fetchData } = useMilestones();
    const [currentPercent, setCurrentPercent] = useState(milestone?.percent || 0);
    const [newPercent, setNewPercent] = useState(1);
    const dispatch = useDispatch<AppDispatch>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (visible && milestone) {
            form.resetFields();
            form.setFieldsValue({
                content: milestone.content,
                startAt: dayjs(milestone.startAt, "DD/MM/YYYY HH:mm:ss"),
                endAt: dayjs(milestone.endAt, "DD/MM/YYYY HH:mm:ss"),
                newPercent: 1,
            });
            setCurrentPercent(milestone.percent);
            setFileList([]);
        }
    }, [visible, milestone, form]);

    const normFile = (e: any) => {
        if (Array.isArray(e)) return e;
        return e && e.fileList;
    };

    const handleSubmit = async (values: any) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('content', values.content);
        formData.append('startAt', values.startAt.format("DD/MM/YYYY HH:mm:ss"));
        formData.append('endAt', values.endAt.format("DD/MM/YYYY HH:mm:ss"));
        formData.append('percent', values.newPercent);

        // Append files if any
        values.files?.forEach((file: any) => {
            formData.append('files', file.originFileObj);
        });

        apiPost(`/milestones/${milestone.id}/split`, formData).then(() => {
            dispatch(addMessage({
                key: 'success-message',
                type: 'success',
                content: 'Tách giai đoạn thành công',
            }));
            fetchData();
            onCancel();
        }).catch((error) => {
            dispatch(addMessage({
                key: 'error-message',
                type: 'error',
                content: 'Tách giai đoạn thất bại',
            }))
        }).finally(() => {
            setLoading(false);
        })
    };

    const validateStartDate = (_: any, value: dayjs.Dayjs) => {
        if (!value) return Promise.reject('Vui lòng chọn thời gian bắt đầu');
        if (value.isBefore(dayjs(), 'minute')) {
            return Promise.reject('Thời gian bắt đầu phải sau thời điểm hiện tại');
        }
        const originalStart = dayjs(milestone.startAt, "DD/MM/YYYY HH:mm:ss");
        if (value.isBefore(originalStart)) {
            return Promise.reject('Thời gian bắt đầu phải sau hoặc bằng ngày bắt đầu giai đoạn hiện tại');
        }
        return Promise.resolve();
    };

    const validateEndDate = (_: any, value: dayjs.Dayjs) => {
        if (!value) return Promise.reject('Vui lòng chọn thời gian kết thúc');
        const startAt = form.getFieldValue('startAt');
        if (startAt && value.isBefore(startAt)) {
            return Promise.reject('Thời gian kết thúc phải sau thời gian bắt đầu');
        }
        const originalEnd = dayjs(milestone.endAt, "DD/MM/YYYY HH:mm:ss");
        if (value.isAfter(originalEnd)) {
            return Promise.reject('Thời gian kết thúc phải trước hoặc bằng ngày kết thúc giai đoạn hiện tại');
        }
        return Promise.resolve();
    };

    const validateNewPercent = (_: any, value: number) => {
        if (value === undefined || value === null) {
            return Promise.reject('Vui lòng nhập tỷ trọng mới');
        }
        if (value <= 0) return Promise.reject('Tỷ trọng phải lớn hơn 0');
        if (value >= currentPercent) {
            return Promise.reject(`Tỷ trọng mới phải nhỏ hơn tỷ trọng hiện tại (${currentPercent}%)`);
        }
        return Promise.resolve();
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <Modal
            title={<span className="!text-xl !font-bold">Tách Giai đoạn</span>}
            open={visible}
            onCancel={onCancel}
            onOk={() => form.submit()}
            confirmLoading={loading}
            width={950}
            okText="Tách giai đoạn"
            cancelText="Hủy"
            rootClassName="!rounded-xl"
            classNames={{
                body: "!p-6",
                footer: "!bg-gray-50 !rounded-b-xl !py-4 !px-6 !flex !justify-end !space-x-3",
                mask: "!bg-black/30",
            }}
            okButtonProps={{
                className: "!bg-blue-600 !text-white !px-5 !py-2 !rounded-lg !font-medium !shadow-md"
            }}
            cancelButtonProps={{
                className: "!bg-white !text-gray-700 !border !border-gray-300 !px-5 !py-2 !rounded-lg !font-medium !shadow-sm"
            }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="!space-y-5"
                >
                    {/* Nội dung */}
                    <motion.div variants={itemVariants}>
                        <Form.Item
                            label={<span className="!font-medium !text-gray-700">Nội dung giai đoạn mới</span>}
                            name="content"
                            rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
                        >
                            <TextArea
                                rows={3}
                                placeholder="Mô tả công việc cho giai đoạn mới"
                                className="!rounded-lg !border-gray-300 hover:!border-blue-400 focus:!border-blue-500 !shadow-sm"
                            />
                        </Form.Item>
                    </motion.div>

                    {/* Thời gian */}
                    <motion.div variants={itemVariants}>
                        <Row gutter={16}>
                            <Col span={8}>
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
                                        disabledDate={(current) => {
                                            const originalStart = dayjs(milestone.startAt, "DD/MM/YYYY HH:mm:ss");
                                            const originalEnd = dayjs(milestone.endAt, "DD/MM/YYYY HH:mm:ss");
                                            return current && (
                                                current < dayjs().startOf('day') ||
                                                current < originalStart.startOf('day') ||
                                                current > originalEnd.endOf('day')
                                            );
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
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
                                            const originalEnd = dayjs(milestone.endAt, "DD/MM/YYYY HH:mm:ss");
                                            if (startAt) {
                                                return current && (
                                                    current < startAt.startOf('day') ||
                                                    current > originalEnd.endOf('day')
                                                );
                                            }
                                            return false;
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            {/* Tỷ trọng */}
                            <Col span={8}>
                                <Form.Item
                                    label={<span className="!font-medium !text-gray-700">Tỷ trọng giai đoạn mới (%)</span>}
                                    name="newPercent"
                                    rules={[
                                        { required: true },
                                        { validator: validateNewPercent }
                                    ]}
                                >
                                    <InputNumber
                                        min={1}
                                        max={currentPercent - 1}
                                        step={1}
                                        className="!w-full !rounded-lg !border-gray-300 hover:!border-blue-400 focus:!border-blue-500 !shadow-sm"
                                        onChange={(value) => {
                                            if (value !== null) {
                                                form.setFieldsValue({ newPercent: value });
                                                setNewPercent(value);
                                            }
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </motion.div>

                    {/* Upload file */}
                    <motion.div variants={itemVariants}>
                        <Form.Item
                            label={<span className="!font-medium !text-gray-700">Tệp đính kèm</span>}
                            name="files"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Dragger
                                multiple
                                beforeUpload={() => false}
                                fileList={fileList}
                                onChange={({ fileList }) => setFileList(fileList)}
                                className="!rounded-lg !bg-gray-50"
                            >
                                <p className="ant-upload-drag-icon !text-blue-500">
                                    <InboxOutlined className="!text-3xl" />
                                </p>
                                <p className="ant-upload-text !font-medium !text-gray-700">
                                    Kéo thả tệp vào đây hoặc nhấn để chọn
                                </p>
                                <p className="ant-upload-hint !text-gray-500">
                                    Hỗ trợ tải lên nhiều tệp cùng lúc
                                </p>
                            </Dragger>
                        </Form.Item>
                    </motion.div>

                    {/* Thông tin */}
                    <motion.div variants={itemVariants}>
                        <div className="!mt-4 !p-4 !bg-blue-50 !rounded-lg !border !border-blue-100 !shadow-sm">
                            <p className="!text-blue-700 !font-medium">
                                Sau khi tách:
                            </p>
                            <ul className="!list-disc !pl-5 !mt-2 !space-y-1">
                                <li className="!text-blue-700">
                                    Giai đoạn mới sẽ có tỷ trọng:
                                    <span className="!font-semibold"> {newPercent}%</span>
                                </li>
                                <li className="!text-blue-700">
                                    Giai đoạn hiện tại sẽ còn:
                                    <span className="!font-semibold"> {currentPercent - newPercent}%</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </motion.div>
            </Form>
        </Modal>
    );
};

export default SplitMilestoneModal;