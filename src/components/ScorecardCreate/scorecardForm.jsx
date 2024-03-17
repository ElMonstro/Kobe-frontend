import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap"
import { ERROR } from "../../utils/constants";
import { FormikProvider, useFormik } from 'formik';
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

import "./index.scss";
import ObjectiveInputs from "./objectiveInputs";
import MeasuresInputs from "./measures/measuresInputs";
import InitiativeInputs from "./initiatives/initiativesInputs";
import BudgetInputs from "./budgetInput";
import Milestones from "./milestones/milestoneInputs";
import { useCallbackPrompt } from "../../hooks/useCallbackPrompt";
import DialogBox from "../common/dialogBox";
import ImpactInputs from "./impactInputs";
import { cleanObjectivePayload, fireNotification } from "../../utils";

const ScorecardForm = ({ 
        onSubmit, enableReinitialize, 
        initialValues, validationSchema, 
        objective, enableInitiatives, 
        enableMilestones, disableObjectiveName,
        actingRole, enableImpact, 
        objectiveTitle, enableEvidence
    }) => {

    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(true);
    const [reinitializeForm, setReinitializeForm] = useState(enableReinitialize);
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog);

    const submitHandler = async (values, { setFieldError, resetForm }) => {

        console.log(values)

        if (!formik.dirty) {
            fireNotification(ERROR, "You must change a field for a valid update")
            return;
        }

        values = cleanObjectivePayload(values);

        onSubmit(values, { setFieldError, resetForm });
    }

    const yupValidationSchema = Yup.object(validationSchema);

    const formik = useFormik({
        enableReinitialize: reinitializeForm,
        initialValues: initialValues,
        validationSchema: yupValidationSchema,
        onSubmit: submitHandler,
    });

    useEffect(() => {
        setShowDialog(formik.dirty);
    }, [formik.dirty]);

    console.log(formik.errors)
    return (
        <FormikProvider value={ formik }>
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
                        disableObjectiveName={ disableObjectiveName }
                        objectiveTitle={ objectiveTitle }
                        />
                    <Card className="staff_card">
                        
                        <div className="inputs_cont">
                            
                            <MeasuresInputs 
                                formik={ formik } 
                                initiative = { objective }
                                setReinitializeForm = { setReinitializeForm }
                            />
                            { enableImpact && 
                                <ImpactInputs formik={formik} /> 
                            }
                            
                            <BudgetInputs 
                                formik={ formik } actingRole={ actingRole } 
                                initiative={ objective } enableEvidence={ enableEvidence} 
                            />
                            { enableInitiatives &&
                                <InitiativeInputs 
                                    formik={ formik }
                                    objective={ objective }
                                />
                            }
                            {
                                enableMilestones &&
                                <Milestones
                                    formik={ formik }
                                    objective={ objective }
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
        </FormikProvider>
    )
}

const mapDispatchToProps = {
}

const mapStateToProps = ({ adminReducer: { periods, orgChart, settings }, }) => ({
    periods, 
    actingRole: orgChart[0],
    settings
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (ScorecardForm);
