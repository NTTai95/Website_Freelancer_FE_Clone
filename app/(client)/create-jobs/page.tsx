"use client";

import { Steps } from "antd";
import { useState } from "react";
import Step1Form from "./_ui/Step1Form";
import Step2Form from "./_ui/Step2Form";
import Step3Form from "./_ui/Step3Form";
import Step4Form from "./_ui/Step4Form";

export default function PostAJobPage() {
  const [current, setCurrent] = useState(0);
  const [jobId, setJobId] = useState<number>();

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  const steps = [
    {
      title: "Thông tin cơ bản",
      content: (
        <Step1Form
          onSuccess={(id: number) => {
            setJobId(id);
            next();
          }}
        />
      ),
    },
    {
      title: "Chuyên môn yêu cầu",
      content: <Step2Form jobId={jobId!} onSuccess={next} onPrev={prev} />,
    },
    {
      title: "Ngân sách & thời gian",
      content: <Step3Form jobId={jobId!} onSuccess={next} onPrev={prev} />,
    },
    {
      title: "Mô tả & đính kèm",
      content: (
        <Step4Form
          jobId={jobId!}
          onSuccess={() => setCurrent(0)} // hoặc redirect
          onPrev={prev}
        />
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 16px" }}>
      <Steps current={current} style={{ marginBottom: 32 }}>
        {steps.map((item, index) => (
          <Steps.Step key={index} title={item.title} />
        ))}
      </Steps>
      <div>{steps[current].content}</div>
    </div>
  );
}
