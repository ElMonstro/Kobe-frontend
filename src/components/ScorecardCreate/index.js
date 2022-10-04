import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap"
import { CASCADED, EDIT, GET, PATCH, PERCENTAGE, POST, SCORECARD, SELF_CASCADED_INIT } from "../../utils/constants";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from "react-redux";
import { isUndefined } from "lodash";
import { useNavigate, useParams } from "react-router-dom";

import "./index.scss";
import ObjectiveInputs from "./objectiveInputs";
import MeasuresInputs from "./measuresInputs";
import ThresholdsInputs from "./thresholdsInputs";
import InitiativeInputs from "./initiativesInputs";
import { createObjectPayload } from "../../utils";
import { makeRequest } from "../../utils/requestUtils";
import { createObjectiveURL, updateObjectiveURL, createObjectiveFromInitURL, editObjectiveURL } from "../../services/urls";


const ScorecardCreate = ({ periods }) => {

    const [initiative, setInitiative] = useState({});
    const { perspective, name, type, data_type } = initiative;
    const { initiativeId, mode } = useParams();
    const navigate = useNavigate();
    const reinitializeForm = mode === EDIT;

    useEffect(() => {
        initiativeId && makeRequest(updateObjectiveURL(initiativeId), GET, null, true, false)
            .then(data => {
                data && setInitiative(data);
            })
    }, [])

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
        units_target: '',
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
        percentage_target: Yup.number().max(100).min(0),
        unit_target: Yup.number(),
    }

    periods.map(period => {
        initialValues[period] = '';
        mode===EDIT? validationSchema[period] = Yup.number().max(100).min(0): validationSchema[period] = Yup.number().max(100).min(0).required('*Required');
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

    validationSchema[measures[0].measureId] = Yup.string().required('*Measure name is required');
    validationSchema[initiatives[0].initiativeId] = Yup.string().required('*Initiative is required');
    validationSchema[initiatives[0].cascadeId] = Yup.string().required('*Required');

    if (mode === "edit") {
        validationSchema[measures[0].measureId] = Yup.string();
        validationSchema[initiatives[0].initiativeId] = Yup.string();
        validationSchema[initiatives[0].cascadeId] = Yup.string();
        validationSchema.data_type = Yup.string();
    }

    if ( !isUndefined(name)) {
        initialValues.name = initiative.name;
        initialValues.perspective = initiative.perspective;
        initialValues.units_target = initiative.target;
        initialValues.baseline = initiative.baseline;
        initialValues.data_type = initiative.data_type;
        initialValues[measures[0].measureId] = initiative?.measures[0]?.name
        if (initiative.data_type === PERCENTAGE) initialValues.percentage_target = initiative.target * 100;
        initiative.period_targets?.map(period => {
            initialValues[period.period] = period.target * 100;
            return undefined;
        });

        validationSchema.name = Yup.string();
        validationSchema.perspective = Yup.string();
        validationSchema[initiatives[0].initiativeId] = Yup.string();
        validationSchema[initiatives[0].cascadeId] = Yup.string();
    }


    const formik = useFormik({
        enableReinitialize: reinitializeForm,
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: async (values, { setErrors, resetForm }) => {
            const payload = createObjectPayload(values, initiatives, measures, periods);
            values.percentage_target = (values.percentage_target/100).toFixed(2);

            if (!Boolean(initiativeId)){
                makeRequest(createObjectiveURL, POST, payload, true)
                    .then(data => {
                        if (data) resetForm();
                    });
                
            } else {
                (type === SELF_CASCADED_INIT || mode === EDIT) && delete payload.initiatives;
                makeRequest(createObjectiveFromInitURL(initiativeId, mode), PATCH, payload, true)
                .then(data=> {
                    if (data) {
                        resetForm();
                        navigate(`/${SCORECARD}/${CASCADED}/`);
                    } 
                });   
            }
            
        },
    });

    return (
        <div className="score_card_create">
            <Form onSubmit={ formik.handleSubmit }>
                
                <ObjectiveInputs 
                    formik={ formik } 
                    initiativeId={ initiativeId }
                    name = { name }
                    perspective = { perspective } 
                    />
                <Card className="staff_card">
                    
                    <div className="inputs_cont">
                        
                        <MeasuresInputs 
                            formik={ formik } 
                            measures={ measures } 
                            setMeasures={ setMeasures }
                            initiative = { initiative }
                        />
                        
                        <ThresholdsInputs formik={ formik } />
                        <InitiativeInputs 
                            formik={ formik }
                            initiatives={ initiatives }
                            initiative={ initiative }
                            setInitiatives={ setInitiatives }
                            mode={ mode }
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
