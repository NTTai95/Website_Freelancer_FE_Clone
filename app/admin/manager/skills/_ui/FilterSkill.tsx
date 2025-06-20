import { useEffect, useState } from "react";
import { Select } from "antd";
import { apiFilterSkill } from "@/api/filter";
import { Status } from "@/types/status";

const FilterSkill = ({
    onChange,
}: {
    onChange: (data: { majorId?: number; status?: Status.Skill }) => void;
}) => {
    const [majorOptions, setMajorOptions] = useState<{ label: string; value: string }[]>([]);
    const [statusOptions, setStatusOptions] = useState<{ label: string; value: string }[]>([]);

    const [filters, setFilters] = useState<{ majorId?: number; status?: Status.Skill }>({});

    useEffect(() => {
        const fetchFilter = async () => {
            const res = await apiFilterSkill();
            const majors = res.data.majorId.map((item: any) => ({
                label: `${item.label} (${item.count})`,
                value: item.value,
            }));
            const status = res.data.status.map((item: any) => ({
                label: `${Status.Meta[item.value].label} (${item.count})`,
                value: item.value,
            }));
            setMajorOptions(majors);
            setStatusOptions(status);
        };

        fetchFilter();
    }, []);

    const handleChange = (value: string | undefined, key: "majorId" | "status") => {
        const newFilters = {
            ...filters,
            [key]: key === "majorId" && value ? Number(value) : value || undefined,
        };

        setFilters(newFilters);
        onChange(newFilters);
    };

    return (
        <>
            <Select
                allowClear
                placeholder="Chọn ngành nghề"
                options={majorOptions}
                onChange={(value) => handleChange(value, "majorId")}
                className={"w-60"}
            />
            <Select
                allowClear
                placeholder="Chọn trạng thái"
                options={statusOptions}
                onChange={(value) => handleChange(value, "status")}
                className={"w-45"}
            />
        </>
    );
};

export default FilterSkill;
