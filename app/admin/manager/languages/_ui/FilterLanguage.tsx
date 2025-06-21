import { useEffect, useState } from "react";
import { Select } from "antd";
import { apiFilterLanguage } from "@/api/filter";
import { Status } from "@/types/status";

const FilterLanguage = ({
    onChange,
}: {
    onChange: (data: { status?: Status.Language }) => void;
}) => {
    const [statusOptions, setStatusOptions] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        const fetchFilter = async () => {
            apiFilterLanguage().then((res) => {
                const status = res.data.status.map((item: any) => ({
                    label: `${Status.Meta[item.value].label} (${item.count})`,
                    value: item.value,
                }));
                setStatusOptions(status);
            })
        };

        fetchFilter();
    }, []);

    const handleChange = (value: Status.Language) => {
        onChange({ status: value });
    };

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

export default FilterLanguage;
