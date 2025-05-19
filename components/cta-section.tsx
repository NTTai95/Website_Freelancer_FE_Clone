"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Đăng ký ScrollTrigger plugin với GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTASection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gradient-to-r from-[#0077B6] to-[#0081AB] text-white"
    >
      <div className="container px-4 md:px-6">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 text-white">
            Bắt đầu dự án của bạn ngay hôm nay
          </h2>
          <p className="mb-8 text-lg text-white/90 md:text-xl max-w-2xl mx-auto dark:text-white/90">
            Kết nối với hơn 10,000 freelancer tài năng và biến ý tưởng của bạn
            thành hiện thực
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#0077B6] hover:bg-white/90 dark:bg-white dark:text-[#0077B6]"
            >
              Đăng dự án miễn phí
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 dark:border-white dark:text-white"
            >
              Tìm hiểu thêm
            </Button>
          </div>
          <p className="mt-4 text-sm text-white/70 dark:text-white/70">
            Hơn 5,000 dự án đã hoàn thành thành công trên nền tảng của chúng tôi
          </p>
        </div>
      </div>
    </section>
  );
}
