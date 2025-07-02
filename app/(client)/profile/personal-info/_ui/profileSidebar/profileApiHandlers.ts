import { AppDispatch, store } from '@/store';
import { apiPut } from '@/api/baseApi';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import { addMessage } from '@/store/volatile/messageSlice';
import { handleLoginWithToken, setMe } from '@/store/persistent/auth';
import dayjs from 'dayjs';

export const handleAvatarUpdate = async (
    file: File,
    dispatch: AppDispatch,
    reloadData: () => void
) => {
    if (!(file instanceof File) || !file.type.startsWith("image/")) {
        dispatch(addMessage({
            key: "upload-avatar",
            content: "Vui lòng chọn một tệp ảnh hợp lệ",
            type: "error",
        }));
        return false;
    }

    const formData = new FormData();
    formData.append("file", file);

    dispatch(showSpin());

    try {
        const res = await apiPut("/profile/update/avatar", formData);
        dispatch(setMe({
            avatar: (res.data as any).url
        }));
        dispatch(addMessage({
            key: "upload-avatar",
            content: "Cập nhật ảnh đại diện thành công",
            type: "success",
        }));
        reloadData();
        return true;
    } catch {
        dispatch(addMessage({
            key: "upload-avatar",
            content: "Cập nhật ảnh đại diện thất bại",
            type: "error",
        }));
        return false;
    } finally {
        dispatch(hideSpin());
    }
};

export const handleFullNameUpdate = async (
    fullName: string,
    dispatch: AppDispatch,
    reloadData: () => void
) => {
    dispatch(showSpin());

    try {
        const res = await apiPut("/profile/update/full-name", { fullName });
        dispatch(setMe({
            fullName: (res.data as any).fullName
        }));
        dispatch(addMessage({
            key: "update-fullname",
            type: "success",
            content: "Cập nhật họ tên thành công!",
        }));
        reloadData();
        return true;
    } catch {
        dispatch(addMessage({
            key: "update-fullname",
            type: "error",
            content: "Cập nhật họ tên thất bại!",
        }));
        return false;
    } finally {
        dispatch(hideSpin());
    }
};

export const handleBioUpdate = async (
    bio: string,
    dispatch: AppDispatch,
    reloadData: () => void
) => {
    dispatch(showSpin());

    try {
        await apiPut("/profile/update/bio", { bio });
        dispatch(addMessage({
            key: "update-bio",
            type: "success",
            content: "Cập nhật giới thiệu thành công!",
        }));
        reloadData();
        return true;
    } catch {
        dispatch(addMessage({
            key: "update-bio",
            type: "error",
            content: "Cập nhật giới thiệu thất bại!",
        }));
        return false;
    } finally {
        dispatch(hideSpin());
    }
};

export const handleEmailUpdate = async (
    email: string,
    password: string,
    dispatch: AppDispatch,
    reloadData: () => void
) => {
    dispatch(showSpin());

    const currentEmail = store.getState().persistent.auth.email;

    if (!currentEmail) {
        dispatch(addMessage({
            key: "update-email",
            type: "error",
            content: "Không tìm thấy email hiện tại của người dùng!",
        }));
        dispatch(hideSpin());
        return false;
    }

    try {
        const res = await apiPut("/profile/update/email", { email, password });
        dispatch(handleLoginWithToken((res.data as any).token));

        dispatch(addMessage({
            key: "update-email",
            type: "success",
            content: "Cập nhật email thành công!",
        }));

        reloadData();
        return true;
    } catch (error: any) {
        dispatch(addMessage({
            key: "update-email",
            type: "error",
            content: error.data.message,
        }));
        return false;
    } finally {
        dispatch(hideSpin());
    }
};

export const handlePhoneUpdate = async (
    phone: string,
    dispatch: AppDispatch,
    reloadData: () => void
) => {
    dispatch(showSpin());

    try {
        await apiPut("/profile/update/phone", { phone });
        dispatch(addMessage({
            key: "update-phone",
            type: "success",
            content: "Cập nhật số điện thoại thành công!",
        }));
        reloadData();
        return true;
    } catch {
        dispatch(addMessage({
            key: "update-phone",
            type: "error",
            content: "Cập nhật số điện thoại thất bại!",
        }));
        return false;
    } finally {
        dispatch(hideSpin());
    }
};

export const handleGenderUpdate = async (
    isMale: boolean,
    dispatch: AppDispatch,
    reloadData: () => void
) => {
    dispatch(showSpin());

    try {
        await apiPut("/profile/update/is-male", { isMale });
        dispatch(addMessage({
            key: "update-gender",
            type: "success",
            content: "Cập nhật giới tính thành công!",
        }));
        reloadData();
        return true;
    } catch {
        dispatch(addMessage({
            key: "update-gender",
            type: "error",
            content: "Cập nhật giới tính thất bại!",
        }));
        return false;
    } finally {
        dispatch(hideSpin());
    }
};

export const handleBirthdayUpdate = async (
    birthday: string,
    dispatch: AppDispatch,
    reloadData: () => void
) => {
    dispatch(showSpin());

    try {
        await apiPut("/profile/update/birthday", { birthday: dayjs(birthday).format('YYYY-MM-DD') });
        dispatch(addMessage({
            key: "update-birthday",
            type: "success",
            content: "Cập nhật ngày sinh thành công!",
        }));
        reloadData();
        return true;
    } catch {
        dispatch(addMessage({
            key: "update-birthday",
            type: "error",
            content: "Cập nhật ngày sinh thất bại!",
        }));
        return false;
    } finally {
        dispatch(hideSpin());
    }
};