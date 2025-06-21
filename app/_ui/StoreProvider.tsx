// app/ui/PersistentProvider.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';

interface Props {
    children: ReactNode;
}

export default function PersistentProvider({ children }: Props) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
