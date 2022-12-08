import { Card, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import "./index.scss"

const PersonalData =  ({ currentRole }) => {
  console.log(currentRole)
  return (
    <Card className="staff_card personal_data">
      <Card.Header>
        <Card.Title className="title">Personal Data</Card.Title>
      </Card.Header>
        <Row className="content">
          <Col>
              <Row className="top_row">
                <Col className="label">Name</Col>
                <Col>{ currentRole?.user?.first_name } { currentRole?.user?.second_name }</Col>
              </Row>
              <Row>
              <Col className="label">Staff No.</Col>
                <Col>{ currentRole?.staff_no }</Col>
              </Row>
          </Col>     
          <Col>
              <Row className="top_row">
                <Col className="label">Designation</Col>
                <Col>{ currentRole?.name }</Col>
              </Row>
              <Row>
                <Col className="label">Department</Col>
                <Col>{ currentRole?.department?.name }</Col>
            </Row>
          </Col>
        </Row>  
    </Card>
  );
}

const mapStateToProps = ({ authReducer: { currentRole }  }) => ({
  currentRole
});

export default connect(
  mapStateToProps,
) (PersonalData);