import React from "react";
import { Anchor, Row, Col, Table, Space } from 'antd';
import Definitions from "./_ui/Definitions";
import Scope from "./_ui/Scope";
import ServiceFees from "./_ui/ServiceFees";
import PaymentProcess from "./_ui/PaymentProcess";
import DisputeResolution from "./_ui/DisputeResolution";
import RightsAndObligations from "./_ui/RightsAndObligations";
import Security from "./_ui/Security";
import AccountTermination from "./_ui/AccountTermination";
import GeneralTerms from "./_ui/GeneralTerms";
import ReputationSystem from "./_ui/ReputationSystem";

const TermsAndPolicy = () => {
    return (
        <Space direction="vertical" size={50}>
            <Definitions />
            <Scope />
            <ServiceFees />
            <PaymentProcess />
            <DisputeResolution />
            <RightsAndObligations />
            <Security />
            <AccountTermination />
            <GeneralTerms />
            <ReputationSystem />
        </Space>
    );
};

export default TermsAndPolicy;