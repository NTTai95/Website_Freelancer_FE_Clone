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
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  // GSAP animation refs
  const pageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const formFieldsRef = useRef<HTMLDivElement[]>([])
  const socialButtonsRef = useRef<HTMLDivElement>(null)

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

      // Social buttons animation
      gsap.from(socialButtonsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 0.7,
        ease: "power3.out",
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!password) {
      newErrors.password = "Mật khẩu là bắt buộc"
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
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

    // Simulate login - would connect to backend in a real app
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)

    // Simulate social login - would connect to OAuth provider in a real app
    console.log(`Logging in with ${provider}`)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a]" ref={pageRef}>
      <Header />
      <main className="flex-1 py-12 md:py-20 flex items-center justify-center">
        <div className="container max-w-md px-4 md:px-0">
          <div className="text-center mb-8" ref={titleRef}>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Đăng nhập</h1>
            <p className="text-lg text-blue-300">Chào mừng bạn quay trở lại FreelanceVN</p>
          </div>

          <div className="bg-[#111827] rounded-xl shadow-2xl overflow-hidden border border-blue-900/40" ref={cardRef}>
            <div className="p-6 space-y-6">
              <div className="space-y-3" ref={socialButtonsRef}>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 h-12 rounded-lg bg-white hover:bg-gray-100 text-gray-800 font-medium transition-colors"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Đăng nhập với Google</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 h-12 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white font-medium transition-colors"
                  onClick={() => handleSocialLogin("facebook")}
                  disabled={isLoading}
                >
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  <span>Đăng nhập với Facebook</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 h-12 rounded-lg bg-[#24292e] hover:bg-[#2c3238] text-white font-medium transition-colors"
                  onClick={() => handleSocialLogin("github")}
                  disabled={isLoading}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>Đăng nhập với GitHub</span>
                </button>
              </div>

              <div className="relative flex items-center gap-3" ref={addToFormFieldsRef}>
                <span className="h-px flex-grow bg-blue-800/50"></span>
                <span className="text-xs uppercase text-blue-400 font-medium tracking-wider">
                  Hoặc đăng nhập với email
                </span>
                <span className="h-px flex-grow bg-blue-800/50"></span>
              </div>

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
                      className={`h-12 bg-[#0f3b87] border-blue-700 text-white pl-10 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${
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

                <div className="space-y-2" ref={addToFormFieldsRef}>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-blue-300">
                      Mật khẩu
                    </Label>
                    <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 hover:underline">
                      Quên mật khẩu?
                    </Link>
                  </div>
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
                      className={`h-12 bg-[#0f3b87] border-blue-700 text-white pl-10 pr-10 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${
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
                </div>

                <div className="flex items-center space-x-2" ref={addToFormFieldsRef}>
                  <Checkbox
                    id="remember"
                    className="border-blue-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-300"
                  >
                    Ghi nhớ đăng nhập
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 rounded-lg transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-blue-300">
              Chưa có tài khoản?{" "}
              <Link href="/register" className="text-blue-400 hover:text-blue-300 hover:underline font-medium">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
