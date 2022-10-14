import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { DASHBOARDS, OVER_VIEW, REPORTS, SCORECARD, STRATEGY_MAP } from "../../../utils/constants";
import './index.scss';


const MemberNavCard = ({ activeComponent, user }) => {

    const setSelectedClass = activeComponent => {
        let selectedElements = document.getElementsByClassName("selected");
        selectedElements[0]? selectedElements[0].className = "": selectedElements=null;
        const newSelectedElement = document.getElementById(activeComponent);
        newSelectedElement.className = "selected col";
    }

    const { role } = useParams();

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

const mapStateToProps = ({ authReducer: { user } }) => ({
    user
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (MemberNavCard);
