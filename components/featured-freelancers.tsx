"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";

// Đăng ký ScrollTrigger plugin với GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const freelancers = [
  {
    id: 1,
    name: "Nguyễn Văn Anh",
    title: "Full-stack Developer",
    image: "/placeholder-p547t.png",
    rating: 4.9,
    reviews: 87,
    badges: ["React", "Node.js", "MongoDB"],
    hourlyRate: 25,
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    title: "UI/UX Designer",
    image: "/placeholder-ynuhr.png",
    rating: 5.0,
    reviews: 64,
    badges: ["Figma", "Adobe XD", "Webflow"],
    hourlyRate: 22,
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    title: "Digital Marketing Specialist",
    image: "/placeholder-x3dyk.png",
    rating: 4.8,
    reviews: 52,
    badges: ["SEO", "Google Ads", "Social Media"],
    hourlyRate: 20,
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    title: "Content Writer",
    image: "/placeholder-b6zrl.png",
    rating: 4.7,
    reviews: 38,
    badges: ["Blog", "Copywriting", "Translation"],
    hourlyRate: 18,
  },
];

export function FeaturedFreelancers() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

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

      // Card animations
      cardRefs.current.forEach((card, index) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.6,
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
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="py-16 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div ref={headingRef} className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
              Freelancer nổi bật
            </h2>
            <p className="text-gray-500 dark:text-gray-300 md:text-xl">
              Khám phá những freelancer tài năng được đánh giá cao trên nền tảng
              của chúng tôi
            </p>
          </div>
          <Button className="mt-6 md:mt-0 bg-[#0077B6] hover:bg-[#0081AB] text-white dark:text-white">
            Xem tất cả
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {freelancers.map((freelancer) => (
            <div key={freelancer.id} ref={addToRefs}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={freelancer.image || "/placeholder.svg"}
                      alt={freelancer.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {freelancer.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {freelancer.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-[#CD7F32]" />
                      <span className="ml-1 text-sm font-medium">
                        {freelancer.rating}
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-300 text-sm">
                      ({freelancer.reviews} đánh giá)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {freelancer.badges.map((badge) => (
                      <Badge
                        key={badge}
                        variant="secondary"
                        className="bg-[#0081AB]/10 text-[#0081AB] hover:bg-[#0081AB]/20 dark:bg-[#0081AB]/20 dark:text-[#00B7EB]"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Giá theo giờ
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        ${freelancer.hourlyRate}/giờ
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6] hover:text-white dark:border-[#00B7EB] dark:text-[#00B7EB] dark:hover:bg-[#0077B6] dark:hover:text-white"
                    >
                      Liên hệ
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
