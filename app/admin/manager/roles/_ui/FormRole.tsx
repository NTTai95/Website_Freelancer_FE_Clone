'use client';

import { Drawer, Form, Input, Button, Space, Checkbox, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { RequestForm } from '@/types/requests/form';
import { apiListPermission } from '@/api/list';
import { ResponseList } from '@/types/respones/list';
import { FormInstance, Rule } from 'antd/es/form';
import { apiMetaRulesRole } from '@/api/validation';
import { convertToAntdRules } from '@/utils/converter';
import { apiRoleForm } from "@/api/form";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: ({ id, data }: { id?: number, data: RequestForm.Role }) => void;
    id?: number
}

const FormRole = ({ open, onClose, onSubmit, id }: Props) => {
    const [form] = Form.useForm<RequestForm.Role>();
    const [rules, setRules] = useState<Record<string, Rule[]>>({});
    const [permissionOptions, setPermissionOptions] = useState<{ value: number; label: string }[]>([]);
    const [metaRulesRaw, setMetaRulesRaw] = useState<any[]>([]);

    useEffect(() => {
        apiMetaRulesRole().then(res => {
            setMetaRulesRaw(res.data);
        });

        apiListPermission().then((res) => {
            const sortedPermissions = res.data
                .map((permission: ResponseList.Permission) => ({
                    value: permission.id,
                    label: permission.name,
                }))
                .sort((a, b) =>
                    a.label[0].toLowerCase().localeCompare(b.label[0].toLowerCase(), 'vi')
                );

            setPermissionOptions(sortedPermissions);
        });
    }, []);

    useEffect(() => {
        if (!open) return;

        if (id) {
            apiRoleForm(id).then((res) => {
                form.setFieldsValue(res.data);
                setRules(convertToAntdRules(metaRulesRaw, res.data, id));
            });
        } else {
            form.resetFields();
            setRules(convertToAntdRules(metaRulesRaw));
        }
    }, [open, id, metaRulesRaw]);

    const handleFinish = (values: RequestForm.Role) => {
        onSubmit({ id, data: values });
    };

    return (
        <Drawer
            title={id ? 'Cập nhật vai trò' : 'Thêm vai trò'}
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
                    permissionOptions={permissionOptions}
                    onClose={onClose}
                />
            )}
        </Drawer>
    );
};

interface FormContentProps {
    id?: number;
    form: FormInstance<RequestForm.Role>;
    onFinish: (values: RequestForm.Role) => void;
    rules: Record<string, Rule[]>;
    permissionOptions: { value: number; label: string }[];
    onClose: () => void;
}

const FormContent = ({ id, form, onFinish, rules, permissionOptions, onClose }: FormContentProps) => (
    <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Tên vai trò" hasFeedback rules={rules.name}>
            <Input placeholder='Tên vai trò...' />
        </Form.Item>
        <Form.Item name="description" label="Mô tả" hasFeedback rules={rules.description}>
            <Input.TextArea showCount rows={6} placeholder='Mô tả vai trò..' />
        </Form.Item>
        <Form.Item name="permissionIds" label="Quyền hạn" hasFeedback rules={rules.permissionIds}>
            <Checkbox.Group options={permissionOptions} className={'!grid grid-cols-2'} />
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
    </Form >
);

export default FormRole;
