// app\admin\manager\skills\_ui\TableSkill.tsx
"use client";

import { apiImpactSkill } from "@/api/impact";
import { apiInvalidSkill } from "@/api/changeState";
import { ResponseImpact } from "@/types/respones/impact";
import { Alert, Button, Collapse, Modal, Skeleton, Space, Tag, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addMessage } from "@/store/volatile/messageSlice";
import { Status } from "@/types/status";
import { apiDeleteSkill } from "@/api/delete";
import { usePageContext } from "./PageContext";

const ModalSkill = ({
    open,
    id,
    onClose
}: {
    open: boolean;
    id?: number;
    onClose: () => void;
}) => {
    const [data, setData] = useState<ResponseImpact.Skill>();
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { reloadData, reloadFilter } = usePageContext();

    useEffect(() => {
        if (!open || !id) return;
        setLoading(true);
        apiImpactSkill(id)
            .then((res) => setData(res.data))
            .finally(() => setLoading(false));
    }, [open, id]);

    const handleInvalid = () => {
        if (!id) return;
        setDeleting(true);
        apiInvalidSkill(id).then(() => {
            dispatch(addMessage(
                {
                    key: "invalid-skill",
                    type: "success",
                    content: "Vô hiệu kỹ năng thành công",
                }
            ))
            onClose();
            reloadData?.();
            reloadFilter?.();
        }).catch(() => {
            dispatch(addMessage(
                {
                    key: "invalid-skill",
                    type: "error",
                    content: "Vô hiệu kỹ năng thất bại",
                }
            ))
        }).finally(() => {
            setDeleting(false);
        })
    };

    const handleDelete = () => {
        if (!id) return;
        setDeleting(true);
        apiDeleteSkill(id).then(() => {
            dispatch(addMessage(
                {
                    key: "delete-skill",
                    type: "success",
                    content: "Xóa kỹ năng thành công",
                }
            ))
            onClose();
            reloadData?.();
            reloadFilter?.();
        }).catch(() => {
            dispatch(addMessage(
                {
                    key: "delete-skill",
                    type: "error",
                    content: "Xóa kỹ năng thất bại",
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
                                        Số kỹ năng còn lại:{" "}
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
            title="Vô hiệu kỹ năng"
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
                            <Tooltip title="Sẽ xóa kỹ năng khỏi hệ thống!">
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
                                Bạn có chắc chắn muốn vô hiệu kỹ năng{" "}
                                <Typography.Text strong>{data?.name}</Typography.Text>?
                            </>
                        }
                        description={
                            <>
                                Ngành nghề này đang liên kết với{" "}
                                <Typography.Text strong>{data?.activeJobsAffected?.length}</Typography.Text> công
                                việc đang hoạt động và có{" "}
                                <Typography.Text strong>{data?.freelancersAffected.length}</Typography.Text> freelancer đang sử dụng kỹ năng này.
                            </>
                        }
                    />
                    <Collapse ghost items={collapseItems} />
                </Space>
            </Skeleton>
        </Modal>
    );
}

export default ModalSkill;