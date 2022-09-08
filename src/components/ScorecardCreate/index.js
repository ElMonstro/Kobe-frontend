import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap"
import { OVER_VIEW, PERCENTAGE, POST, SCORECARD, UNITS } from "../../utils/constants";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from "react-redux";

import "./index.scss";
import ObjectiveInputs from "./objectiveInputs";
import MeasuresInputs from "./measuresInputs";
import TargetInputs from "./targetsInputs";
import QuaterlyTargetInputs from "./quaterlyTargetsInputs";
import ThresholdsInputs from "./thresholdsInputs";
import BaselineTargetInputs from "./baselineTargetInputs";
import InitiativeInputs from "./initiativesInputs";
import BudgetInputs from "./budgetInput";
import { createObjectPayload } from "../../utils";
import { makeRequest } from "../../utils/requestUtils";
import { createObjectiveURL } from "../../services/urls";


const ScorecardCreate = ({ periods }) => {

    const [activeComponent, setActiveComponent] = useState(SCORECARD);

    const periodPercentage = 100/periods.length;

    const [dataType, setDataType] = useState(PERCENTAGE);

    const [initiatives, setInitiatives] = useState([
        {
            initiativeId: 'initiative-name-1', 
            weightId: 'initiative-weight-1', 
            cascadeId: 'cascade-role-1',
            deleteId: 'delete-1'
        },
    ]);

    const [measures, setMeasures] = useState([
        {
            measureId: 'measure-name-1', 
            weightId: 'measure-weight-1', 
        },
    ]);

    const initialValues = {
        upper_threshold: '',
        lower_threshold: '',
        name: '',
        perspective: '',
        data_type: '',
        quaterly_target: '',
        baseline: '',
        percentage_target: '',
        unit_target: '',
        budget: '',
        }

    const validationSchema = {
        name: Yup.string()
            .required('*Required'),
        perspective: Yup.string()
            .required('*Required'),
        data_type: Yup.string()
            .required('*Required'),
        target: Yup.number(),
        upper_threshold: Yup.number(),
        lower_threshold: Yup.number(),
        budget: Yup.number(),
        baseline: Yup.number(),
        percentage_target: Yup.number(),
        unit_target: Yup.number(),
    }

    periods.map(period => {
        initialValues[period] = '';
        validationSchema[period] = Yup.number().required('*Required');
        return undefined;
    });

    initiatives.map(initiative => {
        initialValues[initiative.initiativeId] = '';
        initialValues[initiative.weightId] = '';
        initialValues[initiative.cascadeId] = '';
        validationSchema[initiative.initiativeId] = Yup.string();
        validationSchema[initiative.weightId] = Yup.number();
        validationSchema[initiative.cascadeId] = Yup.number();
        return undefined;
    })

    measures.map(measure => {
        initialValues[measure.measureId] = '';
        initialValues[measure.weightId] = '';
        validationSchema[measure.measureId] = Yup.string();
        validationSchema[measure.weightId] = Yup.number();
        return undefined;
    })

    validationSchema['measure-name-1'] = Yup.string().required('*Measure name is required');
    validationSchema[initiatives[0].initiativeId] = Yup.string().required('*Initiative is required');
    validationSchema[initiatives[0].cascadeId] = Yup.string().required('*Required');

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: async (values, { setErrors, resetForm }) => {
            const payload = createObjectPayload(values, initiatives, measures, periods);
            
            makeRequest(createObjectiveURL, POST, payload, true)
                .then(data => {
                    console.log(data)
                    
                })
        },
    });
    console.log(formik.errors)
    return (
        <div className="score_card_create">
            <Form onSubmit={ formik.handleSubmit }>
                
                <ObjectiveInputs formik={ formik } />
                <Card className="staff_card">
                    
                    <div className="inputs_cont">
                        
                        <MeasuresInputs 
                            formik={ formik } 
                            measures={ measures } 
                            setMeasures={ setMeasures }
                        />
                        <TargetInputs targetDisabled={ dataType!==PERCENTAGE } setDataType={ setDataType } formik={ formik } />
                        <QuaterlyTargetInputs formik={ formik } />
                        <BaselineTargetInputs targetDisabled={ dataType!==UNITS} formik={ formik } />
                        <ThresholdsInputs formik={ formik } />
                        <BudgetInputs formik={ formik } />
                        <InitiativeInputs 
                            formik={ formik }
                            initiatives={ initiatives }
                            setInitiatives={ setInitiatives }
                        />
                    
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

const mapDispatchToProps = {
}

const mapStateToProps = ({ adminReducer: { periods }, }) => ({
    periods, 
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (ScorecardCreate);
