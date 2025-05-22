"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { gsap } from "gsap"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AlertCircle, Lock, Eye, EyeOff, CheckCircle, ShieldCheck } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; token?: string }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  // GSAP animation refs
  const pageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const formFieldsRef = useRef<HTMLDivElement[]>([])
  const successRef = useRef<HTMLDivElement>(null)

  // Add to form fields ref
  const addToFormFieldsRef = (el: HTMLDivElement) => {
    if (el && !formFieldsRef.current.includes(el)) {
      formFieldsRef.current.push(el)
    }
  }

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      // Card animation
      gsap.from(cardRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      })

      // Form fields animation
      gsap.from(formFieldsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out",
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  // Success message animation
  useEffect(() => {
    if (isSubmitted && successRef.current) {
      gsap.from(successRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      })
    }
  }, [isSubmitted])

  // Check if token exists
  useEffect(() => {
    if (!token) {
      setErrors((prev) => ({ ...prev, token: "Token không hợp lệ hoặc đã hết hạn" }))
    }
  }, [token])

  const validateForm = () => {
    const newErrors: { password?: string; confirmPassword?: string; token?: string } = {}

    if (!token) {
      newErrors.token = "Token không hợp lệ hoặc đã hết hạn"
    }

    if (!password) {
      newErrors.password = "Mật khẩu là bắt buộc"
    } else if (password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call to reset password
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, text: "", color: "" }

    const hasLowerCase = /[a-z]/.test(password)
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password)
    const isLongEnough = password.length >= 8

    const criteria = [hasLowerCase, hasUpperCase, hasNumber, hasSpecialChar, isLongEnough]
    const metCriteria = criteria.filter(Boolean).length

    if (metCriteria <= 2) {
      return { strength: 1, text: "Yếu", color: "bg-red-500" }
    } else if (metCriteria === 3) {
      return { strength: 2, text: "Trung bình", color: "bg-yellow-500" }
    } else if (metCriteria === 4) {
      return { strength: 3, text: "Khá", color: "bg-blue-500" }
    } else {
      return { strength: 4, text: "Mạnh", color: "bg-green-500" }
    }
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a]" ref={pageRef}>
      <Header />
      <main className="flex-1 py-12 md:py-20 flex items-center justify-center">
        <div className="container max-w-md px-4 md:px-0">
          <div className="text-center mb-8" ref={titleRef}>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Đặt lại mật khẩu</h1>
            <p className="text-lg text-blue-300">Tạo mật khẩu mới cho tài khoản của bạn</p>
          </div>

          {!isSubmitted ? (
            <div className="bg-[#111827] rounded-xl shadow-2xl overflow-hidden border border-blue-900/40" ref={cardRef}>
              <div className="p-6 space-y-6">
                {errors.token ? (
                  <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-center">
                    <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <p className="text-red-300">{errors.token}</p>
                    <p className="text-sm text-red-400 mt-2">
                      Vui lòng yêu cầu liên kết đặt lại mật khẩu mới hoặc liên hệ hỗ trợ.
                    </p>
                    <div className="mt-4">
                      <Link href="/forgot-password">
                        <Button
                          variant="outline"
                          className="w-full border-red-700 text-red-300 hover:bg-red-900/30 h-10 rounded-lg"
                        >
                          Yêu cầu liên kết mới
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2" ref={addToFormFieldsRef}>
                      <Label htmlFor="password" className="text-sm font-medium text-blue-300">
                        Mật khẩu mới
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-5 w-5 text-blue-500" />
                        </div>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`h-12 bg-[#0f3b87] border-blue-700 text-blue-100 pl-10 pr-10 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${
                            errors.password ? "border-red-500" : ""
                          }`}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-400 hover:text-blue-300"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-400 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.password}
                        </p>
                      )}

                      {/* Password strength indicator */}
                      {password && (
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-blue-400">Độ mạnh mật khẩu:</span>
                            <span className="text-xs font-medium" style={{ color: passwordStrength.color }}>
                              {passwordStrength.text}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-blue-900/30 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${passwordStrength.color} transition-all duration-300`}
                              style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                            ></div>
                          </div>
                          <div className="mt-2 text-xs text-blue-400">
                            <p>Mật khẩu nên có:</p>
                            <ul className="mt-1 space-y-1 pl-5 list-disc">
                              <li className={password.length >= 8 ? "text-green-400" : ""}>Ít nhất 8 ký tự</li>
                              <li className={/[A-Z]/.test(password) ? "text-green-400" : ""}>Chữ in hoa</li>
                              <li className={/[a-z]/.test(password) ? "text-green-400" : ""}>Chữ thường</li>
                              <li className={/[0-9]/.test(password) ? "text-green-400" : ""}>Số</li>
                              <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-400" : ""}>Ký tự đặc biệt</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2" ref={addToFormFieldsRef}>
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-blue-300">
                        Xác nhận mật khẩu mới
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <ShieldCheck className="h-5 w-5 text-blue-500" />
                        </div>
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`h-12 bg-[#0f3b87] border-blue-700 text-blue-100 pl-10 pr-10 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${
                            errors.confirmPassword ? "border-red-500" : ""
                          }`}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-400 hover:text-blue-300"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-400 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <div className="pt-2" ref={addToFormFieldsRef}>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 rounded-lg transition-colors"
                        disabled={isLoading}
                      >
                        {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                      </Button>
                    </div>
                  </form>
                )}

                <div className="flex justify-center" ref={addToFormFieldsRef}>
                  <Link
                    href="/login"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    Quay lại trang đăng nhập
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="bg-[#111827] rounded-xl shadow-2xl overflow-hidden border border-blue-900/40 p-6"
              ref={successRef}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold text-white">Mật khẩu đã được đặt lại</h2>
                <p className="text-blue-300">
                  Mật khẩu của bạn đã được cập nhật thành công. Bây giờ bạn có thể đăng nhập bằng mật khẩu mới.
                </p>
                <div className="pt-4 w-full">
                  <Link href="/login">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 rounded-lg transition-colors">
                      Đăng nhập
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
