"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { MoreHorizontal, Trash2, Eye, Search, Filter, AlertTriangle, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/admin/pagination"
import { SortableHeader } from "@/components/admin/sortable-header"

// Mẫu dữ liệu người dùng
const usersData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    type: "freelancer",
    status: "active",
    createdAt: "2023-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@gmail.com",
    type: "client",
    status: "active",
    createdAt: "2023-01-16T11:20:00Z",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@gmail.com",
    type: "freelancer",
    status: "inactive",
    createdAt: "2023-01-17T09:45:00Z",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@gmail.com",
    type: "freelancer",
    status: "active",
    createdAt: "2023-01-18T14:10:00Z",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@gmail.com",
    type: "client",
    status: "active",
    createdAt: "2023-01-19T16:30:00Z",
  },
  {
    id: 6,
    name: "Đỗ Thị F",
    email: "dothif@gmail.com",
    type: "freelancer",
    status: "inactive",
    createdAt: "2023-01-20T13:15:00Z",
  },
  {
    id: 7,
    name: "Vũ Văn G",
    email: "vuvang@gmail.com",
    type: "client",
    status: "active",
    createdAt: "2023-01-21T10:50:00Z",
  },
  {
    id: 8,
    name: "Ngô Thị H",
    email: "ngothih@gmail.com",
    type: "freelancer",
    status: "active",
    createdAt: "2023-01-22T11:40:00Z",
  },
  {
    id: 9,
    name: "Đinh Văn I",
    email: "dinhvani@gmail.com",
    type: "client",
    status: "inactive",
    createdAt: "2023-01-23T15:25:00Z",
  },
  {
    id: 10,
    name: "Lý Thị K",
    email: "lythik@gmail.com",
    type: "freelancer",
    status: "active",
    createdAt: "2023-01-24T09:15:00Z",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState(usersData)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [userToUpdateStatus, setUserToUpdateStatus] = useState<{ id: number; status: string } | null>(null)

  // Sorting states
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null)

  const itemsPerPage = 5

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(".page-header", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })

      // Animate filters
      gsap.from(".filters-container", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out",
      })

      // Animate table
      gsap.from(".users-table", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if same field
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortField(null)
        setSortDirection(null)
      } else {
        setSortDirection("asc")
      }
    } else {
      // New field, set to ascending
      setSortField(field)
      setSortDirection("asc")
    }

    // Reset to first page when sorting changes
    setCurrentPage(1)
  }

  // Filter users based on search term, type, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || user.type === typeFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  // Sort filtered users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField || !sortDirection) return 0

    let valueA, valueB

    // Handle different field types
    switch (sortField) {
      case "id":
        valueA = a.id
        valueB = b.id
        break
      case "name":
        valueA = a.name.toLowerCase()
        valueB = b.name.toLowerCase()
        break
      case "email":
        valueA = a.email.toLowerCase()
        valueB = b.email.toLowerCase()
        break
      case "type":
        valueA = a.type.toLowerCase()
        valueB = b.type.toLowerCase()
        break
      case "status":
        valueA = a.status.toLowerCase()
        valueB = b.status.toLowerCase()
        break
      case "createdAt":
        valueA = new Date(a.createdAt).getTime()
        valueB = new Date(b.createdAt).getTime()
        break
      default:
        return 0
    }

    // Compare based on direction
    if (sortDirection === "asc") {
      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0
    } else {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0
    }
  })

  // Paginate users
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage)
  const paginatedUsers = sortedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggleUserStatus = (userId: number) => {
    const userToUpdate = users.find((user) => user.id === userId)
    if (userToUpdate) {
      setUserToUpdateStatus({ id: userId, status: userToUpdate.status })
      setStatusDialogOpen(true)
    }
  }

  const handleUpdateStatus = () => {
    if (userToUpdateStatus !== null) {
      setUsers(
        users.map((user) =>
          user.id === userToUpdateStatus.id
            ? {
                ...user,
                status: user.status === "active" ? "inactive" : "active",
              }
            : user,
        ),
      )
      setStatusDialogOpen(false)
      setUserToUpdateStatus(null)
    }
  }

  const deleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id))
      setIsDeleteDialogOpen(false)
      setSelectedUser(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setTypeFilter("all")
    setStatusFilter("all")
    setSortField(null)
    setSortDirection(null)
    setCurrentPage(1)
  }

  return (
    <div ref={pageRef}>
      <div className="flex flex-col gap-4 page-header">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý người dùng</h1>
        <p className="text-gray-400">Quản lý tất cả người dùng trên nền tảng FreelanceVN.</p>
      </div>

      <Card className="mt-6 bg-[#1e2c4a] border-[#2a3c5e] text-white">
        <CardHeader className="pb-2">
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription className="text-gray-400">Tổng cộng {users.length} người dùng trên hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6 filters-container">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc email..."
                className="pl-9 bg-[#2a3c5e] border-[#2a3c5e] text-white"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Reset to first page on search
                }}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-40">
                <Select
                  value={typeFilter}
                  onValueChange={(value) => {
                    setTypeFilter(value)
                    setCurrentPage(1) // Reset to first page on filter change
                  }}
                >
                  <SelectTrigger className="bg-[#2a3c5e] border-[#2a3c5e] text-white">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4 text-gray-400" />
                      <SelectValue placeholder="Loại tài khoản" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
                    <SelectItem value="all" className="focus:bg-[#2a3c5e] focus:text-white">
                      Tất cả
                    </SelectItem>
                    <SelectItem value="freelancer" className="focus:bg-[#2a3c5e] focus:text-white">
                      Freelancer
                    </SelectItem>
                    <SelectItem value="client" className="focus:bg-[#2a3c5e] focus:text-white">
                      Nhà tuyển dụng
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value)
                    setCurrentPage(1) // Reset to first page on filter change
                  }}
                >
                  <SelectTrigger className="bg-[#2a3c5e] border-[#2a3c5e] text-white">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4 text-gray-400" />
                      <SelectValue placeholder="Trạng thái" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
                    <SelectItem value="all" className="focus:bg-[#2a3c5e] focus:text-white">
                      Tất cả
                    </SelectItem>
                    <SelectItem value="active" className="focus:bg-[#2a3c5e] focus:text-white">
                      Hoạt động
                    </SelectItem>
                    <SelectItem value="inactive" className="focus:bg-[#2a3c5e] focus:text-white">
                      Không hoạt động
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                className="border-[#2a3c5e] text-gray-400 hover:bg-[#2a3c5e] hover:text-white"
                onClick={resetFilters}
              >
                Đặt lại
              </Button>
            </div>
          </div>

          <div className="rounded-md border border-[#2a3c5e] users-table">
            <Table>
              <TableHeader className="bg-[#0c1425]">
                <TableRow className="border-[#2a3c5e]">
                  <SortableHeader
                    field="id"
                    currentSortField={sortField}
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    ID
                  </SortableHeader>
                  <SortableHeader
                    field="name"
                    currentSortField={sortField}
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    Tên
                  </SortableHeader>
                  <SortableHeader
                    field="email"
                    currentSortField={sortField}
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    Email
                  </SortableHeader>
                  <SortableHeader
                    field="type"
                    currentSortField={sortField}
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    Loại tài khoản
                  </SortableHeader>
                  <SortableHeader
                    field="status"
                    currentSortField={sortField}
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    Trạng thái
                  </SortableHeader>
                  <SortableHeader
                    field="createdAt"
                    currentSortField={sortField}
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    Ngày tạo
                  </SortableHeader>
                  <TableHead className="text-gray-400 text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <TableRow key={user.id} className="border-[#2a3c5e]">
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.type === "freelancer"
                              ? "bg-blue-900/30 text-blue-300 border-blue-700"
                              : "bg-purple-900/30 text-purple-300 border-purple-700"
                          }
                        >
                          {user.type === "freelancer" ? "Freelancer" : "Nhà tuyển dụng"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.status === "active" ? (
                          <Badge className="bg-green-900/30 text-green-300 border-green-800">
                            <Check className="mr-1 h-3 w-3" />
                            Kích hoạt
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-900/30 text-red-300 border-red-800">
                            <X className="mr-1 h-3 w-3" />
                            Vô hiệu hóa
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 text-gray-400 hover:bg-[#2a3c5e] hover:text-white"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
                            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-[#2a3c5e]" />
                            <DropdownMenuItem
                              className="cursor-pointer hover:bg-[#2a3c5e] focus:bg-[#2a3c5e]"
                              onClick={() => {
                                setSelectedUser(user)
                                setIsViewDialogOpen(true)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer hover:bg-[#2a3c5e] focus:bg-[#2a3c5e]"
                              onClick={() => toggleUserStatus(user.id)}
                            >
                              {user.status === "active" ? (
                                <>
                                  <X className="mr-2 h-4 w-4" />
                                  Vô hiệu hóa
                                </>
                              ) : (
                                <>
                                  <Check className="mr-2 h-4 w-4" />
                                  Kích hoạt
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer text-red-400 hover:bg-red-900/30 hover:text-red-300 focus:bg-red-900/30 focus:text-red-300"
                              onClick={() => {
                                setSelectedUser(user)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-[#2a3c5e]">
                    <TableCell colSpan={7} className="text-center py-6 text-gray-400">
                      Không tìm thấy người dùng nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {sortedUsers.length > itemsPerPage && (
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Hiển thị {Math.min(sortedUsers.length, (currentPage - 1) * itemsPerPage + 1)} -{" "}
                {Math.min(sortedUsers.length, currentPage * itemsPerPage)} trên {sortedUsers.length} kết quả
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <DialogHeader>
            <DialogTitle>Thông tin người dùng</DialogTitle>
            <DialogDescription className="text-gray-400">Chi tiết thông tin người dùng</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-gray-400">ID</p>
                <p>{selectedUser.id}</p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-gray-400">Tên</p>
                <p>{selectedUser.name}</p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-gray-400">Email</p>
                <p>{selectedUser.email}</p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-gray-400">Loại tài khoản</p>
                <Badge
                  variant="outline"
                  className={
                    selectedUser.type === "freelancer"
                      ? "bg-blue-900/30 text-blue-300 border-blue-700 w-fit"
                      : "bg-purple-900/30 text-purple-300 border-purple-700 w-fit"
                  }
                >
                  {selectedUser.type === "freelancer" ? "Freelancer" : "Nhà tuyển dụng"}
                </Badge>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-gray-400">Trạng thái</p>
                <Badge
                  variant="outline"
                  className={
                    selectedUser.status === "active"
                      ? "bg-green-900/30 text-green-300 border-green-700 w-fit"
                      : "bg-red-900/30 text-red-300 border-red-700 w-fit"
                  }
                >
                  {selectedUser.status === "active" ? "Hoạt động" : "Không hoạt động"}
                </Badge>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-gray-400">Ngày tạo</p>
                <p>{formatDate(selectedUser.createdAt)}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
              className="border-[#2a3c5e] text-gray-400 hover:bg-[#2a3c5e] hover:text-white"
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Xác nhận xóa người dùng
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Bạn có chắc chắn muốn xóa người dùng <span className="font-medium text-white">{selectedUser?.name}</span>?
              Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button type="button" variant="destructive" onClick={deleteUser} className="bg-red-600 hover:bg-red-700">
              Xóa người dùng
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-[#2a3c5e] text-gray-400 hover:bg-[#2a3c5e] hover:text-white"
            >
              Hủy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận thay đổi trạng thái */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <DialogHeader>
            <DialogTitle>Xác nhận thay đổi trạng thái</DialogTitle>
            <DialogDescription className="text-gray-400">
              {userToUpdateStatus?.status === "active"
                ? "Bạn có chắc chắn muốn vô hiệu hóa người dùng này?"
                : "Bạn có chắc chắn muốn kích hoạt người dùng này?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setStatusDialogOpen(false)}
              className="border-[#2a3c5e] text-gray-400 hover:bg-[#2a3c5e] hover:text-white"
            >
              Hủy
            </Button>
            <Button onClick={handleUpdateStatus} className="bg-blue-600 hover:bg-blue-700">
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
