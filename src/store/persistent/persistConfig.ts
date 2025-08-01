// store/persistConfig.ts
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: string) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};

const storageSafe =
    typeof window === 'undefined'
        ? createNoopStorage()
        : createWebStorage('local');

export const persistConfig = {
    key: 'root',
    storage: storageSafe,
    whitelist: ['auth'],
};
