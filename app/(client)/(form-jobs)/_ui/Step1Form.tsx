// Step1Form.tsx
"use client";

import { Form, Input, Button, Select, App } from "antd";
import { useEffect, useState } from "react";
import { RequestForm } from "@/types/requests/form";
import { apiCreateJob } from "@/api/create";
import { apiListMajor } from "@/api/list";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { hideSpin, showSpin } from "@/store/volatile/spinSlice";
import { addMessage } from "@/store/volatile/messageSlice";
import { useParams, useRouter } from "next/navigation";
import { apiUpdateJobStep1 } from "@/api/update";
import { apiGet } from "@/api/baseApi";
import { useStep } from "./ContextStep";

export default function Step1Form() {
  const [form] = Form.useForm();
  const [majors, setMajors] = useState<{ id: number; name: string }[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const jobId = Number(params.id);
  const { updateStep, step } = useStep();

  useEffect(() => {
    if (jobId) {
      apiGet(`/jobs-step1/${jobId}`).then((res) => {
        form.setFieldsValue({
          ...(res.data as any),
        })
      })
    }
    apiListMajor().then((res) => {
      setMajors(res.data);
    });
  }, [step, jobId]);

  const onFinish = async (values: RequestForm.JobStep1) => {
    dispatch(showSpin());
    if (jobId) {
      apiUpdateJobStep1({ id: jobId, data: values }).then(() => {
        dispatch(addMessage({
          key: "update-job",
          content: "Lưu thành công",
          type: "success",
        }))
        updateStep();
      }).catch(() => {
        dispatch(addMessage({
          key: "update-job",
          content: "Lưu thất bại",
          type: "error",
        }))
      }).finally(() => {
        dispatch(hideSpin());
      })
    } else {
      apiCreateJob(values).then((res) => {
        dispatch(addMessage({
          key: "create-job",
          content: "Lưu thành công",
          type: "success",
        }))
        router.replace("/update-jobs/" + res.data);
      }).catch(() => {
        dispatch(addMessage({
          key: "create-job",
          content: "Lưu thất bại",
          type: "error",
        }))
      }).finally(() => {
        dispatch(hideSpin());
      })
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} className="!mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Form.Item
          label={<span className="!text-gray-700 !font-medium">Tiêu đề công việc</span>}
          name="title"
          rules={[
            { required: true, message: "Không được để trống" },
            { min: 10, message: "Tối thiểu 10 ký tự" },
            { max: 200, message: "Tối đa 200 ký tự" },
          ]}
        >
          <Input
            className="!h-11 !rounded-lg hover:!border-blue-400 focus:!border-blue-500 !shadow-sm transition-colors"
            placeholder="Nhập tiêu đề công việc"
          />
        </Form.Item>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Form.Item
          name="majorId"
          label={<span className="!text-gray-700 !font-medium">Chuyên ngành</span>}
          rules={[{ required: true, message: "Chọn chuyên ngành" }]}
        >
          <Select
            placeholder="Chọn chuyên ngành"
            className="!h-11 !rounded-lg hover:!border-blue-400 focus:!border-blue-500 !shadow-sm"
          >
            {majors.map((m) => (
              <Select.Option key={m.id} value={m.id} className="hover:!bg-blue-50">
                {m.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="!mt-8"
      >
        <Button
          type="primary"
          htmlType="submit"
          className="!h-11 !rounded-lg !bg-blue-600 hover:!bg-blue-700 !font-medium !text-base !px-8 !flex !items-center !justify-center !transition-colors !shadow-md hover:!shadow-lg"
        >
          Tiếp tục
        </Button>
      </motion.div>
    </Form>
  );
}