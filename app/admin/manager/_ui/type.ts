import { createContext, useContext } from "react";

export type MetaContextType = {
    setMeta: (title: string, description?: string) => void;
};

export const MetaContext = createContext<MetaContextType | undefined>(undefined);

export const useMeta = () => {
    const context = useContext(MetaContext);
    if (!context) throw new Error("useMeta must be used within ManagerLayout");
    return context;
};