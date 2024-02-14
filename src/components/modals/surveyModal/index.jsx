import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import { Col, Modal, Row } from "react-bootstrap";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { themeJson } from "./theme";

import "./index.scss";
import { setShowSurvey } from "../../../redux/actions";
import { json, page, panel } from "./json";
import { deepCopy } from "../../../utils";
import { makeRequest } from "../../../utils/requestUtils";
import { PATCH } from "../../../utils/constants";
import getURLs from "../../../services/urls";
import { Truenas } from "styled-icons/simple-icons";


const SurveyModal = ({ settings }) => {

    const [modelJson, setModelJson] = useState(deepCopy({}));
    const [showSurvey, setShowSurvey] = useState(false);

    useEffect(() => {
        const jsonCopy = deepCopy(json);
        const pages = [];
        setShowSurvey(Boolean(settings?.surveys?.length));
        settings?.surveys?.forEach(subjectSurveys => {
            const pageCopy = deepCopy(page);
            pageCopy.title = `${subjectSurveys[0]?.subject.user.first_name} ${subjectSurveys[0]?.subject.user.second_name}`;
            pageCopy.name = `${subjectSurveys[0]?.subject.id}`;
            const panels = [];

            subjectSurveys.forEach(survey => {
                const panelCopy = deepCopy(panel);
                panelCopy.name = `${survey.subject.id}`;
                panelCopy.elements[0].name = `${survey.id}`;
                panelCopy.elements[0].title = `On a scale from 0 to 10, rate ${survey?.subject.user.first_name}
                            on their ${survey.objective?.name}`;
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
            .then(data => data && handleClose());
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
                <Modal.Body className="profile_modal_body">
                    <Survey model={survey} />
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
