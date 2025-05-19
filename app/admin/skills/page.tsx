"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/admin/pagination"
import { Search, MoreHorizontal, Plus, Edit, Trash, Check, X, Code, Filter } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { SortableHeader } from "@/components/admin/sortable-header"

// Mẫu dữ liệu chuyên ngành
const industriesData = [
  { id: 1, name: "Phát triển Web", status: "active" },
  { id: 2, name: "Thiết kế UI/UX", status: "active" },
  { id: 3, name: "Digital Marketing", status: "active" },
  { id: 4, name: "Phát triển Mobile", status: "active" },
  { id: 5, name: "Thiết kế Đồ họa", status: "active" },
  { id: 6, name: "Video & Animation", status: "inactive" },
  { id: 7, name: "Viết lách & Biên dịch", status: "active" },
  { id: 8, name: "Phân tích dữ liệu", status: "inactive" },
]

// Mẫu dữ liệu kỹ năng
const skillsData = [
  {
    id: 1,
    name: "HTML/CSS",
    industryId: 1,
    industryName: "Phát triển Web",
    status: "active",
    createdAt: "2023-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "JavaScript",
    industryId: 1,
    industryName: "Phát triển Web",
    status: "active",
    createdAt: "2023-01-15T10:35:00Z",
  },
  {
    id: 3,
    name: "React",
    industryId: 1,
    industryName: "Phát triển Web",
    status: "active",
    createdAt: "2023-01-16T11:20:00Z",
  },
  {
    id: 4,
    name: "Node.js",
    industryId: 1,
    industryName: "Phát triển Web",
    status: "active",
    createdAt: "2023-01-17T09:45:00Z",
  },
  {
    id: 5,
    name: "Figma",
    industryId: 2,
    industryName: "Thiết kế UI/UX",
    status: "active",
    createdAt: "2023-01-18T14:10:00Z",
  },
  {
    id: 6,
    name: "Adobe XD",
    industryId: 2,
    industryName: "Thiết kế UI/UX",
    status: "inactive",
    createdAt: "2023-01-19T16:30:00Z",
  },
  {
    id: 7,
    name: "SEO",
    industryId: 3,
    industryName: "Digital Marketing",
    status: "active",
    createdAt: "2023-01-20T13:15:00Z",
  },
  {
    id: 8,
    name: "Google Ads",
    industryId: 3,
    industryName: "Digital Marketing",
    status: "active",
    createdAt: "2023-01-21T10:50:00Z",
  },
  {
    id: 9,
    name: "Flutter",
    industryId: 4,
    industryName: "Phát triển Mobile",
    status: "active",
    createdAt: "2023-01-22T11:40:00Z",
  },
  {
    id: 10,
    name: "React Native",
    industryId: 4,
    industryName: "Phát triển Mobile",
    status: "active",
    createdAt: "2023-01-23T15:25:00Z",
  },
]

