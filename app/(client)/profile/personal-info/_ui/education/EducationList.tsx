import { Button, Card, List } from "antd";
import { EducationListProps } from "./types";
import { EditOutlined } from "@ant-design/icons";
import EducationModal from "./EducationModal";
import EducationItem from "./EducationItem";

const EducationList = ({ educations, onAdd, onEdit, onDelete }: EducationListProps) => {
    return (
        <Card className="!rounded-lg !shadow-sm">
            <div className="!flex !justify-between !items-center !mb-4">
                <h3 className="!text-lg !font-semibold !m-0">Học vấn</h3>
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    className="!flex !items-center"
                    onClick={onAdd}
                >
                    Thêm học vấn
                </Button>
            </div>

            <List
                dataSource={educations}
                renderItem={(edu) => (
                    <EducationItem edu={edu} onEdit={() => onEdit(edu)}
                        onDelete={() => onDelete(edu.id)} />
                )}
            />
        </Card>
    );
};

export default EducationList;