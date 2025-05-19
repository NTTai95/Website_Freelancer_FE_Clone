"use client";

// Thư viện React
import * as React from "react";

// Import các kiểu dữ liệu cho Toast từ component UI
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

// Số lượng toast tối đa hiển thị cùng lúc
const TOAST_LIMIT = 1;
// Thời gian chờ trước khi toast tự động bị xóa (miligiây)
const TOAST_REMOVE_DELAY = 1000000;

// Định nghĩa kiểu dữ liệu cho một toast
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Các loại action cho toast (thêm, cập nhật, ẩn, xóa)
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

// Biến đếm để tạo id cho toast
let count = 0;

// Hàm tạo id duy nhất cho mỗi toast
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

// Định nghĩa các kiểu action
type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

// Kiểu dữ liệu cho state của toast
interface State {
  toasts: ToasterToast[];
}

// Map để lưu timeout cho từng toast (dùng để tự động xóa toast sau một thời gian)
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

// Hàm thêm toast vào hàng đợi xóa sau một khoảng thời gian
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

// Hàm reducer để xử lý các action và cập nhật state
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      // Thêm toast mới vào đầu mảng, giới hạn số lượng toast
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      // Cập nhật thông tin của một toast
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // Thêm toast vào hàng đợi xóa (side effect)
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      // Đánh dấu toast là đã đóng (open: false)
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      // Xóa toast khỏi mảng
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

// Danh sách các listener để cập nhật UI khi state thay đổi
const listeners: Array<(state: State) => void> = [];

// State lưu trữ các toast hiện tại (dùng chung cho toàn bộ app)
let memoryState: State = { toasts: [] };

// Hàm dispatch để gửi action và cập nhật state, đồng thời gọi các listener
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

// Kiểu Toast không có id (id sẽ được tự động tạo)
type Toast = Omit<ToasterToast, "id">;

// Hàm tạo toast mới
function toast({ ...props }: Toast) {
  const id = genId();

  // Hàm cập nhật toast
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  // Hàm ẩn toast
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  // Thêm toast mới vào state
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

// Custom hook để sử dụng toast trong component React
function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  // Đăng ký listener để cập nhật UI khi state thay đổi
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

// Export custom hook và hàm toast
export { useToast, toast };