export default function SkillsPage() {
  const [skills, setSkills] = useState(skillsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<any>(null)
  const [newSkill, setNewSkill] = useState({ name: "", industryId: "", status: true })
  const [editSkill, setEditSkill] = useState({ name: "", industryId: "", status: true })
  const [formErrors, setFormErrors] = useState<{ name?: string; industryId?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [skillToDelete, setSkillToDelete] = useState<number | null>(null)
  const [skillToUpdateStatus, setSkillToUpdateStatus] = useState<{ id: number; status: string } | null>(null)
  
  // Sorting states
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null)

  const itemsPerPage = 5

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

  // Filter skills based on search term, industry, and status
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = industryFilter === "all" || skill.industryId.toString() === industryFilter
    const matchesStatus = statusFilter === "all" || skill.status === statusFilter

    return matchesSearch && matchesIndustry && matchesStatus
  })

  // Sort filtered skills
  const sortedSkills = [...filteredSkills].sort((a, b) => {
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
      case "industryName":
        valueA = a.industryName.toLowerCase()
        valueB = b.industryName.toLowerCase()
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

  // Paginate skills
  const totalPages = Math.ceil(sortedSkills.length / itemsPerPage)
  const paginatedSkills = sortedSkills.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Get active industries for select options
  const activeIndustries = industriesData.filter((industry) => industry.status === "active")

  // Handle adding new skill
  const handleAddSkill = () => {
    setIsSubmitting(true)
    setFormErrors({})

    // Check if industry is selected
    if (!newSkill.industryId) {
      setFormErrors((prev) => ({ ...prev, industryId: "Vui lòng chọn chuyên ngành" }))
      setIsSubmitting(false)
      return
    }

    // Check if skill name is empty
    if (!newSkill.name.trim()) {
      setFormErrors((prev) => ({ ...prev, name: "Tên kỹ năng không được để trống" }))
      setIsSubmitting(false)
      return
    }

    // Check if skill name already exists in the same industry
    if (
      skills.some(
        (skill) =>
          skill.industryId.toString() === newSkill.industryId &&
          skill.name.toLowerCase() === newSkill.name.toLowerCase(),
      )
    ) {
      setFormErrors((prev) => ({ ...prev, name: "Kỹ năng này đã tồn tại trong chuyên ngành đã chọn" }))
      setIsSubmitting(false)
      return
    }

    const industry = industriesData.find((ind) => ind.id.toString() === newSkill.industryId)

    // Add new skill
    const newId = Math.max(...skills.map((skill) => skill.id)) + 1
    const skill = {
      id: newId,
      name: newSkill.name,
      industryId: Number.parseInt(newSkill.industryId),
      industryName: industry?.name || "",
      status: newSkill.status ? "active" : "inactive",
      createdAt: new Date().toISOString(),
    }

    setSkills([...skills, skill])
    setIsAddDialogOpen(false)
    setNewSkill({ name: "", industryId: "", status: true })
    setIsSubmitting(false)
  }

  // Handle editing skill
  const handleEditSkill = () => {
    setIsSubmitting(true)
    setFormErrors({})

    // Check if industry is selected
    if (!editSkill.industryId) {
      setFormErrors((prev) => ({ ...prev, industryId: "Vui lòng chọn chuyên ngành" }))
      setIsSubmitting(false)
      return
    }

    // Check if skill name is empty
    if (!editSkill.name.trim()) {
      setFormErrors((prev) => ({ ...prev, name: "Tên kỹ năng không được để trống" }))
      setIsSubmitting(false)
      return
    }

    // Check if skill name already exists in the same industry (excluding the current skill)
    if (
      skills.some(
        (skill) =>
          skill.id !== selectedSkill.id &&
          skill.industryId.toString() === editSkill.industryId &&
          skill.name.toLowerCase() === editSkill.name.toLowerCase(),
      )
    ) {
      setFormErrors((prev) => ({ ...prev, name: "Kỹ năng này đã tồn tại trong chuyên ngành đã chọn" }))
      setIsSubmitting(false)
      return
    }

    const industry = industriesData.find((ind) => ind.id.toString() === editSkill.industryId)

    // Update skill
    setSkills(
      skills.map((skill) =>
        skill.id === selectedSkill.id
          ? {
              ...skill,
              name: editSkill.name,
              industryId: Number.parseInt(editSkill.industryId),
              industryName: industry?.name || "",
              status: editSkill.status ? "active" : "inactive",
            }
          : skill,
      ),
    )
    setIsEditDialogOpen(false)
    setSelectedSkill(null)
    setEditSkill({ name: "", industryId: "", status: true })
    setIsSubmitting(false)
  }

  // Handle deleting skill
  const handleDeleteSkill = () => {
    if (skillToDelete !== null) {
      setSkills(skills.filter((skill) => skill.id !== skillToDelete))
      setDeleteDialogOpen(false)
      setSkillToDelete(null)
    }
  }

  // Handle updating status
  const handleUpdateStatus = () => {
    if (skillToUpdateStatus !== null) {
      const updatedSkills = skills.map((skill) =>
        skill.id === skillToUpdateStatus.id
          ? { ...skill, status: skillToUpdateStatus.status === "active" ? "inactive" : "active" }
          : skill,
      )
      setSkills(updatedSkills)
      setStatusDialogOpen(false)
      setSkillToUpdateStatus(null)
    }
  }

  // Open edit dialog and set data
  const openEditDialog = (skill: any) => {
    setSelectedSkill(skill)
    setEditSkill({
      name: skill.name,
      industryId: skill.industryId.toString(),
      status: skill.status === "active",
    })
    setFormErrors({})
    setIsEditDialogOpen(true)
  }
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setIndustryFilter("all")
    setStatusFilter("all")
    setSortField(null)
    setSortDirection(null)
    setCurrentPage(1)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">Quản lý kỹ năng</h1>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            setNewSkill({ name: "", industryId: "", status: true })
            setFormErrors({})
            setIsAddDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm kỹ năng
        </Button>
      </div>

      <Card className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
        <CardHeader>
          <CardTitle>Danh sách kỹ năng</CardTitle>
          <CardDescription className="text-gray-400">Tổng cộng {skills.length} kỹ năng trên hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm kỹ năng..."
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
                <Select value={industryFilter} onValueChange={(value) => {
                  setIndustryFilter(value)
                  setCurrentPage(1) // Reset to first page on filter change
                }}>
                  <SelectTrigger className="bg-[#2a3c5e] border-[#2a3c5e] text-white">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4 text-gray-400" />
                      <SelectValue placeholder="Chuyên ngành" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
                    <SelectItem value="all" className="focus:bg-[#2a3c5e] focus:text-white">
                      Tất cả
                    </SelectItem>
                    {industriesData.map((industry) => (
                      <SelectItem
                        key={industry.id}
                        value={industry.id.toString()}
                        className="focus:bg-[#2a3c5e] focus:text-white"
                      >
                        {industry.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Select value={statusFilter} onValueChange={(value) => {
                  setStatusFilter(value)
                  setCurrentPage(1) // Reset to first page on filter change
                }}>
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
                    Tên kỹ năng
                  </SortableHeader>
                  <SortableHeader 
                    field="industryName" 
                    currentSortField={sortField} 
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    Chuyên ngành
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
                {paginatedSkills.length > 0 ? (
                  paginatedSkills.map((skill) => (
                    <TableRow key={skill.id} className="border-[#2a3c5e] hover:bg-[#2a3c5e]">
                      <TableCell className="font-medium text-white">{skill.id}</TableCell>
                      <TableCell className="text-white">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-blue-500" />
                          <span>{skill.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700">
                          {skill.industryName}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {skill.status === "active" ? (
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
                        {format(new Date(skill.createdAt), "dd/MM/yyyy HH:mm", { locale: vi })}
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
                            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-[#2a3c5e]" />
                            <DropdownMenuItem
                              className="hover:bg-[#2a3c5e] cursor-pointer"
                              onClick={() => openEditDialog(skill)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="hover:bg-[#2a3c5e] cursor-pointer"
                              onClick={() => {
                                setSkillToUpdateStatus({ id: skill.id, status: skill.status })
                                setStatusDialogOpen(true)
                              }}
                            >
                              {skill.status === "active" ? (
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
                                setSkillToDelete(skill.id)
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
                  <TableRow className="border-[#2a3c5e]">
                    <TableCell colSpan={6} className="text-center py-6 text-gray-400">
                      Không tìm thấy kỹ năng nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {sortedSkills.length > itemsPerPage && (
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Hiển thị {Math.min(sortedSkills.length, (currentPage - 1) * itemsPerPage + 1)} - {Math.min(sortedSkills.length, currentPage * itemsPerPage)} trên {sortedSkills.length} kết quả
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog thêm kỹ năng */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <DialogHeader>
            <DialogTitle>Thêm kỹ năng mới</DialogTitle>
            <DialogDescription className="text-gray-400">Nhập thông tin chi tiết cho kỹ năng mới</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Chuyên ngành</label>
              <Select
                value={newSkill.industryId}
                onValueChange={(value) => setNewSkill({ ...newSkill, industryId: value })}
              >
                <SelectTrigger className="bg-[#2a3c5e] border-[#2a3c5e] text-white">
                  <SelectValue placeholder="Chọn chuy\
