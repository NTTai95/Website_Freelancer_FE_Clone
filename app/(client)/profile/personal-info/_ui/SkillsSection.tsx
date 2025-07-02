"use client";

import { Card, Button, Tag, Modal, Form, Select, Tooltip } from 'antd';
import { CodeOutlined, EditOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { apiListSkill } from '@/api/list';
import { apiPut } from '@/api/baseApi';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import ProfileContext from './ProfileContext';
import { addMessage } from '@/store/volatile/messageSlice';

export default function SkillsSection({
    skills,
}: {
    skills: any[];
}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [allSkills, setAllSkills] = useState<{ label: string, value: number, description: string }[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const { reloadData } = useContext(ProfileContext);

    useEffect(() => {
        if (isModalVisible) {
            apiListSkill().then((res) => {
                const skillsList = res.data.map((skill: any) => ({
                    label: skill.name,
                    value: skill.id,
                    description: skill.description,
                }));
                setAllSkills(skillsList);

                form.setFieldsValue({
                    skills: skills.map(skill => skill.id),
                });
            });
        }
    }, [skills, isModalVisible]);


    const handleSave = async (skills: any) => {
        dispatch(showSpin());

        try {
            await apiPut("profile/update/skills", skills);
            dispatch(addMessage({
                key: "update-skills",
                type: "success",
                content: "Cập nhật kỹ năng thành công!",
            }));
            reloadData();
            setIsModalVisible(false);
        } catch {
            dispatch(addMessage({
                key: "update-skills",
                type: "error",
                content: "Cập nhật kỹ năng thất bại!",
            }));
        } finally {
            dispatch(hideSpin());
        }
    };

    return (
        <>
            <Card className="!rounded-lg !shadow-sm">
                <div className="!flex !justify-between !items-center !mb-4">
                    <h3 className="!text-lg !font-semibold !m-0">Kỹ năng</h3>
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
                    {skills?.map((skill, index) => (
                        <Tag
                            key={index}
                            color="blue"
                            icon={<CodeOutlined />}
                            className="!m-0 !py-1 !px-3 !rounded-md"
                        >
                            {skill.name}
                        </Tag>
                    ))}
                    {skills?.length === 0 && (
                        <span className="!text-gray-400">Chưa thêm kỹ năng</span>
                    )}
                </div>
            </Card>

            <Modal
                title="Chỉnh sửa kỹ năng"
                open={isModalVisible}
                onOk={() => form.submit()}
                onCancel={() => setIsModalVisible(false)}
                okText="Lưu"
                cancelText="Hủy"
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item name="skills" label="Kỹ năng">
                        <Select
                            mode="multiple"
                            placeholder="Chọn kỹ năng"
                            className="!w-full"
                            showSearch
                        >
                            {allSkills.map(skill => (
                                <Select.Option key={skill.value} value={skill.value}>
                                    <Tooltip title={skill.description} key={skill.value}>
                                        <p>{skill.label}</p>
                                    </Tooltip>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}