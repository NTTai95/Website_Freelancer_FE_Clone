// page.tsx
"use client";

import { Steps } from "antd";
import { useState, useEffect } from "react";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import Step3Form from "./Step3Form";
import Step4Form from "./Step4Form";
import { motion } from "framer-motion";
import { useStep } from "./ContextStep";
import { useParams } from "next/navigation";

export default function StepJob() {
    const [direction, setDirection] = useState(1);
    const params = useParams();
    const jobId = Number(params.id);
    const { step, updateStep } = useStep();

    const steps = [
        {
            title: "Thông tin cơ bản",
            content: <Step1Form />,
        },
        {
            title: "Chuyên môn yêu cầu",
            content: <Step2Form />,
        },
        {
            title: "Ngân sách & thời gian",
            content: <Step3Form />,
        },
        {
            title: "Mô tả & đính kèm",
            content: <Step4Form />
        },
    ];

    useEffect(() => {
        if (jobId) {
            updateStep();
        }
    }, [])

    return (
        <div className="!mx-auto !px-24 !py-8">
            <div className="!mb-10 !bg-white !rounded-xl !shadow-lg !p-6">
                <Steps
                    current={step}
                    className="!text-blue-600"
                    items={steps.map((s, index) => ({
                        title: (
                            <span
                                className={`!font-medium ${step === index ? '!text-blue-600' : '!text-gray-500'}`}
                            >
                                {s.title}
                            </span>
                        ),
                    }))}
                />
            </div>

            <motion.div
                key={step}
                initial={{ opacity: 0, x: 100 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 * direction }}
                transition={{ duration: 0.3 }}
                className="!bg-white !rounded-xl !shadow-lg !p-8"
            >
                {steps[step].content}
            </motion.div>
        </div>
    );
}