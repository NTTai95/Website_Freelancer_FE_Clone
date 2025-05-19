"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

// Đăng ký ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    name: "Trần Văn Đức",
    company: "TechVision Inc.",
    role: "CEO",
    image: "/vietnamese-ceo-portrait.png",
    quote:
      "FreelanceVN đã giúp chúng tôi tìm được những lập trình viên tài năng cho dự án startup của mình. Chất lượng công việc vượt xa mong đợi và thời gian hoàn thành rất nhanh.",
    rating: 5,
  },
  {
    id: 2,
    name: "Nguyễn Thị Hương",
    company: "Style Studio",
    role: "Marketing Director",
    image: "/vietnamese-female-marketing-director.png",
    quote:
      "Tôi đã tìm được designer đồ họa chuyên nghiệp cho chiến dịch marketing mới của công ty. Các freelancer ở đây rất hiểu yêu cầu và tạo ra những sản phẩm chất lượng cao.",
    rating: 5,
  },
  {
    id: 3,
    name: "Lê Thanh Tùng",
    company: "GrowthHub",
    role: "Product Manager",
    image: "/vietnamese-male-product-manager.png",
    quote:
      "Nền tảng này giúp chúng tôi linh hoạt hơn trong việc phát triển sản phẩm. Chúng tôi có thể thuê chuyên gia theo nhu cầu và tiết kiệm chi phí đáng kể so với thuê nhân viên toàn thời gian.",
    rating: 4,
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Function để thêm card vào mảng ref
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-[#002147] dark:bg-[#001529] text-white"
    >
      <div className="container px-4 md:px-6">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 text-white">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="max-w-[800px] mx-auto text-gray-300 md:text-xl">
            Khám phá những trải nghiệm thực tế từ khách hàng đã sử dụng dịch vụ
            của chúng tôi
          </p>
        </div>

        <div className="flex justify-end space-x-2 mb-6">
          <Button
            variant="outline"
            size="icon"
            className="text-white border-white hover:bg-white/10 rounded-full dark:text-white dark:border-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-white border-white hover:bg-white/10 rounded-full dark:text-white dark:border-white"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} ref={addToRefs}>
              <Card className="h-full bg-white/10 backdrop-blur-sm border-0 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <Quote className="h-10 w-10 text-[#00B7EB] mb-4 opacity-50" />
                  <p className="text-gray-200 mb-6 dark:text-gray-200">
                    {testimonial.quote}
                  </p>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-[#CD7F32]" />
                    ))}
                  </div>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-medium text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
