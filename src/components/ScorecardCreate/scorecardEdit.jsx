import React, { useEffect, useState } from "react";
import { CASCADED, CREATE, EDIT, ERROR, GET, PATCH, PERCENTAGE, POST, SCORECARD } from "../../utils/constants";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import "./index.scss";
import { arePeriodicalInputsValid, cleanObjectivePayload, fireNotification } from "../../utils";
import { makeRequest } from "../../utils/requestUtils";
import getURLs from "../../services/urls";
import { yupCreateObjectiveValidationObj as validationSchema } from "../../utils/validators";
import ScorecardForm from "./scorecardForm";

const ScorecardCreate = ({ periods, actingRole }) => {

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
        budget: '',
        measures: [
            {
                name: '', 
                weight: '', 
            },
        ],
        initiatives: [
            {
                name: '', 
                weight: '', 
                role: actingRole?.id,
            }
        ],
        }

    const [objective, setObjective] = useState({});
    const { perspective, name, is_self_cascaded, data_type } = objective;
    const { initiativeId, mode, role } = useParams();
    const navigate = useNavigate();
    const { setActiveComponent } = useOutletContext();
    const [showDialog, setShowDialog] = useState(true);

    useEffect(() => {
        setActiveComponent(CREATE);
        
        initiativeId && makeRequest(getURLs().updateObjectiveURL(initiativeId), GET, null, true, false)
            .then(data => {
                if (data) {
                    setObjective(data);
                }
            });
    }, []);

    initialValues['period_targets'] = periods?.map(period => {
        return {
            name: period,
            target: ''
        }
    })

    if (is_self_cascaded && data_type === PERCENTAGE)  {
        initialValues.milestones = [{
            description: '',
            percentage: ''
        }];
    }

    if (mode === EDIT || objective?.is_self_cascaded === true) {
        validationSchema.data_type = Yup.string();
        initialValues.milestones = [{
            description: '',
            percentage: ''
        }];
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

    const yupValidationSchema = Yup.object(validationSchema)
                        .when((values, schema) => {
                           
                        })

    const onSubmit = async (values, { setFieldError, resetForm }) => {

        console.log(values)
        
        // if (!arePeriodicalInputsValid(values, setFieldError)) {
        //     return;
        // }

        if (!formik.dirty) {
            fireNotification(ERROR, "You must change a field for a valid update")
            return;
        }

        const payload = cleanObjectivePayload(values);
        const { createObjectiveURL, amendObjectiveURL } = getURLs();

        if (!Boolean(initiativeId)){
            makeRequest(createObjectiveURL, POST, payload, true)
                .then(data => {
                    if (data){ 
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
        validationSchema: yupValidationSchema,
        onSubmit: onSubmit,
    });

    useEffect(() => {
        setShowDialog(formik.dirty)
    }, [formik.dirty])

    console.log(formik.errors)
    return (
        <ScorecardForm 
            formik={ formik } 
            objective={ objective } 
            actingRole={ actingRole }
            enableInitiatives={ true }
            enableMilestones={ false }
        />
    )
}

const mapDispatchToProps = {
};

const mapStateToProps = ({ adminReducer: { periods, orgChart, settings }, }) => ({
    periods, 
    actingRole: orgChart[0],
    settings
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (ScorecardCreate);
