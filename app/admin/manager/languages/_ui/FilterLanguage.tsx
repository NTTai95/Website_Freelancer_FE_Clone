import { useEffect, useState } from "react";
import { Select } from "antd";
import { apiFilterSkill } from "@/api/filter";

const FilterLanguage = ({
    onChange,
}: {
    onChange: (data: { status?: "ACTIVE" | "DELETE" }) => void;
}) => {
    const [statusOptions, setStatusOptions] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        const fetchFilter = async () => {
            apiFilterSkill().then((res) => {
                const status = res.data.status.map((item: any) => ({
                    label: `${item.value === 'ACTIVE' ? 'Đang hoạt động' : 'Đã xóa'} (${item.count})`,
                    value: item.value,
                }));
                setStatusOptions(status);
            })
        };

        fetchFilter();
    }, []);

    const handleChange = (value: "ACTIVE" | "DELETE") => {
        onChange({ status: value });
    };

    return (
        <Select
            allowClear
            style={{ width: 180 }}
            placeholder="Chọn trạng thái"
            options={statusOptions}
            onChange={(value) => handleChange(value)}
        />
    );
};

export default FilterLanguage;
