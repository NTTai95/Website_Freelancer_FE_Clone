'use client';

import { Button, Col, Flex, Input, Row } from 'antd';
import TableLanguage from './_ui/TableLanguage';
import { useState } from 'react';
import FilterLanguage from './_ui/FilterLanguage';
import { useRouter } from 'next/navigation';
import { PlusCircleFilled } from '@ant-design/icons';

const ManagerSkill = () => {
    const [search, setSearch] = useState<string>('');
    const [status, setStatus] = useState<'ACTIVE' | 'DELETE' | undefined>(undefined);

    const router = useRouter();

    const handleFilter = ({ status }: { status?: 'ACTIVE' | 'DELETE' }) => {
        setStatus(status);
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
                            <Button type='primary' onClick={() => { router.replace("./skills/add") }}><PlusCircleFilled /> Thêm kỹ năng mới</Button>
                        </Flex>
                    </Col>
                </Row>
            </div>
            <TableLanguage keyword={search} status={status} />
        </>
    );
};

export default ManagerSkill;