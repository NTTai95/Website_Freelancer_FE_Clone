"use client";

import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MilestoneCard from "./MilestoneCard";
import {
  createMilestone,
  deleteMilestone,
  fetchMilestones,
  updateMilestone,
} from "./milestonesAPI";
import { EmloyerMilestones } from "./types";

const { Paragraph, Title } = Typography;
const { TextArea } = Input;

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

export default function CreateJobMilestones() {
  const jobId = 12;
  const freelancerId = 13;

  const searchParams = useSearchParams();
  // const jobId = Number(searchParams.get("jobId"));
  // const freelancerId = Number(searchParams.get("freelancerId") );

  const [stages, setStages] = useState<EmloyerMilestones[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const fetchData = async () => {
    if (!jobId) return;
    try {
      const res = await fetchMilestones(jobId);
      const data = (res as any[]).map((item) => ({
        milestoneId: item.milestoneId,
        content: item.content,
        startAt: item.startAt
          ? dayjs(item.startAt).format("YYYY-MM-DD HH:mm:ss")
          : "",
        endAt: item.endAt
          ? dayjs(item.endAt).format("YYYY-MM-DD HH:mm:ss")
          : "",
        percent: item.percent,
        document: item.document,
        status: item.status,
        disputed: item.disputed ?? false,
        isOverdue: item.isOverdue ?? false,
        amount: item.amount ?? 0,
      }));
      setStages(data);
    } catch (err) {
      message.error("Không thể tải danh sách milestone");
    }
  };

  useEffect(() => {
    if (jobId && freelancerId) {
      fetchData();
    }
  }, [jobId, freelancerId]);

  const handleAdd = () => {
    if (editingIndex !== null) {
      messageApi.warning(
        "Vui lòng hoàn tất hoặc xoá giai đoạn đang nhập trước khi thêm mới."
      );
      return;
    }

    const newStage: EmloyerMilestones = {
      content: "",
      startAt: "",
      endAt: "",
      percent: 0,
      document: "",
      status: "PENDING",
      disputed: false,
      isOverdue: false,
    };
    const nextIndex = stages.length;
    setStages([...stages, newStage]);
    setEditingIndex(nextIndex);
    setSubmitted(false);
    setValidationErrors({});
  };

  const handleChange = <K extends keyof EmloyerMilestones>(
    index: number,
    key: K,
    value: EmloyerMilestones[K]
  ) => {
    const updated = [...stages];
    updated[index][key] = value;
    setStages(updated);

    if (validationErrors[key]) {
      const newErrors = { ...validationErrors };
      delete newErrors[key as string];
      setValidationErrors(newErrors);
    }
  };

  const handleDelete = (index: number) => {
    const stage = stages[index];
    if (!stage.milestoneId) {
      const updated = [...stages];
      updated.splice(index, 1);
      setStages(updated);
      setEditingIndex(null);
      return;
    }
    setDeleteIndex(index);
    setModalVisible(true);
  };

  const getTotalPercent = () =>
    stages.reduce((total, stage, idx) => {
      if (editingIndex === idx) return total;
      return total + stage.percent;
    }, 0);

  const handleUpdate = async (index: number) => {
    setSubmitted(true);
    const stage = stages[index];
    const totalPercent = getTotalPercent();
    const errors: Record<string, string> = {};

    if (!stage.content.trim())
      errors.content = "Vui lòng nhập nội dung công việc";
    if (!stage.startAt) errors.startAt = "Vui lòng chọn ngày bắt đầu";
    if (!stage.endAt) errors.endAt = "Vui lòng chọn ngày kết thúc";
    if (!stage.percent || stage.percent <= 0 || stage.percent > 100) {
      errors.percent = "Tỷ trọng công việc phải từ 1 đến 100";
    } else if (stage.percent + totalPercent > 100) {
      errors.percent = "Tổng tỷ trọng các giai đoạn không được vượt quá 100%";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      setLoading(true);
      const data = {
        content: stage.content.trim(),
        startAt: dayjs(stage.startAt).format("YYYY-MM-DD HH:mm:ss"),
        endAt: dayjs(stage.endAt).format("YYYY-MM-DD HH:mm:ss"),
        percent: stage.percent,
        document: (stage.document || "").trim(),
      };

      if (stage.milestoneId) {
        await updateMilestone(stage.milestoneId, data);
        messageApi.success("Cập nhật giai đoạn công việc thành công!");
      } else {
        console.log("Data gửi lên BE:", data);
        await createMilestone(jobId, freelancerId, data);
        messageApi.success("Tạo giai đoạn công việc thành công!");
        await fetchData();
      }

      setEditingIndex(null);
      setValidationErrors({});
    } catch (error: any) {
      console.error(
        "Lỗi BE trả về:",
        error.response?.data || error.message || error
      );
      messageApi.error("Thao tác thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = ({ amount, orderId }: any) => {
    const paymentUrl = `/mock-vnpay?amount=${amount}&orderId=${orderId}`;
    window.location.href = paymentUrl;
  };

  if (!jobId || !freelancerId) {
    return (
      <Paragraph type="danger">
        Thiếu jobId hoặc freelancerId trên URL
      </Paragraph>
    );
  }

  return (
    <div style={{ paddingBottom: 100, marginTop: 40 }}>
      {contextHolder}
      <Row justify="center">
        <Col xs={24} sm={22} md={18} lg={14}>
          <Card title={<Title level={2}>Tạo Giai Đoạn Công Việc</Title>}>
            {stages.map((stage, index) =>
              editingIndex === index ? (
                <div key={index} style={{ marginBottom: 32 }}>
                  <Title level={4}>Giai đoạn {index + 1}</Title>
                  <Form layout="vertical">
                    <Form.Item
                      label="Nội dung"
                      validateStatus={validationErrors.content ? "error" : ""}
                      help={validationErrors.content}
                    >
                      <TextArea
                        rows={4}
                        maxLength={200}
                        value={stage.content}
                        onChange={(e) =>
                          handleChange(index, "content", e.target.value)
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      label="Ngày bắt đầu"
                      validateStatus={validationErrors.startAt ? "error" : ""}
                      help={validationErrors.startAt}
                    >
                      <DatePicker
                        showTime
                        style={{ width: "100%" }}
                        value={
                          stage.startAt && dayjs(stage.startAt).isValid()
                            ? dayjs(stage.startAt)
                            : null
                        }
                        onChange={(date) =>
                          handleChange(
                            index,
                            "startAt",
                            date?.format("YYYY-MM-DD HH:mm:ss") || ""
                          )
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      label="Ngày kết thúc"
                      validateStatus={validationErrors.endAt ? "error" : ""}
                      help={validationErrors.endAt}
                    >
                      <DatePicker
                        showTime
                        style={{ width: "100%" }}
                        value={
                          stage.endAt && dayjs(stage.endAt).isValid()
                            ? dayjs(stage.endAt)
                            : null
                        }
                        onChange={(date) =>
                          handleChange(
                            index,
                            "endAt",
                            date?.format("YYYY-MM-DD HH:mm:ss") || ""
                          )
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      label="Tỷ trọng công việc (%)"
                      validateStatus={validationErrors.percent ? "error" : ""}
                      help={validationErrors.percent}
                    >
                      <InputNumber
                        min={1}
                        max={100}
                        style={{ width: "100%" }}
                        value={stage.percent}
                        onChange={(value) =>
                          handleChange(index, "percent", value || 0)
                        }
                      />
                    </Form.Item>

                    <Form.Item label="Link tài liệu (tuỳ chọn)">
                      <Input
                        value={stage.document}
                        onChange={(e) =>
                          handleChange(index, "document", e.target.value)
                        }
                      />
                    </Form.Item>

                    <Button
                      type="primary"
                      loading={loading}
                      onClick={() => handleUpdate(index)}
                    >
                      {stage.milestoneId ? "Lưu cập nhật" : "Tạo mới"}
                    </Button>
                    <Button
                      danger
                      style={{ marginLeft: 8 }}
                      onClick={() => handleDelete(index)}
                    >
                      Xoá
                    </Button>
                  </Form>
                </div>
              ) : (
                <MilestoneCard
                  key={index}
                  stage={stage}
                  index={index}
                  onEdit={() => setEditingIndex(index)}
                  onDelete={() => handleDelete(index)}
                  onPay={() =>
                    handlePayment({
                      amount: stage.amount,
                      orderId: stage.milestoneId,
                    })
                  }
                />
              )
            )}
            <Button style={{ marginTop: 16 }} onClick={handleAdd}>
              Thêm giai đoạn
            </Button>
          </Card>
        </Col>
      </Row>

      <Modal
        open={modalVisible}
        title="Bạn có chắc muốn xóa giai đoạn này?"
        onOk={async () => {
          if (deleteIndex === null) return;
          const stage = stages[deleteIndex];
          try {
            if (stage.milestoneId) await deleteMilestone(stage.milestoneId);
            const updated = [...stages];
            updated.splice(deleteIndex, 1);
            setStages(updated);
            setEditingIndex(null);
            messageApi.success("Đã xóa giai đoạn công việc thành công!");
          } catch (err) {
            messageApi.error("Xóa giai đoạn thất bại. Vui lòng thử lại!");
          } finally {
            setModalVisible(false);
            setDeleteIndex(null);
          }
        }}
        onCancel={() => {
          setModalVisible(false);
          setDeleteIndex(null);
        }}
        okText="Xác nhận"
        cancelText="Hủy"
      />
    </div>
  );
}
