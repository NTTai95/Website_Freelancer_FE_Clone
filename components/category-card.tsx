import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  skills: number;
  rating: number;
}

export function CategoryCard({
  title,
  description,
  icon: Icon,
  color,
  skills,
  rating,
}: CategoryCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] bg-white dark:bg-gray-800 h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-[#CD7F32]" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
        </div>
        <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-gray-500 dark:text-gray-300">{description}</p>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            <span className="font-medium text-gray-900 dark:text-white">
              {skills}
            </span>{" "}
            kỹ năng
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
