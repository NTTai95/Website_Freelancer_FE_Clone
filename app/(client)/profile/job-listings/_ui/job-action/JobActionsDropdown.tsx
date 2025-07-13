'use client';

import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { LeftCircleTwoTone } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { JobListing } from '../types';
import { useAuthorization } from '@/hooks/useAuthorization';
import { getActionItems } from './ActionItems';

interface JobActionsDropdownProps {
    job: JobListing;
    onRefresh: () => void;
}

export const JobActionsDropdown = ({ job, onRefresh }: JobActionsDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { role } = useAuthorization();

    if (!role) return null;

    const items: any = getActionItems(job, role, onRefresh);

    if (items.length === 0) return null;

    return (
        <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={['click']}
            open={isOpen}
            onOpenChange={setIsOpen}
            overlayClassName="!rounded-xl !overflow-hidden !shadow-lg !border !border-gray-100"
        >
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`!shadow-md !shadow-blue-300 !w-9 !h-9 !flex !items-center !justify-center !rounded-full !transition-all !duration-300 !outline-none !border-0 ${isOpen ? '!bg-blue-100' : '!bg-blue-50 hover:!bg-blue-100'}`}
            >
                <motion.span
                    animate={{ rotate: isOpen ? -90 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <LeftCircleTwoTone className="!text-blue-600 !text-3xl hover:!cursor-pointer" />
                </motion.span>
            </motion.button>
        </Dropdown>
    );
};