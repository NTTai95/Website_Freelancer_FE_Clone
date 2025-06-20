'use client';

import { Button, Col, Flex, Input, Row } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import TableSkills from './_ui/TableSkill';
import { useCallback, useRef, useState } from 'react';
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

const ManagerSkill = () => {
    const [search, setSearch] = useState<string>('');
    const [majorId, setMajorId] = useState<number | undefined>(undefined);
    const [status, setStatus] = useState<Status.Skill | undefined>(undefined);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState<number | undefined>(undefined);
    const tableRef = useRef<{ reload: () => void }>(null);
    const dispatch = useDispatch<AppDispatch>();

    const handleFilter = ({ majorId, status }: { majorId?: number, status?: Status.Skill }) => {
        setMajorId(majorId);
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

    const handleSubmitSkill = ({ id, data }: { id?: number, data: RequestForm.Skill }) => {
        dispatch(showSpin());
        const isEdit = !!id;
        const apiCall = isEdit
            ? apiUpdateSkill({ id, data })
            : apiCreateSkill(data);

        apiCall.then(() => {
            tableRef.current?.reload()
            handleCloseDrawer();
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

    return (
        <>
            <div className='!p-4'>
                <Row>
                    <Col span={8}>
                        <Input.Search allowClear onSearch={(e) => setSearch(e)} enterButton placeholder='Tìm kiếm kỹ năng...' />
                    </Col>
                    <Col span={16}>
                        <Flex justify='end' gap={20}>
                            <FilterSkill onChange={handleFilter} />
                            <Button type='primary' onClick={() => setOpenDrawer(true)}><PlusCircleFilled /> Thêm kỹ năng mới</Button>
                        </Flex>
                    </Col>
                </Row>
            </div>
            <TableSkills onDelete={handleDelete} ref={tableRef} keyword={search} majorId={majorId} status={status} onEdit={handleEdit} />
            <FormSkill
                open={openDrawer}
                onClose={handleCloseDrawer}
                onSubmit={handleSubmitSkill}
                id={id}
            />
            <ModalSkill onReload={() => tableRef.current?.reload()} onClose={handleCloseModal} open={openModal} id={id} />
        </>
    );
};

export default ManagerSkill;