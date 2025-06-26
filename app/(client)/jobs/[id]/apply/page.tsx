"use client";
import { Card } from 'antd';
import { useState } from 'react';
import JobHeader from './_ui/JobHeader';
import PricingInfo from './_ui/PricingInfo';
import DurationInput from './_ui/DurationInput';
import ApplicationForm from './_ui/ApplicationForm';
import { Form, Divider } from 'antd';

const JobApplicationPage = () => {
  const [days, setDays] = useState<number>(0);
  const [form] = Form.useForm();
  const initialAmount = 10000000;

  const calculateFinalAmount = (amount: number) => amount - amount * 0.002;

  const handleSubmit = () => {
    // Submit form logic
  };

  const handleCancel = () => {
    form.resetFields();
    setDays(0);
  };

  return (
    <div className="w-full !px-20 !mt-5">
        <JobHeader/>
        <div className="p-6">
          <Divider className="!my-6" />
          <PricingInfo />
          <Divider className="!my-6" />
          <DurationInput days={days} onChange={setDays} />
          <Divider className="!my-6" />
          <ApplicationForm form={form} onFinish={handleSubmit} onCancel={handleCancel} />
        </div>
    </div>
  );
};

export default JobApplicationPage;
