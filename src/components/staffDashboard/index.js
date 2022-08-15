import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from 'react-redux';


import Header from "../common/header";
import StaffSidebar from "../staffSidebar";


import 'react-toastify/dist/ReactToastify.css';
import "./index.scss";

const StaffDashboard = props => {

    
    useEffect(() => {
    
      }, []);
       
    return (
        <div>
            <Header />
            <div className="staff_cont">
                <Container fluid className="inner-cont">
                    <Row> 
                        <Col xs lg="3">
                            <StaffSidebar />
                        </Col>
                        <Col xs lg="15">
                            
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
