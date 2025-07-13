import React, { createContext, useContext } from 'react';
import { Modal, ModalFuncProps } from 'antd';

interface ModalContextType {
    showConfirmModal: (config: ModalFuncProps) => void;
}

const ModalContext = createContext<ModalContextType>({
    showConfirmModal: () => { },
});

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modal, contextHolder] = Modal.useModal();

    const showConfirmModal = (config: ModalFuncProps) => {
        modal.confirm({
            ...config,
            centered: true,
            okButtonProps: { className: '!bg-blue-600 hover:!bg-blue-700 !text-white !border-0' },
            cancelButtonProps: { className: '!border-gray-300 !text-gray-700 hover:!bg-gray-100' },
        });
    };

    return (
        <ModalContext.Provider value={{ showConfirmModal }}>
            {contextHolder}
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);