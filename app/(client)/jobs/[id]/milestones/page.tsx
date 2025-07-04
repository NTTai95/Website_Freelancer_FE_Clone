'use client';

import { AuthGuard } from "@/components/AuthGuard";
import EmployerMilestonesPage from "./_ui/EmployerMilestonesPage";

const PageRoot = () => {
  return (
    <AuthGuard roles={["ROLE_NHA_TUYEN_DUNG"]}>
      <EmployerMilestonesPage />
    </AuthGuard>
  )
}

export default PageRoot;