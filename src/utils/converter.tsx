import { apiUnique } from "@/api/validation";
import { FieldValidation } from "@/api/validation";
import { debounceValidator } from "@/hooks/useDebouncedValidator";
import { Rule } from "antd/es/form";
import dayjs from "dayjs";
import moment from "moment";

// Convert validation metadata sang dạng Rule[] cho Ant Design Form
export const convertToAntdRules = (
  meta: FieldValidation[],
  initialValues: Record<string, any> = {},
  editingId?: number
): Record<string, Rule[]> => {
  const result: Record<string, Rule[]> = {};

  meta.forEach((item) => {
    const fieldValidator = debounceValidator(async (_: any, val: any) => {
      for (const rule of item.rules) {
        await validateRule(rule, val, item.field, initialValues, editingId);
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
  val: any,
  fieldName: string,
  initialValues: Record<string, any>,
  editingId?: number
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
    if (editingId && val === initialValues?.[fieldName]) return;
    const isDuplicate = await apiUnique(value, val);
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
    const yearsAgo = dayjs().subtract(value, "year");
    const isValid = dayjs(val).isBefore(yearsAgo);
    if (!isValid) throw new Error(message);
  }

  return;
};

// Helper hiển thị giới tính
export const genderToLabel = (gender: boolean) => {
  return gender ? "Nam" : "Nữ";
};

// Helper hiển thị vai trò
export const roleToLabel = (role: string) => {
  return role === "Freelancer" ? "Người làm việc" : "Nhà tuyển dụng";
};

// Tô sáng keyword trong văn bản
export const getHighlightedText = (text: string, keyword: string) => {
  const normalizedText = removeVietnameseTones(text);
  const normalizedKeyword = removeVietnameseTones(keyword.toLowerCase());
  const index = normalizedText.toLowerCase().indexOf(normalizedKeyword);
  if (index === -1 || !keyword) return text;

  return (
    <>
      {text.substring(0, index)}
      <span className="bg-blue-200">
        {text.substring(index, index + keyword.length)}
      </span>
      {text.substring(index + keyword.length)}
    </>
  );
};

// Xóa dấu tiếng Việt
const removeVietnameseTones = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export default removeVietnameseTones;

// Format chuẩn hóa cho moment
function uppercaseDate(format: string): string {
  return format
    .replace(/dd/g, "DD")
    .replace(/mm/g, "MM")
    .replace(/yyyy/g, "YYYY")
    .replace(/yy/g, "YY");
}
