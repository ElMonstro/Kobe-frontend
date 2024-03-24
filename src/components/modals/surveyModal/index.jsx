import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import { Modal } from "react-bootstrap";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { themeJson } from "./theme";

import "./index.scss";
import { setShowSurvey } from "../../../redux/actions";
import { json, page, panel, rating } from "./json";
import { deepCopy } from "../../../utils";
import { makeRequest } from "../../../utils/requestUtils";
import { PATCH } from "../../../utils/constants";
import getURLs from "../../../services/urls";
import SurveyLanding from "./surveyLanding";


const SurveyModal = ({ settings }) => {

    const [modelJson, setModelJson] = useState(deepCopy({}));
    const [showSurvey, setShowSurvey] = useState(false);
    const [startSurvey, setStartSurvey] = useState(false);

    useEffect(() => {
        const jsonCopy = deepCopy(json);
        const pages = [];
        setShowSurvey(Boolean(settings?.surveys?.length));
        settings?.surveys?.forEach(subjectSurveys => {
            const pageCopy = deepCopy(page);
            pageCopy.name = `${subjectSurveys[0]?.subject.id}`;
            const panels = [];

            subjectSurveys.forEach(subjectSurvey => {
                const panelCopy = deepCopy(panel);
                const ratingCopy = { ...rating }
                panelCopy.name = `${subjectSurvey.subject.id}`;
                ratingCopy.name = `${subjectSurvey.id}`;
                ratingCopy.title = `On a scale from 1 to 10, rate ${subjectSurvey?.subject.user.first_name} 
                    ${subjectSurvey?.subject.user.second_name} (${subjectSurvey?.subject.name}) on their ${subjectSurvey.objective?.name}`;
                panelCopy.elements = [ratingCopy];
                panels.push(panelCopy);
            });
            page.elements = panels;
            pages.push(pageCopy);
        });
        jsonCopy.pages = pages;
        setModelJson(jsonCopy);
    }, [settings]);

    const survey = new Model(modelJson);
    survey.applyTheme(themeJson);
    survey.onComplete.add((sender, options) => {
        const values = Object.keys(sender.data).map(key => {
           return { 
            id: Number(key),
            score: sender.data[key]
            }
        });

        makeRequest(getURLs().updateSurveyURL, PATCH, { surveys: values }, true, true)
            .then(() => handleClose());
    });

    const handleClose = () => {
        setShowSurvey(false);
    };

    return (
        <div className="survey">
            <Modal
                show={ showSurvey }
                backdrop="static"
                keyboard={ true }
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="profile_modal"
                contentClassName="profile_modal_content"
                backdropClassName="modal_backdrop"
                onHide={ handleClose }
                >
                <Modal.Header closeButton>
                    <Modal.Title className="profile_header">
                        Behavioral Survey
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="survey_modal_body">
                    { startSurvey?
                        <Survey model={survey} />:
                        <SurveyLanding setStartSurvey={ setStartSurvey } />    
                    }
                </Modal.Body>
            </Modal>
        </div>
    )
}

const mapDispatchToProps = {
    setShowSurvey
}

const mapStateToProps = ({ adminReducer: { showSurvey, settings } } ) => ({
    showSurvey,
    settings
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (SurveyModal);
