import type React from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0c1425]">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-6 bg-[#0c1425] text-white">{children}</main>
      </div>
    </div>
  )
}
