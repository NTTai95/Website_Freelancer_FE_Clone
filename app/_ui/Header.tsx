"use client";

import { Avatar, Col, Dropdown, Menu, Row, Typography } from 'antd';
import React, { useState, useEffect, use } from 'react';
import { Header } from 'antd/es/layout/layout';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthGuard } from '@/components/AuthGuard';
import Info from './Info';
import { useAuthorization } from '@/hooks/useAuthorization';
import { DownOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const { Title } = Typography;

// Custom menu item component with animations
const MotionMenuItem = ({ item, scrolled, pathname }: any) => {
    const isActive = pathname === item.key;

    return (
        <motion.div
            className={`relative !px-4 !py-2 !font-medium ${scrolled ? '!text-gray-800' : '!text-white'
                }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
        >
            <Link href={item.key} className="!block !text-white">
                {item.label}
            </Link>

            {isActive && (
                <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${scrolled ? '!bg-blue-600' : '!bg-white'
                        }`}
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
        </motion.div>
    );
};

// Custom dropdown component with animations
const MotionDropdown = ({ item, scrolled }: any) => {
    const menu = {
        items: item.children.map((child: any) => ({
            key: child.key,
            label: <Link href={child.key}>{child.label}</Link>,
        })),
    };

    return (
        <Dropdown menu={menu} trigger={['hover']}>
            <div
                className={`!flex !items-center !cursor-pointer !px-4 !py-2 !font-medium ${scrolled ? '!text-gray-800' : '!text-white'
                    }`}
            >
                {item.label} <DownOutlined style={{ marginLeft: 4 }} />
            </div>
        </Dropdown>
    );
};


const HeaderAuth = () => {
    const { hasRole, isAuthenticated } = useAuthorization();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);


    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const baseItems = [
        { key: '/home', label: 'Trang chủ' },
        { key: '/terms-and-policy', label: 'Chính sách' },
        { key: '/about', label: 'Giới thiệu' },
        { key: '/contact', label: 'Liên hệ' },
    ];

    const roleItems = [
        ...(hasRole(['ROLE_QUAN_TRI']) ? [{
            key: 'admin',
            label: 'Quản trị',
            children: [
                { key: '/admin/dashboard', label: 'Bảng điều khiển' },
                { key: '/admin/manager', label: 'Quản lý' },
                { key: '/admin/reports', label: 'Báo cáo' },
            ]
        }] : []),

        ...(hasRole(['ROLE_FREELANCER']) ? [{
            key: 'freelancer',
            label: 'Công việc',
            children: [
                { key: '/find-jobs', label: 'Tìm việc' },
            ]
        }] : []),

        ...(hasRole(['ROLE_NHA_TUYEN_DUNG']) ? [{
            key: 'employer',
            label: 'Freelancer',
            children: [
                { key: '/talents/search', label: 'Tìm tài năng' },
                { key: '/create-jobs', label: 'Thêm công việc' },
            ]
        }] : []),
    ];

    const allItems = [
        ...baseItems,
        ...(isAuthenticated ? roleItems : []),
    ];

    return (
        <div>
            <Header
                className={`
                    !z-50 !sticky !top-0 !bg-blue-950
                    !transition-all !duration-300
                    !px-4
                    !h-20
                    !shadow-md
                `}
            >
                <Row justify={'space-between'} align="middle" className="!max-w-7xl !mx-auto">
                    <Col>
                        <motion.div
                            whileHover={{ rotate: 3 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/home')}>
                                <Avatar
                                    shape="square"
                                    size={48}
                                    src="/logo.png"
                                    className="brightness-150"
                                    onClick={() => router.push('/home')}
                                />
                                <Title level={3} className={"!text-white !mb-0 !mt-2"}>FREELANCER</Title>
                            </div>
                        </motion.div>
                    </Col>

                    {/* Desktop Menu */}
                    <Col className="!hidden lg:!flex !flex-1 !justify-center">
                        <div className="!flex !items-center !h-full">
                            {allItems.map((item: any) => (
                                item.children ? (
                                    <MotionDropdown
                                        key={item.key}
                                        item={item}
                                        scrolled={scrolled}
                                    />
                                ) : (
                                    <MotionMenuItem
                                        key={item.key}
                                        item={item}
                                        scrolled={scrolled}
                                        pathname={pathname}
                                    />
                                )
                            ))}
                        </div>
                    </Col>

                    <Col>
                        <Info scrolled={scrolled} />
                    </Col>
                </Row>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuVisible && (
                        <motion.div
                            className="!lg:hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={`!mt-4 !rounded-lg !p-4 ${scrolled ? '!bg-white' : '!bg-blue-800'
                                }`}>
                                {allItems.map((item: any) => (
                                    <div key={item.key} className="!mb-3 last:!mb-0">
                                        {item.children ? (
                                            <div>
                                                <div className={`!font-medium !pb-2 ${scrolled ? '!text-gray-800' : '!text-white'
                                                    }`}>
                                                    {item.label}
                                                </div>
                                                <div className="!pl-4 !border-l-2 !border-blue-300">
                                                    {item.children.map((child: any) => (
                                                        <motion.div
                                                            key={child.key}
                                                            className={`!py-1 ${scrolled ? 'hover:!bg-blue-50' : 'hover:!bg-blue-700'
                                                                }`}
                                                            whileHover={{ x: 5 }}
                                                        >
                                                            <Link
                                                                href={child.key}
                                                                className="!block !px-3 !py-1"
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <motion.div
                                                className={`!py-1 ${scrolled ? '!text-gray-800' : '!text-white'
                                                    } ${pathname === item.key ? '!font-bold' : ''}`}
                                                whileHover={{ x: 5 }}
                                            >
                                                <Link href={item.key} className="!block !px-3 !py-1">
                                                    {item.label}
                                                </Link>
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Header>
        </div>
    );
};

export default HeaderAuth;