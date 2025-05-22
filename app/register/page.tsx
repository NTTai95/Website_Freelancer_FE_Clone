"use client";

import type React from "react";

import { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import Select from "react-select";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LocationSelector } from "@/components/location-selector";
import {
  Briefcase,
  User2,
  Upload,
  Calendar,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
} from "date-fns";
import { vi } from "date-fns/locale";

// Industry and skills data
const industries = [
  {
    id: "web-development",
    name: "Phát triển Web",
    skills: [
      "HTML/CSS",
      "JavaScript",
      "React",
      "Angular",
      "Vue.js",
      "Node.js",
      "PHP",
      "Laravel",
      "WordPress",
      "Shopify",
    ],
  },
  {
    id: "mobile-development",
    name: "Phát triển Mobile",
    skills: [
      "React Native",
      "Flutter",
      "iOS/Swift",
      "Android/Kotlin",
      "Xamarin",
      "Ionic",
    ],
  },
  {
    id: "design",
    name: "Thiết kế",
    skills: [
      "UI/UX Design",
      "Graphic Design",
      "Logo Design",
      "Illustration",
      "Photoshop",
      "Illustrator",
      "Figma",
      "Sketch",
    ],
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    skills: [
      "SEO",
      "SEM",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "Google Ads",
      "Facebook Ads",
    ],
  },
  {
    id: "writing",
    name: "Viết lách & Biên dịch",
    skills: [
      "Content Writing",
      "Copywriting",
      "Technical Writing",
      "Translation",
      "Proofreading",
      "Editing",
    ],
  },
  {
    id: "video",
    name: "Video & Animation",
    skills: [
      "Video Editing",
      "Motion Graphics",
      "Animation",
      "3D Modeling",
      "After Effects",
      "Premiere Pro",
    ],
  },
];

// Format industries for react-select
const industryOptions = industries.map((industry) => ({
  value: industry.id,
  label: industry.name,
}));

