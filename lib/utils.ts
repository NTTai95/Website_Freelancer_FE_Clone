// Import hàm clsx và kiểu dữ liệu ClassValue từ thư viện 'clsx'
// clsx giúp nối các className (chuỗi CSS) một cách linh hoạt, có thể truyền vào nhiều kiểu dữ liệu khác nhau (string, object, array, v.v.)
import { clsx, type ClassValue } from "clsx";

// Import hàm twMerge từ thư viện 'tailwind-merge'
// twMerge giúp gộp các className của Tailwind lại với nhau, loại bỏ các class bị trùng hoặc xung đột (ví dụ: 'p-2 p-4' sẽ chỉ giữ lại 'p-4')
import { twMerge } from "tailwind-merge";

// Hàm tiện ích 'cn' dùng để kết hợp nhiều className lại thành một chuỗi duy nhất, tối ưu cho Tailwind CSS
export function cn(...inputs: ClassValue[]) {
  // Đầu tiên dùng clsx để nối các class lại, sau đó dùng twMerge để loại bỏ các class trùng/xung đột
  return twMerge(clsx(inputs));
}
