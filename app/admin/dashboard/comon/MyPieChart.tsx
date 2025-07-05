
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import CardShadow from '@/components/ui/card-shadow';

function MyPieChart() {
    return (
        <CardShadow className='h-full flex items-center justify-center shadow-blue-200'>
            <>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 65, label: 'Freelancers', color: '#336666' },
                                { id: 1, value: 35, label: 'Employers', color: '#F4CC70' },
                            ],
                        },
                    ]}
                    width={300}
                    height={390}
                />
                <p className='font-bold text-base mt-4 text-center !mb-10'>Biểu đồ thống kê tỷ lệ người tham gia website</p>
            </>
        </CardShadow>

    );
}

function BasicPie() {
    return (
        <CardShadow className='h-full flex items-center justify-center shadow-blue-200 overflow-hidden'>
            <>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url("/assets/images/bg-square.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 5
                    }}
                />
                <div className='z-10 relative '>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 21, label: 'Dự án còn lại', color: '#bdbcaf' },
                                    { id: 1, value: 49, label: 'Đang tiến hành', color: '#5f92a3' },
                                    { id: 2, value: 30, label: 'Đã hoàn thành', color: '#4F6457' },
                                ],
                            },
                        ]}
                        width={300}
                        height={300}
                    />
                    <p className='font-bold text-base mt-4'>Thống kê tiến độ hoàn thành các dự án</p>
                </div>
            </>
        </CardShadow>
    );
}
export { MyPieChart, BasicPie };

