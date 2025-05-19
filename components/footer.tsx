import Link from "next/link";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#002147] dark:bg-[#001529] text-white">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold mb-4 inline-block text-white"
            >
              FreelanceVN
            </Link>
            <p className="text-gray-300 mb-4 max-w-md dark:text-gray-300">
              Nền tảng kết nối freelancer và doanh nghiệp hàng đầu Việt Nam.
              Chúng tôi giúp bạn tìm kiếm và hợp tác với những tài năng tốt
              nhất.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-300 hover:text-[#00B7EB] dark:text-gray-300 dark:hover:text-[#00B7EB]"
              >
                <FacebookIcon className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-[#00B7EB] dark:text-gray-300 dark:hover:text-[#00B7EB]"
              >
                <TwitterIcon className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-[#00B7EB] dark:text-gray-300 dark:hover:text-[#00B7EB]"
              >
                <InstagramIcon className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-[#00B7EB] dark:text-gray-300 dark:hover:text-[#00B7EB]"
              >
                <LinkedinIcon className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-[#00B7EB] dark:text-gray-300 dark:hover:text-[#00B7EB]"
              >
                <YoutubeIcon className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Dịch vụ</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Phát triển Web
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Thiết kế Đồ họa
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Viết lách & Biên dịch
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Tất cả dịch vụ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Về chúng tôi
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Cách thức hoạt động
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Đội ngũ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Báo chí
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Trung tâm hỗ trợ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white"
                >
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 dark:text-gray-400">
            &copy; {new Date().getFullYear()} FreelanceVN. Tất cả các quyền được
            bảo lưu.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 dark:text-gray-400">
            <Link href="#" className="hover:text-white dark:hover:text-white">
              Điều khoản dịch vụ
            </Link>
            <Link href="#" className="hover:text-white dark:hover:text-white">
              Chính sách bảo mật
            </Link>
            <Link href="#" className="hover:text-white dark:hover:text-white">
              Cookie
            </Link>
            <Link href="#" className="hover:text-white dark:hover:text-white">
              Cài đặt cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
