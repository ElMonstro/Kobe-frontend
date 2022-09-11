import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { CASCADED, CREATE, UPDATE, VIEW } from "../../utils/constants";
import './index.scss';


const ScorecardNavCard = ({ activeComponent, setActiveComponent, user }) => {

    const setSelectedClass = activeComponent => {

        let selectedElements = document.getElementsByClassName("selected");
        // selectedElements[0]? selectedElements[0].className = "": selectedElements=null;
        // const newSelectedElement = document.getElementById(activeComponent);
        // newSelectedElement.className = "selected col";
    }

    const handleClick = e => {
        console.log(e.target.id)
        setActiveComponent(e.target.id);
    }

    useEffect(() => {
        setSelectedClass(activeComponent);
      }, [activeComponent]);

    return (
        <div className="scorecard_nav">

            <Row className="nav">
                <Col>
                    <Link id={ CREATE } onClick={ handleClick } className="selected" to={ CREATE }>
                        Create
                    </Link>
                </Col>
                <Col>
                    <Link id={ CASCADED } onClick={ handleClick } to={ CASCADED }>
                        Cascaded
                    </Link>
                </Col>
                <Col>
                    <Link id={ VIEW } onClick={ handleClick } to={ VIEW }>
                        View
                    </Link>
                </Col>
                <Col>
                    <Link id={ UPDATE } onClick={ handleClick } to={ UPDATE }>
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
