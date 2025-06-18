import { useEffect, useState } from "react";
import { Select, Space } from "antd";
import { apiFilterSkill } from "@/api/filter";

const FilterSkill = ({
    onChange,
}: {
    onChange: (data: { majorId?: number; status?: "ACTIVE" | "DELETE" }) => void;
}) => {
    const [majorOptions, setMajorOptions] = useState<{ label: string; value: string }[]>([]);
    const [statusOptions, setStatusOptions] = useState<{ label: string; value: string }[]>([]);

    const [filters, setFilters] = useState<{ majorId?: number; status?: "ACTIVE" | "DELETE" }>({});

    useEffect(() => {
        const fetchFilter = async () => {
            const res = await apiFilterSkill();
            const majors = res.data.majorId.map((item: any) => ({
                label: `${item.label} (${item.count})`,
                value: item.value,
            }));
            const status = res.data.status.map((item: any) => ({
                label: `${item.value === 'ACTIVE' ? 'Đang hoạt động' : 'Đã xóa'} (${item.count})`,
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
        <Space size={"large"}>
            <Select
                allowClear
                style={{ width: 220 }}
                placeholder="Chọn chuyên ngành"
                options={majorOptions}
                onChange={(value) => handleChange(value, "majorId")}
            />
            <Select
                allowClear
                style={{ width: 180 }}
                placeholder="Chọn trạng thái"
                options={statusOptions}
                onChange={(value) => handleChange(value, "status")}
            />
        </Space>
    );
};

export default FilterSkill;
