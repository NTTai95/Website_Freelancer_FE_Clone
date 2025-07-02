import { List, Card, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CertificationItem from './CertificationItem';
import { Certification, CertificationListProps } from './types';

const CertificationList = ({ certifications, onAdd, onEdit, onDelete }: CertificationListProps) => {
    return (
        <Card className="!rounded-lg !shadow-sm">
            <div className="!flex !justify-between !items-center !mb-4">
                <h3 className="!text-lg !font-semibold !m-0">Chứng chỉ</h3>
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    className="!flex !items-center"
                    onClick={onAdd}
                >
                    Thêm chứng chỉ
                </Button>
            </div>
            <List
                dataSource={certifications}
                renderItem={(cert) => (
                    <CertificationItem
                        key={cert.id}
                        cert={cert}
                        onEdit={() => onEdit(cert)}
                        onDelete={() => onDelete(cert.id)}
                    />
                )}
            />
        </Card>
    );
};

export default CertificationList;