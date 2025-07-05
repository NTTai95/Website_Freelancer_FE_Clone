// Step2Form.tsx
"use client";

import { Form, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { RequestForm } from "@/types/requests/form";
import { apiUpdateJobStep2 } from "@/api/update";
import { apiGet } from "@/api/baseApi";
import { EndPoint } from "@/api/endpoint";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { hideSpin, showSpin } from "@/store/volatile/spinSlice";
import { useParams, useRouter } from "next/navigation";
import { addMessage } from "@/store/volatile/messageSlice";
import { useStep } from "./ContextStep";

export default function Step2Form() {
  const [form] = Form.useForm();
  const [skills, setSkills] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const jobId = Number(params.id);
  const { updateStep, prev, step } = useStep();

  useEffect(() => {
    apiGet(EndPoint.List.SKILL).then((res) => setSkills(res.data as any[]));
    apiGet(EndPoint.List.LANGUAGE).then((res) => setLanguages(res.data as any[]));
    if (!jobId) {
      router.push("/create-jobs");
    } else {
      apiGet(`/jobs-step2/${jobId}`).then((res) => {
        form.setFieldsValue({
          ...(res.data as any),
        })
      })
    }
  }, [step, jobId]);

  const onFinish = async (values: RequestForm.JobStep2) => {
    dispatch(showSpin());
    apiUpdateJobStep2({ id: jobId, data: values }).then(() => {
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
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} className="!mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Form.Item
          name="skillIds"
          label={<span className="!text-gray-700 !font-medium">Kỹ năng</span>}
          rules={[{ required: true, message: "Vui lòng chọn ít nhất một kỹ năng" }, { type: "array", max: 10 }]}
        >
          <Select
            mode="multiple"
            className="!rounded-lg hover:!border-blue-400 focus:!border-blue-500 !shadow-sm"
            placeholder="Chọn các kỹ năng cần thiết"
            optionLabelProp="label"
          >
            {skills.map((s) => (
              <Select.Option
                key={s.id}
                value={s.id}
                label={s.name}
                className="hover:!bg-blue-50"
              >
                <div className="!flex !items-center !gap-2">
                  <div className="!w-6 !h-6 !bg-blue-100 !rounded-full !flex !items-center !justify-center">
                    <span className="!text-blue-600 !font-bold">{s.name[0]}</span>
                  </div>
                  {s.name}
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="!mt-6"
      >
        <Form.Item
          name="languageIds"
          label={<span className="!text-gray-700 !font-medium">Ngôn ngữ</span>}
          rules={[{ required: true, message: "Vui lòng chọn ít nhất một ngôn ngữ" }, { type: "array", max: 5 }]}
        >
          <Select
            mode="multiple"
            className="!rounded-lg hover:!border-blue-400 focus:!border-blue-500 !shadow-sm"
            placeholder="Chọn các ngôn ngữ yêu cầu"
            optionLabelProp="label"
          >
            {languages.map((l) => (
              <Select.Option
                key={l.id}
                value={l.id}
                label={l.name}
                className="hover:!bg-blue-50"
              >
                <div className="!flex !items-center !gap-2">
                  <div className="!w-6 !h-6 !bg-blue-100 !rounded-full !flex !items-center !justify-center">
                    <span className="!text-blue-600 !font-bold">{l.name[0]}</span>
                  </div>
                  {l.name}
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </motion.div>

      <div className="!flex !justify-between !mt-10">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={prev}
            className="!h-11 !rounded-lg !border-gray-300 hover:!border-blue-400 !text-gray-700 hover:!text-blue-600 !font-medium !px-8 !flex !items-center !justify-center !transition-colors"
          >
            Quay lại
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="!h-11 !rounded-lg !bg-blue-600 hover:!bg-blue-700 !font-medium !text-base !px-8 !flex !items-center !justify-center !transition-colors !shadow-md hover:!shadow-lg"
          >
            Tiếp tục
          </Button>
        </motion.div>
      </div>
    </Form>
  );
}