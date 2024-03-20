import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import "./index.scss";

const StatusCount = ({ employees }) => {
    const statusCounter = {
        good: 0,
        satisfactory: 0,
        poor: 0
    }
    const [counter, setCounter] = useState(statusCounter);

    useEffect(()=> {
        for (const employee of employees) {
            statusCounter[employee.performance] += 1; 
            
        }
        setCounter({...statusCounter})
    }, [employees])
    


    return <Row className="overall_count">
        {Object.keys(counter).map(status => {
            return <Col key={ status } className="status_count">
                <div className={`${status} status_cont`}>
                    {employees.length && counter[status] / employees.length * 100}%
                    <span className="small_text"> of employees ({counter[status]})</span>
                </div>
            </Col>;
        })}
    </Row>;
}

export default StatusCount;
