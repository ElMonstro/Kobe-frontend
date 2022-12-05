import { Card, Col, Row } from 'react-bootstrap';

import "./index.scss"

const ChildObjects =  ({ objects, title }) => {


  return (
    <Card className="staff_card children">
      <Card.Header>
        <Card.Title className="title">{title}</Card.Title>
      </Card.Header>
      
        <Row>
            <Row className="header">
                <Col lg={ 1 }></Col>
                <Col lg={ 6 }>Name</Col>
                <Col>Weight</Col>
                <Col>Score</Col>
            </Row>
            <Row className="children_list">
              {
                  objects?.map(({name, weight, score, status}) => {
                      return <Row className="child">
                                  <Col lg={ 1 }><div className={`${status} status`}></div></Col>
                                  <Col lg={ 6 }>{ name }</Col>
                                  <Col>{ weight }%</Col>
                                  <Col>{ score }%</Col>
                              </Row>
                  })
              }
            </Row>
        </Row>
      
    </Card>
  );
}

export default ChildObjects;
