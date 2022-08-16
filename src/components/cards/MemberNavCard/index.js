import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { DASHBOARDS, OVER_VIEW, REPORTS, SCORECARD, STRATEGY_MAP } from "../../../utils/constants";
import './index.scss';


const MemberNavCard = ({ activeComponent, user }) => {

    const setSelectedClass = activeComponent => {
        let selectedElements = document.getElementsByClassName("selected");
        selectedElements[0]? selectedElements[0].className = "": selectedElements=null;
        const newSelectedElement = document.getElementById(activeComponent);
        newSelectedElement.className = "selected col";
    }

    useEffect(() => {
        setSelectedClass(activeComponent);
      }, [activeComponent]);

    return (
        <div className="member_nav">
            <Row className="title">
                <div className="staff_name">
                    { user?.first_name }  { user?.second_name }
                </div>
            </Row>
            <Row className="nav">
                <Col id={ OVER_VIEW }>
                    <Link to="/overview">
                        Overview
                    </Link>
                </Col>
                <Col id={ SCORECARD } className="selected">
                    <Link to="/scorecard">
                        Scorecard
                    </Link>
                </Col>
                <Col id={ STRATEGY_MAP }>
                    <Link to="/strategy-map">
                        Strategy Map
                    </Link>
                </Col>
                <Col id={ DASHBOARDS }>
                    <Link to="/dashboards">
                        Dashboards
                    </Link>
                </Col>
                <Col id={ REPORTS }>
                    <Link to="/reports">
                        Reports & Trends
                    </Link>
                </Col>
            </Row>
        </div>
    )
}

const mapDispatchToProps = {
}

const mapStateToProps = ({ authReducer: { user } }) => ({
    user
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (MemberNavCard);
