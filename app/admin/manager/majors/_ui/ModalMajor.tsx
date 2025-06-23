"use client";

import { apiImpactMajor } from "@/api/impact";
import { apiInvalidMajor } from "@/api/changeState";
import { ResponseImpact } from "@/types/respones/impact";
import { Alert, Button, Collapse, Modal, Skeleton, Space, Tag, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addMessage } from "@/store/volatile/messageSlice";
import { Status } from "@/types/status";
import { apiDeleteMajor } from "@/api/delete";
import { usePageContext } from "./PageContext";

const ModalMajor = ({
    open,
    id,
    onClose
}: {
    open: boolean;
    id?: number;
    onClose: () => void;
}) => {
    const [data, setData] = useState<ResponseImpact.Major>();
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { reloadData, reloadFilter } = usePageContext();

    useEffect(() => {
        if (!open || !id) return;
        setLoading(true);
        apiImpactMajor(id)
            .then((res) => setData(res.data))
            .finally(() => setLoading(false));
    }, [open, id]);

    const handleInvalid = () => {
        if (!id) return;
        setDeleting(true);
        apiInvalidMajor(id).then(() => {
            dispatch(addMessage(
                {
                    key: "invalid-major",
                    type: "success",
                    content: "Vô hiệu ngành nghề thành công",
                }
            ))
            onClose();
            reloadData?.();
            reloadFilter?.();
        }).catch(() => {
            dispatch(addMessage(
                {
                    key: "invalid-major",
                    type: "error",
                    content: "Vô hiệu ngành nghề thất bại",
                }
            ))
        }).finally(() => {
            setDeleting(false);
        })
    };

    const handleDelete = () => {
        if (!id) return;
        setDeleting(true);
        apiDeleteMajor(id).then(() => {
            dispatch(addMessage(
                {
                    key: "delete-permanently-major",
                    type: "success",
                    content: "Xóa ngành nghề thành công",
                }
            ))
            onClose();
            reloadData?.();
            reloadFilter?.();
        }).catch(() => {
            dispatch(addMessage(
                {
                    key: "delete-permanently-major",
                    type: "error",
                    content: "Xóa ngành nghề thất bại",
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
            key: '2',
            label: `Kỹ năng liên quan (${data?.skillsAffected.length || 0})`,
            children: (
                <div>
                    {data?.skillsAffected.map((skill) => (
                        <div key={skill.id} style={{ marginBottom: 8 }}>
                            <Typography.Text>{skill.name}</Typography.Text>{" "}
                            <Tag color={Status.Meta[skill.status].color}>
                                {Status.Meta[skill.status].label}
                            </Tag>
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <Modal
            title="Vô hiệu ngành nghề"
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
                        {data?.skillsAffected.length === 0 && (
                            <Tooltip title="Sẽ xóa ngành nghề khỏi hệ thống!">
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
                                Bạn có chắc chắn muốn vô hiệu ngành nghề{" "}
                                <Typography.Text strong>{data?.name}</Typography.Text>?
                            </>
                        }
                        description={
                            <>
                                Ngành nghề này đang liên kết với{" "}
                                <Typography.Text strong>{data?.activeJobsAffected?.length}</Typography.Text> công
                                việc đang hoạt động và có{" "}
                                <Typography.Text strong>{data?.skillsAffected.length}</Typography.Text> kỹ năng liên quan.
                            </>
                        }
                    />

                    <Collapse ghost items={collapseItems} />
                </Space>
            </Skeleton>
        </Modal>
    );
}

export default ModalMajor;