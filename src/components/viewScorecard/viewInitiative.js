import React from "react";
import { Card, Col, Row } from "react-bootstrap";

import thumbnail from "../../assets/josh_logo.jpg";
import OpenCloseIcon from "../common/openCloseIcon";
import "./index.scss";

const ViewInitiative = ({name, weight, target, score, status }) => {

    return (
        <Row className="initiative">
            <Row>
                <Col className="first_half">
                    <Row className="initiative_row">
                        <Col lg="7">
                            <OpenCloseIcon />
                            <span className="name">{ name }</span>
                        </Col>
                        <Col><span className="type">initiative</span></Col>
                        <Col>
                            <span>
                                <img className="thumbnail" src={ thumbnail } alt="J"/>
                            </span>            
                        </Col>
                        <Col></Col>
                    </Row>
                </Col>
                <Col className="second_half">
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col className="weight">{ weight * 100 }</Col>
                        <Col>{ target * 100 }</Col>
                        <Col>{ score * 100 }</Col>
                        <Col><div className={ `perfomance ${status}`}></div></Col>
                    </Row>
                </Col>
            </Row>
            
        </Row>
    )
}

export default ViewInitiative;
