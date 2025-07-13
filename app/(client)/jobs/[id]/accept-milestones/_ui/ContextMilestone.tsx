import React, { createContext, useContext, useState, ReactNode } from "react";
import { apiGet } from "@/api/baseApi";

interface MilestoneContextType {
  data: any;
  fetchData: (jobId?: string) => Promise<void>;
}

// tạo context
const MilestoneContext = createContext<MilestoneContextType | undefined>(undefined);

// provider
export const MilestoneProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>(null);

  const fetchData = async (jobId?: string) => {
    try {
      const res = await apiGet(`/jobs/${jobId || data?.job?.id}/milestones`);
      setData(res.data);
      console.log("Fetch milestones successfully", res.data);
    } catch (err) {
      console.error("Fetch milestones failed", err);
      setData(null);
    }
  };

  return (
    <MilestoneContext.Provider value={{ data, fetchData }}>
      {children}
    </MilestoneContext.Provider>
  );
};

// hook
export const useMilestones = (): MilestoneContextType => {
  const context = useContext(MilestoneContext);
  if (!context) {
    throw new Error("useMilestones must be used within a MilestoneProvider");
  }
  return context;
};
