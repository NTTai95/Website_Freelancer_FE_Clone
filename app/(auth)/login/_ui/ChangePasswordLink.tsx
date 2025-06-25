import Link from 'next/link';

export default function ForgotPasswordLink() {
    return (
        <div className="text-right mt-2">
            <Link href="/change-password" className="text-blue-600 hover:underline">
                Quên mật khẩu?
            </Link>
        </div>
    );
}