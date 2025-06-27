"use client";

import { Form, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { RequestForm } from "@/types/requests/form";
import { apiUpdateJobStep2 } from "@/api/update";
import { apiGet } from "@/api/baseApi";
import { EndPoint } from "@/api/endpoint";

export default function Step2Form({
  jobId,
  onSuccess,
  onPrev,
}: {
  jobId: number;
  onSuccess: () => void;
  onPrev: () => void;
}) {
  const [form] = Form.useForm();
  const [skills, setSkills] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);

  useEffect(() => {
    apiGet(EndPoint.List.SKILL).then((res) => setSkills(res.data as any[]));
    apiGet(EndPoint.List.LANGUAGE).then((res) =>
      setLanguages(res.data as any[])
    );
  }, []);

  const onFinish = async (values: RequestForm.JobStep2) => {
    const id = Number(window.sessionStorage.getItem("jobId"));
    await apiUpdateJobStep2({ id: id, data: values });
    onSuccess();
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        name="skillIds"
        label="Kỹ năng"
        rules={[{ required: true }, { type: "array", max: 10 }]}
      >
        <Select mode="multiple">
          {skills.map((s) => (
            <Select.Option key={s.id} value={s.id}>
              {s.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="languageIds"
        label="Ngôn ngữ"
        rules={[{ required: true }, { type: "array", max: 5 }]}
      >
        <Select mode="multiple">
          {languages.map((l) => (
            <Select.Option key={l.id} value={l.id}>
              {l.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onPrev}>Quay lại</Button>
        <Button type="primary" htmlType="submit">
          Tiếp tục
        </Button>
      </div>
    </Form>
  );
}
