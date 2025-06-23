"use client";

import { apiImpactLanguage } from "@/api/impact";
import { apiInvalidLanguage } from "@/api/changeState";
import { ResponseImpact } from "@/types/respones/impact";
import { Alert, Button, Collapse, Modal, Skeleton, Space, Tag, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addMessage } from "@/store/volatile/messageSlice";
import { Status } from "@/types/status";
import { apiDeleteLanguage } from "@/api/delete";
import { usePageContext } from "./PageContext";

const ModalLanguage = ({
    open,
    id,
    onClose
}: {
    open: boolean;
    id?: number;
    onClose: () => void;
}) => {
    const [data, setData] = useState<ResponseImpact.Language>();
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { reloadData, reloadFilter } = usePageContext();

    useEffect(() => {
        if (!open || !id) return;
        setLoading(true);
        apiImpactLanguage(id)
            .then((res) => setData(res.data))
            .finally(() => setLoading(false));
    }, [open, id]);

    const handleInvalid = () => {
        if (!id) return;
        setDeleting(true);
        apiInvalidLanguage(id).then(() => {
            dispatch(addMessage(
                {
                    key: "invalid-language",
                    type: "success",
                    content: "Vô hiệu ngôn ngữ thành công",
                }
            ))
            onClose();
            reloadData?.();
            reloadFilter?.();
        }).catch(() => {
            dispatch(addMessage(
                {
                    key: "invalid-language",
                    type: "error",
                    content: "Vô hiệu ngôn ngữ thất bại",
                }
            ))
        }).finally(() => {
            setDeleting(false);
        })
    };

    const handleDelete = () => {
        if (!id) return;
        setDeleting(true);
        apiDeleteLanguage(id).then(() => {
            dispatch(addMessage(
                {
                    key: "delete-permanently-language",
                    type: "success",
                    content: "Xóa ngôn ngữ thành công",
                }
            ))
            onClose();
            reloadData?.();
            reloadFilter?.();
        }).catch(() => {
            dispatch(addMessage(
                {
                    key: "delete-permanently-language",
                    type: "error",
                    content: "Xóa ngôn ngữ thất bại",
                }
            ))
        }).finally(() => {
            setDeleting(false);
        })
    }

    const collapseItems = [
        {
            key: '1',
            label: `Công việc bị ảnh hưởng (${data?.activeJobsAffected.length || 0})`,
            children: (
                <div>
                    {data?.activeJobsAffected.map((job) => (
                        <div key={job.id} style={{ marginBottom: 8 }}>
                            <Typography.Text strong>{job.title}</Typography.Text>{" "}
                            <Tag color={Status.Meta[job.status].color}>{Status.Meta[job.status].label}</Tag>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            key: "2",
            label: `Freelancer bị ảnh hưởng (${data?.freelancersAffected.length || 0})`,
            children: (
                <div>
                    {data?.freelancersAffected.map((freelancer) => (
                        <div
                            key={freelancer.id}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "12px 0",
                                borderBottom: "1px solid #f0f0f0",
                            }}
                        >
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                                <div style={{ flex: 1, minWidth: 220 }}>
                                    <Typography.Text strong ellipsis style={{ display: 'block', maxWidth: '100%' }}>
                                        {freelancer.fullName}
                                    </Typography.Text>
                                    <Typography.Text type="secondary" ellipsis style={{ display: 'block', maxWidth: '100%' }}>
                                        {freelancer.email}
                                    </Typography.Text>
                                </div>

                                <div>
                                    <Tag color={Status.Meta[freelancer.status].color}>
                                        {Status.Meta[freelancer.status].label}
                                    </Tag>
                                </div>

                                <div>
                                    <Typography.Text>
                                        Số ngôn ngữ còn lại:{" "}
                                        <Typography.Text strong>{freelancer.remainingCount}</Typography.Text>
                                    </Typography.Text>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <Modal
            title="Vô hiệu ngôn ngữ"
            open={open}
            onOk={handleInvalid}
            onCancel={onClose}
            confirmLoading={deleting}
            maskClosable={false}
            footer={() => (
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Button onClick={onClose}>
                        Hủy
                    </Button>
                    <Space>
                        <Button type="primary" danger loading={deleting} onClick={handleInvalid}>
                            Vô hiệu
                        </Button>
                        {data?.activeJobsAffected.length === 0 && (
                            <Tooltip title="Sẽ xóa ngôn ngữ khỏi hệ thống!">
                                <Button danger onClick={handleDelete}>
                                    Xóa
                                </Button>
                            </Tooltip>
                        )}
                    </Space>
                </Space>
            )}
        >
            <Skeleton loading={loading} active paragraph={{ rows: 4 }}>
                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                    <Alert
                        type="warning"
                        showIcon
                        icon={<ExclamationCircleOutlined />}
                        message={
                            <>
                                Bạn có chắc chắn muốn vô hiệu ngôn ngữ{" "}
                                <Typography.Text strong>{data?.name}</Typography.Text>?
                            </>
                        }
                        description={
                            <>
                                ngôn ngữ này đang liên kết với{" "}
                                <Typography.Text strong>{data?.activeJobsAffected?.length}</Typography.Text> công
                                việc đang hoạt động và có{" "}
                                <Typography.Text strong>{data?.freelancersAffected.length}</Typography.Text> freelancer đang sử dụng ngôn ngữ này.
                            </>
                        }
                    />
                    <Collapse ghost items={collapseItems} />
                </Space>
            </Skeleton>
        </Modal>
    );
}

export default ModalLanguage;