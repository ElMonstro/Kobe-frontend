import React from "react";
import { Card, Col, Row } from "react-bootstrap";

import thumbnail from "../../assets/josh_logo.jpg";
import OpenCloseIcon from "../common/openCloseIcon";
import "./index.scss";

const ViewInitiative = ({name, }) => {


    return (
        <Row className="initiative">
            <Row>
                <Col className="first_half">
                    <Row className="initiative_row">
                        <Col>
                            <OpenCloseIcon />
                            <span className="name">Create new stuff</span>
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
                        <Col className="weight">30%</Col>
                        <Col>50%</Col>
                        <Col>40%</Col>
                        <Col><div className="perfomance satisfactory"></div></Col>
                    </Row>
                </Col>
            </Row>
            
        </Row>
    )
}

export default ViewInitiative;
