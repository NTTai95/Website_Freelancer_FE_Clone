"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { useAuthorization } from "@/hooks/useAuthorization";
import { Avatar, Button, Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

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

const itemsInfoClient: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link href={"/profile/me"}>
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

const InfoAdmin = () => {
    return (<Dropdown menu={{ items: itemsInfoAdmin }} trigger={['click']}>
        Nguyễn Tấn Tài
    </Dropdown>)

}

const Info = () => {
    const router = useRouter();
    const { isAuthenticated } = useAuthorization();
    const me = useSelector((state: RootState) => state.persistent.auth.me);

    if (!isAuthenticated) {
        return (
            <>
                <Button type='primary' onClick={() => router.replace("/login")}>Đăng nhập</Button>
                <Button type='default' onClick={() => router.replace("/register")}>Đăng ký</Button>
            </>
        )
    }

    return (
        <AuthGuard roles={["ROLE_FREELANCER", "ROLE_NHA_TUYEN_DUNG"]} fallback={<InfoAdmin />}>
            <Dropdown menu={{ items: itemsInfoClient }} placement="bottomRight" arrow>
                <span className={"text-white font-bold flex gap-2 items-center cursor-pointer"}>{me?.fullName}<Avatar src={me?.avatar} size={40} shape="square" /></span>
            </Dropdown>
        </AuthGuard>
    )
}

export default Info;