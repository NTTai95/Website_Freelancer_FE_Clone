import { Form } from 'antd';
import { useContext, useState } from 'react';
import { Education } from './types';
import EducationList from './EducationList';
import ProfileContext from '../ProfileContext';
import EducationModal from './EducationModal';

import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/store/volatile/messageSlice';

import { apiDelete, apiPost, apiPut } from '@/api/baseApi';
import dayjs from 'dayjs';

export default function EducationsSection({
    educations
}: {
    educations: Education[];
}) {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingEdu, setEditingEdu] = useState<Education | null>(null);
    const [loading, setLoading] = useState(false);
    const { reloadData } = useContext(ProfileContext);
    const dispatch = useDispatch<AppDispatch>();

    const showAddModal = () => {
        setEditingEdu(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const showEditModal = (edu: Education) => {
        setEditingEdu(edu);
        form.setFieldsValue({
            ...edu,
            startDate: dayjs(edu.startDate),
            endDate: edu.endDate ? dayjs(edu.endDate) : null,
        });
        setIsModalVisible(true);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            const payload: any = {
                schoolName: values.schoolName,
                degree: values.degree,
                major: values.major,
                gpa: values.gpa,
                startDate: values.startDate.format('DD/MM/YYYY'),
                endDate: values.endDate ? values.endDate.format('DD/MM/YYYY') : null,
                description: values.description || null,
            };

            if (editingEdu) {
                payload.id = editingEdu.id;
                const response = await apiPut(`profile/education/${editingEdu.id}`, payload);
                dispatch(addMessage({
                    content: (response.data as any).message || 'Cập nhật học vấn thành công',
                    type: 'success',
                    key: "certification-update"
                }));
            } else {
                const response = await apiPost('profile/education', payload);
                dispatch(addMessage({
                    content: (response.data as any).message || 'Thêm học vấn thành công',
                    type: 'success',
                    key: "education-add"
                }));
            }

            setIsModalVisible(false);
            reloadData();
        } catch (error: any) {
            console.error('Error saving certification:', error);
            dispatch(addMessage({
                content: error?.data?.message || 'Đã xảy ra lỗi khi lưu học vấn',
                type: 'error',
                key: "certification-add"
            }));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await apiDelete(`profile/education/${id}`);
            dispatch(addMessage({ content: 'Xóa học vấn thành công', type: 'success', key: "education-delete" }));
            reloadData();
        } catch (error) {
            dispatch(addMessage({ content: 'Đã xảy ra lỗi khi xóa học vấn', type: 'error', key: "education-delete" }));
        }
    };

    return (
        <>
            <EducationList
                educations={educations}
                onAdd={showAddModal}
                onEdit={showEditModal}
                onDelete={handleDelete}
            />
            <EducationModal
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={() => setIsModalVisible(false)}
                loading={loading}
                editingEdu={editingEdu}
                form={form}
            />
        </>
    );
}