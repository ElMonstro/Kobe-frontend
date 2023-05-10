import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from 'react-redux';


import Header from "../common/header";
import StaffSidebar from "../staffSidebar";


import 'react-toastify/dist/ReactToastify.css';
import "./index.scss";
import MemberMenuCardCont from "../MemberMenuCardCont";

const StaffDashboard = props => {
       
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
                            <MemberMenuCardCont { ...props } />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
};

const mapDispatchToProps = {
}

const mapStateToProps = ({ adminReducer, authReducer }) => ({
    ...adminReducer,
    ...authReducer
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (StaffDashboard);
