import { createContext, useContext } from "react";

export const PageContext = createContext<{
    reloadData?: () => void;
    reloadFilter?: () => void;
}>({});

export const usePageContext = () => useContext(PageContext);