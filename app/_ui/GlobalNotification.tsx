// src/components/GlobalNotification.tsx
"use client";

import { notification } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useEffect } from 'react';

const GlobalNotification = () => {
    const [apiNotification, contextHolder] = notification.useNotification();
    const ntf = useSelector((state: RootState) => state.volatile.notification);

    useEffect(() => {
        if (ntf.key === '') return;
        if (ntf.action === 'clearAll') {
            apiNotification.destroy();
        } else if (ntf.action === 'remove') {
            apiNotification.destroy(ntf.key);
        } else {
            apiNotification.destroy(ntf.key);

            setTimeout(() => {
                apiNotification.open({
                    key: ntf.key,
                    type: ntf.type,
                    message: ntf.message,
                    description: ntf.description,
                    duration: ntf.duration,
                    showProgress: ntf.showProgress,
                    pauseOnHover: ntf.pauseOnHover,
                    placement: ntf.placement,
                });
            }, 250);
        }
    }, [ntf.key, ntf.timestamp])

    return <>{contextHolder}</>;
};

export default GlobalNotification;
