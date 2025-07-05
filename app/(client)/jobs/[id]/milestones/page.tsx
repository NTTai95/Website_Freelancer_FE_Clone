'use client';

import { AuthGuard } from "@/components/AuthGuard";
import EmployerMilestonesPage from "./_ui/EmployerMilestonesPage";
import FreelancerPhases from "./_ui/phase-freelancer";

const PageRoot = () => {
  return (
    <>
    <AuthGuard roles={["ROLE_NHA_TUYEN_DUNG"]}>
      <EmployerMilestonesPage />
    </AuthGuard>
     <AuthGuard roles={["ROLE_FREELANCER"]}>
      <FreelancerPhases />
    </AuthGuard>
    </>
  )
}

export default PageRoot;