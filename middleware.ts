// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    sub: string;
    authorities: string[];
    iat: number;
    exp: number;
}

const PUBLIC_PATHS = ['/', '/login', '/register', '/home'];

function isPublicPath(pathname: string): boolean {
    const cleanPath = pathname.replace(/\/+$/, '') === '' ? '/' : pathname.replace(/\/+$/, '');
    return PUBLIC_PATHS.includes(cleanPath);
}

const ACCESS_CONTROL_RULES: {
    [pathPrefix: string]: {
        allowRoles?: string[];
        denyRoles?: string[];
        requirePermissions?: string[];
    };
} = {
    '/admin': {
        allowRoles: ['ROLE_QUAN_TRI'],
    },
    '/employer': {
        allowRoles: ['ROLE_NHA_TUYEN_DUNG'],
    },
    '/freelancer': {
        allowRoles: ['ROLE_FREELANCER'],
    },
    '/user-management': {
        requirePermissions: ['user.read'],
    },
    '/user-disable': {
        requirePermissions: ['user.disable'],
    },
    '/user-active': {
        requirePermissions: ['user.active'],
    },
};

function matchAccessRule(pathname: string) {
    return Object.entries(ACCESS_CONTROL_RULES).find(([prefix]) =>
        pathname.startsWith(prefix),
    )?.[1];
}

function isAccessDenied(pathname: string, authorities: string[]): boolean {
    const rule = matchAccessRule(pathname);
    if (!rule) return false;

    const roles = authorities.filter((auth) => auth.startsWith('ROLE'));
    const permissions = authorities.filter((auth) => !auth.startsWith('ROLE'));

    if (rule.denyRoles && rule.denyRoles.some((r) => roles.includes(r))) {
        return true;
    }

    if (rule.allowRoles) {
        return !rule.allowRoles.some((r) => roles.includes(r));
    }

    if (rule.requirePermissions) {
        return !rule.requirePermissions.every((p) => permissions.includes(p));
    }

    return false;
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (isPublicPath(pathname)) {
        console.log('Public path, allowing access');
        return NextResponse.next();
    }

    const token = req.cookies.get('token')?.value;
    if (!token) {
        console.error('No token found');
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const authorities = decoded.authorities || [];

        if (isAccessDenied(pathname, authorities)) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }

        return NextResponse.next();
    } catch (e) {
        console.error('Invalid token', e);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|gif)).*)',
    ],
};


