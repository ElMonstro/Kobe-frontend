import { Col, Row } from "react-bootstrap";

const StatusCount = ({ employees }) => {
    const statusCounter = {
        good: 0,
        satisfactory: 0,
        poor: 0
    }

    for (const employee of employees) {
        if (employee.status) {
            statusCounter[employee.status] += 1;
        }
    }
    console.log(statusCounter)

    return <Row className="overall_count">
        {Object.keys(statusCounter).map(status => {
            return <Col key={ status } className="status_count">
                <div className={`${status} status_cont`}>
                    {employees.length && statusCounter[status] / employees.length * 100}%
                    <span className="small_text"> of employees ({statusCounter[status]})</span>
                </div>
            </Col>;
        })}
    </Row>;
}

export default StatusCount;
