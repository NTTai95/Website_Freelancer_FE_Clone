'use client';

import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { RootState } from '@/store';
import { hideSpin } from '@/store/volatile/spinSlice';
import { LoadingOutlined } from '@ant-design/icons';

export default function GlobalSpin() {
    const spin = useSelector((state: RootState) => state.volatile.spin);
    const dispatch = useDispatch();

    if (spin.time) {
        setTimeout(() => {
            dispatch(hideSpin());
        }, spin.time);
    }

    return (
        <Spin size={spin.size} spinning={spin.spinning} delay={spin.delay} percent={spin.percent} indicator={<LoadingOutlined style={{ fontSize: spin.size ?? 64, color: '#3069DE' }} spin />} fullscreen />
    );
}
