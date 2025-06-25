import { forwardRef, memo, useEffect, useImperativeHandle, useState } from "react";
import { Select } from "antd";
import { apiFilterMajor } from "@/api/filter";
import { Status } from "@/types/status";

const FilterMajor = ({
    onChange,
}: {
    onChange: (data: { status?: Status.Major }) => void
}, ref: React.Ref<{ reloadFilter: () => void }>) => {
    const [statusOptions, setStatusOptions] = useState<{ label: string; value: string }[]>([]);

    const fetchFilter = async () => {
        apiFilterMajor().then((res) => {
            const status = res.data.status.map((item: any) => ({
                label: `${Status.Meta[item.value].label} (${item.count})`,
                value: item.value,
            }));
            setStatusOptions(status);
        })
    };

    useEffect(() => {
        fetchFilter();
    }, []);

    const handleChange = (value: Status.Major) => {
        onChange({ status: value });
    };

    useImperativeHandle(ref, () => ({
        reloadFilter: () => {
            fetchFilter();
        },
    }));

    return (
        <Select
            allowClear
            placeholder="Chọn trạng thái"
            options={statusOptions}
            onChange={(value) => handleChange(value)}
            className={"w-45"}
        />
    );
};

export default memo(forwardRef(FilterMajor));
