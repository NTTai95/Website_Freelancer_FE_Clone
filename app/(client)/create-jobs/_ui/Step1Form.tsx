"use client";

import { Form, Input, Button, Select } from "antd";
import { useEffect, useState } from "react";
import { RequestForm } from "@/types/requests/form";
import { apiCreateJob } from "@/api/create";
import { apiGet } from "@/api/baseApi";
import { EndPoint } from "@/api/endpoint";
import { apiListMajor } from "@/api/list";

export default function Step1Form({
  onSuccess,
}: {
  onSuccess: (id: number) => void;
}) {
  const [form] = Form.useForm();
  const [majors, setMajors] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    apiListMajor().then((res) => {
      setMajors(res.data);
    });
  }, []);

  const onFinish = async (values: RequestForm.JobStep1) => {
    apiCreateJob(values).then((res) => {
      onSuccess(res.data);
    });
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        label="Tiêu đề công việc"
        name="title"
        rules={[
          { required: true, message: "Không được để trống" },
          { min: 10, message: "Tối thiểu 10 ký tự" },
          { max: 200, message: "Tối đa 200 ký tự" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="majorId"
        label="Chuyên ngành"
        rules={[{ required: true, message: "Chọn chuyên ngành" }]}
      >
        <Select placeholder="Chọn chuyên ngành">
          {majors.map((m) => (
            <Select.Option key={m.id} value={m.id}>
              {m.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Tiếp tục
      </Button>
    </Form>
  );
}
