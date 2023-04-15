import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap"
import { CASCADED, CREATE, EDIT, GET, PATCH, POST, SCORECARD } from "../../utils/constants";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import "./index.scss";
import ObjectiveInputs from "./objectiveInputs";
import MeasuresInputs from "./measuresInputs";
import ThresholdsInputs from "./thresholdsInputs";
import InitiativeInputs from "./initiativesInputs";
import { arePeriodicalInputsValid, createObjectivePayload } from "../../utils";
import { makeRequest } from "../../utils/requestUtils";
import { createObjectiveURL, updateObjectiveURL, amendObjectiveURL } from "../../services/urls";
import { yupObjectiveValidationObj as validationSchema } from "../../utils/validators";
import BudgetInputs from "./budgetInput";


const ScorecardCreate = ({ periods, actingRole }) => {
    const firstInitiative = {
        initiativeId: 'initiative-name-1', 
        weightId: 'initiative-weight-1', 
        cascadeId: 'cascade-role-1',
        deleteId: 'delete-1'
    };
    const [initiative, setInitiative] = useState({});
    const { perspective, name } = initiative;
    const { initiativeId, mode, role } = useParams();
    const navigate = useNavigate();
    const reinitializeForm = mode === EDIT;
    const { setActiveComponent } = useOutletContext();

    useEffect(() => {
        setActiveComponent(CREATE);
        initiativeId && makeRequest(updateObjectiveURL(initiativeId), GET, null, true, false)
            .then(data => {
                data && setInitiative(data);
            });
    }, []);

    const [initiatives, setInitiatives] = useState([
        firstInitiative,
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

    periods.map(period => {
        initialValues[period] = '';
        mode === EDIT? validationSchema[period] = Yup.number(): 
            validationSchema[period] = Yup.number().required('*Required');
        return undefined;
    });

    initiatives.map(initiative => {
        initialValues[initiative.initiativeId] = '';
        initialValues[initiative.weightId] = '';
        initialValues[initiative.cascadeId] = '';
        validationSchema[initiative.initiativeId] = Yup.string();
        validationSchema[initiative.weightId] = Yup.number();
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

    if ( name !== undefined) { // if mode is not create mode
        initialValues.name = initiative.name;
        initialValues.perspective = initiative.perspective;
        initialValues.units_target = initiative.units_target;
        initialValues.percentage_target = initiative.percentage_target;
        initialValues.baseline = initiative.baseline;
        initialValues.data_type = initiative.data_type;
        initialValues.budget = initiative.budget;
        initialValues.evidence_description = initiative.evidence_description;
        initialValues[measures[0].measureId] = initiative?.measures[0]?.name
        initiative.period_targets?.map(period => {
            initialValues[period.period_object.period] = period.target;
            return undefined;
        });

        validationSchema.name = Yup.string();
        validationSchema.perspective = Yup.string();
        validationSchema[initiatives[0].initiativeId] = Yup.string();
        validationSchema[initiatives[0].cascadeId] = Yup.string();
    } else {
        initialValues.evidence_description = '';
        initialValues.budget = '';
    }

    const onSubmit = async (values, { setFieldError, resetForm }) => {
        if (!arePeriodicalInputsValid(values, periods, setFieldError)) {
            return;
        }

        const payload = createObjectivePayload(values, initiatives, measures, periods);

        if (!Boolean(initiativeId)){
            makeRequest(createObjectiveURL, POST, payload, true)
                .then(data => {
                    if (data){ 
                        setInitiatives( [ 
                            {...firstInitiative} 
                        ]);
                        resetForm();
                    }

                });
            
        } else {
            (mode === EDIT || initiative?.is_self_cascaded) && delete payload.initiatives;
            makeRequest(amendObjectiveURL(initiativeId, mode), PATCH, payload, true)
            .then(data=> {
                if (data) {
                    resetForm();
                    navigate(`/${role}/${SCORECARD}/${CASCADED}/`);
                } 
            });   
        }
        
    }

    const formik = useFormik({
        enableReinitialize: reinitializeForm,
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: onSubmit,
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
                        {
                        initiative?.is_self_cascaded && 
                            <BudgetInputs formik={ formik } actingRole={ actingRole } initiative={ initiative } />
                        }
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

const mapStateToProps = ({ adminReducer: { periods, orgChart }, }) => ({
    periods, 
    actingRole: orgChart[0]
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (ScorecardCreate);
