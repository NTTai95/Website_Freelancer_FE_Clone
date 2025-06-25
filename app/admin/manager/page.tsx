"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminManager() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/admin/manager/users');
    },[])
}