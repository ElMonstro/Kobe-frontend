import { Row, Col } from "react-bootstrap";

import './index.scss';


const AdminSidebar = props => {
    return (
        <div className="sidebar">
            <Col>
                <Row>
                    <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                    Organization Structure
                </Row>
                <Row>
                    <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                    Perspectives
                </Row>
                <Row>
                    <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                    Cascade Cut-Off
                </Row>
                <Row>
                    <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                    Organization Structure
                </Row>
                <Row>
                    <div className="blue_rectangle"><div className="inside_blue_rect"></div></div>
                    Review Period
                </Row>
            </Col>
        </div>
    )
}

export default AdminSidebar
