"use client";

// Import các component và icon cần thiết
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

// Định nghĩa kiểu dữ liệu cho props của component Pagination
interface PaginationProps {
  currentPage: number; // Trang hiện tại
  totalPages: number; // Tổng số trang
  onPageChange: (page: number) => void; // Hàm callback khi chuyển trang
}

// Component phân trang
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Hàm sinh ra mảng các số trang (và dấu ...) sẽ hiển thị
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Số lượng trang tối đa hiển thị cùng lúc

    if (totalPages <= maxPagesToShow) {
      // Nếu tổng số trang nhỏ hơn hoặc bằng maxPagesToShow, hiển thị tất cả các trang
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Luôn hiển thị trang đầu tiên
      pageNumbers.push(1);

      // Tính toán phạm vi các trang ở giữa
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Điều chỉnh nếu đang ở đầu hoặc cuối danh sách trang
      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }

      // Thêm dấu ... trước các trang ở giữa nếu cần
      if (startPage > 2) {
        pageNumbers.push("ellipsis-start");
      }

      // Thêm các trang ở giữa
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Thêm dấu ... sau các trang ở giữa nếu cần
      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis-end");
      }

      // Luôn hiển thị trang cuối cùng (nếu có nhiều hơn 1 trang)
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Lấy danh sách các số trang sẽ hiển thị
  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center gap-1">
      {/* Nút về trang trước */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8 bg-[#1e2c4a] border-[#2a3c5e] text-white hover:bg-[#2a3c5e] hover:text-white disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Trang trước</span>
      </Button>

      {/* Hiển thị các số trang và dấu ... */}
      {pageNumbers.map((page, index) => {
        if (page === "ellipsis-start" || page === "ellipsis-end") {
          // Hiển thị dấu ... (MoreHorizontal icon)
          return (
            <Button
              key={`ellipsis-${index}`}
              variant="outline"
              size="icon"
              disabled
              className="h-8 w-8 bg-[#1e2c4a] border-[#2a3c5e] text-white"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Trang khác</span>
            </Button>
          );
        }

        // Hiển thị số trang
        return (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page as number)}
            className={`h-8 w-8 ${
              currentPage === page
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-[#1e2c4a] border-[#2a3c5e] text-white hover:bg-[#2a3c5e] hover:text-white"
            }`}
          >
            {page}
            <span className="sr-only">Trang {page}</span>
          </Button>
        );
      })}

      {/* Nút sang trang sau */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 bg-[#1e2c4a] border-[#2a3c5e] text-white hover:bg-[#2a3c5e] hover:text-white disabled:opacity-50"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Trang sau</span>
      </Button>
    </div>
  );
}
