'use client';

import { Drawer, Form, Input, Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import { RequestForm } from '@/types/requests/form';
import { FormInstance, Rule } from 'antd/es/form';
import { apiMetaRulesLanguage } from '@/api/validation';
import { convertToAntdRules } from '@/utils/converter';
import { apiLanguageForm } from "@/api/form";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: ({ id, data }: { id?: number, data: RequestForm.Language }) => void;
    id?: number;
}

const FormLanguage = ({ open, onClose, onSubmit, id }: Props) => {
    const [form] = Form.useForm<RequestForm.Language>();
    const [rules, setRules] = useState<Record<string, Rule[]>>({});
    const [metaRulesRaw, setMetaRulesRaw] = useState<any[]>([]);

    useEffect(() => {
        apiMetaRulesLanguage().then(res => {
            setMetaRulesRaw(res.data);
        });
    }, []);

    useEffect(() => {
        if (!open) return;

        if (id) {
            apiLanguageForm(id).then((res) => {
                form.setFieldsValue(res.data);
                setRules(convertToAntdRules(metaRulesRaw, res.data, id));
            });
        } else {
            form.resetFields();
            setRules(convertToAntdRules(metaRulesRaw));
        }
    }, [open, id, metaRulesRaw]);

    const handleFinish = (values: RequestForm.Language) => {
        onSubmit({ id, data: values });
    };

    return (
        <Drawer
            title={id ? 'Cập nhật ngôn ngữ' : 'Thêm ngôn ngữ'}
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
                    onClose={onClose}
                />
            )}
        </Drawer>
    );
};

interface FormContentProps {
    id?: number;
    form: FormInstance<RequestForm.Language>;
    onFinish: (values: RequestForm.Language) => void;
    rules: Record<string, Rule[]>;
    onClose: () => void;
}

const FormContent = ({ id, form, onFinish, rules, onClose }: FormContentProps) => (
    <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Tên ngôn ngữ" hasFeedback rules={rules.name}>
            <Input placeholder='Tên ngôn ngữ...' />
        </Form.Item>
        <Form.Item name="iso" label="Mã ISO" hasFeedback rules={rules.iso}>
            <Input placeholder='Ví dụ: en, vi, ja...' />
        </Form.Item>
        <Form.Item>
            <Space>
                <Button htmlType="button" onClick={onClose}>
                    Hủy
                </Button>
                <Button type="primary" htmlType="submit">
                    {id ? 'Cập nhật' : 'Thêm'}
                </Button>
            </Space>
        </Form.Item>
    </Form>
);

export default FormLanguage;
