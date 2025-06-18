"use client";

import { Button, Form, Input, Select, Space } from "antd";

const FormSkill = () => {
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            layout="vertical"
            className="w-full max-w-2xl mx-auto p-6"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input skill name!' }]}
            >
                <Input placeholder="Enter skill name" />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input description!' }]}
            >
                <Input.TextArea
                    rows={4}
                    placeholder="Enter skill description"
                />
            </Form.Item>

            <Form.Item
                label="Major"
                name="major"
                rules={[{ required: true, message: 'Please select major!' }]}
            >
                <Select
                    placeholder="Select a major"
                    options={[
                        { value: 'frontend', label: 'Frontend Development' },
                        { value: 'backend', label: 'Backend Development' },
                        { value: 'fullstack', label: 'Fullstack Development' },
                        { value: 'mobile', label: 'Mobile Development' },
                        { value: 'devops', label: 'DevOps' },
                    ]}
                />
            </Form.Item>

            <Form.Item className="flex justify-end">
                <Space>
                    <Button type="default">Cancel</Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

export default FormSkill;