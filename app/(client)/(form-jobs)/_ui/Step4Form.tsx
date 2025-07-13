// Step4Form.tsx
"use client";

import { apiUpdateJobStep4 } from "@/api/update";
import { RequestForm } from "@/types/requests/form";
import { UploadOutlined, FilePdfOutlined, DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiGet } from "@/api/baseApi";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useStep } from "./ContextStep";
import { hideSpin, showSpin } from "@/store/volatile/spinSlice";
import { addMessage } from "@/store/volatile/messageSlice";

export default function Step4Form() {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [currentDocument, setCurrentDocument] = useState<{ url: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();
  const params = useParams();
  const jobId = Number(params.id);
  const [type, setType] = useState<"save" | "post">("save");
  const dispatch = useDispatch<AppDispatch>();
  const { updateStep, prev, step } = useStep();

  const beforeUpload = (file: File) => {
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('Chỉ chấp nhận file PDF!');
      return Upload.LIST_IGNORE;
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('File phải nhỏ hơn 10MB!');
      return Upload.LIST_IGNORE;
    }

    setFile(file);
    return false;
  };

  useEffect(() => {
    if (!jobId) {
      router.push("/create-jobs");
    } else {
      dispatch(showSpin());
      apiGet(`/jobs-step4/${jobId}`)
        .then((res) => {
          form.setFieldsValue({
            description: (res.data as any).description,
          });

          // Lưu thông tin file cũ nếu có
          if ((res.data as any).document) {
            setCurrentDocument({
              url: (res.data as any).document
            });
          }
        })
        .finally(() => dispatch(hideSpin()));
    }
  }, [step, jobId]);

  // Hàm trích xuất tên file từ URL
  const extractFileNameFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const onFinish = async (values: any) => {
    dispatch(showSpin());

    apiUpdateJobStep4({
      id: jobId,
      data: {
        ...values,
        document: file,
        isPublic: type === "post" ? true : false,
      }
    })
      .then(() => {
        dispatch(addMessage({
          key: "update-job",
          content: type === "post" ? "Đăng thành công" : "Lưu thành công",
          type: "success",
        }))

        if (type === "post") {
          router.push("/profile/job-listings");
        } else {
          updateStep();
        }
      })
      .catch(() => {
        dispatch(addMessage({
          key: "update-job",
          content: "Lưu thất bại",
          type: "error",
        }))
      })
      .finally(() => {
        dispatch(hideSpin());
      })
  };

  // Hiệu ứng khi kéo file vào
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      beforeUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} className="!mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Form.Item
          name="description"
          label={<span className="!text-gray-700 !font-medium !text-lg">Mô tả công việc</span>}
          rules={[
            { required: true, message: "Vui lòng nhập mô tả công việc" },
            { min: 100, message: "Tối thiểu 100 ký tự" },
            { max: 10000, message: "Tối đa 10000 ký tự" },
          ]}
        >
          <Input.TextArea
            rows={16}
            className="!rounded-xl hover:!border-blue-400 focus:!border-blue-500 !shadow-sm !p-4 !text-base transition-all"
            placeholder="Mô tả chi tiết công việc, yêu cầu, kỳ vọng..."
          />
        </Form.Item>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="!mt-10"
      >
        <Form.Item
          label={<span className="!text-gray-700 !font-medium !text-lg">Tài liệu mô tả</span>}
          help={<span className="!text-gray-500">Hỗ trợ file PDF, kích thước tối đa 10MB</span>}
        >
          <div
            className={`!border-2 !border-dashed !rounded-xl !p-6 !text-center !transition-all ${isDragging
              ? '!border-blue-500 !bg-blue-50'
              : file || currentDocument
                ? '!border-green-200 !bg-green-50'
                : '!border-blue-200 hover:!border-blue-400 !bg-blue-50'
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <AnimatePresence>
              {file ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="!flex !flex-col !items-center"
                >
                  <div className="!w-16 !h-16 !bg-green-100 !rounded-full !flex !items-center !justify-center !mb-4">
                    <FilePdfOutlined className="!text-green-600 !text-2xl" />
                  </div>
                  <div className="!font-medium !text-gray-800 !mb-2 !truncate !max-w-full">
                    {file.name}
                  </div>
                  <div className="!text-gray-500 !mb-4">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                  <div className="!text-blue-500 !mb-2 !text-sm">
                    File mới sẽ thay thế file hiện tại
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={handleRemoveFile}
                      className="!bg-red-50 !border-red-100 !text-red-600 hover:!bg-red-100 !flex !items-center"
                    >
                      Xóa file
                    </Button>
                  </motion.div>
                </motion.div>
              ) : currentDocument ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="!flex !flex-col !items-center"
                >
                  <div className="!w-16 !h-16 !bg-blue-100 !rounded-full !flex !items-center !justify-center !mb-4">
                    <FilePdfOutlined className="!text-blue-600 !text-2xl" />
                  </div>
                  {/* <div className="!font-medium !text-grFay-800 !mb-2 !truncate !max-w-full">
                    {currentDocument.name}
                  </div> */}
                  <div className="!text-gray-500 !mb-4">
                    Đã tải lên file
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="!mb-4"
                  >
                    <a
                      href={currentDocument.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!inline-flex !items-center !text-blue-600 hover:!text-blue-800"
                    >
                      <DownloadOutlined className="!mr-2" />
                      Tải xuống
                    </a>
                  </motion.div>
                  <div className="!flex !gap-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          setCurrentDocument(null);
                          setFile(null)
                        }}
                        className="!bg-red-50 !border-red-100 !text-red-600 hover:!bg-red-100 !flex !items-center"
                      >
                        Xóa file
                      </Button>
                    </motion.div>
                    <Upload
                      beforeUpload={beforeUpload}
                      maxCount={1}
                      accept=".pdf"
                      showUploadList={false}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          type="primary"
                          className="!bg-blue-600 hover:!bg-blue-700 !font-medium !rounded-lg !px-4 !h-9 !flex !items-center !shadow-md"
                        >
                          Cập nhật file
                        </Button>
                      </motion.div>
                    </Upload>
                  </div>
                  <p className="!text-gray-500 !mt-4">
                    Kéo thả file mới vào đây hoặc nhấn "Cập nhật file" để thay thế
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="!flex !flex-col !items-center"
                >
                  <div className="!w-16 !h-16 !bg-blue-100 !rounded-full !flex !items-center !justify-center !mb-4">
                    <UploadOutlined className="!text-blue-600 !text-2xl" />
                  </div>
                  <p className="!text-gray-700 !mb-2 !font-medium">
                    Kéo thả file PDF vào đây hoặc
                  </p>
                  <Upload
                    beforeUpload={beforeUpload}
                    maxCount={1}
                    accept=".pdf"
                    showUploadList={false}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="primary"
                        className="!bg-blue-600 hover:!bg-blue-700 !font-medium !rounded-lg !px-6 !h-10 !flex !items-center !shadow-md"
                      >
                        Chọn file
                      </Button>
                    </motion.div>
                  </Upload>
                  <p className="!text-gray-500 !mt-4">
                    Hỗ trợ file PDF, kích thước tối đa 10MB
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Form.Item>
      </motion.div>

      <div className="!flex !justify-between !mt-12 !pt-6 !border-t !border-gray-100">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={prev}
            className="!h-12 !rounded-xl !border-gray-300 hover:!border-blue-400 !text-gray-700 hover:!text-blue-600 !font-medium !px-8 !flex !items-center !justify-center !transition-colors !text-base"
          >
            Quay lại
          </Button>
        </motion.div>
        <div className={"flex justify-end gap-6"}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="default"
              htmlType="submit"
              loading={loading}
              className="!h-12 !rounded-xl !bg-gradient-to-r font-medium !text-base !px-10 !flex !items-center !justify-center !transition-all !shadow-lg hover:!shadow-xl"
              onClick={() => setType("save")}
            >
              <span className="!text-blue-600">Lưu công việc</span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="!h-12 !rounded-xl !bg-gradient-to-r !from-blue-600 !to-indigo-600 hover:!from-blue-700 hover:!to-indigo-700 !font-medium !text-base !px-10 !flex !items-center !justify-center !transition-all !shadow-lg hover:!shadow-xl"
              onClick={() => setType("post")}
            >
              <span className="!text-white">Đăng công việc</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </Form>
  );
}