import { Card } from 'react-bootstrap';
import GaugeChart from 'react-gauge-chart';

import { connect } from "react-redux";
import "./index.scss"

const Speedometer =  ({ arcsLength, percent, id, title, upper_threshold, lower_threshold}) => {

    if (arcsLength === undefined) {
        arcsLength = [lower_threshold/100, upper_threshold/100, 1-upper_threshold/100];
    }

    const style = {
      width: "500px",
    }

  return (
    <Card className="speedometer staff_card">
      <Card.Header>
        <Card.Title className="title">{ title }</Card.Title>
      </Card.Header>
      <GaugeChart 
        id={ id } 
        cornerRadius={ 0 } 
        arcsLength={ arcsLength }
        percent = { percent }
        style={ style }
        hideText
        arcWidth={0.3}
      />
      <span className="percentage">{ percent * 100 } %</span>
    </Card>
  );
}


const mapStateToProps = ({ adminReducer: { settings: { upper_threshold, lower_threshold } } }) => ({
    upper_threshold,
    lower_threshold
  });
  
export default connect(
    mapStateToProps,
  ) (Speedometer);
