// hooks/useAuthorization.ts
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

export const useAuthorization = () => {
    const token = useSelector((state: RootState) => state.persistent.auth.token);
    const role = useSelector((state: RootState) => state.persistent.auth.role);
    const permissions = useSelector(selectPermissions);

    const isAuthenticated = !!token;

    const hasRole = (roles: string[]) => {
        return role ? roles.includes(role) : false;
    };

    const hasPermission = (required: string[]) => {
        return required.every((p) => permissions.includes(p));
    };

    return { token, role, permissions, isAuthenticated, hasRole, hasPermission };
};

const selectPermissions = createSelector(
    (state: RootState) => state.persistent.auth.permissions,
    (permissions) => permissions || []
);