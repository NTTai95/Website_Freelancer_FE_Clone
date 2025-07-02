'use client';

import { Skeleton } from 'antd';

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar loading */}
                <div className="w-full md:w-1/4 flex flex-col items-center">
                    <Skeleton.Avatar active size={160} style={{ marginBottom: 16 }} />
                    <Skeleton.Input active size="large" style={{ marginBottom: 8, width: '75%' }} />
                    <Skeleton.Input active size="small" style={{ marginBottom: 16, width: '50%' }} />
                    <Skeleton active paragraph={{ rows: 3 }} style={{ width: '100%' }} />
                </div>

                {/* Main content loading */}
                <div className="w-full md:w-3/4">
                    <Skeleton active paragraph={{ rows: 8 }} />
                </div>
            </div>
        </div>
    );
}
