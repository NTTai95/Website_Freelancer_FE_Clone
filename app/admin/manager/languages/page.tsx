'use client';

import { Button, Col, Flex, Input, Row } from 'antd';
import TableLanguage from './_ui/TableLanguage';
import { useCallback, useRef, useState } from 'react';
import FilterLanguage from './_ui/FilterLanguage';
import { PlusCircleFilled } from '@ant-design/icons';
import FormLanguage from './_ui/FormLanguage';
import { RequestForm } from '@/types/requests/form';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { apiUpdateLanguage } from '@/api/update';
import { apiCreateLanguage } from '@/api/create';
import { addMessage } from '@/store/volatile/messageSlice';
import { Status } from '@/types/status';
import ModalLanguage from './_ui/ModalLanguage';

const ManagerLanguage = () => {
    const [search, setSearch] = useState<string>('');
    const [status, setStatus] = useState<Status.Language | undefined>(undefined);
    const [id, setId] = useState<number | undefined>(undefined);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const tableRef = useRef<{ reload: () => void }>(null);
    const dispatch = useDispatch<AppDispatch>();

    const handleFilter = ({ status }: { status?: Status.Language }) => {
        setStatus(status);
    };

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

    const handleSubmitLanguage = ({ id, data }: { id?: number, data: RequestForm.Language }) => {
        dispatch(showSpin());
        const isEdit = !!id;
        const apiCall = isEdit
            ? apiUpdateLanguage({ id, data })
            : apiCreateLanguage(data);

        apiCall.then(() => {
            tableRef.current?.reload()
            handleCloseDrawer();
            dispatch(addMessage({
                key: 'form-langauge',
                type: 'success',
                content: isEdit ? 'Cập nhật ngôn ngữ thanh công' : 'Thêm ngôn ngữ thành công',
            }))
        }).catch(() => {
            dispatch(addMessage({
                key: 'form-langauge',
                type: 'error',
                content: isEdit ? 'Cập nhật ngôn ngữ thất bại' : 'Thêm ngôn ngữ thất bại',
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
                        <Input.Search allowClear onSearch={(e) => setSearch(e)} enterButton placeholder='Tìm kiếm ngôn ngữ...' />
                    </Col>
                    <Col span={16}>
                        <Flex justify='end' gap={20}>
                            <FilterLanguage onChange={handleFilter} />
                            <Button type='primary' onClick={() => setOpenDrawer(true)}><PlusCircleFilled /> Thêm ngôn ngữ mới</Button>
                        </Flex>
                    </Col>
                </Row>
            </div>
            <TableLanguage onDelete={handleDelete} ref={tableRef} keyword={search} status={status} onEdit={handleEdit} />
            <FormLanguage
                open={openDrawer}
                onClose={handleCloseDrawer}
                onSubmit={handleSubmitLanguage}
                id={id}
            />
            <ModalLanguage onReload={() => tableRef.current?.reload()} onClose={handleCloseModal} open={openModal} id={id} />
        </>
    );
};

export default ManagerLanguage;