"use client";
import { Card, Form, Divider } from 'antd';
import { useEffect, useState } from 'react';
import JobHeader from './_ui/JobHeader';
import PricingInfo from './_ui/PricingInfo';
import DurationInput from './_ui/DurationInput';
import ApplicationForm from './_ui/ApplicationForm';
import { apiGet, apiPost } from '@/api/baseApi';
import { useParams, useRouter } from 'next/navigation';
import { applyWithAI } from '@/utils/applyWithAI';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import { addMessage } from '@/store/volatile/messageSlice';
import { addNotification } from '@/store/volatile/notificationSlice';
import { motion } from 'framer-motion';

const JobApplicationPage = () => {
  const params = useParams();
  const id = params?.id;
  const [job, setJob] = useState<any>();
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    apiGet(`/jobs/${id}/is-apply`).then((res) => {
      if (res.data) {
        router.push("/find-jobs");
      }
    });
  }, [id])

  useEffect(() => {
    apiGet(`/jobs/${id}/public`)
      .then((res) => {
        const jobData = res.data as any;
        setJob(jobData);
        form.setFieldsValue({
          bidAmount: jobData?.budget,
          estimatedHours: jobData?.duration,
        });
      })
      .catch((err) => {
        router.push("/find-jobs");
      });
  }, [id, form, router]);

  const handleSubmit = () => {
    dispatch(showSpin());
    form.validateFields().then((values) => {
      apiPost(`jobs/${id}/apply`, values).then(() => {
        dispatch(addNotification({
          key: "apply-success",
          type: "success",
          message: "Gửi hồ sơ thành công!",
          description: `Hồ sơ ứng tuyển của bạn đã được gửi đến Nhà tuyển dụng.
Nhà tuyển dụng sẽ xem xét và phản hồi trong thời gian sớm nhất.
Chúc bạn nhiều may mắn!`,
          duration: 10,
          showProgress: true,
        }));
        router.push("/find-jobs");
      }).catch((err) => {
        dispatch(addMessage({
          key: "apply-error",
          type: "error",
          content: "Ứng tuyển thất bại"
        }))
      }).finally(() => {
        dispatch(hideSpin());
      });
    });
  };

  const handleFillApply = () => {
    dispatch(showSpin());
    const applyBudget = form.getFieldValue("bidAmount");
    const applyDurationHours = form.getFieldValue("estimatedHours");
    const applyContent = form.getFieldValue("content");
    applyWithAI({ id, applyBudget, applyDurationHours, applyContent }).then((content) => {
      form.setFieldsValue({
        content,
      });
      dispatch(hideSpin());
    });
  };

  const handleCancel = () => {
    form.resetFields();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="!w-full !px-4 md:!px-20 !my-5"
    >
      <JobHeader job={job} />
      <motion.div
        className="!p-6 !bg-white !rounded-xl !shadow-lg"
        whileHover={{ boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" }}
      >
        <Form form={form} onFinish={handleSubmit} className="!w-full">
          <Divider className="!my-6 !border-gray-200" />
          <PricingInfo form={form} />
          <Divider className="!my-6 !border-gray-200" />
          <DurationInput form={form} />
          <Divider className="!my-6 !border-gray-200" />
          <ApplicationForm handleFillApply={handleFillApply} />
        </Form>
      </motion.div>
    </motion.div>
  );
};

export default JobApplicationPage;
