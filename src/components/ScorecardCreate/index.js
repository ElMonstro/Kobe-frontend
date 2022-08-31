import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap"
import { OVER_VIEW, SCORECARD } from "../../utils/constants";
import { useFormik } from 'formik';

import "./index.scss";
import { yupCascadeCutoffObj } from "../../utils/validators";
import ObjectiveInputs from "./objectiveInputs";
import MeasuresInputs from "./measuresInputs";
import TargetInputs from "./targetsInputs";
import QuaterlyTargetInputs from "./quaterlyTargetsInputs";
import BaselineTargetInputs from "./baselineTargetInputs";
import ThresholdInputs from "./thresholdnputs";
import InitiativeInputs from "./initiativesInputs";
import BudgetInputs from "./budgetInput";

const ScorecardCreate = props => {

    const [activeComponent, setActiveComponent] = useState(SCORECARD);

    const formik = useFormik({
        initialValues: {
        upper_threshold: '',
        lower_threshold: '',
        name: '',
        perspective: '',
        "measure-name-1": '',
        "measure-weight-1": '',
        data_type: '',
        percentage_target: '',
        period: '',
        quaterly_target: '',
        baseline: '',
        target: '',
        budget: '',
        "initiative-name-1": '',
        "initiative-weight-1": '',
        "cascade-role-1": '',
        },
        // validationSchema: yupCascadeCutoffObj,
        onSubmit: async (values) => {
            // makeRequest(settingsURL, POST, values, true);
            console.log(values)
        },
    });
    
    return (
        <div className="score_card_create">
            <Form onSubmit={ formik.handleSubmit }>
                
                <ObjectiveInputs formik={ formik } />
                <Card className="staff_card">
                    
                    <div className="inputs_cont">
                        
                        <MeasuresInputs formik={ formik } />
                        <TargetInputs formik={ formik } />
                        <QuaterlyTargetInputs formik={ formik } />
                        <BaselineTargetInputs formik={ formik } />
                        <ThresholdInputs formik={ formik } />
                        <BudgetInputs formik={ formik } />
                        <InitiativeInputs formik={ formik } />
                    
                    </div>

                </Card>

                <div className="form_btns">
                        <Button className="cancel_btn">Cancel</Button>
                        <Button className="submit_btn" type="">Submit</Button>
                    
                    </div>
            </Form>
        </div>
    )
}

export default ScorecardCreate;
