import { motion } from 'framer-motion';
import React from 'react';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: React.ReactNode;
    color: string;
    variants: any;
}

const StatCard = ({ icon, title, value, color, variants }: StatCardProps) => {
    const colorClasses = {
        blue: {
            container: '!from-blue-50 !to-blue-100 !border-blue-200 !text-blue-900',
            icon: '!text-blue-600',
            title: '!text-blue-700',
            value: '!text-blue-900'
        },
        cyan: {
            container: '!from-cyan-50 !to-cyan-100 !border-cyan-200 !text-cyan-900',
            icon: '!text-cyan-600',
            title: '!text-cyan-700',
            value: '!text-cyan-900'
        },
        indigo: {
            container: '!from-indigo-50 !to-indigo-100 !border-indigo-200 !text-indigo-900',
            icon: '!text-indigo-600',
            title: '!text-indigo-700',
            value: '!text-indigo-900'
        },
        violet: {
            container: '!from-violet-50 !to-violet-100 !border-violet-200 !text-violet-900',
            icon: '!text-violet-600',
            title: '!text-violet-700',
            value: '!text-violet-900'
        },
        green: {
            container: '!from-green-50 !to-green-100 !border-green-200 !text-green-900',
            icon: '!text-green-600',
            title: '!text-green-700',
            value: '!text-green-900'
        },
        amber: {
            container: '!from-amber-50 !to-amber-100 !border-amber-200 !text-amber-900',
            icon: '!text-amber-600',
            title: '!text-amber-700',
            value: '!text-amber-900'
        },
        rose: {
            container: '!from-rose-50 !to-rose-100 !border-rose-200 !text-rose-900',
            icon: '!text-rose-600',
            title: '!text-rose-700',
            value: '!text-rose-900'
        },
        teal: {
            container: '!from-teal-50 !to-teal-100 !border-teal-200 !text-teal-900',
            icon: '!text-teal-600',
            title: '!text-teal-700',
            value: '!text-teal-900'
        }
    };

    const colorConfig = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

    return (
        <motion.div
            className={`!flex !flex-col !p-4 !bg-gradient-to-br !rounded-2xl !border !border-solid ${colorConfig.container} !shadow-sm hover:!shadow-md transition-all duration-300`}
            variants={variants}
            whileHover={{
                y: -3,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                transition: { duration: 0.2 }
            }}
            layout
        >
            <div className="!flex !items-center !mb-2">
                <motion.div
                    className={`!p-2 !rounded-lg ${colorConfig.icon} !bg-white !bg-opacity-50`}
                    whileHover={{
                        rotate: 10,
                        scale: 1.1,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)'
                    }}
                    transition={{ type: 'spring' as const, stiffness: 300 }}
                >
                    {icon}
                </motion.div>
                <span className={`!font-medium !ml-2 !text-sm ${colorConfig.title}`}>
                    {title}
                </span>
            </div>
            <div className="!mt-1">
                {typeof value === 'string' ? (
                    <span className={`!font-bold !text-xl ${colorConfig.value}`}>
                        {value}
                    </span>
                ) : (
                    <div className={colorConfig.value}>
                        {value}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default StatCard;