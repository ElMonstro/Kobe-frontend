import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { CASCADED, CREATE, UPDATE, VIEW } from "../../utils/constants";
import './index.scss';


const ScorecardNavCard = ({ activeComponent, setActiveComponent, orgChart }) => {

    const setSelectedClass = activeComponent => {

        let selectedElements = document.getElementsByClassName("selected_mode");
        
        selectedElements[0]? selectedElements[0].className = "": selectedElements=null;
        const newSelectedElement = document.getElementById(activeComponent);
        newSelectedElement.className = "selected_mode";
    }

    const { role } = useParams();
    const isOwnScorecard = orgChart?.id?.toString() === role;

    const [noneViewClassNames, setNoneViewClassNames] = useState("col");

    let classNames;
    isOwnScorecard? classNames = "": classNames="hidden";
    
    useEffect(() => {
        setNoneViewClassNames(classNames);
      }, [classNames]);

    useEffect(() => {
        setSelectedClass(activeComponent);
      }, [activeComponent]);

    return (
        <div className="scorecard_nav">

            <Row className="nav">
                <Col className={ noneViewClassNames }>
                    <Link id={ CREATE } className="selected_mode" to={ CREATE }>
                        Create
                    </Link>
                </Col>
                <Col className={ noneViewClassNames }>
                    <Link id={ CASCADED } to={ CASCADED }>
                        Cascaded
                    </Link>
                </Col>
                <Col className={ noneViewClassNames }>
                    <Link id={ VIEW } to={ VIEW }>
                        View
                    </Link>
                </Col>
                <Col className={ noneViewClassNames }>
                    <Link id={ UPDATE } to={ UPDATE }>
                        Update
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
) (ScorecardNavCard);
