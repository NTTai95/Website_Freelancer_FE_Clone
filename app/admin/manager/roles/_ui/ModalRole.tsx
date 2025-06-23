"use client";

import { Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addMessage } from "@/store/volatile/messageSlice";
import { apiDeleteRole } from "@/api/delete";
import { usePageContext } from "./PageContext";

const ModalRole = ({
    open,
    id,
    onClose
}: {
    open: boolean;
    id?: number;
    onClose: () => void;
}) => {
    const [deleting, setDeleting] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { reloadData } = usePageContext();

    const handleDelete = () => {
        if (!id) return;
        setDeleting(true);
        apiDeleteRole(id).then(() => {
            dispatch(addMessage(
                {
                    key: "delete-skill",
                    type: "success",
                    content: "Xóa vai trò thành công",
                }
            ))
            onClose();
            reloadData?.();
        }).catch(() => {
            dispatch(addMessage(
                {
                    key: "delete-skill",
                    type: "error",
                    content: "Xóa vai trò thất bại",
                }
            ))
        }).finally(() => {
            setDeleting(false);
        })
    };

    return (
        <Modal
            title="Xóa vai trò"
            open={open}
            onOk={handleDelete}
            onCancel={onClose}
            confirmLoading={deleting}
            maskClosable={false}
        >
            Bạn có chắc chắn muốn xóa vai trò này không?
        </Modal>
    );
}

export default ModalRole;