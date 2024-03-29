import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CASCADE, ORG_STRUCTURE, PERSPECTIVES, REVEIEW_PERIOD, SEND_EMAILS } from "../../utils/constants";

import './index.scss';
import { useParams } from 'react-router-dom';

const AdminSidebar = props => {

    const { activeComponent } = props;
    const { companyId } = useParams();

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
                <Row>
                    <Link to={`/${companyId}/admin`} id={ ORG_STRUCTURE }>
                    <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                    Organization Structure
                    </Link>
                </Row>
                <Row>
                    <Link to={`/${companyId}/admin/perspectives`} id={ PERSPECTIVES }>
                        <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                        Perspectives
                    </Link>
                </Row>
                <Row>
                    <Link to={`/${companyId}/admin/cascade`} id={ CASCADE }>
                        <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                        Cascade Cut-Off
                    </Link>
                </Row>
                <Row>
                    <Link to={`/${companyId}/admin/review-period`} id={ REVEIEW_PERIOD }>
                        <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                        Review Period/Appraisal
                    </Link>
                </Row>
                <Row>
                    <Link to={`/${companyId}/admin/send-emails`} id={ SEND_EMAILS }>
                        <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                        Send Emails
                    </Link>
                </Row>
            
            </Col>
            <div className="sidebar_footer">
                
            </div>
        </div>
    )
}

export default AdminSidebar
