import { Card, Col, Row } from 'react-bootstrap';

import "./index.scss"

const Overview =  ({ objects, mode }) => {
    const statusMapper = {
        good: 0,
        satisfactory: 0,
        poor: 0
    }

    for (const perspective of objects) {
      statusMapper[perspective.status] += 1;
  } 

  return (
    <Card className="staff_card quick_overview">
      <Card.Header>
        <Card.Title className="title">Quick Overview</Card.Title>
      </Card.Header>
      <div className="perspective_no">Number of {mode}: {objects.length}</div>
      
      {
        Object.keys(statusMapper).map(status => {
          return <Row className={`status`}>
              <Col className={`${status}_color`}>{ status }: </Col>
              <Col className="status_value">{ statusMapper[status] }</Col>
          </Row>
        })
      }
      
    </Card>
  );
}


export default Overview;
