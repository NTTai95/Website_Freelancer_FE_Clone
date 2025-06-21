'use client';

import { message } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useEffect } from 'react';

const GlobalMessage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const msg = useSelector((state: RootState) => state.volatile.message);

    useEffect(() => {
        if (msg.key === '') return;
        if (msg.action === 'clearAll') {
            messageApi.destroy();
        } else if (msg.action === 'remove') {
            messageApi.destroy(msg.key);
        } else {
            messageApi.destroy(msg.key);

            setTimeout(() => {
                messageApi.open({
                    key: msg.key,
                    type: msg.type,
                    content: msg.content,
                    duration: msg.type === 'loading' ? 0 : msg.duration ?? 3,
                });
            }, 250);
        }
    }, [msg.key, msg.timestamp])

    return <>{contextHolder}</>;
};

export default GlobalMessage;
