import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import "./index.scss"
import { REPORTS } from '../../utils/constants';

const ReportChildObjects =  ({ objects, title, loadedIn }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    return () => {
      if (loadedIn === REPORTS) {
        return
      }
      navigate(`${title}/${id}`);
    }
  }
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
                  objects?.map(({name, weight, percentage_progress, status, id}) => {
                      return <Row onClick={ handleClick(id) } key={ id } className="child">
                                  <Col lg={ 1 }><div className={`${status} status`}></div></Col>
                                  <Col lg={ 6 }>{ name }</Col>
                                  <Col>{ weight }%</Col>
                                  <Col>{ percentage_progress }%</Col>
                              </Row>
                  })
              }
            </Row>
        </Row>
      
    </Card>
  );
}

export default ReportChildObjects;
