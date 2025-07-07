import { Dropdown } from 'antd';
import { motion } from 'framer-motion';
import { CaretDownOutlined } from '@ant-design/icons';
import { itemsInfoAdmin } from './MenuItems';

export const AdminInfo = ({
    scrolled,
    fullName
}: {
    scrolled: boolean;
    fullName: string
}) => (
    <Dropdown
        menu={{ items: itemsInfoAdmin }}
        trigger={['click']}
        placement="bottomRight"
        arrow
        overlayClassName="!rounded-lg !shadow-lg !overflow-hidden"
    >
        <motion.span
            className={`
        !font-bold !flex !gap-2 !items-center !cursor-pointer
        ${scrolled ? '!text-blue-600' : '!text-white'}
      `}
            whileHover={{ scale: 1.03 }}
        >
            {fullName}
            <CaretDownOutlined className="!text-xs" />
        </motion.span>
    </Dropdown>
);