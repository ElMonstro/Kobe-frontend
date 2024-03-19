import React, { useEffect, useState } from "react";
import { CASCADED, CREATE, EDIT, GET, PATCH, PERCENTAGE, SCORECARD } from "../../utils/constants";
import * as Yup from 'yup';
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./index.scss";
import { makeRequest } from "../../utils/requestUtils";
import getURLs from "../../services/urls";
import { yupCreateObjectiveValidationObj as validationSchema } from "../../utils/validators";
import ScorecardForm from "./scorecardForm";

const ScorecardUpdate = ({ actingRole, periods }) => {

    const [objective, setObjective] = useState({});
    const { is_self_cascaded, data_type } = objective;
    const { initiativeId, mode, role } = useParams();
    const navigate = useNavigate();
    let objectiveTitle;
    is_self_cascaded? objectiveTitle = 'Initiative': objectiveTitle = 'Objective';

    const initialValues = {
            name: objective.name,
            perspective: objective.perspective,
            data_type: objective.data_type,
            baseline: objective.baseline,
            percentage_target: objective.percentage_target,
            units_target: objective.units_target,
            evidence_description: objective.evidence_description,
            budget: objective.budget,
            period_targets: objective.period_targets?.map(period_target => {return {
                target: period_target.target, 
                period: period_target.period_object?.period
            }}),
            measures: objective.measures,
            initiatives: [
                {
                    name: '', 
                    role: '',
                }
            ],
        }

    if (is_self_cascaded && data_type === PERCENTAGE)  {
        let milestoneValidation = {};

        mode === EDIT? milestoneValidation = Yup.object({
            description: Yup.string()
                        .test('len', 'Must be less than 50 characters', val => val?.length < 50),
            percentage: Yup.number()

        }): milestoneValidation = Yup.object({
            description: Yup.string().required('* Required')
                        .test('len', 'Must be less than 50 characters', val => val?.length < 50),
            percentage: Yup.number().required('* Required')

        })
        validationSchema.milestones = Yup.array().of(milestoneValidation)
        initialValues.milestones = [{
            description: ' ',
            percentage: ''
        }];
    }

    if (mode === CREATE) {
        initialValues.period_targets = periods?.map(period => {
            return {
                period,
                target: ''
            }});

        initialValues.measures = [
                        {
                            name: '', 
                            weight: '', 
                        },
                    ]
    }

    if (actingRole?.is_ceo && is_self_cascaded === false) {
        initialValues.impact_target = objective.impact_target;
        initialValues.impact_baseline = objective.impact_baseline;
        initialValues.impact_description = objective.impact_description;
        validationSchema.impact_target = Yup.number().required('* Required');
        validationSchema.impact_baseline = Yup.number().required('* Required');
        validationSchema.impact_description = Yup.string().required('* Required')
                .test('len', 'Must be less than 50 characters', val => val?.length < 50);                  
    }

    if (mode === EDIT || is_self_cascaded) {
        validationSchema.initiatives = Yup.array().of(Yup.object({
            name: Yup.string(),
            role: Yup.number(),
        }));
    }

    useEffect(() => {
        
        initiativeId && makeRequest(getURLs().updateObjectiveURL(initiativeId), GET, null, true, false)
            .then(data => {
                if (data) {
                    setObjective(data);
                }
            });
    }, []);

    const onSubmit = async (values, { resetForm }) => {

        const { amendObjectiveURL } = getURLs();
        (is_self_cascaded) && delete values.initiatives;
            makeRequest(amendObjectiveURL(initiativeId, mode), PATCH, values, true)
            .then(data=> {
                if (data) {
                    resetForm();
                    navigate(`/${role}/${SCORECARD}/${CASCADED}/`);
                } 
            });  
    }

    return (
        Object.keys(objective).length && 
        <ScorecardForm 
            enableReinitialize={ true }
            initialValues={ initialValues }
            validationSchema={ validationSchema }
            onSubmit={ onSubmit }
            enableInitiatives={ !is_self_cascaded }
            enableMilestones={ is_self_cascaded && data_type === PERCENTAGE }
            enableImpact={ actingRole?.is_ceo && !is_self_cascaded }
            objective={ objective }
            objectiveTitle={ objectiveTitle }
            disableObjectiveName
            enableEvidence={ is_self_cascaded }
            enableBudget={ is_self_cascaded }
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
) (ScorecardUpdate);
