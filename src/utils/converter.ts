import { FieldValidation, AntdRuleMap } from "@/types/rules";
import { unique } from "@/api/validation";
import moment from "moment";
import dayjs from "dayjs";
import { debounceValidator } from "@/hooks/useDebouncedValidator";

export const convertToAntdRules = (meta: FieldValidation[]): AntdRuleMap => {
    const result: AntdRuleMap = {};

    meta.forEach((item) => {
        const fieldValidator = debounceValidator(async (_: any, val: any) => {
            for (const rule of item.rules) {
                await validateRule(rule, val);
            }
        });

        result[item.field] = [
            {
                validator: fieldValidator,
            },
        ];
    });

    return result;
};

const validateRule = async (
    rule: { type: string; value: any; message: string },
    val: any
): Promise<void> => {
    const { type, value, message } = rule;

    if (type === "required" && value && !val) {
        throw new Error(message);
    }

    if (type === "maxLength" && val && val.length > value) {
        throw new Error(message);
    }

    if (type === "minLength" && val && val.length < value) {
        throw new Error(message);
    }

    if (type === "pattern" && val && !new RegExp(value).test(val)) {
        throw new Error(message);
    }

    if (type === "unique" && val) {
        const isDuplicate = await unique(value, val);
        if (!isDuplicate.data) {
            throw new Error(message);
        }
    }

    if (type === "jsonFormat" && val) {
        const valFormat = dayjs(val).format("DD/MM/YYYY");
        const format = uppercaseDate(value);
        const isValid = moment(valFormat, format, true).isValid();
        if (!isValid) throw new Error(message);
    }

    if (type === "beforeYearsFromNow" && val) {
        const years = value;
        const date = dayjs();
        const yearsAgo = date.subtract(years, "year");
        const isValid = dayjs(val).isBefore(yearsAgo);
        if (!isValid) throw new Error(message);
    }

    return;
};

function uppercaseDate(format: string): string {
    return format
        .replace(/dd/g, "DD")
        .replace(/mm/g, "MM")
        .replace(/yyyy/g, "YYYY")
        .replace(/yy/g, "YY");
}
