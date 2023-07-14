import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from 'react-redux';


import Header from "../common/header";
import StaffSidebar from "../staffSidebar";
import 'react-toastify/dist/ReactToastify.css';
import "./index.scss";
import MemberMenuCardCont from "../MemberMenuCardCont";
import { setPerspectiveOrder } from "../../redux/actions";
import { CUST_FIRST_PERSPECTIVES_ORDER_ARRAY, 
        FINANCIAL_FIRST, 
        FIN_FIRST_PERSPECTIVES_ORDER_ARRAY 
    } from "../../utils/constants";

const StaffDashboard = ({ settings, setPerspectiveOrder }) => {

    useEffect(() => {
        let persOrder;
        settings.perspective_order === FINANCIAL_FIRST? persOrder = FIN_FIRST_PERSPECTIVES_ORDER_ARRAY: 
            persOrder = CUST_FIRST_PERSPECTIVES_ORDER_ARRAY
        setPerspectiveOrder([...persOrder]);

    }, [settings]);
       
    return (
        <div className="dashboard">
            <Header />
            <div className="staff_cont">
                <Container fluid className="inner-cont">
                    <Row> 
                        <Col className="sidebar_col" xs sm="3">
                            <StaffSidebar />
                        </Col>
                        <Col className="main_col" xs lg="15">
                            <MemberMenuCardCont />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
};

const mapDispatchToProps = {
    setPerspectiveOrder,
}

const mapStateToProps = ({ adminReducer: { settings }}) => ({
    settings,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (StaffDashboard);
