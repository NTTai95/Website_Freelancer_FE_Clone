import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import {
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';

// Import persistent reducers
import authSlice from './persistent/auth';
import { persistConfig } from './persistent/persistConfig';

// Import volatile reducers
import spinReducer from './volatile/spinSlice';
import messageReducer from './volatile/messageSlice';
import notificationReducer from './volatile/notificationSlice';
import wsReducer from './volatile/wsSlice';

// Combine persistent reducers
const persistentReducers = combineReducers({
    auth: authSlice,
});

// Apply persistence to persistent reducers only
const persistedReducer = persistReducer(persistConfig, persistentReducers);

// Combine all reducers (persistent + volatile)
const rootReducer = combineReducers({
    // Persistent state (will be saved to storage)
    persistent: persistedReducer,
    // Volatile state (will not be saved to storage)
    volatile: combineReducers({
        spin: spinReducer,
        message: messageReducer,
        notification: notificationReducer,
        ws: wsReducer,
    }),
});

// Configure the main store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Create persistor for the store
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export specific state types for convenience
export type PersistentState = ReturnType<typeof persistedReducer>;
export type VolatileState = {
    spin: ReturnType<typeof spinReducer>;
    message: ReturnType<typeof messageReducer>;
};