import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { filterEmployees, getDivisionsFromEmployees } from "../../../utils";
import { NESTED, NORMAL } from "../../../utils/constants";

import "./index.scss";

const FilterTable = ({ employees, divisions_enabled, departments_enabled, sections_enabled }) => {   

    const [filteredEmployees, setFilteredEmployees] = useState(employees);
    const [filters, setFilters] = useState({});
    const [departments, setDepartments] = useState({});
    const [divisions, setDivisions] = useState({});
    const [sections, setSections] = useState({});
    
    useEffect(() => {
        divisions_enabled && setDivisions(getDivisionsFromEmployees(employees, "divisions"));
        departments_enabled && setDepartments(getDivisionsFromEmployees(employees, "departments"));
        sections_enabled && setSections(getDivisionsFromEmployees(employees, "sections"));
    }, [employees]);

    useEffect(() => {
       const newEmployees = employees.filter(employee => 
            filterEmployees(employee, filters));
       setFilteredEmployees(newEmployees);
    }, [filters, employees]);

    const handleInputChange = e => {
        let type;
        e.target.id === "performance"? type = NORMAL: type = NESTED;
        const voidValues = ["Performance", "Divisions", "Departments", "sections"]
        let {value} = e.target;

        if (voidValues.includes(value)) {
            delete filters[e.target.id];
            setFilters({...filters});
            return;
        }

        const filter = {}
        filter[e.target.id] = {
            type,
            value: e.target.value
        }
        setFilters({...filters, ...filter});

    }

    return (
        <div className="filter_table">
            <div className="table_header">
                <Row>
                    <Col lg="3">
                        <span className="title">Filter</span>
                    </Col>
                    <Col>
                        { divisions_enabled &&
                        <select name="divisions" id="division" onChange = { handleInputChange }>
                            <option>Division</option>
                            {
                                Object.keys(divisions).map(key => <option key={ key } value={ key }>{ divisions[key].name }</option>)
                            }
                        </select>
                        }
                    </Col>
                    <Col>
                        { departments_enabled &&
                        <select name="departments" id="department" onChange = { handleInputChange }>
                            <option>Department</option>
                            {
                                Object.keys(departments).map(key => <option key={ key }  value={ key }>{ departments[key].name }</option>)
                            }
                        </select>
                        }
                    </Col>
                    <Col>
                       {  sections_enabled &&
                       <select name="sections" id="section" onChange = { handleInputChange }>
                            <option>Section</option>
                            {
                                Object.keys(sections).map(key => <option key={ key }  value={ key }>{ sections[key].name }</option>)
                            }
                        </select>}
                    </Col>
                    <Col>
                        <select name="performance" id="performance" onChange = { handleInputChange }>
                            <option>Performance</option>
                            <option value="good">Good</option>
                            <option value="satisfactory">Satisfactory</option>
                            <option value="poor">Poor</option>
                        </select>
                    </Col>

                </Row>
                

            </div>
            <Row className="body">
                <Row className="titles">
                    <Col lg="3">Name</Col>
                    <Col>Division</Col>
                    <Col>Department</Col>
                    <Col>Section</Col>
                    <Col>Score</Col>
                    <Col>Perfomance</Col>
                </Row>
                <Row className="employees">
                    {
                        filteredEmployees.map(employee => {
                            return <Row key={employee?.id} className="employee">
                                <Col lg="3">{ employee.user.first_name } { employee.user.second_name }</Col>
    
                                <Col>{ employee.division?.name }</Col>
                                <Col>{ employee.department?.name }</Col>
                                <Col>{ employee.section?.name }</Col>
                                <Col>{ employee.score }</Col>
                                <Col>
                                    <div className={`${employee.performance} status`}></div> 
                                    <span>{ employee.performance }</span>
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
