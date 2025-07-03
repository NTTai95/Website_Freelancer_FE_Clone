import { List, Tag, Image, Button, Popconfirm, Typography, Row, Col } from 'antd';
import { TrophyOutlined, EditOutlined, DeleteOutlined, EyeOutlined, LinkOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Certification, CertificationItemProps } from './types';

const { Text } = Typography;

const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    const date = dayjs(dateString, 'DD/MM/YYYY');
    return date.isValid() ? date.format('DD/MM/YYYY') : 'N/A';
};

const CertificationItem = ({ cert, onEdit, onDelete }: CertificationItemProps) => {
    return (
        <List.Item
            actions={[
                <Button
                    key="edit"
                    type="text"
                    shape="circle"
                    icon={<EditOutlined className="!text-blue-500" />}
                    className="!w-8 !h-8 !flex !items-center !justify-center hover:!bg-blue-50"
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
            <div className="!flex !w-full">
                <div className="!mr-4">
                    <div className="!p-3 !bg-gradient-to-br !from-yellow-50 !to-amber-100 !rounded-lg">
                        <TrophyOutlined className="!text-2xl !text-amber-500" />
                    </div>
                </div>

                <div className="!flex-1 !min-w-0">
                    <div className="!flex !items-center !gap-2 !mb-2">
                        <Text strong ellipsis className="!text-lg !text-gray-800 !m-0">
                            {cert.name}
                        </Text>
                        {cert.status === 'EXPIRED' && (
                            <Tag
                                color="red"
                                className="!text-xs !font-medium !px-2 !py-0.5 !leading-5 !m-0"
                            >
                                HẾT HẠN
                            </Tag>
                        )}
                    </div>

                    <div className="!flex flex-col items-start">
                        <div className="w-full">
                            <Text type="secondary">
                                Cấp bởi:
                            </Text>
                            <Text ellipsis className="!ml-1 !font-normal">
                                {cert.issueBy}
                            </Text>
                        </div>

                        {cert.expiryDate && (
                            <Row gutter={32}>
                                <Col>
                                    <Text type="secondary">
                                        Hết hạn:
                                    </Text>
                                    <Text className="!ml-1 !font-medium !text-gray-800">
                                        {formatDate(cert.expiryDate)}
                                    </Text>
                                </Col>
                                <Col>
                                    <Text type="secondary">
                                        Ngày cấp:
                                    </Text>
                                    <Text className="!ml-1 !font-medium !text-gray-800">
                                        {formatDate(cert.issueDate)}
                                    </Text>
                                </Col>
                            </Row>
                        )}
                    </div>

                    {cert.link && (
                        <div className="!mt-3">
                            <Button
                                icon={<LinkOutlined />}
                                type="link"
                                href={cert.link}
                                target="_blank"
                                className="!p-0 !text-blue-500 hover:!text-blue-700 !font-medium !text-sm"
                            >
                                Xem chứng chỉ
                            </Button>
                        </div>
                    )}

                    {(cert.frontImage || cert.backImage) && (
                        <div className="!mt-4">
                            <Text strong className="!block !mb-2 !text-gray-700">
                                Hình ảnh chứng chỉ:
                            </Text>
                            <div className="!flex !gap-4">
                                {cert.frontImage && (
                                    <div className="!relative !border !border-gray-200 !rounded-lg !overflow-hidden">
                                        <Image
                                            width={120}
                                            src={cert.frontImage}
                                            alt="Mặt trước chứng chỉ"
                                            className="!block"
                                            preview={{
                                                mask: (
                                                    <div className="!flex !items-center !justify-center !gap-1 !text-white">
                                                        <EyeOutlined /> Xem trước
                                                    </div>
                                                ),
                                            }}
                                        />
                                        <div className="!absolute !bottom-0 !left-0 !right-0 !bg-black/50 !text-white !text-center !text-xs !py-1">
                                            Mặt trước
                                        </div>
                                    </div>
                                )}
                                {cert.backImage && (
                                    <div className="!relative !border !border-gray-200 !rounded-lg !overflow-hidden">
                                        <Image
                                            width={120}
                                            src={cert.backImage}
                                            alt="Mặt sau chứng chỉ"
                                            className="!block"
                                            preview={{
                                                mask: (
                                                    <div className="!flex !items-center !justify-center !gap-1 !text-white">
                                                        <EyeOutlined /> Xem trước
                                                    </div>
                                                ),
                                            }}
                                        />
                                        <div className="!absolute !bottom-0 !left-0 !right-0 !bg-black/50 !text-white !text-center !text-xs !py-1">
                                            Mặt sau
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </List.Item>
    );
};

export default CertificationItem;