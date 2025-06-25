"use client";

import { Form, InputNumber, DatePicker, Button } from "antd";
import { apiUpdateJobStep3 } from "@/api/update";
import { RequestForm } from "@/types/requests/form";
import dayjs from "dayjs";

export default function Step3Form({
  jobId,
  onSuccess,
  onPrev,
}: {
  jobId: number;
  onSuccess: () => void;
  onPrev: () => void;
}) {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const data: RequestForm.JobStep3 = {
      ...values,
      closeAt: values.closeAt.format("YYYY-MM-DDTHH:mm:ss"),
    };
    await apiUpdateJobStep3({ id: jobId, data });
    onSuccess();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="budget"
        label="Ngân sách (VNĐ)"
        rules={[
          { required: true },
          { type: "number", min: 10000, max: 100000000 },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="durationHours"
        label="Thời gian làm việc (giờ)"
        rules={[{ required: true }, { type: "number", min: 1, max: 8760 }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="closeAt" label="Ngày đóng" rules={[{ required: true }]}>
        <DatePicker
          showTime
          format="DD/MM/YYYY HH:mm:ss"
          style={{ width: "100%" }}
          disabledDate={(d) => d && d < dayjs().add(3, "day")}
        />
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
