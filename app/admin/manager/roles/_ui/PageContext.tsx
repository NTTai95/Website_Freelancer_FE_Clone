import { createContext, useContext } from "react";

export const PageContext = createContext<{
    reloadData?: () => void;
}>({});

export const usePageContext = () => useContext(PageContext);