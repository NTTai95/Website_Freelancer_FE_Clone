"use client";

import { apiUpdateJobStep4 } from "@/api/update";
import { RequestForm } from "@/types/requests/form";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import { useState } from "react";

export default function Step4Form({
  jobId,
  onSuccess,
  onPrev,
}: {
  jobId: number;
  onSuccess: () => void;
  onPrev: () => void;
}) {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File>();

  const onFinish = async (values: any) => {
    const data: RequestForm.JobStep4 = {
      description: values.description,
      document: file,
    };
    await apiUpdateJobStep4({ id: jobId, data });
    onSuccess();
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        name="description"
        label="Mô tả công việc"
        rules={[{ required: true }, { min: 100, max: 10000 }]}
      >
        <Input.TextArea rows={6} />
      </Form.Item>

      <Form.Item label="Tài liệu mô tả (PDF, tối đa 10MB)">
        <Upload
          beforeUpload={(file) => {
            setFile(file);
            return false;
          }}
          maxCount={1}
          accept=".pdf"
        >
          <Button icon={<UploadOutlined />}>Tải lên</Button>
        </Upload>
      </Form.Item>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onPrev}>Quay lại</Button>
        <Button type="primary" htmlType="submit">
          Hoàn tất
        </Button>
      </div>
    </Form>
  );
}
