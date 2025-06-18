"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAll } from '@/store/persistent/auth';
import { useRouter } from 'next/navigation';

export default function Logout() {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(clearAll());
        router.replace('/');
    }, [dispatch, router]);

    return null;
}
