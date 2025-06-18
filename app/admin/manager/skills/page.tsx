'use client';

import CardShadow from '@/components/ui/card-shadow';
import { Col, ConfigProvider, Flex, Input, Row, Select, Space } from 'antd';
import TableSkills from './_ui/TableSkill';
import { useState } from 'react';
import FilterSkill from './_ui/FilterSkill';

const ManagerSkill = () => {
    const [search, setSearch] = useState<string>('');
    const [majorId, setMajorId] = useState<number | undefined>(undefined);
    const [status, setStatus] = useState<'ACTIVE' | 'DELETE' | undefined>(undefined);

    const handleFilter = ({ majorId, status }: { majorId?: number, status?: 'ACTIVE' | 'DELETE' }) => {
        setMajorId(majorId);
        setStatus(status);
    };

    return (
        <ConfigProvider theme={{ components: { Card: { bodyPadding: 0 } } }}>
            <CardShadow>
                <div className='!p-4'>
                    <Row gutter={350}>
                        <Col span={12}>
                            <Input.Search onSearch={(e) => setSearch(e)} enterButton placeholder='Tìm kiếm kỹ năng...' />
                        </Col>
                        <Col span={12}>
                            <Flex justify='end'>
                                <FilterSkill onChange={handleFilter} />
                            </Flex>
                        </Col>
                    </Row>
                </div>
                <TableSkills keyword={search} majorId={majorId} status={status} />
            </CardShadow>
        </ConfigProvider>
    );
};

export default ManagerSkill;