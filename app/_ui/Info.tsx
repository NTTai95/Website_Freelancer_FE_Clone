"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { useAuthorization } from "@/hooks/useAuthorization";
import { Avatar, Button, Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { CaretDownOutlined } from '@ant-design/icons';

const itemsInfoAdmin: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link href={"/admin/me"}>
                Thông tin cá nhân
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link href={"/admin/change-password"}>
                Đổi mật khẩu
            </Link>
        ),
    },
    {
        key: '3',
        label: (
            <Link href={"/logout"}>
                Đăng xuất
            </Link>
        ),
    },
];

const getClientMenuItems = (role: string | null, userId: number | null): MenuProps['items'] => [
    {
        key: '1',
        label: (
            <Link href={role === 'ROLE_FREELANCER' ? `/freelancers/${userId}` : `/employers/${userId}`}>
                Thông tin cá nhân
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link href={"/change-password"}>
                Đổi mật khẩu
            </Link>
        ),
    },
    {
        key: '3',
        label: (
            <Link href={"/logout"}>
                Đăng xuất
            </Link>
        ),
    },
];

const Info = () => {
    const router = useRouter();
    const me = useSelector((state: RootState) => state.persistent.auth.me);
    const { role } = useSelector((state: RootState) => state.persistent.auth);

    const { isAuthenticated } = useAuthorization();

    if (!isAuthenticated) {
        return (
            <>
                <Button type='primary' onClick={() => router.push("/login")}>Đăng nhập</Button>
                <Button type='default' onClick={() => router.push("/register")}>Đăng ký</Button>
            </>
        )
    }

    const InfoAdmin = () => {
        return (<Dropdown menu={{ items: itemsInfoAdmin }} trigger={['click']} placement="bottomRight" arrow>
            <span className={"text-white font-bold flex gap-2 items-center cursor-pointer"}>{me?.fullName} <CaretDownOutlined /></span>
        </Dropdown>)

    }

    const clientMenuItems = getClientMenuItems(role, me?.id || null);

    return (
        <AuthGuard roles={["ROLE_FREELANCER", "ROLE_NHA_TUYEN_DUNG"]} fallback={<InfoAdmin />}>
            <Dropdown menu={{ items: clientMenuItems }} placement="bottomRight" arrow>
                <span className={"text-white font-bold flex gap-2 items-center cursor-pointer"}>{me?.fullName}<Avatar src={me?.avatar} size={40} shape="square" /></span>
            </Dropdown>
        </AuthGuard>
    )
}

export default Info;