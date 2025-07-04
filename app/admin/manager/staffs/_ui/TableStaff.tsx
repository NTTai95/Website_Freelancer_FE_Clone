import { Table, TablePaginationConfig } from "antd";
import { forwardRef, memo, useEffect, useImperativeHandle, useState } from "react";
import { motion } from "framer-motion"
import { useColumnStaff } from "./ColumnStaff";
import { ResponseRecord } from "@/types/respones/record";
import { RequestPage } from "@/types/requests/page";
import { apiPageClient, apiPageStaff } from "@/api/page";

const TableStaff = ({ keyword, roleId, status, onEdit, onInvalid }: RequestPage.User & { onEdit: (id: number) => void, onInvalid: (id: number) => void }, ref: React.Ref<{ reloadData: () => void }>) => {
    const [data, setData] = useState<ResponseRecord.Staff[]>([]);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const [loading, setLoading] = useState(false);

    const fetchData = async ({ page = 1, sortField = 'id', sortType = 'ascend' }: RequestPage.User) => {
        setLoading(true);
        try {
            const res = await apiPageStaff({ page, size: 5, keyword, roleId, status, sortField, sortType });
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

    const columns = useColumnStaff({ keyword: keyword || "", onEdit: onEdit, onInvalid: onInvalid });

    useEffect(() => {
        fetchData({});
    }, [keyword, roleId, status]);

    const handleTableChange = (pagination: TablePaginationConfig, filter: any, sorter: any) => {
        fetchData({ page: pagination.current, sortField: sorter.field, sortType: sorter.order });
    };

    useImperativeHandle(ref, () => ({
        reloadData: () => {
            fetchData({ page: pagination.current });
        },
    }));

    return (<Table
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
    />)
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

export default memo(forwardRef(TableStaff));
