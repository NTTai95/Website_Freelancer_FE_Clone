// app/admin/page.tsx
"use client";

import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  router.replace('/admin/dashboard');
}
