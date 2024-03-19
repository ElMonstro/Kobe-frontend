import React, { useEffect } from "react";
import { CREATE, POST } from "../../utils/constants";
import { connect } from "react-redux";
import { useOutletContext } from "react-router-dom";
import * as Yup from 'yup';

import "./index.scss";
import { makeRequest } from "../../utils/requestUtils";
import getURLs from "../../services/urls";
import { yupCreateObjectiveValidationObj as validationSchema } from "../../utils/validators";
import ScorecardForm from "./scorecardForm";

const ScorecardCreate = ({ periods, actingRole }) => {

    const { setActiveComponent } = useOutletContext();
    const initialValues = {
            upper_threshold: '',
            lower_threshold: '',
            name: '',
            perspective: '',
            data_type: '',
            baseline: '',
            percentage_target: '',
            units_target: '',
            measures: [ 
                {
                    name: '', 
                    weight: '', 
                },
            ],
            initiatives: [
                {
                    name: '', 
                    role: actingRole?.id,
                }
            ],
        }

    if (actingRole?.is_ceo) {
        initialValues.impact_target = ''
        initialValues.impact_baseline = ''
        initialValues.impact_description = ''
        validationSchema.impact_target = Yup.number().required('* Required')
        validationSchema.impact_baseline = Yup.number().required('* Required')
        validationSchema.impact_description = Yup.string()
                                    .test('len', 'Must be less than 100 characters', val => val?.length < 100)
                                    .required('* Required')
    }

    initialValues['period_targets'] = periods?.map(period => {
        return {
            period,
            target: ''
        }});

    useEffect(() => {
            setActiveComponent(CREATE);
        }, []);

    const onSubmit = async (values, { resetForm }) => {
        const { createObjectiveURL } = getURLs();
        makeRequest(createObjectiveURL, POST, values, true)
                .then(data => {
                    if (data){ 
                        resetForm();
                    }

        });
    };

    return (
        <ScorecardForm 
            enableReinitialize={ true }
            initialValues={ initialValues }
            validationSchema={ validationSchema }
            onSubmit={ onSubmit }
            enableInitiatives={ true }
            enableMilestones={ false }
            enableImpact={ actingRole?.is_ceo }
            objective={ {} }
            objectiveTitle={ 'Objective' }
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
