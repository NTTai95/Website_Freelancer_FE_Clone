"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check, Edit, MoreHorizontal, Plus, Search, Trash, X } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Pagination } from "@/components/admin/pagination"
import { SortableHeader } from "@/components/admin/sortable-header"

// Cấu trúc dữ liệu ngôn ngữ
const languagesData = [
  { id: 1, name: "Tiếng Việt", isoCode: "vi", status: "active", createdAt: "2023-01-15T10:30:00Z" },
  { id: 2, name: "Tiếng Anh", isoCode: "en", status: "active", createdAt: "2023-01-15T10:35:00Z" },
  { id: 3, name: "Tiếng Nhật", isoCode: "ja", status: "active", createdAt: "2023-01-16T11:20:00Z" },
  { id: 4, name: "Tiếng Hàn", isoCode: "ko", status: "active", createdAt: "2023-01-17T09:45:00Z" },
  { id: 5, name: "Tiếng Trung", isoCode: "zh", status: "active", createdAt: "2023-01-18T14:10:00Z" },
  { id: 6, name: "Tiếng Pháp", isoCode: "fr", status: "inactive", createdAt: "2023-01-19T16:30:00Z" },
  { id: 7, name: "Tiếng Đức", isoCode: "de", status: "active", createdAt: "2023-01-20T13:15:00Z" },
  { id: 8, name: "Tiếng Tây Ban Nha", isoCode: "es", status: "active", createdAt: "2023-01-21T10:50:00Z" },
  { id: 9, name: "Tiếng Ý", isoCode: "it", status: "inactive", createdAt: "2023-01-22T11:40:00Z" },
  { id: 10, name: "Tiếng Nga", isoCode: "ru", status: "active", createdAt: "2023-01-23T15:25:00Z" },
]

