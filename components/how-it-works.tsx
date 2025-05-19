"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Search, Users, CheckCircle } from "lucide-react";

// Đăng ký ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    id: 1,
    title: "Đăng công việc",
    description:
      "Đăng chi tiết công việc bạn cần với yêu cầu cụ thể và ngân sách dự kiến.",
    icon: FileText,
    color: "#00B7EB",
  },
  {
    id: 2,
    title: "Tìm kiếm tài năng",
    description:
      "Dễ dàng tìm kiếm freelancer phù hợp với dự án của bạn thông qua các bộ lọc chuyên nghiệp.",
    icon: Search,
    color: "#00B7EB",
  },
  {
    id: 3,
    title: "Lựa chọn freelancer",
    description:
      "Xem xét hồ sơ, đánh giá và chọn freelancer phù hợp nhất cho dự án của bạn.",
    icon: Users,
    color: "#00B7EB",
  },
  {
    id: 4,
    title: "Hoàn thành dự án",
    description:
      "Theo dõi tiến độ, thanh toán an toàn và nhận được sản phẩm chất lượng cao.",
    icon: CheckCircle,
    color: "#CD7F32",
  },
];

export function HowItWorks() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animation cho các bước với kết nối
      stepsRef.current.forEach((step, index) => {
        gsap.from(step, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: step,
            start: "top 90%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Function để thêm các bước vào mảng ref
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-[#002147] dark:bg-[#001529] text-white"
    >
      <div className="container px-4 md:px-6">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white mb-4">
            Quy trình làm việc đơn giản
          </h2>
          <p className="max-w-[800px] mx-auto text-gray-300 md:text-xl">
            Chỉ với vài bước đơn giản, bạn có thể tìm kiếm và thuê các
            freelancer chất lượng cao
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4 max-w-5xl mx-auto">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gray-700 z-0"></div>

          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={addToRefs}
              className="flex flex-col items-center text-center relative z-10 w-full md:w-1/4"
            >
              <div className="relative mb-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white relative"
                  style={{ backgroundColor: step.color }}
                >
                  <step.icon className="h-10 w-10" />
                  <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#002147] dark:bg-[#001529] border-2 border-[#00B7EB] flex items-center justify-center text-xs font-bold text-white">
                    {step.id}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
