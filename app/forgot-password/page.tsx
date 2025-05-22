"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AlertCircle, Mail, ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<{ email?: string }>({})
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

  const validateForm = () => {
    const newErrors: { email?: string } = {}

    if (!email) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ"
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

    // Simulate API call to request password reset
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a]" ref={pageRef}>
      <Header />
      <main className="flex-1 py-12 md:py-20 flex items-center justify-center">
        <div className="container max-w-md px-4 md:px-0">
          <div className="text-center mb-8" ref={titleRef}>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Quên mật khẩu</h1>
            <p className="text-lg text-blue-300">Nhập email của bạn để đặt lại mật khẩu</p>
          </div>

          {!isSubmitted ? (
            <div className="bg-[#111827] rounded-xl shadow-2xl overflow-hidden border border-blue-900/40" ref={cardRef}>
              <div className="p-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2" ref={addToFormFieldsRef}>
                    <Label htmlFor="email" className="text-sm font-medium text-blue-300">
                      Email
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-5 w-5 text-blue-500" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`h-12 bg-[#0f3b87] border-blue-700 text-blue-100 pl-10 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-400 flex items-center mt-1">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="pt-2" ref={addToFormFieldsRef}>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 rounded-lg transition-colors"
                      disabled={isLoading}
                    >
                      {isLoading ? "Đang xử lý..." : "Gửi yêu cầu đặt lại mật khẩu"}
                    </Button>
                  </div>
                </form>

                <div className="flex justify-center" ref={addToFormFieldsRef}>
                  <Link
                    href="/login"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
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
                <h2 className="text-xl font-bold text-white">Yêu cầu đã được gửi</h2>
                <p className="text-blue-300">
                  Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến <span className="text-blue-100">{email}</span>.
                  Vui lòng kiểm tra hộp thư của bạn.
                </p>
                <p className="text-sm text-blue-400">
                  Nếu bạn không nhận được email trong vòng vài phút, hãy kiểm tra thư mục spam hoặc thử lại.
                </p>
                <div className="pt-4 w-full">
                  <Link href="/login">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 rounded-lg transition-colors">
                      Quay lại trang đăng nhập
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
