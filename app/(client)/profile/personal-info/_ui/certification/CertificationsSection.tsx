import { useState, useContext } from 'react';
import { Form, message } from 'antd';
import dayjs from 'dayjs';
import { apiPut, apiPost, apiDelete } from '@/api/baseApi';
import ProfileContext from '../ProfileContext';
import CertificationList from './CertificationsList';
import CertificationModal from './CertificationModal';
import { Certification } from './types';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/store/volatile/messageSlice';

interface CertificationsSectionProps {
    certifications: Certification[];
}

const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCert, setEditingCert] = useState<Certification | null>(null);
    const [loading, setLoading] = useState(false);
    const [frontImage, setFrontImage] = useState<string | undefined>();
    const [backImage, setBackImage] = useState<string | undefined>();
    const { reloadData } = useContext(ProfileContext);
    const dispatch = useDispatch<AppDispatch>();

    const showAddModal = () => {
        setEditingCert(null);
        setFrontImage(undefined);
        setBackImage(undefined);
        form.resetFields();
        setIsModalVisible(true);
    };

    const showEditModal = (cert: Certification) => {
        setEditingCert(cert);
        setFrontImage(cert.frontImage);
        setBackImage(cert.backImage);
        form.setFieldsValue({
            ...cert,
            issueDate: cert.issueDate ? dayjs(cert.issueDate, 'DD/MM/YYYY') : null,
            expiryDate: cert.expiryDate ? dayjs(cert.expiryDate, 'DD/MM/YYYY') : null,
        });
        setIsModalVisible(true);
    };

    const handleImageChange = (file: File, isFront: boolean) => {
        return new Promise<void>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (isFront) {
                    setFrontImage(result);
                } else {
                    setBackImage(result);
                }
                resolve();
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (isFront: boolean) => {
        if (isFront) {
            setFrontImage(undefined);
        } else {
            setBackImage(undefined);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            const payload: any = {
                name: values.name,
                issueBy: values.issueBy,
                issueDate: values.issueDate.format('DD/MM/YYYY'),
                expiryDate: values.expiryDate ? values.expiryDate.format('DD/MM/YYYY') : null,
                link: values.link || null,
            };

            if (frontImage === undefined) {
                payload.frontImage = null;
            } else if (frontImage && frontImage.startsWith('data:image')) {
                payload.frontImage = frontImage;
            }

            if (backImage === undefined) {
                payload.backImage = null;
            } else if (backImage && backImage.startsWith('data:image')) {
                payload.backImage = backImage;
            }

            if (editingCert) {
                payload.id = editingCert.id;
                const response = await apiPut(`profile/certification/${editingCert.id}`, payload);
                dispatch(addMessage({
                    content: (response.data as any).message || 'Cập nhật chứng chỉ thành công',
                    type: 'success',
                    key: "certification-update"
                }));
            } else {
                const response = await apiPost('profile/certification', payload);
                dispatch(addMessage({
                    content: (response.data as any).message || 'Thêm chứng chỉ thành công',
                    type: 'success',
                    key: "certification-add"
                }));
            }

            setIsModalVisible(false);
            reloadData();
        } catch (error: any) {
            console.error('Error saving certification:', error);
            dispatch(addMessage({
                content: error?.data?.message || 'Đã xảy ra lỗi khi lưu chứng chỉ',
                type: 'error',
                key: "certification-add"
            }));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await apiDelete(`profile/certification/${id}`);
            dispatch(addMessage({ content: 'Xóa chứng chỉ thành công', type: 'success', key: "certification-delete" }));
            reloadData();
        } catch (error) {
            dispatch(addMessage({ content: 'Đã xảy ra lỗi khi xóa chứng chỉ', type: 'error', key: "certification-delete" }));
        }
    };

    return (
        <>
            <CertificationList
                certifications={certifications}
                onAdd={showAddModal}
                onEdit={showEditModal}
                onDelete={handleDelete}
            />
            <CertificationModal
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={() => setIsModalVisible(false)}
                loading={loading}
                editingCert={editingCert}
                form={form}
                frontImage={frontImage}
                backImage={backImage}
                onImageChange={handleImageChange}
                onRemoveImage={handleRemoveImage}
            />
        </>
    );
};

export default CertificationsSection;