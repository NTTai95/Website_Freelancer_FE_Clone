export namespace RequestForm {
    /**
     * - `name: string` - Tên chứng chỉ
     * - `issueBy: string` - Cơ quan cấp chứng chỉ
     * - `issueDate?: string` - Ngày cấp
     * - `expiredDate?: string` - Ngày hết hạn
     * - `link?: string` - Đường dẫn liên kết
     * - `fontImage?: File` - Ảnh mặt trước của chứng chỉ
     * - `backImage?: File` - Ảnh mặt sau của chứng chỉ
     */
    export interface Certification {
        name: string;
        issueBy: string;
        issueDate?: string;
        expiredDate?: string;
        link?: string;
        fontImage?: File;
        backImage?: File;
    }

    /**
     * - `title: string` - Tiêu đề liên hệ
     * - `content: string` - Nội dung liên hệ
     */
    export interface Contact {
        title: string;
        content: string;
    }

    /**
     * - `school: string` - Tên trường học
     * - `degree: string` - Bằng cấp
     * - `major: string` - ngành nghề
     * - `gpa: number` - Điểm trung bình
     * - `startDate: string` - Ngày bắt đầu
     * - `endDate: string` - Ngày kết thúc
     * - `description?: string` - Mô tả thêm
     */
    export interface Education {
        school: string;
        degree: string;
        major: string;
        gpa: number;
        startDate: string;
        endDate: string;
        description?: string;
    }

    /**
     * - `title: string` - Tiêu đề báo cáo
     * - `content: string` - Nội dung báo cáo
     * - `reportId: number` - ID của báo cáo
     */
    export interface Report {
        title: string;
        content: string;
        reportId: number;
    }

    /**
     * - `amount: number` - Số tiền yêu cầu thanh toán
     */
    export interface RequestPayment {
        amount: number;
    }

    /**
     * - `email: string` - Địa chỉ email
     * - `password: string` - Mật khẩu
     * - `fullName: string` - Họ và tên
     * - `isMale: boolean` - Giới tính nam hay không
     * - `birthday: string` - Ngày sinh
     */
    export interface Register {
        email: string;
        password: string;
        fullName: string;
        isMale: boolean;
        birthday: string;
    }

    /**
     * - `email: string` - Địa chỉ email
     * - `password: string` - Mật khẩu
     */
    export interface Login {
        email: string;
        password: string;
    }

    /**
     * - `name: string` - Tên kỹ năng
     * - `description: string` - Mô tả kỹ năng
     * - `majorId: number` - ID ngành nghề
     */
    export interface Skill {
        name: string;
        description: string;
        majorId: number;
    }

    /**
     * - `name: string` - Tên ngành nghề
     * - `description: string` - Mô tả ngành nghề
     */
    export interface Major {
        name: string;
        description: string;
    }

    /**
     * - `name: string` - Tên ngôn ngữ
     * - `iso: string` - Mã ISO của ngôn ngữ
     */
    export interface Language {
        name: string;
        iso: string;
    }

    /**
     * - `title: string` - Tiêu đề công việc
     * - `major: number` - ID ngành nghề công việc
     */
    export interface JobStep1 {
        title: string;
        major: number;
    }

    /**
     * - `skillIds: number[]` - Danh sách ID kỹ năng
     * - `languageIds: number[]` - Danh sách ID ngôn ngữ
     */
    export interface JobStep2 {
        skillIds: number[];
        languageIds: number[];
    }

    /**
     * - `budget: number` - Ngân sách
     * - `durationHours: number` - Số giờ thực hiện
     * - `closeAt: string` - Thời điểm đóng công việc
     */
    export interface JobStep3 {
        budget: number;
        durationHours: number;
        closeAt: string;
    }

    /**
     * - `description: string` - Mô tả công việc
     * - `document?: File` - Tệp đính kèm
     */
    export interface JobStep4 {
        description: string;
        document?: File;
    }

    /**
     * - `content: string` - Nội dung ứng tuyển
     * - `bidAmount: number` - Số tiền đề xuất
     * - `estimatedHours: number` - Số giờ ước tính hoàn thành
     */
    export interface Apply {
        content: string;
        bidAmount: number;
        estimatedHours: number;
    }

    /**
     * - `percent: number` - Phần trăm milestone
     * - `content: string` - Nội dung milestone
     * - `startAt: string` - Thời điểm bắt đầu
     * - `durationHours: number` - Thời gian thực hiện (giờ)
     * - `document?: File` - Tệp đính kèm
     */
    export interface Milestone {
        percent: number;
        content: string;
        startAt: string;
        durationHours: number;
        document?: File;
    }

    /**
     * - `reason: string` - Lý do tranh chấp
     * - `milestoneId: number` - ID của milestone
     */
    export interface Dispute {
        reason: string;
        milestoneId: number;
    }

    /**
     * - `resolution: string` - Cách giải quyết tranh chấp
     */
    export interface Resolve {
        resolution: string;
    }

    /**
     * - `content: string` - Nội dung đánh giá
     * - `rating: number` - Số sao đánh giá
     */
    export interface Review {
        content: string;
        rating: number;
    }

    /**
     * - `fullName: string` - Họ tên quản trị viên
     * - `roleId: number` - ID vai trò (tùy chọn)
     * - `email: string` - Địa chỉ email
     * - `password: string` - Mật khẩu
     * - `phone?: string` - Số điện thoại (tùy chọn)
     * - `birthday: string` - Ngày sinh
     */
    export interface Staff {
        fullName: string;
        roleId: number;
        email: string;
        password: string;
        phone?: string;
        birthday: string;
    }

    /**
     * - `name: string` - Tên vai trò
     * - `description: string` - Mô tả vai trò
     * - `permissionIds: number[]` - Danh sách ID quyền
     */
    export interface Role {
        name: string;
        description: string;
        permissionIds: number[];
    }
}
