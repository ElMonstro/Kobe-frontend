import React from "react";
import { Card, Spinner } from "react-bootstrap";
import { PERSPECTIVE_OBJECT } from "../../utils/constants";
import SignOff from "../common/signOff";

import "./index.scss";
import ViewPerspective from "./viewPerspective";
import ObjectivesHeader from "./viewScorecardHeader";
import PersonalData from "../dashboardsTab/personalData";


class PrintableViewScorecard extends React.Component {

    render() {
        const { spinnerState, perspectives } = this.props;

        return (
            <div className="view_scorecard">
                <div className="print_content_display">
                    <PersonalData />
                </div>
                <ObjectivesHeader />
                
                {
                    spinnerState? <Spinner className="spinner" animation="grow"/>:
                    <Card className="staff_card perspectives">
                        {
                            perspectives.map(perspective => {
                                return <ViewPerspective key={ perspective.id } { ...perspective } />;
                            })
                            
                        }
                    </Card>
                }
                <SignOff />
            </div>
            )
    }
    
}

export default PrintableViewScorecard;
