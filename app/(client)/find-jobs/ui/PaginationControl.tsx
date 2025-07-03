"use client";

import { Pagination } from "antd";

interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export default function PaginationControl({ current, total, onChange }: Props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'end', marginTop: 20 }}>
      <Pagination
        current={current}
        total={total}
        pageSize={15}
        showSizeChanger={false}
        onChange={onChange}
      />
    </div>
  );
}
