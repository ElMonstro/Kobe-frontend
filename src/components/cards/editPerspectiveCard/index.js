import React from "react";
import { Card } from "react-bootstrap";

import { PERSPECTIVE_OBJECT } from "../../../utils/constants";
import EmbededInput from "../../embeddedInput";
import "./index.scss";


const EditPerspectivesCard = props => {
   const {setSettings, settings: { behaviorals_enabled } } = props;

    return (
        <Card className="admin_card edit_perpectives" id="edit_perspective">
            <div className="card_title">Edit Perspectives</div>
               {
                  Object.keys(PERSPECTIVE_OBJECT).map(key => {
                     if (key==="behavioral_name" && !behaviorals_enabled) {
                        return <></>;
                     }
                     return <EmbededInput setSettings={ setSettings } defaultValue={ PERSPECTIVE_OBJECT[key]} key={ key } initialValueKey={ key }/>
                  })
               }
        </Card>
        
    );
};


export default EditPerspectivesCard;
