"use client";

import { useState } from "react";
import { Bell, Search, User } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Người dùng mới đăng ký",
      time: "5 phút trước",
      read: false,
    },
    {
      id: 2,
      title: "Báo cáo hàng tuần đã sẵn sàng",
      time: "1 giờ trước",
      read: false,
    },
    {
      id: 3,
      title: "Cập nhật hệ thống",
      time: "1 ngày trước",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <header className="border-b border-[#1e2c4a] bg-[#0c1425] py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm..."
              className="pl-8 bg-[#1e2c4a] border-[#1e2c4a] text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="relative border-[#1e2c4a] bg-[#1e2c4a] text-gray-400 hover:text-white hover:bg-[#2a3c5e]"
              onClick={handleNotificationClick}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#1e2c4a] rounded-md border border-[#2a3c5e] shadow-lg z-50">
                <div className="p-4 border-b border-[#2a3c5e]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white">Thông báo</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-gray-400 hover:text-white"
                      onClick={markAllAsRead}
                    >
                      Đánh dấu tất cả đã đọc
                    </Button>
                  </div>
                </div>
                <div className="max-h-80 overflow-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-[#2a3c5e] last:border-0 ${
                        !notification.read ? "bg-[#2a3c5e]/50" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <p className="font-medium text-white">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-400">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-[#2a3c5e]">
                  <Button
                    variant="ghost"
                    className="w-full text-gray-400 hover:text-white"
                    size="sm"
                  >
                    Xem tất cả thông báo
                  </Button>
                </div>
              </div>
            )}
          </div>

          <ModeToggle className="border-[#1e2c4a] bg-[#1e2c4a] text-gray-400 hover:text-white hover:bg-[#2a3c5e]" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-white">Admin</span>
                  <span className="text-xs text-gray-500">
                    admin@freelancevn.com
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-[#1e2c4a] border-[#2a3c5e] text-white"
            >
              <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#2a3c5e]" />
              <DropdownMenuItem className="hover:bg-[#2a3c5e] cursor-pointer">
                Hồ sơ
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#2a3c5e]" />
              <DropdownMenuItem className="hover:bg-[#2a3c5e] cursor-pointer">
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