// Custom calendar component
const CustomCalendar = ({
  selected,
  onSelect,
  minDate,
  maxDate,
}: {
  selected?: Date;
  onSelect: (date: Date) => void;
  minDate: Date;
  maxDate: Date;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "CN"];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get days from previous month to fill the first week
  const firstDayOfMonth = monthStart.getDay() || 7; // Convert Sunday (0) to 7 for European calendar
  const prevMonthDays = firstDayOfMonth > 1 ? firstDayOfMonth - 1 : 0;

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const isDateDisabled = (date: Date) => {
    return date < minDate || date > maxDate;
  };

  return (
    <div className="p-3 bg-[#111827] text-white rounded-md shadow-lg border border-blue-900/40">
      <div className="text-center mb-4">
        <div className="font-medium">
          Tháng {format(currentMonth, "MM")} {format(currentMonth, "yyyy")}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-blue-300"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Previous month days */}
        {Array.from({ length: prevMonthDays }).map((_, index) => {
          const date = new Date(monthStart);
          date.setDate(date.getDate() - (prevMonthDays - index));
          return (
            <button
              key={`prev-${index}`}
              type="button"
              disabled={isDateDisabled(date)}
              className="h-8 w-8 text-center text-gray-400 hover:bg-blue-800/50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onSelect(date)}
            >
              {date.getDate()}
            </button>
          );
        })}

        {/* Current month days */}
        {monthDays.map((day) => (
          <button
            key={day.toISOString()}
            type="button"
            disabled={isDateDisabled(day)}
            className={cn(
              "h-8 w-8 text-center rounded-full",
              isToday(day) && "bg-blue-600",
              selected && isSameDay(day, selected) && "bg-blue-500 text-white",
              !isToday(day) &&
                (!selected || !isSameDay(day, selected)) &&
                "hover:bg-blue-800/50",
              isDateDisabled(day) && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => onSelect(day)}
          >
            {day.getDate()}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-blue-800/50 text-blue-300"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-blue-800/50 text-blue-300"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Thêm hàm để chuyển đổi danh sách kỹ năng thành định dạng options cho react-select
const formatSkillsToOptions = (skills: string[]) => {
  return skills.map((skill) => ({
    value: skill,
    label: skill,
  }));
};

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<string | undefined>(undefined);
  const [formStep, setFormStep] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [selectedIndustry, setSelectedIndustry] = useState<string | undefined>(
    undefined
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [taxId, setTaxId] = useState("");
  const [formValidated, setFormValidated] = useState(false);

  // GSAP animation refs
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const accountTypesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const clientCardRef = useRef<HTMLLabelElement>(null);
  const freelancerCardRef = useRef<HTMLLabelElement>(null);
  const formFieldsRef = useRef<HTMLDivElement[]>([]);

  // Set max date to today and min date to 100 years ago
  const today = new Date();
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 100);

  // GSAP animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }

      // Account type cards animation
      if (formStep === 0) {
        gsap.from(accountTypesRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
        });

        // Individual cards animation
        gsap.from([clientCardRef.current, freelancerCardRef.current], {
          scale: 0.9,
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
          delay: 0.5,
          ease: "back.out(1.7)",
        });
      }

      // Form animation
      if (formStep === 1 && formRef.current) {
        gsap.from(formRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        // Form fields animation
        gsap.from(formFieldsRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: "power3.out",
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, [formStep]);

  // Update available skills when industry changes
  useEffect(() => {
    if (selectedIndustry) {
      const industry = industries.find((ind) => ind.id === selectedIndustry);
      if (industry) {
        setAvailableSkills(industry.skills);
        setSelectedSkills([]); // Reset selected skills when industry changes
      }
    } else {
      setAvailableSkills([]);
      setSelectedSkills([]);
    }
  }, [selectedIndustry]);

  // Close calendar and skills dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Close calendar if clicking outside
      if (showCalendar && !target.closest(".date-calendar-container")) {
        setShowCalendar(false);
      }

      // Close skills dropdown if clicking outside
      if (isSkillsOpen && !target.closest(".skills-dropdown-container")) {
        setIsSkillsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar, isSkillsOpen]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add to form fields ref
  const addToFormFieldsRef = (el: HTMLDivElement) => {
    if (el && !formFieldsRef.current.includes(el)) {
      formFieldsRef.current.push(el);
    }
  };

  const validateForm = () => {
    // Chỉ validate khi form được submit
    if (!formValidated) {
      return true;
    }

    const errors: Record<string, string> = {};

    // Validate freelancer form
    if (accountType === "freelancer") {
      if (!dateOfBirth) {
        errors.dateOfBirth = "Vui lòng chọn ngày sinh";
      }

      if (!gender) {
        errors.gender = "Vui lòng chọn giới tính";
      }

      if (!selectedIndustry) {
        errors.industry = "Vui lòng chọn chuyên ngành";
      } else if (selectedSkills.length === 0) {
        errors.skills = "Vui lòng chọn ít nhất một kỹ năng";
      }
    } else if (accountType === "client") {
      // Validate client form
      if (!dateOfBirth) {
        errors.dateOfBirth = "Vui lòng chọn ngày sinh";
      }

      if (!gender) {
        errors.gender = "Vui lòng chọn giới tính";
      }

      if (!companyName) {
        errors.companyName = "Vui lòng nhập tên công ty";
      }

      if (!companyAddress) {
        errors.companyAddress = "Vui lòng nhập địa chỉ công ty";
      }

      if (!taxId) {
        errors.taxId = "Vui lòng nhập mã số thuế";
      }

      if (!selectedIndustry) {
        errors.industry = "Vui lòng chọn lĩnh vực hoạt động";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formStep === 0) {
      // Animate transition to next step
      if (accountTypesRef.current) {
        gsap.to(accountTypesRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
          onComplete: () => {
            setFormStep(1);
          },
        });
      } else {
        setFormStep(1);
      }
      return;
    }

    // Đánh dấu form đã được validate
    setFormValidated(true);

    // Validate form before submission
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission - would connect to backend in a real app
    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Form submitted with account type:", accountType);
      router.push("/dashboard");
    }, 1500);
  };

  const handleIndustryChange = (selectedOption: any) => {
    console.log("Industry selected:", selectedOption);
    if (selectedOption) {
      setSelectedIndustry(selectedOption.value);
      // Xóa lỗi industry nếu có
      if (formErrors.industry) {
        const newErrors = { ...formErrors };
        delete newErrors.industry;
        setFormErrors(newErrors);
      }
    } else {
      setSelectedIndustry(undefined);
    }
  };

  const handleDateSelect = (date: Date) => {
    setDateOfBirth(date);
    setShowCalendar(false);
    // Remove date of birth error if it exists
    if (formErrors.dateOfBirth) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.dateOfBirth;
        return newErrors;
      });
    }
  };

  const handleSkillsChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setSelectedSkills(selectedValues);

    // Remove skills error if it exists and skills are selected
    if (formErrors.skills && selectedValues.length > 0) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.skills;
        return newErrors;
      });
    }
  };

  const handleLocationChange = (fullAddress: string) => {
    setCompanyAddress(fullAddress);

    // Remove address error if it exists and address is selected
    if (formErrors.companyAddress && fullAddress) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.companyAddress;
        return newErrors;
      });
    }
  };

  // Thêm useMemo để tạo options cho kỹ năng
  const skillOptions = useMemo(() => {
    return formatSkillsToOptions(availableSkills);
  }, [availableSkills]);

  // Thêm useMemo để lấy giá trị đã chọn cho kỹ năng
  const selectedSkillOptions = useMemo(() => {
    return selectedSkills.map((skill) => ({
      value: skill,
      label: skill,
    }));
  }, [selectedSkills]);

  // Custom styles for react-select
  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "#0f3b87",
      borderColor: formErrors.industry
        ? "#ef4444"
        : state.isFocused
        ? "#3b82f6"
        : "#1e40af",
      boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "#3b82f6" : "#1e40af",
      },
      borderRadius: "var(--radius)",
      minHeight: "40px",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
        ? "#2563eb"
        : "transparent",
      color: "white",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#2563eb",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#1e3a8a",
      borderRadius: "var(--radius)",
      border: "1px solid #2563eb",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
      zIndex: 50,
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#94a3b8",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "white",
    }),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a]" ref={pageRef}>
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-4xl px-4 md:px-6">
          <div className="text-center mb-8" ref={titleRef}>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {formStep === 0
                ? "Tham gia FreelanceVN"
                : "Tạo tài khoản của bạn"}
            </h1>
            <p className="mt-3 text-lg text-blue-300">
              {formStep === 0
                ? "Chọn loại tài khoản phù hợp với nhu cầu của bạn"
                : `Đăng ký với tư cách ${
                    accountType === "client" ? "nhà tuyển dụng" : "freelancer"
                  }`}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {formStep === 0 ? (
              <div className="space-y-6" ref={accountTypesRef}>
                <RadioGroup
                  value={accountType}
                  onValueChange={setAccountType}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <RadioGroupItem
                      value="client"
                      id="client"
                      className="peer sr-only"
                      aria-label="Tôi là nhà tuyển dụng, cần thuê freelancer"
                    />
                    <Label
                      htmlFor="client"
                      ref={clientCardRef}
                      className="flex flex-col items-center justify-between rounded-lg border-2 border-blue-800 bg-[#1a2744] p-6 hover:border-blue-500 hover:bg-[#1e3a8a] peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-900/20 cursor-pointer transition-all"
                    >
                      <div className="mb-4 rounded-full bg-blue-900/50 p-3">
                        <Briefcase className="h-8 w-8 text-blue-400" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-white">
                          Tôi là nhà tuyển dụng
                        </h3>
                        <p className="mt-2 text-blue-300">
                          Cần thuê freelancer cho dự án
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="freelancer"
                      id="freelancer"
                      className="peer sr-only"
                      aria-label="Tôi là freelancer, tìm kiếm công việc"
                    />
                    <Label
                      htmlFor="freelancer"
                      ref={freelancerCardRef}
                      className="flex flex-col items-center justify-between rounded-lg border-2 border-blue-800 bg-[#1a2744] p-6 hover:border-blue-500 hover:bg-[#1e3a8a] peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-900/20 cursor-pointer transition-all"
                    >
                      <div className="mb-4 rounded-full bg-blue-900/50 p-3">
                        <User2 className="h-8 w-8 text-blue-400" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-white">
                          Tôi là freelancer
                        </h3>
                        <p className="mt-2 text-blue-300">
                          Tìm kiếm cơ hội việc làm
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="flex justify-center mt-8">
                  <Button
                    type="submit"
                    className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg transition-colors"
                    disabled={!accountType}
                  >
                    Tiếp tục
                  </Button>
                </div>
              </div>
            ) : accountType === "freelancer" ? (
              <div
                className="bg-[#111827] rounded-xl shadow-2xl overflow-hidden border border-blue-900/40"
                ref={formRef}
              >
                <div className="p-6 space-y-6">
                  <div className="space-y-6">
                    {/* Avatar Upload */}
                    <div
                      className="flex flex-col items-center justify-center"
                      ref={addToFormFieldsRef}
                    >
                      <div className="relative w-24 h-24 mb-4">
                        {avatarPreview ? (
                          <Image
                            src={avatarPreview || "/placeholder.svg"}
                            alt="Avatar preview"
                            fill
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-blue-900/30 flex items-center justify-center">
                            <User2 className="h-12 w-12 text-blue-400" />
                          </div>
                        )}
                        <label
                          htmlFor="avatar-upload"
                          className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
                        >
                          <Upload className="h-4 w-4" />
                        </label>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </div>
                      <p className="text-sm text-blue-300">
                        Tải lên ảnh đại diện (không bắt buộc)
                      </p>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className="space-y-2 md:col-span-2"
                        ref={addToFormFieldsRef}
                      >
                        <Label
                          htmlFor="fullName"
                          className="text-sm font-medium text-blue-300"
                        >
                          Họ và tên
                        </Label>
                        <Input
                          id="fullName"
                          placeholder="Nguyễn Văn A"
                          required
                          className="bg-[#0f3b87] border-blue-700 text-white focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2" ref={addToFormFieldsRef}>
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-blue-300"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@gmail.com"
                          required
                          className="bg-[#0f3b87] border-blue-700 text-white focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2" ref={addToFormFieldsRef}>
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium text-blue-300"
                        >
                          Số điện thoại
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="0912345678"
                          required
                          className="bg-[#0f3b87] border-blue-700 text-white focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2" ref={addToFormFieldsRef}>
                        <Label
                          htmlFor="password"
                          className="text-sm font-medium text-blue-300"
                        >
                          Mật khẩu
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          required
                          className="bg-[#0f3b87] border-blue-700 text-white focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2" ref={addToFormFieldsRef}>
                        <Label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium text-blue-300"
                        >
                          Xác nhận mật khẩu
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          required
                          className="bg-[#0f3b87] border-blue-700 text-white focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      {/* Date of Birth */}
                      <div
                        className="space-y-2 date-calendar-container"
                        ref={addToFormFieldsRef}
                      >
                        <Label className="text-sm font-medium text-blue-300 flex items-center">
                          Ngày sinh
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-[#0f3b87] border-blue-700 text-blue-100 h-10 focus:border-blue-500 focus:ring-blue-500",
                            formErrors.dateOfBirth ? "border-red-500" : ""
                          )}
                          onClick={() => setShowCalendar(!showCalendar)}
                        >
                          <Calendar className="mr-2 h-4 w-4 text-blue-400" />
                          {dateOfBirth ? (
                            <span className="text-blue-100">
                              {format(dateOfBirth, "dd/MM/yyyy", {
                                locale: vi,
                              })}
                            </span>
                          ) : (
                            <span className="text-gray-400">
                              Chọn ngày sinh
                            </span>
                          )}
                        </Button>

                        {showCalendar && (
                          <div className="absolute z-50 mt-1 shadow-lg">
                            <CustomCalendar
                              selected={dateOfBirth}
                              onSelect={handleDateSelect}
                              minDate={minDate}
                              maxDate={today}
                            />
                          </div>
                        )}
                        {formErrors.dateOfBirth && (
                          <p className="text-sm text-red-400 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.dateOfBirth}
                          </p>
                        )}
                      </div>

                      {/* Gender */}
                      <div className="space-y-2" ref={addToFormFieldsRef}>
                        <Label className="text-sm font-medium text-blue-300 flex items-center">
                          Giới tính
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <ShadcnSelect value={gender} onValueChange={setGender}>
                          <SelectTrigger
                            className={cn(
                              "bg-[#0f3b87] border-blue-700 text-blue-100 focus:border-blue-500 focus:ring-blue-500",
                              formErrors.gender ? "border-red-500" : ""
                            )}
                          >
                            <SelectValue placeholder="Chọn giới tính" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1e3a8a] border-blue-800 text-blue-100">
                            <SelectItem
                              value="male"
                              className="focus:bg-blue-700 focus:text-blue-50"
                            >
                              Nam
                            </SelectItem>
                            <SelectItem
                              value="female"
                              className="focus:bg-blue-700 focus:text-blue-50"
                            >
                              Nữ
                            </SelectItem>
                            <SelectItem
                              value="other"
                              className="focus:bg-blue-700 focus:text-blue-50"
                            >
                              Khác
                            </SelectItem>
                          </SelectContent>
                        </ShadcnSelect>
                        {formErrors.gender && (
                          <p className="text-sm text-red-400 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.gender}
                          </p>
                        )}
                      </div>

                      {/* National ID */}
                      <div
                        className="space-y-2 md:col-span-2"
                        ref={addToFormFieldsRef}
                      >
                        <Label
                          htmlFor="nationalId"
                          className="text-sm font-medium text-blue-300"
                        >
                          Căn cước công dân
                        </Label>
                        <Input
                          id="nationalId"
                          placeholder="012345678910"
                          required
                          className="bg-[#0f3b87] border-blue-700 text-white focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      {/* Industry with react-select */}
                      <div
                        className="space-y-2 md:col-span-2"
                        ref={addToFormFieldsRef}
                      >
                        <Label className="text-sm font-medium text-blue-300 flex items-center">
                          {accountType === "freelancer"
                            ? "Chuyên ngành"
                            : "Lĩnh vực hoạt động"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="react-select-container">
                          <Select
                            options={industryOptions}
                            value={industryOptions.find(
                              (option) => option.value === selectedIndustry
                            )}
                            onChange={handleIndustryChange}
                            placeholder={
                              accountType === "freelancer"
                                ? "Chọn chuyên ngành"
                                : "Chọn lĩnh vực"
                            }
                            isClearable
                            isSearchable
                            styles={{
                              ...customSelectStyles,
                              placeholder: (provided) => ({
                                ...provided,
                                color: "#94a3b8",
                              }),
                              singleValue: (provided) => ({
                                ...provided,
                                color: "#e2e8f0",
                              }),
                              input: (provided) => ({
                                ...provided,
                                color: "#e2e8f0",
                              }),
                            }}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            theme={(theme) => ({
                              ...theme,
                              colors: {
                                ...theme.colors,
                                primary: "#3b82f6",
                                primary75: "#3b82f6",
                                primary50: "#3b82f6",
                                primary25: "#3b82f6",
                                neutral0: "#1e3a8a",
                                neutral5: "#1e3a8a",
                                neutral10: "#1e3a8a",
                                neutral20: "#1e3a8a",
                                neutral30: "#1e3a8a",
                                neutral40: "#94a3b8",
                                neutral50: "#94a3b8",
                                neutral60: "#94a3b8",
                                neutral70: "#94a3b8",
                                neutral80: "white",
                                neutral90: "white",
                              },
                            })}
                          />
                        </div>
                        {formErrors.industry && (
                          <p className="text-sm text-red-400 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.industry}
                          </p>
                        )}
                      </div>

                      {/* Skills */}
                      {selectedIndustry && accountType === "freelancer" && (
                        <div
                          className="space-y-2 md:col-span-2"
                          ref={addToFormFieldsRef}
                        >
                          <Label className="text-sm font-medium text-blue-300 flex items-center">
                            Kỹ năng
                            <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <div className="react-select-container">
                            <Select
                              isMulti
                              options={skillOptions}
                              value={selectedSkillOptions}
                              onChange={handleSkillsChange}
                              placeholder="Chọn kỹ năng"
                              noOptionsMessage={() =>
                                "Không tìm thấy kỹ năng phù hợp"
                              }
                              isSearchable
                              styles={customSelectStyles}
                              className="react-select-container"
                              classNamePrefix="react-select"
                              menuPortalTarget={document.body}
                              menuPosition="fixed"
                              theme={(theme) => ({
                                ...theme,
                                colors: {
                                  ...theme.colors,
                                  primary: "#3b82f6",
                                  primary75: "#3b82f6",
                                  primary50: "#3b82f6",
                                  primary25: "#3b82f6",
                                  neutral0: "#1e3a8a",
                                  neutral5: "#1e3a8a",
                                  neutral10: "#1e3a8a",
                                  neutral20: "#1e3a8a",
                                  neutral30: "#1e3a8a",
                                  neutral40: "#94a3b8",
                                  neutral50: "#94a3b8",
                                  neutral60: "#94a3b8",
                                  neutral70: "#94a3b8",
                                  neutral80: "white",
                                  neutral90: "white",
                                },
                              })}
                            />
                          </div>
                          {formErrors.skills && (
                            <p className="text-sm text-red-400 flex items-center mt-1">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {formErrors.skills}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="flex flex-col space-y-4"
                    ref={addToFormFieldsRef}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang xử lý..." : "Tạo tài khoản"}
                    </Button>
                    <Button
                      type="button" // Explicitly set type to button to prevent form submission
                      variant="outline"
                      className="w-full border-blue-700 text-blue-300 hover:bg-blue-900/30 h-12 rounded-lg"
                      onClick={() => {
                        // Animate transition back to account type selection
                        if (formRef.current) {
                          gsap.to(formRef.current, {
                            y: 30,
                            opacity: 0,
                            duration: 0.5,
                            ease: "power3.in",
                            onComplete: () => {
                              setFormStep(0);
                              // Reset form fields refs for next animation
                              formFieldsRef.current = [];
                            },
                          });
                        } else {
                          setFormStep(0);
                        }
                      }}
                    >
                      Quay lại
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="bg-[#111827] rounded-xl shadow-2xl overflow-hidden border border-blue-900/40"
                ref={formRef}
              >
                <div className="p-6 space-y-6">
                  <div className="space-y-6">
                    {/* Avatar Upload */}
                    <div
                      className="flex flex-col items-center justify-center"
                      ref={addToFormFieldsRef}
                    >
                      <div className="relative w-24 h-24 mb-4">
                        {avatarPreview ? (
                          <Image
                            src={avatarPreview || "/placeholder.svg"}
                            alt="Avatar preview"
                            fill
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-blue-900/30 flex items-center justify-center">
                            <Building2 className="h-12 w-12 text-blue-400" />
                          </div>
                        )}
                        <label
                          htmlFor="avatar-upload"
                          className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
                        >
                          <Upload className="h-4 w-4" />
                        </label>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </div>
                      <p className="text-sm text-blue-300">
                        Tải lên logo công ty (không bắt buộc)
                      </p>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className="space-y-2 md:col-span-2"
                        ref={addToFormFieldsRef}
                      >
                        <Label
                          htmlFor="fullName"
                          className="text-sm font-medium text-blue-300"
                        >
                          Họ và tên người đại diện
                        </Label>
                        <Input
                          id="fullName"
                          placeholder="Nguyễn Văn A"
                          required
                          className="bg-[#0f3b87] border-blue-700 text-white focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2" ref={addToFormFieldsRef}>
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-blue-300"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@gmail.com"
                          required
                          className="bg-[#0f3b87] border-blue-700 text-white focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2" ref={addToFormFieldsRef}>
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium text-blue-300"
                        >
                          Số điện thoại
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="0912345678"
                          required
                          className="bg-[#0f3b87] border-blue-700 text-white focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2" ref={addToFormFieldsRef}>
                        <Label
                          htmlFor="password"
                          className="text-sm font-medium text-blue-300"
                        >
                          Mật khẩu
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          required
                          className="bg-[#0f3b87] border-blue-700 text-white focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2" ref={addToFormFieldsRef}>
                        <Label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium text-blue-300"
                        >
                          Xác nhận mật khẩu
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          required
                          className="bg-[#0f3b87] border-blue-700 text-white focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      {/* Date of Birth */}
                      <div
                        className="space-y-2 date-calendar-container"
                        ref={addToFormFieldsRef}
                      >
                        <Label className="text-sm font-medium text-blue-300 flex items-center">
                          Ngày sinh
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="relative">
                          <Button
                            type="button"
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-[#0f3b87] border-blue-700 text-blue-100 h-10 focus:border-blue-500 focus:ring-blue-500",
                              formErrors.dateOfBirth ? "border-red-500" : ""
                            )}
                            onClick={() => setShowCalendar(!showCalendar)}
                          >
                            <Calendar className="mr-2 h-4 w-4 text-blue-400" />
                            {dateOfBirth ? (
                              format(dateOfBirth, "dd/MM/yyyy", { locale: vi })
                            ) : (
                              <span className="text-gray-400">
                                Chọn ngày sinh
                              </span>
                            )}
                          </Button>

                          {showCalendar && (
                            <div className="absolute z-50 mt-1 shadow-lg">
                              <CustomCalendar
                                selected={dateOfBirth}
                                onSelect={handleDateSelect}
                                minDate={minDate}
                                maxDate={today}
                              />
                            </div>
                          )}
                        </div>
                        {formErrors.dateOfBirth && (
                          <p className="text-sm text-red-400 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.dateOfBirth}
                          </p>
                        )}
                      </div>

                      {/* Gender */}
                      <div className="space-y-2" ref={addToFormFieldsRef}>
                        <Label className="text-sm font-medium text-blue-300 flex items-center">
                          Giới tính
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <ShadcnSelect value={gender} onValueChange={setGender}>
                          <SelectTrigger
                            className={cn(
                              "bg-[#0f3b87] border-blue-700 text-blue-100 focus:border-blue-500 focus:ring-blue-500",
                              formErrors.gender ? "border-red-500" : ""
                            )}
                          >
                            <SelectValue placeholder="Chọn giới tính" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1e3a8a] border-blue-800 text-blue-100">
                            <SelectItem
                              value="male"
                              className="focus:bg-blue-700 focus:text-blue-50"
                            >
                              Nam
                            </SelectItem>
                            <SelectItem
                              value="female"
                              className="focus:bg-blue-700 focus:text-blue-50"
                            >
                              Nữ
                            </SelectItem>
                            <SelectItem
                              value="other"
                              className="focus:bg-blue-700 focus:text-blue-50"
                            >
                              Khác
                            </SelectItem>
                          </SelectContent>
                        </ShadcnSelect>
                        {formErrors.gender && (
                          <p className="text-sm text-red-400 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.gender}
                          </p>
                        )}
                      </div>

                      {/* Company Information */}
                      <div
                        className="space-y-2 md:col-span-2"
                        ref={addToFormFieldsRef}
                      >
                        <Label
                          htmlFor="companyName"
                          className="text-sm font-medium text-blue-300 flex items-center"
                        >
                          Tên công ty
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input
                          id="companyName"
                          placeholder="Tên công ty của bạn"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          required
                          className={cn(
                            "bg-[#0f3b87] border-blue-700 text-white focus:border-blue-500 focus:ring-blue-500",
                            formErrors.companyName ? "border-red-500" : ""
                          )}
                        />
                        {formErrors.companyName && (
                          <p className="text-sm text-red-400 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.companyName}
                          </p>
                        )}
                      </div>

                      {/* Location Selector */}
                      <div
                        className="md:col-span-2 mt-4"
                        ref={addToFormFieldsRef}
                      >
                        <LocationSelector
                          onLocationChange={handleLocationChange}
                          error={formErrors.companyAddress}
                          className="mb-2"
                        />
                        {formErrors.companyAddress && (
                          <p className="text-sm text-red-400 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.companyAddress}
                          </p>
                        )}
                      </div>

                      <div
                        className="space-y-2 md:col-span-2"
                        ref={addToFormFieldsRef}
                      >
                        <Label
                          htmlFor="taxId"
                          className="text-sm font-medium text-blue-300 flex items-center"
                        >
                          Mã số thuế
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input
                          id="taxId"
                          placeholder="Mã số thuế công ty"
                          value={taxId}
                          onChange={(e) => setTaxId(e.target.value)}
                          required
                          className={cn(
                            "bg-[#0f3b87] border-blue-700 text-white focus:border-blue-500 focus:ring-blue-500",
                            formErrors.taxId ? "border-red-500" : ""
                          )}
                        />
                        {formErrors.taxId && (
                          <p className="text-sm text-red-400 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.taxId}
                          </p>
                        )}
                      </div>

                      {/* Industry with react-select */}
                      <div
                        className="space-y-2 md:col-span-2"
                        ref={addToFormFieldsRef}
                      >
                        <Label className="text-sm font-medium text-blue-300 flex items-center">
                          Lĩnh vực hoạt động
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="react-select-container">
                          <Select
                            options={industryOptions}
                            value={industryOptions.find(
                              (option) => option.value === selectedIndustry
                            )}
                            onChange={handleIndustryChange}
                            placeholder="Chọn lĩnh vực"
                            isClearable
                            isSearchable
                            styles={{
                              ...customSelectStyles,
                              placeholder: (provided) => ({
                                ...provided,
                                color: "#94a3b8",
                              }),
                              singleValue: (provided) => ({
                                ...provided,
                                color: "#e2e8f0",
                              }),
                              input: (provided) => ({
                                ...provided,
                                color: "#e2e8f0",
                              }),
                            }}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            theme={(theme) => ({
                              ...theme,
                              colors: {
                                ...theme.colors,
                                primary: "#3b82f6",
                                primary75: "#3b82f6",
                                primary50: "#3b82f6",
                                primary25: "#3b82f6",
                                neutral0: "#1e3a8a",
                                neutral5: "#1e3a8a",
                                neutral10: "#1e3a8a",
                                neutral20: "#1e3a8a",
                                neutral30: "#1e3a8a",
                                neutral40: "#94a3b8",
                                neutral50: "#94a3b8",
                                neutral60: "#94a3b8",
                                neutral70: "#94a3b8",
                                neutral80: "#e2e8f0",
                                neutral90: "#e2e8f0",
                              },
                            })}
                          />
                        </div>
                        {formErrors.industry && (
                          <p className="text-sm text-red-400 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.industry}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex flex-col space-y-4"
                    ref={addToFormFieldsRef}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang xử lý..." : "Tạo tài khoản"}
                    </Button>
                    <Button
                      type="button" // Explicitly set type to button to prevent form submission
                      variant="outline"
                      className="w-full border-blue-700 text-blue-300 hover:bg-blue-900/30 h-12 rounded-lg"
                      onClick={() => {
                        // Animate transition back to account type selection
                        if (formRef.current) {
                          gsap.to(formRef.current, {
                            y: 30,
                            opacity: 0,
                            duration: 0.5,
                            ease: "power3.in",
                            onComplete: () => {
                              setFormStep(0);
                              // Reset form fields refs for next animation
                              formFieldsRef.current = [];
                            },
                          });
                        } else {
                          setFormStep(0);
                        }
                      }}
                    >
                      Quay lại
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-blue-300">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Helper function to conditionally join class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
