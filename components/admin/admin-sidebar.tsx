"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Users, Globe, Briefcase, Code, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

// Danh sách các mục trong sidebar
const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "Quản lý người dùng",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Quản lý ngôn ngữ",
    href: "/admin/languages",
    icon: Globe,
  },
  {
    title: "Quản lý chuyên ngành",
    href: "/admin/industries",
    icon: Briefcase,
  },
  {
    title: "Quản lý kỹ năng",
    href: "/admin/skills",
    icon: Code,
  },
  {
    title: "Đăng xuất",
    href: "/logout",
    icon: LogOut,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col bg-[#0c1425] border-r border-[#1e2c4a] h-screen transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div
        className={cn(
          "p-4 flex items-center",
          isCollapsed ? "justify-center" : "justify-between"
        )}
      >
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
            <span className="font-bold text-white">F</span>
          </div>
          {!isCollapsed && (
            <span className="font-bold text-xl text-white">FreelanceVN</span>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "text-gray-400 hover:text-white",
            isCollapsed && "hidden"
          )}
        >
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 4-8 8 8 8"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 4 8 8-8 8"></path>
            </svg>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-[#1e2c4a] hover:text-white",
                isCollapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
