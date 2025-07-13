// JobSearchBar.tsx
import { Input, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Status } from '@/types/status';
import { useAuthorization } from '@/hooks/useAuthorization';

const { Option } = Select;

interface JobSearchBarProps {
    searchText: string;
    setSearchText: (text: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    setCurrentPage: (page: number) => void;
    handleSearch: (values: any) => void;
}

export const JobSearchBar = ({
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    setCurrentPage,
    handleSearch
}: JobSearchBarProps) => {

    const hasRole = useAuthorization();

    const auth = useAuthorization();

    const STATUSES = [
        'PUBLIC',
        auth.hasRole(["ROLE_NHA_TUYEN_DUNG"]) ? 'DRAFT' : null,
        'PREPARING',
        'PRIVATE',
        'IN_PROGRESS',
        'COMPLETED',
        'CANCELED',
    ].filter(Boolean) as string[];


    return (
        <div className="!bg-white !rounded-xl !shadow-sm !p-5 !mb-8">
            <div className="!flex justify-between">
                <Input.Search
                    placeholder="Tìm kiếm theo tiêu đề hoặc mô tả"
                    onSearch={handleSearch}
                    className="!flex-1 !max-w-xl"
                    size="large"
                    allowClear
                    enterButton
                />
                <div className="!flex gap-x-4">
                    <Select
                        value={statusFilter}
                        onChange={(value) => {
                            setStatusFilter(value);
                            setCurrentPage(1);
                        }}
                        size="large"
                        className="!w-full md:!w-48"
                        placeholder="Lọc theo trạng thái"
                    >
                        {STATUSES.map(status => (
                            <Option key={status} value={status}>
                                {Status.Meta[status.toUpperCase()].label}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    );
};