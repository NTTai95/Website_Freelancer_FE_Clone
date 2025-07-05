// Step3Form.tsx
"use client";

import { apiGet } from "@/api/baseApi";
import { apiUpdateJobStep3 } from "@/api/update";
import { AppDispatch } from "@/store";
import { addMessage } from "@/store/volatile/messageSlice";
import { hideSpin, showSpin } from "@/store/volatile/spinSlice";
import { RequestForm } from "@/types/requests/form";
import { Button, DatePicker, Form, InputNumber } from "antd";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useStep } from "./ContextStep";

export default function Step3Form() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const jobId = Number(params.id);
  const dispatch = useDispatch<AppDispatch>();
  const { updateStep, prev } = useStep();

  useEffect(() => {
    if (!jobId) {
      router.push("/create-jobs");
    } else {
      apiGet(`/jobs-step3/${jobId}`).then((res) => {
        form.setFieldsValue({
          ...(res.data as any),
          closedAt: (res.data as any).closedAt ? dayjs((res.data as any).closedAt, 'DD/MM/YYYY HH:mm:ss') : null,
        })
      })
    }
  }, []);

  const onFinish = async (values: RequestForm.JobStep3) => {
    dispatch(showSpin());
    apiUpdateJobStep3({ id: jobId, data: values }).then(() => {
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
    <Form form={form} layout="vertical" onFinish={onFinish} className="!mx-auto">
      <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Form.Item
            name="budget"
            label={<span className="!text-gray-700 !font-medium">Ngân sách (VNĐ)</span>}
            rules={[
              { required: true, message: "Vui lòng nhập ngân sách" },
              { type: "number", min: 10000, max: 100000000, message: "Ngân sách từ 10,000 đến 100,000,000 VNĐ" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              className="!h-11 !w-full !rounded-lg hover:!border-blue-400 focus:!border-blue-500 !shadow-sm"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              placeholder="Nhập ngân sách"
            />
          </Form.Item>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Form.Item
            name="durationHours"
            label={<span className="!text-gray-700 !font-medium">Thời gian làm việc (giờ)</span>}
            rules={[
              { required: true, message: "Vui lòng nhập thời gian" },
              { type: "number", min: 1, max: 8760, message: "Thời gian từ 1 đến 8760 giờ" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              className="!h-11 !w-full !rounded-lg hover:!border-blue-400 focus:!border-blue-500 !shadow-sm"
              placeholder="Nhập số giờ"
            />
          </Form.Item>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Form.Item
          name="closedAt"
          label={<span className="!text-gray-700 !font-medium">Ngày đóng</span>}
          rules={[{ required: true, message: "Vui lòng chọn ngày đóng" }]}
        >
          <DatePicker
            showTime
            format="DD/MM/YYYY HH:mm:ss"
            style={{ width: "100%" }}
            className="!h-11 !w-full !rounded-lg hover:!border-blue-400 focus:!border-blue-500 !shadow-sm"
            disabledDate={(d) => d && d < dayjs().add(3, "day")}
            placeholder="Chọn ngày đóng"
          />
        </Form.Item>
      </motion.div>

      <div className="!flex !justify-between !mt-8">
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