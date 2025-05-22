"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CategoryCard } from "./category-card";
import {
  Code,
  Palette,
  PenTool,
  BarChart4,
  Camera,
  Globe,
  ImportIcon as Translate,
  MessageSquare,
} from "lucide-react";

// Đăng ký ScrollTrigger plugin với GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  {
    id: 1,
    title: "Phát triển Web",
    description: "Website, ứng dụng web và API",
    icon: Code,
    color: "#0081AB",
    skills: 120,
    rating: 4.9,
  },
  {
    id: 2,
    title: "Thiết kế UI/UX",
    description: "Giao diện người dùng và trải nghiệm",
    icon: Palette,
    color: "#0081AB",
    skills: 85,
    rating: 4.8,
  },
  {
    id: 3,
    title: "Thiết kế Đồ họa",
    description: "Logo, banner và ấn phẩm",
    icon: PenTool,
    color: "#0081AB",
    skills: 95,
    rating: 4.7,
  },
  {
    id: 4,
    title: "Digital Marketing",
    description: "SEO, quảng cáo và tăng trưởng",
    icon: BarChart4,
    color: "#0081AB",
    skills: 78,
    rating: 4.6,
  },
  {
    id: 5,
    title: "Video & Hình ảnh",
    description: "Sản xuất và chỉnh sửa",
    icon: Camera,
    color: "#0081AB",
    skills: 65,
    rating: 4.7,
  },
  {
    id: 6,
    title: "Phát triển Mobile",
    description: "iOS, Android và ứng dụng đa nền tảng",
    icon: Globe,
    color: "#0081AB",
    skills: 82,
    rating: 4.8,
  },
  {
    id: 7,
    title: "Dịch thuật",
    description: "Dịch nội dung đa ngôn ngữ",
    icon: Translate,
    color: "#0081AB",
    skills: 55,
    rating: 4.6,
  },
  {
    id: 8,
    title: "Viết nội dung",
    description: "Blog, báo cáo và văn bản marketing",
    icon: MessageSquare,
    color: "#0081AB",
    skills: 90,
    rating: 4.7,
  },
];

export function CategoriesSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation cho tiêu đề
      gsap.from(".categories-title", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animation cho mỗi card
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scale: 0.9,
          opacity: 0,
          duration: 0.5,
          delay: 0.1 * index,
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
    <section ref={sectionRef} className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <h2 className="categories-title text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
            Khám phá các lĩnh vực chuyên môn
          </h2>
          <p className="max-w-[800px] text-gray-500 dark:text-gray-300 md:text-xl">
            Tìm kiếm freelancer chuyên nghiệp trong nhiều lĩnh vực khác nhau để
            đáp ứng mọi nhu cầu dự án của bạn
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} ref={addToRefs}>
              <CategoryCard
                title={category.title}
                description={category.description}
                icon={category.icon}
                color={category.color}
                skills={category.skills}
                rating={category.rating}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
