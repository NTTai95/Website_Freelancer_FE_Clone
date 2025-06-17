"use client";

import { useRouter } from 'next/navigation';

export default function AdminManager() {
    const router = useRouter();
    router.replace('/admin/manager/users');
}