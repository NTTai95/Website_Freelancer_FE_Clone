'use client';

import { apiGet, apiPut } from '@/api/baseApi';
import { useParams } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

// kiểu dữ liệu context
interface StepContextType {
    step: number;
    updateStep: () => Promise<void>;
    prev: () => Promise<void>;
}

// tạo context
const StepContext = createContext<StepContextType | undefined>(undefined);

// provider
export const StepProvider = ({ children }: { children: React.ReactNode }) => {
    const [step, setStep] = useState(0);
    const params = useParams();
    const id = Number(params.id);

    const updateStep = async () => {
        apiGet(`/jobs/step/${id}`).then((res) => {
            setStep(Math.min(3, (res.data as any)));
        })
    };

    const prev = async () => {
        apiPut(`/step/job/${id}`, (step - 1)).then(() => {
            setStep((prev) => prev - 1);
        })
    }

    return (
        <StepContext.Provider value={{ step, updateStep, prev }}>
            {children}
        </StepContext.Provider>
    );
};

// custom hook
export const useStep = () => {
    const context = useContext(StepContext);
    if (!context) throw new Error('useStep must be used inside StepProvider');
    return context;
};
