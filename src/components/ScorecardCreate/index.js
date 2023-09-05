import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap"
import { CASCADED, CREATE, EDIT, ERROR, GET, PATCH, PERCENTAGE, POST, SCORECARD } from "../../utils/constants";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from "react-redux";
import { useNavigate, useOutletContext, useParams, Prompt } from "react-router-dom";

import "./index.scss";
import ObjectiveInputs from "./objectiveInputs";
import MeasuresInputs from "./measures/measuresInputs";
import ThresholdsInputs from "./thresholdsInputs";
import InitiativeInputs from "./initiatives/initiativesInputs";
import { arePeriodicalInputsValid, createObjectivePayload, fireNotification } from "../../utils";
import { makeRequest } from "../../utils/requestUtils";
import { createObjectiveURL, updateObjectiveURL, amendObjectiveURL } from "../../services/urls";
import { yupObjectiveValidationObj as validationSchema } from "../../utils/validators";
import BudgetInputs from "./budgetInput";
import Milestones from "./milestones/milestoneInputs";
import { useCallbackPrompt } from "../../hooks/useCallbackPrompt";
import DialogBox from "../common/dialogBox";
import ImpactInputs from "./impactInputs";

const ScorecardCreate = ({ periods, actingRole }) => {
    const firstInitiative = {
        initiativeId: 'initiative-name-1', 
        weightId: 'initiative-weight-1', 
        cascadeId: 'cascade-role-1',
        deleteId: 'delete-1'
    };
    const firstMilestone = {
        milestoneId: `milestone-name-1`,
        percentageId: `milestone-percentage-1`,
        deleteId: `delete-milestone-1`
    };
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
        evidence_description: '',
        budget: ''
        }

    const [objective, setObjective] = useState({});
    const { perspective, name, is_self_cascaded, data_type } = objective;
    const { initiativeId, mode, role } = useParams();
    const navigate = useNavigate();
    const [reinitializeForm, setReinitializeForm] = useState(Boolean(mode));
    const { setActiveComponent } = useOutletContext();
    const [showDialog, setShowDialog] = useState(true)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)
    const [initiatives, setInitiatives] = useState([firstInitiative, ]);
    const [milestones, setMilestones] = useState([firstMilestone, ]);
    const [measures, setMeasures] = useState([
        {
            measureId: 'measure-name-1', 
            weightId: 'measure-weight-1', 
        },
    ]);

    useEffect(() => {
        setActiveComponent(CREATE);
        initiativeId && makeRequest(updateObjectiveURL(initiativeId), GET, null, true, false)
            .then(data => {
                if (data) {
                    setObjective(data);
                }
            });
    }, []);


    periods.forEach(period => {
        initialValues[period] = '';
        mode === EDIT? validationSchema[period] = Yup.number(): 
            validationSchema[period] = Yup.number().required('*Required');
    });

    initiatives.forEach(initiative => {
        initialValues[initiative.initiativeId] = '';
        initialValues[initiative.weightId] = '';
        initialValues[initiative.cascadeId] = actingRole?.id;
        validationSchema[initiative.initiativeId] = Yup.string();
        validationSchema[initiative.weightId] = Yup.number();
    })

    measures.forEach(measure => {
        initialValues[measure.measureId] = '';
        initialValues[measure.weightId] = '';
        validationSchema[measure.measureId] = Yup.string();
        validationSchema[measure.weightId] = Yup.number();
    })

    validationSchema[measures[0].measureId] = Yup.string().required('*Measure name is required');
    validationSchema[initiatives[0].initiativeId] = Yup.string().required('*Initiative is required');
    validationSchema[initiatives[0].cascadeId] = Yup.string().required('*Required');

    if (is_self_cascaded && data_type === PERCENTAGE)  {
        milestones.forEach(milestone => {
            initialValues[milestone.milestoneId] = '';
            initialValues[milestone.percentageId] = '';
            validationSchema[milestone.milestoneId] = Yup.string().required('*Required');
            validationSchema[milestone.percentageId] = Yup.number().required('*Required');
        })
    
    }

    if (mode === EDIT || objective?.is_self_cascaded === true) {
        validationSchema[measures[0].measureId] = Yup.string();
        validationSchema[initiatives[0].initiativeId] = Yup.string();
        validationSchema[initiatives[0].cascadeId] = Yup.string();
        validationSchema.data_type = Yup.string();

        milestones.forEach(milestone => {
            initialValues[milestone.milestoneId] = '';
            initialValues[milestone.percentageId] = '';
            validationSchema[milestone.milestoneId] = Yup.string();
            validationSchema[milestone.percentageId] = Yup.number();
        });
    }

    if (Object.keys(objective).length > 0) { // if mode is create or edit
        initialValues.name = objective.name;
        initialValues.perspective = objective.perspective;
        initialValues.units_target = objective.units_target;
        initialValues.percentage_target = objective.percentage_target;
        initialValues.baseline = objective.baseline;
        initialValues.data_type = objective.data_type;
        initialValues.budget = objective.budget;
        initialValues.evidence_description = objective.evidence_description;
        initialValues[measures[0].measureId] = objective?.measures[0]?.name
        initialValues.data_type = objective?.data_type;
        objective.period_targets?.forEach(period => {
            initialValues[period.period_object.period] = period.target;
        });

        validationSchema.name = Yup.string();
        validationSchema.perspective = Yup.string();
        validationSchema.impact_target = Yup.number()
        validationSchema.impact_baseline = Yup.number()
        validationSchema.impact_description = Yup.string().max(100, 'Must be below 100')
    }

    if (!actingRole?.reporting_to && !is_self_cascaded) {
        initialValues.impact_target = ''
        initialValues.impact_baseline = ''
        initialValues.impact_description = ''
        validationSchema.impact_target = Yup.number().required('* Required')
        validationSchema.impact_baseline = Yup.number().required('* Required')
        validationSchema.impact_description = Yup.string().max(100, 'Must be below 100')
                                                          .required('* Required')
    }

    const onSubmit = async (values, { setFieldError, resetForm }) => {
        if (!arePeriodicalInputsValid(values, periods, setFieldError)) {
            return;
        }

        if (!formik.dirty) {
            fireNotification(ERROR, "You must change a field for a valid update")
            return;
        }

        const payload = createObjectivePayload(values, initiatives, measures, periods, milestones);

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
            (is_self_cascaded) && delete payload.initiatives;
            setShowDialog(false);
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

    useEffect(() => {
        setShowDialog(formik.dirty)
    }, [formik.dirty])

    console.log(formik.errors);

    return (
        <>
        <DialogBox
            showDialog={showPrompt}
            confirm={confirmNavigation}
            cancel={cancelNavigation}
            title={'Warning'}
            message={'Navigating away will clear your changes!'}
            prompt={'Are you sure you want to navigate?'}
        />
        <div className="score_card_create">
            <Form onSubmit={ formik.handleSubmit }>
                
                <ObjectiveInputs 
                    formik={ formik } 
                    initiativeId={ initiativeId }
                    name = { name }
                    perspective = { perspective } 
                    is_self_cascaded={ objective.is_self_cascaded }
                    />
                <Card className="staff_card">
                    
                    <div className="inputs_cont">
                        
                        <MeasuresInputs 
                            formik={ formik } 
                            measures={ measures } 
                            setMeasures={ setMeasures }
                            initiative = { objective }
                            setReinitializeForm = { setReinitializeForm }
                        />
                        { (!actingRole?.reporting_to && !is_self_cascaded) && <ImpactInputs formik={formik} /> }
                        
                        <ThresholdsInputs formik={ formik } />
                        
                        <BudgetInputs formik={ formik } actingRole={ actingRole } initiative={ objective } />
                        <InitiativeInputs 
                            formik={ formik }
                            initiatives={ initiatives }
                            initiative={ objective }
                            setInitiatives={ setInitiatives }
                            mode={ mode }
                        />

                        {
                            objective?.is_self_cascaded && data_type === PERCENTAGE &&
                            <Milestones
                                formik={ formik }
                                milestones={ milestones }
                                initiative={ objective }
                                mode={ mode }
                                setMilestones={ setMilestones }
                             />
                        }
                    
                    </div>

                </Card>

                <div className="form_btns">
                    <Button className="cancel_btn" onClick={ () => navigate(-1) }>Cancel</Button>
                    <Button className="submit_btn" type="">Submit</Button>
                </div>
            </Form>
        </div>
        </>
    )
}
// TODO: dont submit edit if nothing in the form has changed
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
