import { Input, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

interface JobSearchBarProps {
    searchText: string;
    setSearchText: (text: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    setCurrentPage: (page: number) => void;
    handleSearch: () => void;
}

export const JobSearchBar = ({
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    setCurrentPage,
    handleSearch
}: JobSearchBarProps) => {
    const STATUSES = [
        'DRAFT',
        'PUBLIC',
        'PRIVATE',
        'IN_PROGRESS',
        'COMPLETED',
        'CANCELED',
    ] as const;

    return (
        <div className="!bg-white !rounded-xl !shadow-sm !p-5 !mb-8">
            <div className="!flex justify-between">
                <Input
                    placeholder="Tìm kiếm theo tiêu đề hoặc mô tả"
                    prefix={<SearchOutlined className="!text-gray-400" />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onPressEnter={handleSearch}
                    className="!flex-1 !max-w-xl"
                    size="large"
                    allowClear
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
                        <Option value="all">Tất cả trạng thái</Option>
                        {STATUSES.map(status => (
                            <Option key={status} value={status}>
                                {status}
                            </Option>
                        ))}
                    </Select>
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        size="large"
                        onClick={handleSearch}
                        className="!bg-blue-600 hover:!bg-blue-700 !shadow-md"
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </div>
        </div>
    );
};