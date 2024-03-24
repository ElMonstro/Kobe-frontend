import React from "react";
import { Button } from "react-bootstrap";


const SurveyLanding = ({ setStartSurvey }) => {

    return (
        <div className="survey_landing">
            <p>
                Hello!! Its Survey Day! Please find a private space to do a survey. The survey is anonymous.
                Your opinion is important!
            </p>
            <Button className="start_btn" type="primary" onClick={() => setStartSurvey(true)}>Start Survey</Button>
        </div>
    )
}

export default SurveyLanding; 
