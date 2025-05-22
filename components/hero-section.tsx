"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero content
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate hero image
      gsap.from(imageRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-[#002147] to-[#003672] dark:from-[#001529] dark:to-[#002A52] text-white"
    >
      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div ref={textRef} className="space-y-4">
            <div className="inline-block rounded-lg bg-[#0077B6]/20 px-3 py-1 text-sm text-[#00B7EB]">
              Nền tảng tuyển dụng freelancer hàng đầu Việt Nam
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Kết nối với{" "}
              <span className="text-[#00B7EB]">freelancer chất lượng</span> cho
              dự án của bạn
            </h1>
            <p className="max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-200">
              Tìm kiếm và hợp tác với những freelancer tài năng nhất tại Việt
              Nam. Từ phát triển web đến thiết kế đồ họa, tiếp thị số và nhiều
              lĩnh vực khác.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#CD7F32]" />
                <span>Trên 10,000 freelancer chất lượng cao</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#CD7F32]" />
                <span>Thanh toán an toàn và bảo mật</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#CD7F32]" />
                <span>Hỗ trợ 24/7 cho mọi dự án</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                size="lg"
                className="bg-[#0077B6] hover:bg-[#0081AB] text-white dark:text-white"
              >
                Thuê Freelancer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 dark:border-white dark:text-white"
              >
                Trở thành Freelancer
              </Button>
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-5 gap-6">
            <div ref={imageRef} className="relative lg:col-span-4">
              <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full">
                <Image
                  src="/placeholder-2czo2.png"
                  alt="Vietnamese freelancers"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
            <div className="mt-6 lg:mt-auto lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-3 lg:flex-col lg:items-center lg:text-center">
                <div className="w-12 h-12 rounded-full bg-[#0081AB] flex items-center justify-center">
                  <span className="text-white dark:text-white font-bold">
                    5★
                  </span>
                </div>
                <div className="flex-1 lg:flex-none lg:mt-3">
                  <p className="font-medium text-gray-900 dark:text-white">
                    Đánh giá trung bình
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    từ 5,000+ khách hàng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
