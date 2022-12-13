import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { filterEmployees } from "../../../utils";
import { NESTED } from "../../../utils/constants";

import "./index.scss";

const FilterTable = ({ employees }) => {   

    const [filteredEmployees, setFilteredEmployees] = useState(employees);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
       const newEmployees = employees.filter(employee => 
            filterEmployees(employee, filters));
       setFilteredEmployees(newEmployees);
    }, [filters, employees])

    return (
        <div className="filter_table">
            <div className="table_header">
                <Row>
                    <Col>
                        <span className="title">Data</span>
                    </Col>
                    <Col>
                        <select name="year" id="year">
                            <option value="volvo">2021</option>
                            <option value="saab">2022</option>
                            <option value="mercedes">2023</option>
                            <option value="audi">2024</option>
                        </select>
                    </Col>
                    <Col>
                        <select name="year" id="year">
                            <option value="volvo">2021</option>
                            <option value="saab">2022</option>
                            <option value="mercedes">2023</option>
                            <option value="audi">2024</option>
                        </select>
                    </Col>
                    <Col>
                        <select name="year" id="year">
                            <option value="volvo">2021</option>
                            <option value="saab">2022</option>
                            <option value="mercedes">2023</option>
                            <option value="audi">2024</option>
                        </select>
                    </Col>
                    <Col>
                        <select name="year" id="year">
                            <option value="volvo">2021</option>
                            <option value="saab">2022</option>
                            <option value="mercedes">2023</option>
                            <option value="audi">2024</option>
                        </select>
                    </Col>

                </Row>
                

            </div>
            <Row className="body">
                <Row className="titles">
                    <Col lg="2">Name</Col>
                    <Col>Division</Col>
                    <Col>Department</Col>
                    <Col>Section</Col>
                    <Col>Score</Col>
                    <Col>Perfomance</Col>
                </Row>
                <Row className="employees">
                    {
                        filteredEmployees.map(employee => {
                            return <Row className="employee">
                                <Col lg="2">{ employee.user.first_name } { employee.user.second_name }</Col>
    
                                <Col>{ employee.division?.name }</Col>
                                <Col>{ employee.department?.name }</Col>
                                <Col>{ employee.section?.name }</Col>
                                <Col>{ employee.score }</Col>
                                <Col>
                                    <div className={`${employee.status} status`}></div> 
                                    { employee.status }
                                </Col>
                            </Row>
                        })
                    }
                </Row>

            </Row>
        </div>        
    );
}

export default FilterTable;
