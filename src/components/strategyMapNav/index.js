import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { CREATE, VIEW } from "../../utils/constants";
import './index.scss';


const StrategyMapNavCard = ({ activeComponent, setActiveComponent, orgChart }) => {

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

    const handleClick = e => {
        setActiveComponent(e.target.id);
    }

    useEffect(() => {
        setSelectedClass(activeComponent);
      }, [activeComponent]);

    return (
        <div className="strategy_map_nav">

            <Row className="nav">
                <Col className={ noneViewClassNames }>
                    <Link id={ CREATE } onClick={ handleClick } className="selected_mode" to={ CREATE }>
                        Create
                    </Link>
                </Col>
                <Col className={ noneViewClassNames }>
                    <Link id={ VIEW } onClick={ handleClick } to={ VIEW }>
                        View
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
) (StrategyMapNavCard);
