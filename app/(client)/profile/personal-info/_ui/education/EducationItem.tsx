import { Button, List, Popconfirm } from "antd";
import { EducationItemProps } from "./types";
import { BookOutlined, CalendarOutlined, DeleteOutlined, EditOutlined, StarFilled } from "@ant-design/icons";
import dayjs from "dayjs";

const EducationItem = ({ edu, onEdit, onDelete }: EducationItemProps) => {

    const formatDate = (date: string | Date | null) => {
        if (!date) return '';
        return dayjs(date).format('DD/MM/YYYY');
    };

    return (
        <List.Item
            key={edu.id}
            actions={[
                <Button
                    key="edit"
                    type="text"
                    icon={<EditOutlined />}
                    className="!text-blue-500"
                    onClick={onEdit}
                />,
                <Popconfirm
                    key="delete"
                    title="Bạn có chắc chắn muốn xóa chứng chỉ này?"
                    onConfirm={onDelete}
                    okText="Xóa"
                    cancelText="Hủy"
                    placement="topRight"
                >
                    <Button
                        type="text"
                        shape="circle"
                        danger
                        icon={<DeleteOutlined />}
                        className="!w-8 !h-8 !flex !items-center !justify-center hover:!bg-red-50"
                    />
                </Popconfirm>
            ]}
        >
            <div className="flex items-start !mb-3">
                <div className="!mr-4 flex items-center justify-center !mt-1">
                    <div className="bg-blue-100 !p-3 rounded-full flex items-center justify-center">
                        <BookOutlined className="text-xl !text-blue-600" />
                    </div>
                </div>

                <div className="flex-1">
                    <div>
                        <span className={"font-bold text-base"}>{edu.degree}</span>
                        {edu.major && <span className="text-blue-600 text-base"> • {edu.major}</span>}
                        <p className="text-gray-600 text-sm font-normal">{edu.schoolName}</p>
                    </div>

                    <div className="flex flex-wrap items-center text-gray-500">
                        <CalendarOutlined className="!mr-1.5 text-gray-400" />
                        <span>
                            {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Hiện tại'}
                        </span>

                        {edu.gpa !== null && edu.gpa !== undefined && (
                            <>
                                <span className="!mx-3 text-gray-300">•</span>
                                <div className="flex items-center">
                                    <StarFilled className="!mr-1.5 !text-yellow-400" />
                                    <span>GPA: <span className="font-medium">{edu.gpa}</span></span>
                                </div>
                            </>
                        )}
                    </div>

                    {edu.description && (
                        <div className="!mt-1">
                            <p className="text-gray-600 leading-relaxed"><span className="font-semibold">Mô tả: </span>{edu.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </List.Item>
    );
}

export default EducationItem;