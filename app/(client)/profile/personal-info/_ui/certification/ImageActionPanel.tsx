import { Image, Button, message } from 'antd';
import { SwapOutlined, CloseOutlined, PlusOutlined, EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import { useState, useRef } from 'react';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/store/volatile/messageSlice';

interface ImageActionProps {
    imageUrl?: string;
    onRemove: () => void;
    onChange: (file: File) => void;
    label: string;
}

const ImageActionPanel = ({ imageUrl, onRemove, onChange, label }: ImageActionProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate image
        if (!file.type.startsWith('image/')) {
            dispatch(addMessage({ content: 'File phải là hình ảnh!', type: 'error', key: 'image-action-panel' }));
            return;
        }

        if (file.size / 1024 / 1024 > 5) {
            dispatch(addMessage({ content: 'Hình ảnh tối đa 5MB!', type: 'error', key: 'image-action-panel' }));
            return;
        }

        setLoading(true);
        try {
            await onChange(file);
        } finally {
            setLoading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="image-action-panel">
            <div className="font-medium mb-2">{label}</div>

            <div className="relative group border rounded-md p-2">
                {imageUrl ? (
                    <>
                        <Image
                            src={imageUrl}
                            alt={label}
                            width="100%"
                            height={150}
                            style={{ objectFit: 'contain' }}
                            preview={{
                                mask: (
                                    <div className="flex items-center justify-center gap-1">
                                        <EyeOutlined /> Xem trước
                                    </div>
                                ),
                            }}
                        />
                        <div className="absolute inset-0 bg-[#00000099] bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <Button
                                type="primary"
                                icon={<SwapOutlined />}
                                size="small"
                                onClick={triggerFileInput}
                                loading={loading}
                            >
                                Thay đổi
                            </Button>
                            <Button
                                danger
                                icon={<CloseOutlined />}
                                size="small"
                                onClick={onRemove}
                                disabled={loading}
                            >
                                Xóa
                            </Button>
                        </div>
                    </>
                ) : (
                    <div
                        className="w-full h-[150px] border border-dashed rounded flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                        onClick={triggerFileInput}
                    >
                        {loading ? (
                            <>
                                <LoadingOutlined />
                                <div className="mt-2">Đang tải lên...</div>
                            </>
                        ) : (
                            <>
                                <PlusOutlined className="text-2xl" />
                                <div className="mt-2">Tải lên ảnh</div>
                            </>
                        )}
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="!hidden"
            />
        </div>
    );
};

export default ImageActionPanel;