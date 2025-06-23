"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Input, Row, Col, Flex, Button, } from "antd";
import TableStaff from "./_ui/TableStaff";
import { Status } from "@/types/status";
import FilterStaff from "./_ui/FtilerStaff";
import { useMeta } from "../layout";
import { PlusCircleFilled } from "@ant-design/icons";
import FormStaff from "./_ui/FormStaff";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { hideSpin, showSpin } from "@/store/volatile/spinSlice";
import { apiUpdateStaff } from "@/api/update";
import { apiCreateStaff } from "@/api/create";
import { addMessage } from "@/store/volatile/messageSlice";
import { RequestForm } from "@/types/requests/form";

const UserManagementPage: React.FC = () => {
    const [search, setSearch] = useState("");
    const [roleId, setRoleId] = useState<number | undefined>(undefined);
    const [status, setStatus] = useState<Status.User | undefined>(undefined);
    const [id, setId] = useState<number | undefined>(undefined);
    const [openDrawer, setOpenDrawer] = useState(false);
    const { setMeta } = useMeta();
    const dispatch = useDispatch<AppDispatch>();

    const handleEdit = useCallback((id: number) => {
        setId(id);
        setOpenDrawer(true);
    }, []);

    const handleFilter = ({ roleId, status }: { roleId?: number, status?: Status.User }) => {
        setRoleId(roleId);
        setStatus(status);
    };

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
        setId(undefined);
    };

    useEffect(() => {
        setMeta("Quản lý nhân viên");
    }, []);

    const handleSubmitStaff = ({ id, data }: { id?: number, data: RequestForm.Staff }) => {
        console.log("submit");
        dispatch(showSpin());
        const isEdit = !!id;
        const apiCall = isEdit
            ? apiUpdateStaff({ id, data })
            : apiCreateStaff(data);

        apiCall.then(() => {
            handleCloseDrawer();
            dispatch(addMessage({
                key: 'form-staff',
                type: 'success',
                content: isEdit ? 'Cập nhật nhân viên thành công' : 'Thêm nhân viên thành công',
            }))
        }).catch(() => {
            dispatch(addMessage({
                key: 'form-staff',
                type: 'error',
                content: isEdit ? 'Cập nhật nhân viên thất bại' : 'Thêm nhân viên thất bại',
            }))
        }).finally(() => {
            dispatch(hideSpin());
        })
    };

    return (
        <>
            <div className='!p-4'>
                <Row>
                    <Col span={8}>
                        <Input.Search allowClear onSearch={(e) => setSearch(e)} placeholder='Tìm kiếm nhân viên...' />
                    </Col>
                    <Col span={16}>
                        <Flex justify='end' gap={20}>
                            <FilterStaff onChange={handleFilter} />
                            <Button type='primary' onClick={() => setOpenDrawer(true)}><PlusCircleFilled /> Thêm nhân viên mới</Button>
                        </Flex>
                    </Col>
                </Row>
            </div>
            <FormStaff
                open={openDrawer}
                onClose={handleCloseDrawer}
                onSubmit={handleSubmitStaff}
                id={id}
            />
            <TableStaff keyword={search} roleId={roleId} status={status} onEdit={handleEdit} />
        </>
    );
};

export default UserManagementPage;
