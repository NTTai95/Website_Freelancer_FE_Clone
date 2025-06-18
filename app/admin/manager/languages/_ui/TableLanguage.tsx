import { useEffect, useState } from "react";
import { Input, Table } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import { motion } from "framer-motion";
import { apiPageLanguage } from "@/api/page";
import type { ResponseRecord } from "@/types/respones/record";
import { useLanguageColumns } from "./languageColumns";
import { RequestPage } from "@/types/requests/page";

const TableLanguage = ({ keyword, status }: RequestPage.Language) => {
    const [data, setData] = useState<ResponseRecord.Language[]>([]);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const columns = useLanguageColumns({ keyword: keyword || "" });

    const [loading, setLoading] = useState(false);

    const fetchData = async ({ page = 1, sortField = 'name', sortType = 'ascend' }: RequestPage.Language) => {
        setLoading(true);
        try {
            const res = await apiPageLanguage({ page, size: 5, keyword, status, sortField, sortType });
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

    useEffect(() => {
        fetchData({});
    }, [keyword, status]);

    const handleTableChange = (pagination: TablePaginationConfig, filter: any, sorter: any) => {
        fetchData({ page: pagination.current, sortField: sorter.field, sortType: sorter.order });
    };

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
};

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

export default TableLanguage;
