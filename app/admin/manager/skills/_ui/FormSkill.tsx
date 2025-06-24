// app\admin\manager\skills\page.tsx
'use client';

import { Drawer, Form, Input, Button, Space, Select } from 'antd';
import { useEffect, useState } from 'react';
import { RequestForm } from '@/types/requests/form';
import { apiListMajor } from '@/api/list';
import { ResponseList } from '@/types/respones/list';
import { FormInstance, Rule } from 'antd/es/form';
import { apiMetaRulesSkill } from '@/api/validation';
import { convertToAntdRules } from '@/utils/converter';
import { apiSkillForm } from "@/api/form";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: ({ id, data }: { id?: number, data: RequestForm.Skill }) => void;
    id?: number
}

const FormSkill = ({ open, onClose, onSubmit, id }: Props) => {
    const [form] = Form.useForm<RequestForm.Skill>();
    const [rules, setRules] = useState<Record<string, Rule[]>>({});
    const [majorOptions, setMajorOptions] = useState<{ value: number; label: string }[]>([]);
    const [metaRulesRaw, setMetaRulesRaw] = useState<any[]>([]);

    useEffect(() => {
        apiMetaRulesSkill().then(res => {
            setMetaRulesRaw(res.data);
        });

        apiListMajor().then((res) => {
            setMajorOptions(res.data.map((major: ResponseList.Major) => ({
                value: major.id,
                label: major.name,
            })));
        });
    }, []);

    useEffect(() => {
        if (!open) return;

        if (id) {
            apiSkillForm(id).then((res) => {
                form.setFieldsValue(res.data);
                setRules(convertToAntdRules(metaRulesRaw, res.data, id));
            });
        } else {
            form.resetFields();
            setRules(convertToAntdRules(metaRulesRaw));
        }
    }, [open, id, metaRulesRaw]);

    const handleFinish = (values: RequestForm.Skill) => {
        onSubmit({ id, data: values });
    };

    return (
        <Drawer
            title={id ? 'Cập nhật kỹ năng' : 'Thêm kỹ năng'}
            open={open}
            onClose={onClose}
            width={500}
        >
            {open && (
                <FormContent
                    id={id}
                    form={form}
                    onFinish={handleFinish}
                    rules={rules}
                    majorOptions={majorOptions}
                    onClose={onClose}
                />
            )}
        </Drawer>
    );
};

interface FormContentProps {
    id?: number;
    form: FormInstance<RequestForm.Skill>;
    onFinish: (values: RequestForm.Skill) => void;
    rules: Record<string, Rule[]>;
    majorOptions: { value: number; label: string }[];
    onClose: () => void;
}

const FormContent = ({ id, form, onFinish, rules, majorOptions, onClose }: FormContentProps) => (
    <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Tên kỹ năng" hasFeedback rules={rules.name}>
            <Input placeholder='Tên kỹ năng...' />
        </Form.Item>
        <Form.Item name="majorId" label="ngành nghề" hasFeedback rules={rules.majorId}>
            <Select placeholder="Chọn ngành nghề">
                {majorOptions.map((option: { value: number; label: string }) => (
                    <Select.Option key={option.value} value={option.value}>
                        {option.label}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
        <Form.Item name="description" label="Mô tả" hasFeedback rules={rules.description}>
            <Input.TextArea showCount rows={6} placeholder='Mô tả kỹ năng...' />
        </Form.Item>
        <Form.Item>
            <Space>
                <Button htmlType="button" onClick={() => onClose()}>
                    Hủy
                </Button>
                <Button type="primary" htmlType="submit">
                    {id ? 'Cập nhật' : 'Thêm'}
                </Button>
            </Space>
        </Form.Item>
    </Form>
);

export default FormSkill;
