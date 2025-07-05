"use client";
import React, { useEffect, useState } from "react";
import { Input, Row, Col, Flex, } from "antd";
import TableClient from "./_ui/TableClient";
import { Status } from "@/types/status";
import FilterClient from "./_ui/FiltreClient";
import { useMeta } from '../_ui/type';

const UserManagementPage: React.FC = () => {
    const [search, setSearch] = useState("");
    const [roleId, setRoleId] = useState<number | undefined>(undefined);
    const [status, setStatus] = useState<Status.User | undefined>(undefined);
    const { setMeta } = useMeta();

    const handleFilter = ({ roleId, status }: { roleId?: number, status?: Status.User }) => {
        setRoleId(roleId);
        setStatus(status);
    };

    useEffect(() => {
        setMeta("Quản lý người dùng");
    }, []);

    return (
        <>
            <div className='!p-4'>
                <Row>
                    <Col span={8}>
                        <Input.Search allowClear onSearch={(e) => setSearch(e)} placeholder='Tìm kiếm người dùng...' />
                    </Col>
                    <Col span={16}>
                        <Flex justify='end' gap={20}>
                            <FilterClient onChange={handleFilter} />
                        </Flex>
                    </Col>
                </Row>
            </div>
            <TableClient keyword={search} roleId={roleId} status={status} />
        </>
    );
};

export default UserManagementPage;
