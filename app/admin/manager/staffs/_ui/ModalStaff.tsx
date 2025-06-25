"use client";

import { apiInvalidStaff } from "@/api/changeState";
import { Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addMessage } from "@/store/volatile/messageSlice";
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
    const [deleting, setDeleting] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { reloadData, reloadFilter } = usePageContext();

    const handleInvalid = () => {
        if (!id) return;
        setDeleting(true);
        apiInvalidStaff(id).then(() => {
            dispatch(addMessage(
                {
                    key: "invalid-staff",
                    type: "success",
                    content: "Vô hiệu nhân viên thành công",
                }
            ))
            onClose();
            reloadData?.();
            reloadFilter?.();
        }).catch(() => {
            dispatch(addMessage(
                {
                    key: "invalid-staff",
                    type: "error",
                    content: "Vô hiệu nhân viên thất bại",
                }
            ))
        }).finally(() => {
            setDeleting(false);
        })
    };

    return (
        <Modal
            title="Vô hiệu nhân viên"
            open={open}
            onOk={handleInvalid}
            onCancel={onClose}
            confirmLoading={deleting}
        >
            Bạn có chắc chắn muốn vô hiệu nhân viên này không?
        </Modal>
    );
}

export default ModalMajor;