export namespace EndPoint {
    export namespace Admin {
        export const ME = 'admin/me';
        export namespace Skill {
            export const BASE = 'admin/skills';
            export const ID = `${BASE}/{id}`;
            export const FILTER = `${BASE}/filter`;
            export const VALIDATION = `${BASE}/validation`;
            export const FORM = `${BASE}/form/{id}`;
            export const DISABLE = `${ID}/disable`;
            export const ACTIVE = `${ID}/active`;
            export const LIST = `${BASE}/list`;
            export const SORT = `${BASE}/sort`;
            export const IMPACT = `${ID}/impact`;
            export const INVALID = `${ID}/invalid`;
        }

        export namespace Major {
            export const BASE = 'admin/majors';
            export const ID = `${BASE}/{id}`;
            export const FILTER = `${BASE}/filter`;
            export const SORT = `${BASE}/sort`;
            export const VALIDATION = `${BASE}/validation`;
            export const FORM = `${BASE}/form/{id}`;
            export const DISABLE = `${ID}/disable`;
            export const ACTIVE = `${ID}/active`;
            export const LIST = `${BASE}/list`;
            export const IMPACT = `${ID}/impact`;
            export const INVALID = `${ID}/invalid`;
        }

        export namespace Language {
            export const BASE = 'admin/languages';
            export const ID = `${BASE}/{id}`;
            export const FILTER = `${BASE}/filter`;
            export const SORT = `${BASE}/sort`;
            export const VALIDATION = `${BASE}/validation`;
            export const FORM = `${BASE}/form/{id}`;
            export const DISABLE = `${ID}/disable`;
            export const ACTIVE = `${ID}/active`;
            export const LIST = `${BASE}/list`;
            export const IMPACT = `${ID}/impact`;
            export const INVALID = `${ID}/invalid`;
        }

        export namespace Client {
            export const BASE = 'admin/clients';
            export const ID = `${BASE}/{id}`;
            export const FILTER = `${BASE}/filter`;
            export const SORT = `${BASE}/sort`;
            export const DISABLE = `${ID}/disable`;
            export const ACTIVE = `${ID}/active`;
            export const INVALID = `${ID}/invalid`;
            export const VALIDATION = `${BASE}/validation`;
        }

        export namespace Staff {
            export const BASE = 'admin/staffs';
            export const ID = `${BASE}/{id}`;
            export const FILTER = `${BASE}/filter`;
            export const SORT = `${BASE}/sort`;
            export const DISABLE = `${ID}/disable`;
            export const ACTIVE = `${ID}/active`;
            export const INVALID = `${ID}/invalid`;
            export const VALIDATION = `${BASE}/validation`;
        }

        export namespace Role {
            export const BASE = 'admin/roles';
            export const ID = `${BASE}/{id}`;
            export const FILTER = `${BASE}/filter`;
            export const SORT = `${BASE}/sort`;
            export const VALIDATION = `${BASE}/validation`;
            export const FORM = `${BASE}/form/{id}`;
            export const DISABLE = `${ID}/disable`;
            export const ACTIVE = `${ID}/active`;
            export const LIST = `${BASE}/list`;
            export const INVALID = `${ID}/invalid`;
        }
    }

    export namespace Auth {
        export const LOGIN = 'auth/login';
        export const FORGOT = 'auth/forgot';
        export const REGISTER = 'auth/register/{role}';
        export const LOGIN_VALIDATION = 'auth/login/validation';
        export const REGISTER_VALIDATION = 'auth/register/validation';
    }

    export namespace Job {
        export const BASE = 'jobs';
        export const ID = `${BASE}/{id}`;
        export const FILTER = `${BASE}/filter`;
        export const SORT = `${BASE}/sort`;
        export const VALIDATION = `${BASE}/validation`;
        export const POST_PUBLIC = `${ID}/post-public`;
        export const POST_PRIVATE = `${ID}/post-private`;
        export const RECALL = `${ID}/recall`;
        export const PUBLIC = `${ID}/public`;

        export namespace Step1 {
            const BASE_STEP = `${Job.BASE}/step1`;
            export const VALIDATION = `${BASE_STEP}/validation`;
            export const ID = `${BASE_STEP}/{id}`;
        }

        export namespace Step2 {
            const BASE_STEP = `${Job.BASE}/step2`;
            export const VALIDATION = `${BASE_STEP}/validation`;
            export const ID = `${BASE_STEP}/{id}`;
        }

        export namespace Step3 {
            const BASE_STEP = `${Job.BASE}/step3`;
            export const VALIDATION = `${BASE_STEP}/validation`;
            export const ID = `${BASE_STEP}/{id}`;
        }

        export namespace Step4 {
            const BASE_STEP = `${Job.BASE}/step4`;
            export const VALIDATION = `${BASE_STEP}/validation`;
            export const ID = `${BASE_STEP}/{id}`;
        }
    }

    export namespace List {
        const BASE = 'list';
        export const MAJOR = `${BASE}/majors`;
        export const LANGUAGE = `${BASE}/languages`;
        export const SKILL = `${BASE}/skills`;
        export const ROLE = `${BASE}/roles`;
        export const PERMISSION = `${BASE}/permissions`;
    }

    export const ME = "me"
}
