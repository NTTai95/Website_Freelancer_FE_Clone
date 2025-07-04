// app\admin\manager\skills\page.tsx
'use client';

import { Drawer, Form, Input, Button, Space, Select, DatePicker, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { RequestForm } from '@/types/requests/form';
import { apiListRole } from '@/api/list';
import { ResponseList } from '@/types/respones/list';
import { FormInstance, Rule } from 'antd/es/form';
import { apiMetaRulesStaff } from '@/api/validation';
import { convertToAntdRules } from '@/utils/converter';
import { apiStaffForm } from "@/api/form";
import dayjs from 'dayjs';

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: ({ id, data }: { id?: number, data: RequestForm.Staff }) => void;
    id?: number
}

const FormStaff = ({ open, onClose, onSubmit, id }: Props) => {
    const [form] = Form.useForm<RequestForm.Staff>();
    const [rules, setRules] = useState<Record<string, Rule[]>>({});
    const [roleOptions, setRoleOptions] = useState<{ value: number; label: string }[]>([]);
    const [metaRulesRaw, setMetaRulesRaw] = useState<any[]>([]);

    useEffect(() => {
        apiMetaRulesStaff().then(res => {
            setMetaRulesRaw(res.data);
        });

        apiListRole().then((res) => {
            setRoleOptions(res.data.map((role: ResponseList.Role) => ({
                value: role.id,
                label: role.name,
            })));
        });
    }, []);

    useEffect(() => {
        if (!open) return;

        if (id) {
            apiStaffForm(id).then((res) => {
                const data = { ...(res.data as any), birthday: res.data.birthday ? dayjs(res.data.birthday, 'DD/MM/YYYY') : null, password: 'password123' };
                form.setFieldsValue(data);
                setRules(convertToAntdRules(metaRulesRaw, data, id));
            });
        } else {
            form.resetFields();
            setRules(convertToAntdRules(metaRulesRaw));
        }
    }, [open, id, metaRulesRaw]);

    const handleFinish = (values: RequestForm.Staff) => {
        onSubmit({ id, data: values });
    };

    return (
        <Drawer
            title={id ? 'Cập nhật nhân viên' : 'Thêm nhân viên'}
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
                    roleOptions={roleOptions}
                    onClose={onClose}
                />
            )}
        </Drawer>
    );
};

interface FormContentProps {
    id?: number;
    form: FormInstance<RequestForm.Staff>;
    onFinish: (values: RequestForm.Staff) => void;
    rules: Record<string, Rule[]>;
    roleOptions: { value: number; label: string }[];
    onClose: () => void;
}

const FormContent = ({ id, form, onFinish, rules, roleOptions, onClose }: FormContentProps) => (
    <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="fullName" label="Họ và tên" hasFeedback rules={rules.fullName}>
            <Input placeholder='Họ và tên...' />
        </Form.Item>
        <Form.Item name="email" label="Email" hasFeedback rules={rules.email}>
            <Input placeholder='Email...' />
        </Form.Item>
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item name="phone" label="Số điện thoại" hasFeedback rules={rules.phone}>
                    <Input placeholder='Số điện thoại...' />
                </Form.Item>
                <Form.Item name="roleId" label="Vai trò" hasFeedback rules={rules.roleId}>
                    <Select placeholder="Chọn vai trò" allowClear>
                        {roleOptions.map((option: { value: number; label: string }) => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="birthday" label="Ngày sinh" hasFeedback rules={rules.birthday}>
                    <DatePicker className={"w-full"} format={"DD/MM/YYYY"} placeholder="Ngày sinh" />
                </Form.Item>
                <Form.Item hidden={!!id} name="password" label="Mật khẩu" hasFeedback rules={!id ? rules.password : []}>
                    <Input.Password placeholder='Mật khẩu...' />
                </Form.Item>
            </Col>
        </Row>
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

export default FormStaff;
