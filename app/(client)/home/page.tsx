"use client";

import Banner from "./_ui/Banner";
import PopularServices from "./_ui/PopularServices";
import ElevateWork from "./_ui/ElevateWork";
import TopCategories from "./_ui/TopCategories";
import TopFreelancers from "./_ui/TopFreelancers";
import ForBusinesses from "./_ui/ForBusinesses";
import ForFreelancers from "./_ui/ForFreelancers";
import { Divider, Space } from "antd";

export default function Home() {
    return (
        <>
            <Banner />

            <Space direction="vertical" size={70} className={"!p-20"}>
                <ElevateWork />
                <PopularServices />
                <TopFreelancers />
            </Space>

            <Space direction="vertical" size={5} className={"bg-gradient-to-br !from-gray-900 !to-gray-800 w-full !px-10"}>
                <ForBusinesses />
                <Divider className="!border-gray-700 !my-10" />
                <ForFreelancers />
            </Space>
        </>
    );
}