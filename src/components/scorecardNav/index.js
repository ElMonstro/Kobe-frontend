import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { CASCADED, CREATE, UPDATE, VIEW } from "../../utils/constants";
import './index.scss';


const ScorecardNavCard = ({ activeComponent, user }) => {

    const setSelectedClass = activeComponent => {

        let selectedElements = document.getElementsByClassName("selected");
        // selectedElements[0]? selectedElements[0].className = "": selectedElements=null;
        // const newSelectedElement = document.getElementById(activeComponent);
        // newSelectedElement.className = "selected col";
    }

    useEffect(() => {
        setSelectedClass(activeComponent);
      }, [activeComponent]);

    return (
        <div className="scorecard_nav">

            <Row className="nav">
                <Col>
                    <Link id={ CREATE } className="selected" to="/overview">
                        Create
                    </Link>
                </Col>
                <Col>
                    <Link id={ CASCADED } to="/scorecard">
                        Cascaded
                    </Link>
                </Col>
                <Col>
                    <Link id={ VIEW } to="/strategy-map">
                        View
                    </Link>
                </Col>
                <Col>
                    <Link id={ UPDATE } to="/dashboards">
                        Update
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
) (ScorecardNavCard);
