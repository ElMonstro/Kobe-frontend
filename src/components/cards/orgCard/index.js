import React from "react";
import { Card } from "react-bootstrap";
import Tree from "../../common/Tree/Tree";
import { Col, Row } from "react-bootstrap";


import "./index.scss";

const handleClick = (node) => {
    console.log(node);
  };

const structure = [{
    "id": 23,
    "user": {
        "first_name": "Joshua ",
        "second_name": "Moracha",
        "email": "jm@gmail.com",
        "id": 154,
        "temp_password": "OHIKO4AC"
    },
    "underlings": [
        {
            "id": 24,
            "user": {
                "first_name": "Clinton ",
                "second_name": "Bikonde",
                "email": "joshmoracha@gmail.com",
                "id": 155,
                "temp_password": "FUCPEQKT"
            },
            "underlings": [
                {
                    "id": 25,
                    "user": {
                        "first_name": "Cliff",
                        "second_name": "Makori",
                        "email": "em@gmail.com",
                        "id": 156,
                        "temp_password": "HO62UACX"
                    },
                    "underlings": [
                        {
                            "id": 29,
                            "user": {
                                "first_name": "Newbon",
                                "second_name": "gadson",
                                "email": "newbon.gadson@gmail.com",
                                "id": 160,
                                "temp_password": "76Y7PV3U"
                            },
                            "underlings": [
                                {
                                    "id": 26,
                                    "user": {
                                        "first_name": "Cruel",
                                        "second_name": "Savage",
                                        "email": "create@gmail.com",
                                        "id": 157,
                                        "temp_password": "2OJL7D2Y"
                                    },
                                    "underlings": [],
                                    "name": "Member",
                                    "description": null,
                                    "reporting_to": 29,
                                    "division": null,
                                    "department": 25,
                                    "section": 30
                                }
                            ],
                            "name": "Head of Section",
                            "description": null,
                            "reporting_to": 25,
                            "division": null,
                            "department": 25,
                            "section": 29
                        }
                    ],
                    "name": "Head of Department",
                    "description": null,
                    "reporting_to": 24,
                    "division": null,
                    "department": 25,
                    "section": null
                },
                {
                    "id": 27,
                    "user": {
                        "first_name": "Master",
                        "second_name": "Chief",
                        "email": "dancan@gmail.com",
                        "id": 158,
                        "temp_password": "UGM23CK1"
                    },
                    "underlings": [
                        {
                            "id": 30,
                            "user": {
                                "first_name": "Fred",
                                "second_name": "Manyalla",
                                "email": "fred.manyallah@iscs.co.ke",
                                "id": 161,
                                "temp_password": "YP6A6N63"
                            },
                            "underlings": [
                                {
                                    "id": 28,
                                    "user": {
                                        "first_name": "Rael",
                                        "second_name": "Mork",
                                        "email": "kirk@gmail.com",
                                        "id": 159,
                                        "temp_password": "AAEYDPYT"
                                    },
                                    "underlings": [],
                                    "name": "Member",
                                    "description": null,
                                    "reporting_to": 30,
                                    "division": null,
                                    "department": 26,
                                    "section": 32
                                }
                            ],
                            "name": "Head of Section",
                            "description": null,
                            "reporting_to": 27,
                            "division": null,
                            "department": 26,
                            "section": 32
                        }
                    ],
                    "name": "Head of Department",
                    "description": null,
                    "reporting_to": 24,
                    "division": null,
                    "department": 26,
                    "section": null
                }
            ],
            "name": "Head of Division",
            "description": null,
            "reporting_to": 23,
            "division": 25,
            "department": null,
            "section": null
        }
    ],
    "name": "Chief Executive Officer",
    "description": null,
    "reporting_to": null,
    "division": null,
    "department": null,
    "section": null
},]

const OrgChartCard = props => {
    return (
      <div className="org_chart_cont">
        <div className="card_title org_chart_title">Organization Chart Preview</div>

        <Card className="titles_card">
          <Row>
          <Col className="name_title">
              Name
          </Col>
            <Col className="employee_titles">
              <Row>
                <Col className="employee_title"><span>Designation</span></Col>
                <Col className="employee_title"><span>Job Group</span></Col>
                <Col className="employee_title"><span>Staff Number</span></Col>
                <Col className="employee_title"><span>Department</span></Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card className="admin_card org_chart_card">

            <div>
            <Tree data={structure} onNodeClick={handleClick} />
            </div>
        </Card>
      </div>
    )
};

export default OrgChartCard;
