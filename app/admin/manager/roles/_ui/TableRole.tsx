"use client";

import { forwardRef, memo, useEffect, useImperativeHandle, useState } from "react";
import { Table } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import { motion } from "framer-motion";
import { apiPageRole } from "@/api/page";
import type { ResponseRecord } from "@/types/respones/record";
import { useRoleColumns } from "./ColumnRole";
import { RequestPage } from "@/types/requests/page";

const TableRole = (
    { keyword, onEdit, onDelete }: RequestPage.Role & { onEdit: (id: number) => void, onDelete: (id: number) => void },
    ref: React.Ref<{ reloadData: () => void }>
) => {
    const [data, setData] = useState<ResponseRecord.Role[]>([]);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 5,
        total: 0,
    });

    const [loading, setLoading] = useState(false);

    const fetchData = async ({ page = 1, sortField = 'name', sortType = 'ascend' }: RequestPage.Role) => {
        setLoading(true);
        try {
            const res = await apiPageRole({ page, size: 5, keyword, sortField, sortType });
            setData(res.data.content);
            setPagination({
                current: res.data.number + 1,
                pageSize: res.data.size,
                total: res.data.totalElements,
            });
        } finally {
            setLoading(false);
        }
    };

    const columns = useRoleColumns({ keyword: keyword || "", onEdit: onEdit, onDelete: onDelete });

    useEffect(() => {
        fetchData({});
    }, [keyword]);

    const handleTableChange = (pagination: TablePaginationConfig, filter: any, sorter: any) => {
        fetchData({ page: pagination.current, sortField: sorter.field, sortType: sorter.order });
    };

    useImperativeHandle(ref, () => ({
        reloadData: () => {
            fetchData({ page: pagination.current });
        },
    }));

    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            components={{
                body: {
                    row: (props: any) => {
                        const index = data.findIndex((item) => item.id === props["data-row-key"]);
                        return <AnimatedRow props={props} index={index} key={props["data-row-key"]} />
                    },
                },
            }}
        />
    );
}

const AnimatedRow = ({ props, index }: { props: any; index: number }) => {
    return (
        <motion.tr
            initial={{ opacity: 0, x: 15 }}
            animate={{
                opacity: [0, 0, 1],
                x: [15, 15, 0],
            }}
            transition={{
                duration: 0.6,
                delay: index * 0.03,
                ease: "easeOut",
                times: [0, 0.4, 1],
            }}
            {...props}
        />
    );
};

export default memo(forwardRef(TableRole));
