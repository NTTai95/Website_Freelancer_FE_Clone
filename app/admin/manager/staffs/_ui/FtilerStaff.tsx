import { useEffect, useState } from "react";
import { Select } from "antd";
import { apiFilterClient, apiFilterStaff } from "@/api/filter";
import { Status } from "@/types/status";

const FilterClient = ({
    onChange,
}: {
    onChange: (data: { roleId?: number; status?: Status.User }) => void;
}) => {
    const [roleOptions, setRoleOptions] = useState<{ label: string; value: string }[]>([]);
    const [statusOptions, setStatusOptions] = useState<{ label: string; value: string }[]>([]);

    const [filters, setFilters] = useState<{ roleId?: number; status?: Status.User }>({});

    useEffect(() => {
        const fetchFilter = async () => {
            const res = await apiFilterStaff();
            const role = res.data.roleId.map((item: any) => ({
                label: `${item.label} (${item.count})`,
                value: item.value,
            }));
            const status = res.data.status.map((item: any) => ({
                label: `${Status.Meta[item.value].label} (${item.count})`,
                value: item.value,
            }));
            setRoleOptions(role);
            setStatusOptions(status);
        };

        fetchFilter();
    }, []);

    const handleChange = (value: string | undefined, key: "roleId" | "status") => {
        const newFilters = {
            ...filters,
            [key]: key === "roleId" && value ? Number(value) : value || undefined,
        };

        setFilters(newFilters);
        onChange(newFilters);
    };

    return (
        <>
            <Select
                allowClear
                placeholder="Chọn vai trò"
                options={roleOptions}
                onChange={(value) => handleChange(value, "roleId")}
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

export default FilterClient;
