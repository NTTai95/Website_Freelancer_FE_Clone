"use client";

import { Card, Button, Tag, Modal, Form, Select } from 'antd';
import { GlobalOutlined, EditOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { apiListLanguage } from '@/api/list';
import { apiPut } from '@/api/baseApi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { showSpin, hideSpin } from '@/store/volatile/spinSlice';
import { addMessage } from '@/store/volatile/messageSlice';
import ProfileContext from './ProfileContext';

export default function LanguagesSection({
    languages
}: {
    languages: any[];
}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [allLanguages, setAllLanguages] = useState<{ label: string, value: number }[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const { reloadData } = useContext(ProfileContext);

    useEffect(() => {
        if (isModalVisible) {
            apiListLanguage().then((res) => {
                const langs = res.data.map((lang: any) => ({
                    label: lang.name,
                    value: lang.id,
                }));
                setAllLanguages(langs);

                form.setFieldsValue({
                    languages: languages.map(lang => lang.id),
                });
            });
        }
    }, [languages, isModalVisible]);

    const handleSave = async (languages: any) => {
        dispatch(showSpin());

        try {
            await apiPut("profile/update/languages", languages);
            dispatch(addMessage({
                key: "update-languages",
                type: "success",
                content: "Cập nhật ngôn ngữ thành công!",
            }));
            reloadData();
            setIsModalVisible(false);
        } catch {
            dispatch(addMessage({
                key: "update-languages",
                type: "error",
                content: "Cập nhật ngôn ngữ thất bại!",
            }));
        } finally {
            dispatch(hideSpin());
        }
    };

    return (
        <>
            <Card className="!rounded-lg !shadow-sm">
                <div className="!flex !justify-between !items-center !mb-4">
                    <h3 className="!text-lg !font-semibold !m-0">Ngôn ngữ</h3>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        className="!flex !items-center"
                        onClick={() => setIsModalVisible(true)}
                    >
                        Chỉnh sửa
                    </Button>
                </div>
                <div className="!flex !flex-wrap !gap-2">
                    {languages?.map((lang, index) => (
                        <Tag
                            key={index}
                            color="green"
                            icon={<GlobalOutlined />}
                            className="!m-0 !py-1 !px-3 !rounded-md"
                        >
                            {lang.name}
                        </Tag>
                    ))}
                    {languages?.length === 0 && (
                        <span className="!text-gray-400">Chưa thêm ngôn ngữ</span>
                    )}
                </div>
            </Card>

            <Modal
                title="Chỉnh sửa ngôn ngữ"
                open={isModalVisible}
                onOk={() => form.submit()}
                onCancel={() => setIsModalVisible(false)}
                okText="Lưu"
                cancelText="Hủy"
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item name="languages" label="Ngôn ngữ">
                        <Select
                            mode="multiple"
                            placeholder="Chọn ngôn ngữ"
                            className="!w-full"
                            showSearch
                        >
                            {allLanguages.map(lang => (
                                <Select.Option key={lang.value} value={lang.value}>
                                    {lang.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
