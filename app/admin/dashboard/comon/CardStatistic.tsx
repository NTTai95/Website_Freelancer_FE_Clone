import React from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import CardShadow from "@/components/ui/card-shadow";

type CardStatisticsProps = {
    title: string;
    value: number | string;
    unit?: string;
    percentage?: number;
    isIncrease?: boolean;
    icon?: React.ReactNode;
    color?: string;
    bgColor?: string;
    locale?: string; // mặc định là 'vi-VN'
};

const formatNumber = (value: number | string, locale = "vi-VN") => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return new Intl.NumberFormat(locale).format(num);
};

const CardStatistics = ({
    title,
    value,
    unit,
    percentage,
    isIncrease = true,
    icon,
    color = "#1677ff",
    bgColor = "#e6f4ff",
    locale = "vi-VN",
}: CardStatisticsProps) => {
    return (
        <CardShadow className="p-0 min-w-[31%] transition hover:scale-[1.02] overflow-hidden">
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url("/assets/images/bg-admin-card.jpg.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 5
                }}
            />
            <div className="flex items-center p-1 lg:p-4 gap-1 lg:gap-4 z-10 relative">
                {icon && (
                    <div
                        className="w-8 lg:w-14 h-8 lg:h-14 rounded-full flex items-center justify-center mr-2 lg:mr-4 text-lg lg:text-2xl"
                        style={{ backgroundColor: bgColor, color }}
                    >
                        {icon}
                    </div>
                )}
                <div className="flex-1">
                    <p className="text-gray-500 text-[10px] lg:text-sm">{title}</p>
                    <div className="text-sm lg:text-2xl font-semibold" style={{ color }}>
                        {formatNumber(value, locale)}
                        {unit && <span className="text-[10px] lg:text-sm ml-1"> {unit}</span>}
                    </div>
                    {percentage !== undefined && (
                        <div
                            className={`text-sm mt-1 flex items-center gap-1 ${isIncrease ? "text-green-600" : "text-red-500"
                                }`}
                        >
                            {isIncrease ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                            {percentage}%
                        </div>
                    )}
                </div>
            </div>
        </CardShadow>
    );
};

export default CardStatistics;
