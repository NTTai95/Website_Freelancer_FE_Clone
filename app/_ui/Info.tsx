"use client";

import { useAuthorization } from "@/hooks/useAuthorization";
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useRouter } from "next/navigation";
import { AuthGuard } from "@/components/AuthGuard";
import { UnauthenticatedButtons } from './UnauthenticatedButtons';
import { AdminInfo } from './AdminInfo';
import { ClientInfo } from './ClientInfo';

const Info = ({ scrolled }: { scrolled: boolean }) => {
    const router = useRouter();
    const me = useSelector((state: RootState) => state.persistent.auth.me);
    const { role } = useSelector((state: RootState) => state.persistent.auth);
    const { isAuthenticated } = useAuthorization();

    if (!isAuthenticated) {
        return <UnauthenticatedButtons scrolled={scrolled} />;
    }

    return (
        <AuthGuard
            roles={["ROLE_FREELANCER", "ROLE_NHA_TUYEN_DUNG"]}
            fallback={<AdminInfo scrolled={scrolled} fullName={me?.fullName || ""} />}
        >
            <ClientInfo
                scrolled={scrolled}
                fullName={me?.fullName || ""}
                avatar={me?.avatar}
            />
        </AuthGuard>
    );
};

export default Info;