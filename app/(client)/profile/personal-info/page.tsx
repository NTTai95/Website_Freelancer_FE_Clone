"use client";

import { useEffect, useState } from 'react';
import ProfileSidebar from './_ui/profileSidebar/ProfileSidebar';
import SkillsSection from './_ui/SkillsSection';
import LanguagesSection from './_ui/LanguagesSection';
import CertificationsSection from './_ui/certification/CertificationsSection';
import EducationsSection from './_ui/education/EducationSection';
import { apiGet } from '@/api/baseApi';
import ProfileContext from './_ui/ProfileContext';
import { AuthGuard } from '@/components/AuthGuard';


export default function Profile() {
    const [data, setData] = useState<any>();

    const reloadData = () => {
        apiGet("/profile/my-info").then((res) => {
            setData(res.data);
        })
    }

    useEffect(() => {
        reloadData();
    }, []);

    return (
        <ProfileContext.Provider value={{ reloadData }}>
            <div className="!container !mx-auto">
                <AuthGuard roles={["ROLE_FREELANCER"]}>
                    <div className="!flex !gap-4">
                        <ProfileSidebar
                            data={data}
                        />
                        <div className="!w-full !space-y-4">
                            <SkillsSection
                                skills={data?.skills || []}
                            />

                            <LanguagesSection
                                languages={data?.languages || []}
                            />

                            <CertificationsSection
                                certifications={data?.certifications || []}
                            />

                            <EducationsSection
                                educations={data?.educations || []}
                            />
                        </div>
                    </div>
                </AuthGuard>
                <AuthGuard roles={["ROLE_NHA_TUYEN_DUNG"]}>
                    <div className="!flex !flex-col !gap-8 items-center !px-32">
                        <ProfileSidebar
                            data={data}
                        />
                    </div>
                </AuthGuard>
            </div>
        </ProfileContext.Provider>
    );
}