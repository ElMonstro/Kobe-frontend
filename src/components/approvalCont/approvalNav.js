import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { CREATE, LINKS, OBJECTIVE, VIEW } from "../../utils/constants";


const ApprovalMapNav = ({ activeComponent }) => {

    const setSelectedClass = activeComponent => {

        let selectedElements = document.getElementsByClassName("selected_mode");
        
        selectedElements[0]? selectedElements[0].className = "": selectedElements=null;
        const newSelectedElement = document.getElementById(activeComponent);
        newSelectedElement.className = "selected_mode";
    }

    useEffect(() => {
        setSelectedClass(activeComponent);
      }, [activeComponent]);

    return (
        <div className="approval_nav">

            <Row className="nav">
                <Col>
                    <Link id={ OBJECTIVE } className="selected_mode" to={ OBJECTIVE }>
                        Objective Update
                    </Link>
                </Col>
                <Col>
                    <Link id={ LINKS } to={ LINKS }>
                        Strategy Map Links
                    </Link>
                </Col>
            </Row>
        </div>
    )
}

const mapDispatchToProps = {
}

const mapStateToProps = ({ authReducer: { user }, adminReducer: { orgChart } }) => ({
    user,
    orgChart: orgChart[0]
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (ApprovalMapNav);
