import React from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

import thumbnail from "../../assets/josh_logo.jpg";
import { base_cloudinary_url } from "../../services/baseURL";
import OpenCloseIcon from "../common/openCloseIcon";
import "./index.scss";

const ViewInitiative = ({name, weight, percentage_target, measures, percentage_score, status, role }) => {

    const measure_name = measures[0]?.name
    const profileUrl = base_cloudinary_url + role?.profile_pic
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
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    <Tooltip id="role_name">
                                        { role?.user?.first_name + " " + role?.user?.second_name  }
                                    </Tooltip>
                                }
                            > 
                            <span>
                                <img className="thumbnail" src={ role.profile_pic? profileUrl: thumbnail } alt="profile pic"/>
                            </span>
                            </OverlayTrigger>                                     
                        </Col>
                        <Col></Col>
                    </Row>
                </Col>
                <Col className="second_half">
                    <Row>
                        <Col></Col>
                        <Col className="measure">{ measure_name }</Col>
                        <Col className="weight">{ weight }</Col>
                        <Col>{ percentage_target }</Col>
                        <Col className={ `score ${status}_color` }>{ percentage_score }</Col>
                    </Row>
                </Col>
            </Row>
        </Row>
    )
}

export default ViewInitiative;
