import React from "react";
import { Card } from "react-bootstrap";

import EmbededInput from "../../embeddedInput";

const EditPerspectivesWeightCard = ({ setSettings, settings }) => {

   const defaultValueMapper =  {}
   defaultValueMapper.financial_weight = settings.financial_weight;
   defaultValueMapper.customer_weight = settings.customer_weight;
   defaultValueMapper.internal_processes_weight = settings.internal_processes_weight;
   defaultValueMapper.learning_growth_weight = settings.learning_growth_weight;
   defaultValueMapper.behavioral_weight = settings.behavioral_weight;

    return (
        <Card className="admin_card edit_perpectives" id="edit_perspective">
            <div className="card_title">Edit Perspective Weights</div>
               {
                  Object.keys(defaultValueMapper).map(key => {
                     if (key==="behavioral_weight" && !settings.behaviorals_enabled) {
                        return <></>;
                     }
                     return <EmbededInput setSettings={ setSettings } defaultValue={ defaultValueMapper[key]} key={ key } initialValueKey={ key }/>
                  })
               }
        </Card>
        
    );
};


export default EditPerspectivesWeightCard;
