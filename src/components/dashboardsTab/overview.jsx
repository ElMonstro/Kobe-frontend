import { Card, Col, Row } from 'react-bootstrap';

import "./index.scss"

const Overview =  ({ objects, title }) => {
    const statusMapper = {
        good: 0,
        satisfactory: 0,
        poor: 0
    };
    objects?.map(object => statusMapper[object.status] += 1);

  return (
    <Card className="staff_card quick_overview">
      <Card.Header>
        <Card.Title className="title">Quick Overview</Card.Title>
      </Card.Header>
      <div className="perspective_no">Number of { title }: {objects?.length}</div>
      
      {
        Object.keys(statusMapper).map(status => {
          return <Row key={ status } className={ `status` }>
              <Col className={`${status}_color`}>{ status }: </Col>
              <Col className="status_value">{ statusMapper[status] }</Col>
          </Row>
        })
      }
      
    </Card>
  );
}


export default Overview;
