import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import CardShadow from '@/components/ui/card-shadow';

const chartSetting = {
    yAxis: [
        {
            label: 'Triệu (VNĐ)',
            width: 60,
        },
    ],
    series: [{ dataKey: 'revenue', label: 'Doanh thu', valueFormatter }],
    height: 450,
};

export default function ColumnChart() {
    return (
        <CardShadow className=' shadow-blue-200 overflow-hidden'>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url("/assets/images/bg-card-chart.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 5
                }}
            />

            <div className='z-10 relative '>
                <BarChart
                    colors={['#488dab']}
                    dataset={dataset}
                    xAxis={[{ dataKey: 'month' }]}
                    {...chartSetting}
                />
                <p className='h-full flex items-center justify-center font-bold text-base mt-2'>Biểu đồ cột thống kê doanh thu theo tháng</p>
            </div>
        </CardShadow >
    );
}
const dataset = [
    {

        month: 'Tháng 1',
        revenue: 198,
    },
    {
        month: 'Tháng 2',
        revenue: 254,
    },
    {
        month: 'Tháng 3',
        revenue: 326,
    },
    {
        month: 'Tháng 4',
        revenue: 295,
    },
    {
        month: 'Tháng 5',
        revenue: 311,
    },
    {
        month: 'Tháng 6',
        revenue: 454,
    },
    {
        month: 'Tháng 7',
        revenue: 399,
    },
    {
        month: 'Tháng 8',
        revenue: 386,
    },
    {
        month: 'Tháng 9',
        revenue: 475,
    },
    {
        month: 'Tháng 10',
        revenue: 515,
    },
    {
        month: 'Tháng 11',
        revenue: 461,
    },
    {
        month: 'Tháng 12',
        revenue: 498,
    },
];

export function valueFormatter(value: number | null) {
    return `${value} triệu (VNĐ)`;
}