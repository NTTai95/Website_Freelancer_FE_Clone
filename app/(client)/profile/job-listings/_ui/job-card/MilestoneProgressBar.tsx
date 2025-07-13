import { Status } from '@/types/status';
import { Tooltip } from 'antd';
import React from 'react';

interface MilestoneProgressBarProps {
    total: number;
    statusCounts: Record<string, number>;
}

const MilestoneProgressBar = ({ total, statusCounts }: MilestoneProgressBarProps) => {
    if (total === 0) {
        return (
            <div className="!text-sm !text-gray-500 !italic !py-1">
                Chưa có giai đoạn nào
            </div>
        );
    }

    // Define status order and colors using Status.Meta
    const statusOrder = ['DISPUTE', 'UNPAID', 'REJECTED', 'PENDING', 'DOING', 'REVIEWING', 'DONE'];

    // Create segments with proper status metadata
    const segments = statusOrder
        .filter(status => statusCounts[status] > 0)
        .map(status => ({
            status,
            count: statusCounts[status],
            percent: Math.round((statusCounts[status] / total) * 100),
            color: Status.Meta[status].hex,
            label: Status.Meta[status].label
        }));

    // Handle unknown statuses
    const unknownStatuses = Object.keys(statusCounts)
        .filter(status => !statusOrder.includes(status) && statusCounts[status] > 0)
        .map(status => ({
            status,
            count: statusCounts[status],
            percent: Math.round((statusCounts[status] / total) * 100),
            color: '#9CA3AF', // gray-400
            label: status
        }));

    const allSegments = [...segments, ...unknownStatuses];

    // Tooltip content
    const tooltipContent = (
        <div className="!min-w-[180px]">
            <div className="!text-black !font-semibold !text-center !mb-3 !pb-2 !border-b !border-gray-200">
                <span className="!text-indigo-600">{total}</span> giai đoạn
            </div>

            <div className="!space-y-2">
                {allSegments.map(seg => (
                    <div key={seg.status} className="!flex !items-center !justify-between">
                        <div className="!flex !items-center">
                            <div
                                className="!w-3 !h-3 !rounded !mr-2"
                                style={{ backgroundColor: seg.color }}
                            />
                            <div className="!text-sm !font-medium !text-black">
                                {seg.label}
                            </div>
                        </div>
                        <div className="!text-sm !text-gray-600">
                            {seg.count} ({seg.percent}%)
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <Tooltip
            title={tooltipContent}
            placement="bottom"
            color="#fff"
        >
            <div className="!w-full !cursor-pointer group">
                <div className="!flex !items-center !justify-between !mb-1">
                    <span className="!text-sm !font-medium !text-gray-700">
                        Tiến trình giai đoạn
                    </span>
                    <span className="!text-xs !font-semibold !text-indigo-600">
                        {total} giai đoạn
                    </span>
                </div>

                <div className="!relative !h-3 !rounded-full !overflow-hidden !bg-gray-200 !shadow-inner">
                    {allSegments.length === 0 ? (
                        <div className="!h-full !bg-gray-300" />
                    ) : (
                        <>
                            {allSegments.map((seg, index) => (
                                <div
                                    key={`${seg.status}-${index}`}
                                    className="!absolute !top-0 !h-full !transition-all !duration-300 group-hover:!opacity-90"
                                    style={{
                                        left: `${allSegments.slice(0, index).reduce((acc, s) => acc + s.percent, 0)}%`,
                                        width: `${seg.percent}%`,
                                        backgroundColor: seg.color,
                                        zIndex: allSegments.length - index
                                    }}
                                />
                            ))}

                            <div className="!absolute !inset-0 !flex !items-center !justify-center">
                                <span className="!text-[9px] !font-bold !text-white !mix-blend-difference">
                                    {allSegments.find(s => s.status === 'DONE')?.percent || 0}% hoàn thành
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Tooltip>
    );
};

export default MilestoneProgressBar;