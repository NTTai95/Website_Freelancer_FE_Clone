'use client';

import { Button, Col, Flex, Input, Row } from 'antd';
import TableMajor from './_ui/TableMajor';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FilterMajor from './_ui/FilterMajor';
import { PlusCircleFilled } from '@ant-design/icons';
import FormMajor from './_ui/FormMajor';
import { RequestForm } from '@/types/requests/form';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { apiUpdateMajor } from '@/api/update';
import { apiCreateMajor } from '@/api/create';
import { addMessage } from '@/store/volatile/messageSlice';
import { Status } from '@/types/status';
import ModalMajor from './_ui/ModalMajor';
import { useMeta } from '../layout';
import { PageContext } from './_ui/PageContext';

const ManagerMajor = () => {
    const [search, setSearch] = useState<string>('');
    const [status, setStatus] = useState<Status.Major | undefined>(undefined);
    const [id, setId] = useState<number | undefined>(undefined);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const tableRef = useRef<{ reloadData: () => void }>(null);
    const filterRef = useRef<{ reloadFilter: () => void }>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { setMeta } = useMeta();

    const handleFilter = ({ status }: { status?: Status.Major }) => {
        setStatus(status);
    };

    const handleEdit = useCallback((id: number) => {
        setId(id);
        setOpenDrawer(true);
    }, []);

    const handleInvalid = useCallback((id: number) => {
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

    const handleSubmitMajor = ({ id, data }: { id?: number, data: RequestForm.Major }) => {
        dispatch(showSpin());
        const isEdit = !!id;
        const apiCall = isEdit
            ? apiUpdateMajor({ id, data })
            : apiCreateMajor(data);

        apiCall.then(() => {
            tableRef.current?.reloadData();
            handleCloseDrawer();
            dispatch(addMessage({
                key: 'form-major',
                type: 'success',
                content: isEdit ? 'Cập nhật ngành nghề thanh công' : 'Thêm ngành nghề thành công',
            }))
        }).catch(() => {
            dispatch(addMessage({
                key: 'form-major',
                type: 'error',
                content: isEdit ? 'Cập nhật ngành nghề thất bại' : 'Thêm ngành nghề thất bại',
            }))
        }).finally(() => {
            dispatch(hideSpin());
        })
    };

    useEffect(() => {
        setMeta("Quản lý ngành nghề");
    }, [setMeta]);

    const contextValue = useMemo(() => ({
        reloadData: () => tableRef.current?.reloadData(),
        reloadFilter: () => filterRef.current?.reloadFilter()
    }), []);

    return (
        <PageContext.Provider value={contextValue}>
            <div className='!p-4'>
                <Row>
                    <Col span={8}>
                        <Input.Search allowClear onSearch={(e) => setSearch(e)} placeholder='Tìm kiếm ngành nghề...' />
                    </Col>
                    <Col span={16}>
                        <Flex justify='end' gap={20}>
                            <FilterMajor ref={filterRef} onChange={handleFilter} />
                            <Button type='primary' onClick={() => setOpenDrawer(true)}><PlusCircleFilled /> Thêm ngành nghề mới</Button>
                        </Flex>
                    </Col>
                </Row>
            </div>
            <TableMajor onInvalid={handleInvalid} ref={tableRef} keyword={search} status={status} onEdit={handleEdit} />
            <FormMajor
                open={openDrawer}
                onClose={handleCloseDrawer}
                onSubmit={handleSubmitMajor}
                id={id}
            />
            <ModalMajor onClose={handleCloseModal} open={openModal} id={id} />
        </PageContext.Provider>
    );
}; export default ManagerMajor;