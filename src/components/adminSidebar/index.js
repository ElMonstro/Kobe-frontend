import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CASCADE, ORG_STRUCTURE, PERSPECTIVES, REVEIEW_PERIOD } from "../../utils/constants";

import './index.scss';


const AdminSidebar = props => {

    const { activeComponent } = props;

    const setSelectedClass = activeComponent => {
        let selectedElements = document.getElementsByClassName("selected");
        selectedElements[0]? selectedElements[0].className = "": selectedElements=null;
        const newSelectedElement = document.getElementById(activeComponent);
        newSelectedElement.className = "selected";
    }

    useEffect(() => {
        setSelectedClass(activeComponent);
      }, [activeComponent]);

    return (
        <div className="sidebar">
            <Col>
                <Row tabIndex={0}>
                    <Link to="/admin" id={ ORG_STRUCTURE }>
                    <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                    Organization Structure
                    </Link>
                </Row>
                <Row tabIndex={0}>
                    <Link to="/admin/perspectives" id={ PERSPECTIVES }>
                        <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                        Perspectives
                    </Link>
                </Row>
                <Row tabIndex={0}>
                    <Link to="/admin/cascade" id={ CASCADE }>
                        <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                        Cascade Cut-Off
                    </Link>
                </Row>
                <Row tabIndex={0}>
                    <Link to="/admin/review-period" id={ REVEIEW_PERIOD }>
                        <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                        Review Period
                    </Link>
                </Row>
            </Col>
        </div>
    )
}

export default AdminSidebar
