import { useState } from 'react';
import { Modal, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { AppDispatch } from '@/store';
import { handleAvatarUpdate } from '../profileApiHandlers';
import ProfileContext from '../ProfileContext';
import { useContext } from 'react';

export default function AvatarModal({
    visible,
    onCancel,
    dispatch,
    reloadData
}: {
    visible: boolean;
    onCancel: () => void;
    dispatch: AppDispatch;
    reloadData: () => void;
}) {
    const [fileList, setFileList] = useState<any[]>([]);
    const { reloadData: contextReloadData } = useContext(ProfileContext);

    const handleBeforeUpload = (file: any) => {
        setFileList([file]);
        return false;
    };

    const handleUpload = async () => {
        if (fileList.length === 0) return;

        const success = await handleAvatarUpdate(
            fileList[0],
            dispatch,
            reloadData || contextReloadData
        );

        if (success) {
            onCancel();
            setFileList([]);
        }
    };

    return (
        <Modal
            title="Cập nhật ảnh đại diện"
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                >
                    Cập nhật
                </Button>,
            ]}
        >
            <div className="!flex !flex-col !items-center !space-y-4">
                {fileList.length > 0 && (
                    <img
                        src={URL.createObjectURL(fileList[0])}
                        alt="Avatar Preview"
                        className="!w-32 !h-32 !rounded-full !object-cover"
                    />
                )}
                <ImgCrop rotationSlider>
                    <Upload
                        beforeUpload={handleBeforeUpload}
                        fileList={fileList}
                        onRemove={() => setFileList([])}
                        maxCount={1}
                        showUploadList={false}
                        className="!mt-2"
                    >
                        <Button icon={<UploadOutlined />}>Chọn Ảnh</Button>
                    </Upload>
                </ImgCrop>
            </div>
        </Modal>
    );
}