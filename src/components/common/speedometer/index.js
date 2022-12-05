import { Card } from 'react-bootstrap';
import GaugeChart from 'react-gauge-chart';

import { connect } from "react-redux";
import "./index.scss";

const Speedometer =  ({ arcsLength, percent, id, title, description, upper_threshold, lower_threshold}) => {

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
        colors={["#F21212", "#FFA800", "#16C046" ]}
        className="gauge_chart"
      />
      <div className="percentage">{ percent * 100 }%</div>
      <div className="description">{ description }</div>
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
