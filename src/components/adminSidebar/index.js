import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import './index.scss';


const AdminSidebar = props => {
    return (
        <div className="sidebar">
            <Col>
                <Row tabIndex={0}>
                    <Link to="/admin">
                    <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                    Organization Structure
                    </Link>
                </Row>
                <Row tabIndex={0}>
                    <Link to="/admin/perspectives">
                        <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                        Perspectives
                    </Link>
                </Row>
                <Row tabIndex={0}>
                    <Link to="/admin/cascade">
                        <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                        Cascade Cut-Off
                    </Link>
                </Row>
                <Row tabIndex={0}>
                    <Link to="/admin/review-period">
                        <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                        Review Period
                    </Link>
                </Row>
            </Col>
        </div>
    )
}

export default AdminSidebar
