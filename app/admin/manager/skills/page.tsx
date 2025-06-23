// app\admin\manager\skills\page.tsx
'use client';

import { Button, Col, Flex, Input, Row } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import TableSkills from './_ui/TableSkill';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FilterSkill from './_ui/FilterSkill';
import FormSkill from './_ui/FormSkill';
import { apiUpdateSkill } from '@/api/update';
import { RequestForm } from '@/types/requests/form';
import { apiCreateSkill } from '@/api/create';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import { addMessage } from '@/store/volatile/messageSlice';
import { Status } from '@/types/status';
import ModalSkill from './_ui/ModalSkill';
import { useMeta } from "../layout";
import { PageContext } from './_ui/PageContext';

const ManagerSkill = () => {
    const [search, setSearch] = useState<string>('');
    const [majorId, setMajorId] = useState<number | undefined>(undefined);
    const [status, setStatus] = useState<Status.Skill | undefined>(undefined);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState<number | undefined>(undefined);
    const tableRef = useRef<{ reloadData: () => void }>(null);
    const filterRef = useRef<{ reloadFilter: () => void }>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { setMeta } = useMeta();

    const handleFilter = ({ majorId, status }: { majorId?: number, status?: Status.Skill }) => {
        setMajorId(majorId);
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
    };

    const handleSubmitSkill = ({ id, data }: { id?: number, data: RequestForm.Skill }) => {
        dispatch(showSpin());
        const isEdit = !!id;
        const apiCall = isEdit
            ? apiUpdateSkill({ id, data })
            : apiCreateSkill(data);

        apiCall.then(() => {
            handleCloseDrawer();
            tableRef.current?.reloadData();
            filterRef.current?.reloadFilter();
            dispatch(addMessage({
                key: 'form-kill',
                type: 'success',
                content: isEdit ? 'Cập nhật kỹ năng thành công' : 'Thêm kỹ năng thành công',
            }))
        }).catch(() => {
            dispatch(addMessage({
                key: 'form-kill',
                type: 'error',
                content: isEdit ? 'Cập nhật kỹ năng thất bại' : 'Thêm kỹ năng thất bại',
            }))
        }).finally(() => {
            dispatch(hideSpin());
        })
    };

    useEffect(() => {
        setMeta("Quản lý kỹ năng");
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
                        <Input.Search allowClear onSearch={(e) => setSearch(e)} placeholder='Tìm kiếm kỹ năng...' />
                    </Col>
                    <Col span={16}>
                        <Flex justify='end' gap={20}>
                            <FilterSkill ref={filterRef} onChange={handleFilter} />
                            <Button type='primary' onClick={() => setOpenDrawer(true)}><PlusCircleFilled /> Thêm kỹ năng mới</Button>
                        </Flex>
                    </Col>
                </Row>
            </div>
            <TableSkills ref={tableRef} onInvalid={handleInvalid} keyword={search} majorId={majorId} status={status} onEdit={handleEdit} />
            <FormSkill
                open={openDrawer}
                onClose={handleCloseDrawer}
                onSubmit={handleSubmitSkill}
                id={id}
            />
            <ModalSkill onClose={handleCloseModal} open={openModal} id={id} />
        </PageContext.Provider>
    );
};

export default ManagerSkill;