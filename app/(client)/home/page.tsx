"use client";

import Banner from "./_ui/Banner";
import PopularServices from "./_ui/PopularServices";
import ElevateWork from "./_ui/ElevateWork";
import TopCategories from "./_ui/TopCategories";
import TopFreelancers from "./_ui/TopFreelancers";
import ForBusinesses from "./_ui/ForBusinesses";
import ForFreelancers from "./_ui/ForFreelancers";
import { Divider, Space } from "antd";
import { useEffect, useState } from "react";
import { apiGet } from "@/api/baseApi";

export default function Home() {

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        apiGet("website/meta").then((res) => {
            setData(res.data);
        })
    }, [])

    return (
        <>
            <Banner data={data} />

            <Space direction="vertical" size={70} className={"!p-20"}>
                <ElevateWork />
                <PopularServices />
                <TopFreelancers />
            </Space>

            <Space direction="vertical" size={5} className={"bg-gradient-to-br !from-gray-900 !to-gray-800 w-full"} style={{ background: "radial-gradient(ellipse at top, #1a2b5c 0%, #0d1838 100%)" }}>
                <ForBusinesses data={data} />
                <Divider className="!border-gray-700 !my-10" />
                <ForFreelancers data={data} />
            </Space>
        </>
    );
}