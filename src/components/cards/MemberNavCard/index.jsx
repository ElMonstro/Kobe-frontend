import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { DASHBOARDS, OVER_VIEW, REPORTS, SCORECARD, STRATEGY_MAP } from "../../../utils/constants";

import './index.scss';


const MemberNavCard = ({ activeComponent, currentRole }) => {

    const setSelectedClass = activeComponent => {
        let selectedElements = document.getElementsByClassName("current");
        selectedElements[0]? selectedElements[0].className = "col": selectedElements=null;
        const newSelectedElement = document.getElementById(activeComponent);
        newSelectedElement.className = "current col";
    }

    const { role } = useParams();

    useEffect(() => {
        setSelectedClass(activeComponent);
      }, [activeComponent]);

    return (
        <div className="member_nav">
            <Row className="title">
                <div className="staff_name">
                    { currentRole?.user?.first_name }&nbsp;{ currentRole?.user?.second_name }
                </div>
            </Row>
            <Row className="nav">
                <Col id={ OVER_VIEW }>
                    <Link to={ `/${role}/${OVER_VIEW}/`}>
                        Overview
                    </Link>
                </Col>
                <Col id={ SCORECARD } className="selected">
                    <Link to={ `/${role}/${SCORECARD}/`}>
                        Scorecard
                    </Link>
                </Col>
                <Col id={ STRATEGY_MAP }>
                    <Link to={ `/${role}/${STRATEGY_MAP}/`}>
                        Strategy Map
                    </Link>
                </Col>
                <Col id={ DASHBOARDS }>
                    <Link to={ `/${role}/${DASHBOARDS}/` }>
                        Dashboards
                    </Link>
                </Col>
                <Col id={ REPORTS }>
                    <Link to={ `/${role}/${REPORTS}/` }>
                        Reports & Trends
                    </Link>
                </Col>
            </Row>
        </div>
    )
}

const mapDispatchToProps = {
}

const mapStateToProps = ({ authReducer: { currentRole } }) => ({
    currentRole,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (MemberNavCard);
