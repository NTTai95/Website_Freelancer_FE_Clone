"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/admin/pagination";
import {
  Search,
  MoreHorizontal,
  Plus,
  Edit,
  Trash,
  Check,
  X,
  Briefcase,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { SortableHeader } from "@/components/admin/sortable-header";

// Mẫu dữ liệu chuyên ngành
const industriesData = [
  {
    id: 1,
    name: "Phát triển Web",
    status: "active",
    skillsCount: 24,
    createdAt: "2023-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Thiết kế UI/UX",
    status: "active",
    skillsCount: 18,
    createdAt: "2023-01-16T11:20:00Z",
  },
  {
    id: 3,
    name: "Digital Marketing",
    status: "active",
    skillsCount: 15,
    createdAt: "2023-01-17T09:45:00Z",
  },
  {
    id: 4,
    name: "Phát triển Mobile",
    status: "active",
    skillsCount: 20,
    createdAt: "2023-01-18T14:10:00Z",
  },
  {
    id: 5,
    name: "Thiết kế Đồ họa",
    status: "active",
    skillsCount: 16,
    createdAt: "2023-01-19T16:30:00Z",
  },
  {
    id: 6,
    name: "Video & Animation",
    status: "inactive",
    skillsCount: 12,
    createdAt: "2023-01-20T13:15:00Z",
  },
  {
    id: 7,
    name: "Viết lách & Biên dịch",
    status: "active",
    skillsCount: 10,
    createdAt: "2023-01-21T10:50:00Z",
  },
  {
    id: 8,
    name: "Phân tích dữ liệu",
    status: "inactive",
    skillsCount: 8,
    createdAt: "2023-01-22T11:40:00Z",
  },
];

export default function IndustriesPage() {
  const [industries, setIndustries] = useState(industriesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<any>(null);
  const [newIndustry, setNewIndustry] = useState({ name: "", status: true });
  const [editIndustry, setEditIndustry] = useState({ name: "", status: true });
  const [formErrors, setFormErrors] = useState<{ name?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [industryToDelete, setIndustryToDelete] = useState<number | null>(null);
  const [industryToUpdateStatus, setIndustryToUpdateStatus] = useState<{
    id: number;
    status: string;
  } | null>(null);

  // Sorting states
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

  // Status filter
  const [statusFilter, setStatusFilter] = useState("all");

  const itemsPerPage = 5;

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if same field
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      // New field, set to ascending
      setSortField(field);
      setSortDirection("asc");
    }

    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  // Filter industries based on search term and status
  const filteredIndustries = industries.filter((industry) => {
    const matchesSearch = industry.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || industry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort filtered industries
  const sortedIndustries = [...filteredIndustries].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;

    let valueA, valueB;

    // Handle different field types
    switch (sortField) {
      case "id":
        valueA = a.id;
        valueB = b.id;
        break;
      case "name":
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        break;
      case "skillsCount":
        valueA = a.skillsCount;
        valueB = b.skillsCount;
        break;
      case "status":
        valueA = a.status.toLowerCase();
        valueB = b.status.toLowerCase();
        break;
      case "createdAt":
        valueA = new Date(a.createdAt).getTime();
        valueB = new Date(b.createdAt).getTime();
        break;
      default:
        return 0;
    }

    // Compare based on direction
    if (sortDirection === "asc") {
      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
    } else {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
    }
  });

  // Paginate industries
  const totalPages = Math.ceil(sortedIndustries.length / itemsPerPage);
  const paginatedIndustries = sortedIndustries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle adding new industry
  const handleAddIndustry = () => {
    setIsSubmitting(true);
    setFormErrors({});

    // Check if industry name is empty
    if (!newIndustry.name.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        name: "Tên chuyên ngành không được để trống",
      }));
      setIsSubmitting(false);
      return;
    }

    // Check if industry name already exists
    if (
      industries.some(
        (ind) => ind.name.toLowerCase() === newIndustry.name.toLowerCase()
      )
    ) {
      setFormErrors((prev) => ({
        ...prev,
        name: "Chuyên ngành này đã tồn tại",
      }));
      setIsSubmitting(false);
      return;
    }

    // Add new industry
    const newId = Math.max(...industries.map((ind) => ind.id)) + 1;
    const industry = {
      id: newId,
      name: newIndustry.name,
      status: newIndustry.status ? "active" : "inactive",
      skillsCount: 0,
      createdAt: new Date().toISOString(),
    };

    setIndustries([...industries, industry]);
    setIsAddDialogOpen(false);
    setNewIndustry({ name: "", status: true });
    setIsSubmitting(false);
  };

  // Handle editing industry
  const handleEditIndustry = () => {
    setIsSubmitting(true);
    setFormErrors({});

    // Check if industry name is empty
    if (!editIndustry.name.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        name: "Tên chuyên ngành không được để trống",
      }));
      setIsSubmitting(false);
      return;
    }

    // Check if industry name already exists (excluding the current industry)
    if (
      industries.some(
        (ind) =>
          ind.id !== selectedIndustry.id &&
          ind.name.toLowerCase() === editIndustry.name.toLowerCase()
      )
    ) {
      setFormErrors((prev) => ({
        ...prev,
        name: "Chuyên ngành này đã tồn tại",
      }));
      setIsSubmitting(false);
      return;
    }

    // Update industry
    setIndustries(
      industries.map((industry) =>
        industry.id === selectedIndustry.id
          ? {
              ...industry,
              name: editIndustry.name,
              status: editIndustry.status ? "active" : "inactive",
            }
          : industry
      )
    );
    setIsEditDialogOpen(false);
    setSelectedIndustry(null);
    setEditIndustry({ name: "", status: true });
    setIsSubmitting(false);
  };

  // Handle deleting industry
  const handleDeleteIndustry = () => {
    if (industryToDelete !== null) {
      setIndustries(
        industries.filter((industry) => industry.id !== industryToDelete)
      );
      setDeleteDialogOpen(false);
      setIndustryToDelete(null);
    }
  };

  // Handle updating status
  const handleUpdateStatus = () => {
    if (industryToUpdateStatus !== null) {
      const updatedIndustries = industries.map((industry) =>
        industry.id === industryToUpdateStatus.id
          ? {
              ...industry,
              status:
                industryToUpdateStatus.status === "active"
                  ? "inactive"
                  : "active",
            }
          : industry
      );
      setIndustries(updatedIndustries);
      setStatusDialogOpen(false);
      setIndustryToUpdateStatus(null);
    }
  };

  // Open edit dialog and set data
  const openEditDialog = (industry: any) => {
    setSelectedIndustry(industry);
    setEditIndustry({
      name: industry.name,
      status: industry.status === "active",
    });
    setFormErrors({});
    setIsEditDialogOpen(true);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSortField(null);
    setSortDirection(null);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Quản lý chuyên ngành
        </h1>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            setNewIndustry({ name: "", status: true });
            setFormErrors({});
            setIsAddDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm chuyên ngành
        </Button>
      </div>

      <Card className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
        <CardHeader>
          <CardTitle>Danh sách chuyên ngành</CardTitle>
          <CardDescription className="text-gray-400">
            Tổng cộng {industries.length} chuyên ngành trên hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm chuyên ngành..."
                className="pl-9 bg-[#2a3c5e] border-[#2a3c5e] text-white"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="bg-[#2a3c5e] border-[#2a3c5e] text-white rounded-md px-3 py-2 w-40"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1); // Reset to first page on filter change
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
                    Tên chuyên ngành
                  </SortableHeader>
                  <SortableHeader
                    field="skillsCount"
                    currentSortField={sortField}
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    Số kỹ năng
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
                  <TableHead className="text-gray-400 text-right">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedIndustries.length > 0 ? (
                  paginatedIndustries.map((industry) => (
                    <TableRow
                      key={industry.id}
                      className="border-[#2a3c5e] hover:bg-[#2a3c5e]"
                    >
                      <TableCell className="font-medium text-white">
                        {industry.id}
                      </TableCell>
                      <TableCell className="text-white">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-blue-500" />
                          <span>{industry.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-blue-900/30 text-blue-300 border-blue-700"
                        >
                          {industry.skillsCount}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {industry.status === "active" ? (
                          <Badge className="bg-green-900/30 text-green-300 border-green-800">
                            <Check className="mr-1 h-3 w-3" />
                            Kích hoạt
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-red-900/30 text-red-300 border-red-800"
                          >
                            <X className="mr-1 h-3 w-3" />
                            Vô hiệu hóa
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {format(
                          new Date(industry.createdAt),
                          "dd/MM/yyyy HH:mm",
                          { locale: vi }
                        )}
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
                          <DropdownMenuContent
                            align="end"
                            className="bg-[#1e2c4a] border-[#2a3c5e] text-white"
                          >
                            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-[#2a3c5e]" />
                            <DropdownMenuItem
                              className="hover:bg-[#2a3c5e] cursor-pointer"
                              onClick={() => openEditDialog(industry)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="hover:bg-[#2a3c5e] cursor-pointer"
                              onClick={() => {
                                setIndustryToUpdateStatus({
                                  id: industry.id,
                                  status: industry.status,
                                });
                                setStatusDialogOpen(true);
                              }}
                            >
                              {industry.status === "active" ? (
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
                                setIndustryToDelete(industry.id);
                                setDeleteDialogOpen(true);
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
                    <TableCell
                      colSpan={6}
                      className="text-center py-6 text-gray-400"
                    >
                      Không tìm thấy chuyên ngành nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {sortedIndustries.length > itemsPerPage && (
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Hiển thị{" "}
                {Math.min(
                  sortedIndustries.length,
                  (currentPage - 1) * itemsPerPage + 1
                )}{" "}
                -{" "}
                {Math.min(sortedIndustries.length, currentPage * itemsPerPage)}{" "}
                trên {sortedIndustries.length} kết quả
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog thêm chuyên ngành */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <DialogHeader>
            <DialogTitle>Thêm chuyên ngành mới</DialogTitle>
            <DialogDescription className="text-gray-400">
              Nhập thông tin chi tiết cho chuyên ngành mới
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">
                Tên chuyên ngành
              </label>
              <Input
                type="text"
                placeholder="Nhập tên chuyên ngành"
                className="bg-[#2a3c5e] border-[#2a3c5e] text-white"
                value={newIndustry.name}
                onChange={(e) =>
                  setNewIndustry({ ...newIndustry, name: e.target.value })
                }
              />
              {formErrors.name && (
                <p className="text-sm text-red-500">{formErrors.name}</p>
              )}
              <p className="text-xs text-gray-400">
                Tên chuyên ngành phải là duy nhất
              </p>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#2a3c5e] p-4">
              <div>
                <p className="text-sm font-medium text-gray-400">Trạng thái</p>
                <p className="text-xs text-gray-400">
                  Chuyên ngành sẽ {newIndustry.status ? "hiển thị" : "bị ẩn"}{" "}
                  trên hệ thống
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className={`px-3 py-1 rounded-md text-sm ${
                    newIndustry.status
                      ? "bg-green-900/30 text-green-300 border border-green-800"
                      : "bg-transparent text-gray-400 border border-[#2a3c5e]"
                  }`}
                  onClick={() =>
                    setNewIndustry({ ...newIndustry, status: true })
                  }
                >
                  Kích hoạt
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 rounded-md text-sm ${
                    !newIndustry.status
                      ? "bg-red-900/30 text-red-300 border border-red-800"
                      : "bg-transparent text-gray-400 border border-[#2a3c5e]"
                  }`}
                  onClick={() =>
                    setNewIndustry({ ...newIndustry, status: false })
                  }
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
            <Button
              onClick={handleAddIndustry}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Thêm chuyên ngành"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog chỉnh sửa chuyên ngành */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#1e2c4a] border-[#2a3c5e] text-white">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa chuyên ngành</DialogTitle>
            <DialogDescription className="text-gray-400">
              Chỉnh sửa thông tin chi tiết cho chuyên ngành
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">
                Tên chuyên ngành
              </label>
              <Input
                type="text"
                placeholder="Nhập tên chuyên ngành"
                className="bg-[#2a3c5e] border-[#2a3c5e] text-white"
                value={editIndustry.name}
                onChange={(e) =>
                  setEditIndustry({ ...editIndustry, name: e.target.value })
                }
              />
              {formErrors.name && (
                <p className="text-sm text-red-500">{formErrors.name}</p>
              )}
              <p className="text-xs text-gray-400">
                Tên chuyên ngành phải là duy nhất
              </p>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#2a3c5e] p-4">
              <div>
                <p className="text-sm font-medium text-gray-400">Trạng thái</p>
                <p className="text-xs text-gray-400">
                  Chuyên ngành sẽ {editIndustry.status ? "hiển thị" : "bị ẩn"}{" "}
                  trên hệ thống
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className={`px-3 py-1 rounded-md text-sm ${
                    editIndustry.status
                      ? "bg-green-900/30 text-green-300 border border-green-800"
                      : "bg-transparent text-gray-400 border border-[#2a3c5e]"
                  }`}
                  onClick={() =>
                    setEditIndustry({ ...editIndustry, status: true })
                  }
                >
                  Kích hoạt
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 rounded-md text-sm ${
                    !editIndustry.status
                      ? "bg-red-900/30 text-red-300 border border-red-800"
                      : "bg-transparent text-gray-400 border border-[#2a3c5e]"
                  }`}
                  onClick={() =>
                    setEditIndustry({ ...editIndustry, status: false })
                  }
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
            <Button
              onClick={handleEditIndustry}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
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
              Bạn có chắc chắn muốn xóa chuyên ngành này? Hành động này không
              thể hoàn tác và sẽ xóa tất cả kỹ năng liên quan.
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
              onClick={handleDeleteIndustry}
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
              {industryToUpdateStatus?.status === "active"
                ? "Bạn có chắc chắn muốn vô hiệu hóa chuyên ngành này?"
                : "Bạn có chắc chắn muốn kích hoạt chuyên ngành này?"}
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
            <Button
              onClick={handleUpdateStatus}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
