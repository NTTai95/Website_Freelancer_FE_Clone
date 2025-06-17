// store/auth.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { setCookie, destroyCookie } from 'nookies';
import { AppDispatch, RootState } from '@/store';
import { apiMeAdmin, apiMeClient } from '@/api/auth';

interface JwtPayload {
    sub: string;
    authorities: string[];
    iat: number;
    exp: number;
}

interface AuthState {
    token: string | null;
    email: string | null;
    role: string | null;
    permissions: string[] | null;
    me: any | null;
}

const initialState: AuthState = {
    token: null,
    email: null,
    role: null,
    permissions: null,
    me: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            const token = action.payload;
            state.token = token;

            try {
                const decoded = jwtDecode<JwtPayload>(token);
                state.email = decoded.sub;
                state.role = decoded.authorities?.[0] || null;
                state.permissions = decoded.authorities;

                // Ghi vào cookie
                setCookie(null, 'token', token, {
                    maxAge: 60 * 60 * 24, // 1 ngày
                    path: '/',
                });
            } catch (err) {
                console.error('Invalid token', err);
                destroyCookie(null, 'token');
                Object.assign(state, initialState);
            }
        },

        setMe(state, action: PayloadAction<any>) {
            state.me = action.payload;
        },

        clearAll(state) {
            // Xóa token trong cookie
            destroyCookie(null, 'token');

            // Reset toàn bộ redux
            Object.assign(state, initialState);

            // Xóa localStorage nếu chạy phía client
            if (typeof window !== 'undefined') {
                localStorage.removeItem('persist:root');
            }
        },
    },
});

interface JwtPayload {
    sub: string;
    authorities: string[];
    iat: number;
    exp: number;
}

export const handleLoginWithToken = (token: string) => async (dispatch: AppDispatch, getState: () => RootState): Promise<string | undefined> => {
    dispatch(setToken(token));

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const authorities = decoded.authorities || [];
        const role = authorities[0] || '';

        if (role === 'ROLE_FREELANCER' || role === 'ROLE_EMPLOYER') {
            apiMeClient().then((res) => {
                dispatch(setMe(res.data));
            });
        } else {
            apiMeAdmin().then((res) => {
                dispatch(setMe(res.data));
            });
        }
        return role;
    } catch (err) {
        console.error('Lỗi khi lấy thông tin người dùng:', err);
    }
};

export const { setToken, setMe, clearAll } = authSlice.actions;
export default authSlice.reducer;
