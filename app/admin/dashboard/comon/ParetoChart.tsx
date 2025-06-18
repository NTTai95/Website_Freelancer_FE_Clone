import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import CardShadow from '@/components/ui/card-shadow';

export const dataset = [
    {
        countJobs: 21,
        major: 'Phát triển phần mềm',
    },
    {
        countJobs: 67,
        major: 'Lập trình website',
    },
    {
        countJobs: 90,
        major: 'Lập trình game',
    },
    {
        countJobs: 59,
        major: 'Lập trình mobile',
    },
    {
        countJobs: 45,
        major: 'Cấu trúc dữ liệu và giải thuật',
    }
];

function valueFormatter(value: number | null) {
    return `${value} công việc`;
}

const chartSetting = {
    xAxis: [
        {
            label:'Thống kê tổng số lượng bài đăng'
        },
    ],
    height: 400
};
function ParetoChart() {
    return (
        <CardShadow className='shadow-blue-200'>
            <BarChart
                colors={['#2b6578']}
                dataset={dataset}
                yAxis={[{ scaleType: 'band', dataKey: 'major', width: 150, labelStyle: { fontSize: 10 } }]}
                series={[{ dataKey: 'countJobs', label: 'Công việc', valueFormatter }]}
                layout="horizontal"
                {...chartSetting}
            />
        </CardShadow >
    );
}
export { ParetoChart };
