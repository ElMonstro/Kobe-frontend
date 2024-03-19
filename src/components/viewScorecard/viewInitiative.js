import React from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

import thumbnail from "../../assets/josh_logo.jpg";
import { BASE_CLOUDINARY_URL } from "../../services/baseURL";
import OpenCloseIcon from "../common/openCloseIcon";
import "./index.scss";

const ViewInitiative = ({
        name, weight, percentage_target, score, 
        data_type, units_target, measures,
        status, role, percentage_progress
    }) => {
    const measure_name = measures[0]?.name
    const profileUrl = BASE_CLOUDINARY_URL + role?.profile_pic
    const score_display_mapper = {
        units: [units_target, ""],
        percentage: [percentage_target, "%"]
    }
    const [target, symbol] = score_display_mapper[data_type];
    weight = parseInt(weight)

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
                        <Col>{ target }{ symbol }</Col>
                        <Col className={ `score ${status}_color` }>{ percentage_progress }</Col>
                    </Row>
                </Col>
            </Row>
        </Row>
    )
}

export default ViewInitiative;