export default function LanguagesPage() {
  const [languages, setLanguages] = useState(languagesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [languageToDelete, setLanguageToDelete] = useState<number | null>(null)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [languageToUpdateStatus, setLanguageToUpdateStatus] = useState<{ id: number; status: string } | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<any>(null)
  const [newLanguage, setNewLanguage] = useState({ name: "", isoCode: "", status: true })
  const [editLanguage, setEditLanguage] = useState({ name: "", isoCode: "", status: true })
  const [formErrors, setFormErrors] = useState<{ name?: string; isoCode?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sorting states
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null)

  // Status filter
  const [statusFilter, setStatusFilter] = useState("all")

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

  // Lọc ngôn ngữ theo từ khóa tìm kiếm và trạng thái
  const filteredLanguages = languages.filter((language) => {
    const matchesSearch =
      language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      language.isoCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || language.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Sort filtered languages
  const sortedLanguages = [...filteredLanguages].sort((a, b) => {
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
      case "isoCode":
        valueA = a.isoCode.toLowerCase()
        valueB = b.isoCode.toLowerCase()
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

  // Tính toán số trang và phân trang dữ liệu
  const totalPages = Math.ceil(sortedLanguages.length / itemsPerPage)
  const paginatedLanguages = sortedLanguages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Xử lý xóa ngôn ngữ
  const handleDeleteLanguage = () => {
    if (languageToDelete !== null) {
      setLanguages(languages.filter((lang) => lang.id !== languageToDelete))
      setDeleteDialogOpen(false)
      setLanguageToDelete(null)
    }
  }

  // Xử lý cập nhật trạng thái
  const handleUpdateStatus = () => {
    if (languageToUpdateStatus !== null) {
      const updatedLanguages = languages.map((lang) =>
        lang.id === languageToUpdateStatus.id
          ? { ...lang, status: languageToUpdateStatus.status === "active" ? "inactive" : "active" }
          : lang,
      )
      setLanguages(updatedLanguages)
      setStatusDialogOpen(false)
      setLanguageToUpdateStatus(null)
    }
  }

  // Xử lý thêm ngôn ngữ mới
  const handleAddLanguage = () => {
    setIsSubmitting(true)
    setFormErrors({})

    // Kiểm tra tên ngôn ngữ
    if (!newLanguage.name.trim()) {
      setFormErrors((prev) => ({ ...prev, name: "Tên ngôn ngữ không được để trống" }))
      setIsSubmitting(false)
      return
    }

    // Kiểm tra mã ISO
    if (!newLanguage.isoCode.trim()) {
      setFormErrors((prev) => ({ ...prev, isoCode: "Mã ISO không được để trống" }))
      setIsSubmitting(false)
      return
    }

    // Kiểm tra trùng lặp tên
    if (languages.some((lang) => lang.name.toLowerCase() === newLanguage.name.toLowerCase())) {
      setFormErrors((prev) => ({ ...prev, name: "Ngôn ngữ này đã tồn tại" }))
      setIsSubmitting(false)
      return
    }

    // Kiểm tra trùng lặp mã ISO
    if (languages.some((lang) => lang.isoCode.toLowerCase() === newLanguage.isoCode.toLowerCase())) {
      setFormErrors((prev) => ({ ...prev, isoCode: "Mã ISO này đã tồn tại" }))
      setIsSubmitting(false)
      return
    }

    // Thêm ngôn ngữ mới
    const newId = Math.max(...languages.map((lang) => lang.id)) + 1
    const newLang = {
      id: newId,
      name: newLanguage.name,
      isoCode: newLanguage.isoCode,
      status: newLanguage.status ? "active" : "inactive",
      createdAt: new Date().toISOString(),
    }

    setLanguages([...languages, newLang])
    setIsAddDialogOpen(false)
    setNewLanguage({ name: "", isoCode: "", status: true })
    setIsSubmitting(false)
  }

  // Xử lý chỉnh sửa ngôn ngữ
  const handleEditLanguage = () => {
    setIsSubmitting(true)
    setFormErrors({})

    // Kiểm tra tên ngôn ngữ
    if (!editLanguage.name.trim()) {
      setFormErrors((prev) => ({ ...prev, name: "Tên ngôn ngữ không được để trống" }))
      setIsSubmitting(false)
      return
    }

    // Kiểm tra mã ISO
    if (!editLanguage.isoCode.trim()) {
      setFormErrors((prev) => ({ ...prev, isoCode: "Mã ISO không được để trống" }))
      setIsSubmitting(false)
      return
    }

    // Kiểm tra trùng lặp tên (loại trừ ngôn ngữ hiện tại)
    if (
      languages.some(
        (lang) => lang.id !== selectedLanguage.id && lang.name.toLowerCase() === editLanguage.name.toLowerCase(),
      )
    ) {
      setFormErrors((prev) => ({ ...prev, name: "Ngôn ngữ này đã tồn tại" }))
      setIsSubmitting(false)
      return
    }

    // Kiểm tra trùng lặp mã ISO (loại trừ ngôn ngữ hiện tại)
    if (
      languages.some(
        (lang) => lang.id !== selectedLanguage.id && lang.isoCode.toLowerCase() === editLanguage.isoCode.toLowerCase(),
      )
    ) {
      setFormErrors((prev) => ({ ...prev, isoCode: "Mã ISO này đã tồn tại" }))
      setIsSubmitting(false)
      return
    }

    // Cập nhật ngôn ngữ
    const updatedLanguages = languages.map((lang) =>
      lang.id === selectedLanguage.id
        ? {
            ...lang,
            name: editLanguage.name,
            isoCode: editLanguage.isoCode,
            status: editLanguage.status ? "active" : "inactive",
          }
        : lang,
    )

    setLanguages(updatedLanguages)
    setIsEditDialogOpen(false)
    setSelectedLanguage(null)
    setEditLanguage({ name: "", isoCode: "", status: true })
    setIsSubmitting(false)
  }

  // Mở dialog chỉnh sửa và thiết lập dữ liệu
  const openEditDialog = (language: any) => {
    setSelectedLanguage(language)
    setEditLanguage({
      name: language.name,
      isoCode: language.isoCode,
      status: language.status === "active",
    })
    setFormErrors({})
    setIsEditDialogOpen(true)
  }

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setSortField(null)
    setSortDirection(null)
    setCurrentPage(1)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">Quản lý ngôn ngữ</h1>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            setNewLanguage({ name: "", isoCode: "", status: true })
            setFormErrors({})
            setIsAddDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm ngôn ngữ
        </Button>
      </div>

      <Card className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
        <CardHeader>
          <CardTitle>Danh sách ngôn ngữ</CardTitle>
          <CardDescription className="text-gray-400">Quản lý tất cả các ngôn ngữ có sẵn trên hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Tìm kiếm ngôn ngữ..."
                className="pl-9 bg-[#2a3c5e] border-[#2a3c5e] text-white"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Reset to first page on search
                }}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="bg-[#2a3c5e] border-[#2a3c5e] text-white rounded-md px-3 py-2 w-40"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setCurrentPage(1) // Reset to first page on filter change
                }}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Kích hoạt</option>
                <option value="inactive">Vô hiệu hóa</option>
              </select>
              <Button
                variant="outline"
                className="border-[#2a3c5e] text-gray-400 hover:bg-[#2a3c5e] hover:text-white"
                onClick={resetFilters}
              >
                Đặt lại
              </Button>
            </div>
          </div>

          <div className="rounded-md border border-[#2a3c5e]">
            <Table>
              <TableHeader className="bg-[#0c1425]">
                <TableRow className="border-[#2a3c5e] hover:bg-[#2a3c5e]">
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
                    Tên ngôn ngữ
                  </SortableHeader>
                  <SortableHeader
                    field="isoCode"
                    currentSortField={sortField}
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    Mã ISO
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
                {paginatedLanguages.length > 0 ? (
                  paginatedLanguages.map((language) => (
                    <TableRow key={language.id} className="border-[#2a3c5e] hover:bg-[#2a3c5e]">
                      <TableCell className="font-medium text-white">{language.id}</TableCell>
                      <TableCell className="text-white">{language.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-800">
                          {language.isoCode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {language.status === "active" ? (
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
                      <TableCell className="text-gray-400">
                        {format(new Date(language.createdAt), "dd/MM/yyyy HH:mm", { locale: vi })}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 text-gray-400 hover:bg-[#2a3c5e] hover:text-white"
                            >
                              <span className="sr-only">Mở menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
                            <DropdownMenuItem
                              className="hover:bg-[#2a3c5e] cursor-pointer"
                              onClick={() => openEditDialog(language)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="hover:bg-[#2a3c5e] cursor-pointer"
                              onClick={() => {
                                setLanguageToUpdateStatus({ id: language.id, status: language.status })
                                setStatusDialogOpen(true)
                              }}
                            >
                              {language.status === "active" ? (
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
                              className="text-red-400 hover:bg-red-900/30 hover:text-red-300 cursor-pointer"
                              onClick={() => {
                                setLanguageToDelete(language.id)
                                setDeleteDialogOpen(true)
                              }}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-400">
                      Không tìm thấy ngôn ngữ nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {sortedLanguages.length > itemsPerPage && (
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Hiển thị {Math.min(sortedLanguages.length, (currentPage - 1) * itemsPerPage + 1)} -{" "}
                {Math.min(sortedLanguages.length, currentPage * itemsPerPage)} trên {sortedLanguages.length} kết quả
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog thêm ngôn ngữ */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <DialogHeader>
            <DialogTitle>Thêm ngôn ngữ mới</DialogTitle>
            <DialogDescription className="text-gray-400">Nhập thông tin chi tiết cho ngôn ngữ mới</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Tên ngôn ngữ</label>
              <Input
                type="text"
                placeholder="Nhập tên ngôn ngữ"
                className="bg-[#2a3c5e] border-[#2a3c5e] text-white"
                value={newLanguage.name}
                onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              />
              {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
              <p className="text-xs text-gray-400">Tên ngôn ngữ phải là duy nhất</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Mã ISO</label>
              <Input
                type="text"
                placeholder="Nhập mã ISO (vd: vi, en, fr)"
                className="bg-[#2a3c5e] border-[#2a3c5e] text-white"
                value={newLanguage.isoCode}
                onChange={(e) => setNewLanguage({ ...newLanguage, isoCode: e.target.value })}
              />
              {formErrors.isoCode && <p className="text-sm text-red-500">{formErrors.isoCode}</p>}
              <p className="text-xs text-gray-400">Mã ISO là mã chuẩn quốc tế cho ngôn ngữ (vd: vi, en, fr)</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#2a3c5e] p-4">
              <div>
                <p className="text-sm font-medium text-gray-400">Trạng thái</p>
                <p className="text-xs text-gray-400">
                  Ngôn ngữ sẽ {newLanguage.status ? "hiển thị" : "bị ẩn"} trên hệ thống
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className={`px-3 py-1 rounded-md text-sm ${
                    newLanguage.status
                      ? "bg-green-900/30 text-green-300 border border-green-800"
                      : "bg-transparent text-gray-400 border border-[#2a3c5e]"
                  }`}
                  onClick={() => setNewLanguage({ ...newLanguage, status: true })}
                >
                  Kích hoạt
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 rounded-md text-sm ${
                    !newLanguage.status
                      ? "bg-red-900/30 text-red-300 border border-red-800"
                      : "bg-transparent text-gray-400 border border-[#2a3c5e]"
                  }`}
                  onClick={() => setNewLanguage({ ...newLanguage, status: false })}
                >
                  Vô hiệu hóa
                </button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="border-[#2a3c5e] text-gray-400 hover:bg-[#2a3c5e] hover:text-white"
            >
              Hủy
            </Button>
            <Button onClick={handleAddLanguage} className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
              {isSubmitting ? "Đang xử lý..." : "Thêm ngôn ngữ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog chỉnh sửa ngôn ngữ */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa ngôn ngữ</DialogTitle>
            <DialogDescription className="text-gray-400">Chỉnh sửa thông tin chi tiết cho ngôn ngữ</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Tên ngôn ngữ</label>
              <Input
                type="text"
                placeholder="Nhập tên ngôn ngữ"
                className="bg-[#2a3c5e] border-[#2a3c5e] text-white"
                value={editLanguage.name}
                onChange={(e) => setEditLanguage({ ...editLanguage, name: e.target.value })}
              />
              {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
              <p className="text-xs text-gray-400">Tên ngôn ngữ phải là duy nhất</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Mã ISO</label>
              <Input
                type="text"
                placeholder="Nhập mã ISO (vd: vi, en, fr)"
                className="bg-[#2a3c5e] border-[#2a3c5e] text-white"
                value={editLanguage.isoCode}
                onChange={(e) => setEditLanguage({ ...editLanguage, isoCode: e.target.value })}
              />
              {formErrors.isoCode && <p className="text-sm text-red-500">{formErrors.isoCode}</p>}
              <p className="text-xs text-gray-400">Mã ISO là mã chuẩn quốc tế cho ngôn ngữ (vd: vi, en, fr)</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#2a3c5e] p-4">
              <div>
                <p className="text-sm font-medium text-gray-400">Trạng thái</p>
                <p className="text-xs text-gray-400">
                  Ngôn ngữ sẽ {editLanguage.status ? "hiển thị" : "bị ẩn"} trên hệ thống
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className={`px-3 py-1 rounded-md text-sm ${
                    editLanguage.status
                      ? "bg-green-900/30 text-green-300 border border-green-800"
                      : "bg-transparent text-gray-400 border border-[#2a3c5e]"
                  }`}
                  onClick={() => setEditLanguage({ ...editLanguage, status: true })}
                >
                  Kích hoạt
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 rounded-md text-sm ${
                    !editLanguage.status
                      ? "bg-red-900/30 text-red-300 border border-red-800"
                      : "bg-transparent text-gray-400 border border-[#2a3c5e]"
                  }`}
                  onClick={() => setEditLanguage({ ...editLanguage, status: false })}
                >
                  Vô hiệu hóa
                </button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-[#2a3c5e] text-gray-400 hover:bg-[#2a3c5e] hover:text-white"
            >
              Hủy
            </Button>
            <Button onClick={handleEditLanguage} className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
              {isSubmitting ? "Đang xử lý..." : "Lưu thay đổi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription className="text-gray-400">
              Bạn có chắc chắn muốn xóa ngôn ngữ này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-[#2a3c5e] text-gray-400 hover:bg-[#2a3c5e] hover:text-white"
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteLanguage}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Xóa
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
              {languageToUpdateStatus?.status === "active"
                ? "Bạn có chắc chắn muốn vô hiệu hóa ngôn ngữ này?"
                : "Bạn có chắc chắn muốn kích hoạt ngôn ngữ này?"}
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
