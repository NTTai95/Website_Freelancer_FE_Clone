// /app/page.tsx
"use client";

import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    router.replace('/home');
};

export default Page;