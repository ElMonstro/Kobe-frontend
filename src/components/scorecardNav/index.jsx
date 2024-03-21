import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { APPRAISE, CASCADED, CREATE, UPDATE, VIEW, WEIGHTS } from "../../utils/constants";
import './index.scss';


const ScorecardNavCard = ({ activeComponent, orgChart, settings }) => {

    const setSelectedClass = activeComponent => {

        let selectedElements = document.getElementsByClassName("selected_mode");
        
        selectedElements[0]? selectedElements[0].className = "": selectedElements=null;
        const newSelectedElement = document.getElementById(activeComponent);
        newSelectedElement.className = "selected_mode";
    }

    const { role } = useParams();
    const isOwnScorecard = orgChart?.id?.toString() === role;

    useEffect(() => {
        setSelectedClass(activeComponent);
      }, [activeComponent]);
      
       const showCreate = orgChart?.is_ceo 
        || settings?.behaviorals_enabled
        || orgChart?.tier >  settings?.cascade_cutoff;

    return (
        <div className="scorecard_nav">
            {isOwnScorecard &&
                <Row className="nav">
                    { showCreate && 
                        <Col>
                            <Link id={ CREATE } className="selected_mode" to={ CREATE }>
                                Create
                            </Link>
                        </Col>
                    }
                    <Col >
                        <Link id={ CASCADED } to={ CASCADED }>
                            Cascaded
                        </Link>
                    </Col>
                    <Col>
                        <Link id={ VIEW } to={ VIEW }>
                            View
                        </Link>
                    </Col>
                    <Col>
                        <Link id={ UPDATE } to={ UPDATE }>
                            Update
                        </Link>
                    </Col>
                    { orgChart?.is_ceo && 
                        <Col>
                            <Link id={ WEIGHTS } to={ WEIGHTS }>
                                Weights
                            </Link>
                        </Col>
                    }
                    <Col>
                        <Link id={ APPRAISE } to={ APPRAISE }>
                            Appraise
                        </Link>
                    </Col>
                </Row>
            }
        </div>
    )
}

const mapDispatchToProps = {
}

const mapStateToProps = ({ authReducer: { user }, adminReducer: { orgChart, settings } }) => ({
    user,
    orgChart: orgChart[0],
    settings
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (ScorecardNavCard);
