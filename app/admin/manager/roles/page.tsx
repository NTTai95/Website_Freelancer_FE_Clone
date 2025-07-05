'use client';

import { Button, Col, Flex, Input, Row } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import TableRole from './_ui/TableRole';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FormRole from './_ui/FormRole';
import { apiUpdateRole } from '@/api/update';
import { RequestForm } from '@/types/requests/form';
import { apiCreateRole } from '@/api/create';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import { addMessage } from '@/store/volatile/messageSlice';
import { useMeta } from '../_ui/type';
import ModalRole from './_ui/ModalRole'
import { PageContext } from './_ui/PageContext';

const ManagerRole = () => {
    const [search, setSearch] = useState<string>('');
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState<number | undefined>(undefined);
    const tableRef = useRef<{ reloadData: () => void }>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { setMeta } = useMeta();

    const handleEdit = useCallback((id: number) => {
        setId(id);
        setOpenDrawer(true);
    }, []);

    const handleDelete = useCallback((id: number) => {
        setId(id);
        setOpenModal(true);
    }, []);

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
        setId(undefined);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setId(undefined);
    }

    const handleSubmitRole = ({ id, data }: { id?: number, data: RequestForm.Role }) => {
        dispatch(showSpin());
        const isEdit = !!id;
        const apiCall = isEdit
            ? apiUpdateRole({ id, data })
            : apiCreateRole(data);

        apiCall.then(() => {
            tableRef.current?.reloadData()
            handleCloseDrawer();
            dispatch(addMessage({
                key: 'form-role',
                type: 'success',
                content: isEdit ? 'Cập nhật vai trò thành công' : 'Thêm vai trò thành công',
            }))
        }).catch(() => {
            dispatch(addMessage({
                key: 'form-role',
                type: 'error',
                content: isEdit ? 'Cập nhật vai trò thất bại' : 'Thêm vai trò thất bại',
            }))
        }).finally(() => {
            dispatch(hideSpin());
        })
    };

    useEffect(() => {
        setMeta("Quản lý vai trò");
    }, [setMeta]);

    const contextValue = useMemo(() => ({
        reloadData: () => tableRef.current?.reloadData()
    }), []);

    return (
        <PageContext.Provider value={contextValue}>
            <div className='!p-4'>
                <Row>
                    <Col span={8}>
                        <Input.Search allowClear onSearch={(e) => setSearch(e)} placeholder='Tìm kiếm vai trò...' />
                    </Col>
                    <Col span={16}>
                        <Flex justify='end' gap={20}>
                            <Button type='primary' onClick={() => setOpenDrawer(true)}><PlusCircleFilled /> Thêm vai trò mới</Button>
                        </Flex>
                    </Col>
                </Row>
            </div>
            <TableRole onDelete={handleDelete} ref={tableRef} keyword={search} onEdit={handleEdit} />
            <FormRole
                open={openDrawer}
                onClose={handleCloseDrawer}
                onSubmit={handleSubmitRole}
                id={id}
            />
            <ModalRole onClose={handleCloseModal} open={openModal} id={id} />
        </PageContext.Provider>
    );
};

export default ManagerRole;