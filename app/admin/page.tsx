"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { Users, Globe, Briefcase, Code, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  useEffect(() => {
    // Animation for dashboard cards
    gsap.fromTo(
      ".dashboard-card",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      },
    )

    // Animation for charts
    gsap.fromTo(
      ".chart-container",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        delay: 0.3,
        duration: 0.8,
        ease: "power2.out",
      },
    )
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-400">Tổng quan về hệ thống FreelanceVN</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dashboard-card bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <div className="flex items-center text-xs text-gray-400">
              <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+12.5%</span> so với tháng trước
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Freelancer</CardTitle>
            <Briefcase className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">842</div>
            <div className="flex items-center text-xs text-gray-400">
              <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+8.2%</span> so với tháng trước
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nhà tuyển dụng</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">406</div>
            <div className="flex items-center text-xs text-gray-400">
              <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+5.3%</span> so với tháng trước
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dự án đã đăng</CardTitle>
            <Code className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <div className="flex items-center text-xs text-gray-400">
              <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500 font-medium">-2.5%</span> so với tháng trước
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 dashboard-card bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <CardHeader>
            <CardTitle>Thống kê người dùng</CardTitle>
            <CardDescription className="text-gray-400">Số lượng người dùng đăng ký mới theo tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="chart-container h-[300px]">
              <div className="flex h-full items-end gap-2 pb-6">
                {Array.from({ length: 12 }).map((_, i) => {
                  const height = Math.floor(Math.random() * 70) + 30
                  return (
                    <div
                      key={i}
                      className="relative flex-1 rounded-md bg-blue-600/20 transition-all hover:bg-blue-600/30"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">{height}</div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400">
                        {`T${i + 1}`}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 dashboard-card bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <CardHeader>
            <CardTitle>Phân bố chuyên ngành</CardTitle>
            <CardDescription className="text-gray-400">Số lượng freelancer theo chuyên ngành</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="chart-container space-y-4">
              {[
                { name: "Lập trình web", value: 35, trend: "up" },
                { name: "Thiết kế đồ họa", value: 27, trend: "up" },
                { name: "Marketing", value: 18, trend: "down" },
                { name: "Viết lách", value: 12, trend: "up" },
                { name: "Dịch thuật", value: 8, trend: "down" },
              ].map((item) => (
                <div key={item.name} className="flex items-center">
                  <div className="w-full max-w-[180px] text-sm font-medium">{item.name}</div>
                  <div className="flex-1">
                    <div className="h-2 w-full rounded-full bg-[#2a3c5e]">
                      <div className="h-2 rounded-full bg-blue-600" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                  <div className="ml-4 w-12 text-right text-sm">{item.value}%</div>
                  <div className="ml-2 w-6">
                    {item.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="dashboard-card bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <CardHeader>
            <CardTitle>Người dùng mới nhất</CardTitle>
            <CardDescription className="text-gray-400">5 người dùng đăng ký gần đây nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", time: "5 phút trước", type: "Freelancer" },
                { name: "Trần Thị B", email: "tranthib@gmail.com", time: "1 giờ trước", type: "Nhà tuyển dụng" },
                { name: "Lê Văn C", email: "levanc@gmail.com", time: "3 giờ trước", type: "Freelancer" },
                { name: "Phạm Thị D", email: "phamthid@gmail.com", time: "5 giờ trước", type: "Freelancer" },
                { name: "Hoàng Văn E", email: "hoangvane@gmail.com", time: "1 ngày trước", type: "Nhà tuyển dụng" },
              ].map((user, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{user.time}</p>
                    <p className="text-xs text-gray-400">{user.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <CardHeader>
            <CardTitle>Ngôn ngữ phổ biến</CardTitle>
            <CardDescription className="text-gray-400">Ngôn ngữ được freelancer sử dụng nhiều nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Tiếng Anh", count: 756 },
                { name: "Tiếng Nhật", count: 342 },
                { name: "Tiếng Hàn", count: 218 },
                { name: "Tiếng Trung", count: 184 },
                { name: "Tiếng Pháp", count: 92 },
              ].map((language, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium">{language.name}</span>
                  </div>
                  <div className="text-sm text-gray-400">{language.count} người dùng</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <CardHeader>
            <CardTitle>Kỹ năng phổ biến</CardTitle>
            <CardDescription className="text-gray-400">Kỹ năng được freelancer sử dụng nhiều nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "JavaScript", count: 423 },
                { name: "React", count: 356 },
                { name: "Photoshop", count: 289 },
                { name: "Content Writing", count: 245 },
                { name: "SEO", count: 198 },
              ].map((skill, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                  <div className="text-sm text-gray-400">{skill.count} người dùng</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
