'use client';

import { Drawer, Form, Input, Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import { RequestForm } from '@/types/requests/form';
import { FormInstance, Rule } from 'antd/es/form';
import { apiMetaRulesMajor } from '@/api/validation';
import { convertToAntdRules } from '@/utils/converter';
import { apiMajorDetail } from '@/api/detail';

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: ({ id, data }: { id?: number, data: RequestForm.Major }) => void;
    id?: number;
}

const FormMajor = ({ open, onClose, onSubmit, id }: Props) => {
    const [form] = Form.useForm<RequestForm.Major>();
    const [rules, setRules] = useState<Record<string, Rule[]>>({});
    const [metaRulesRaw, setMetaRulesRaw] = useState<any[]>([]);

    useEffect(() => {
        apiMetaRulesMajor().then(res => {
            setMetaRulesRaw(res.data);
        });
    }, []);

    useEffect(() => {
        if (!open) return;

        if (id) {
            apiMajorDetail(id).then((res) => {
                form.setFieldsValue({ ...res.data });
                setRules(convertToAntdRules(metaRulesRaw, res.data, id));
            });
        } else {
            form.resetFields();
            setRules(convertToAntdRules(metaRulesRaw));
        }
    }, [open, id, metaRulesRaw]);

    const handleFinish = (values: RequestForm.Major) => {
        onSubmit({ id, data: values });
    };

    return (
        <Drawer
            title={id ? 'Cập nhật ngành nghề' : 'Thêm ngành nghề'}
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
    form: FormInstance<RequestForm.Major>;
    onFinish: (values: RequestForm.Major) => void;
    rules: Record<string, Rule[]>;
    onClose: () => void;
}

const FormContent = ({ id, form, onFinish, rules, onClose }: FormContentProps) => (
    <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Tên ngành nghề" hasFeedback rules={rules.name}>
            <Input placeholder='Tên ngành nghề...' />
        </Form.Item>
        <Form.Item name="description" label="Mô tả" hasFeedback rules={rules.description}>
            <Input.TextArea showCount rows={6} placeholder='Mô tả ngành nghề...' />
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

export default FormMajor;
