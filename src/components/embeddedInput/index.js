import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Close } from "@styled-icons/material-twotone/Close";

import { makeRequest } from "../../utils/requestUtils";
import { settingsURL } from "../../services/urls";
import { setSettings } from "../../redux/actions";
import { POST } from "../../utils/constants";
import { useFormik } from 'formik';
import "./index.scss";
import { connect } from "react-redux";


const EmbededInput = props => {
    const [isEditable, setEditable] = useState(false);
    const { defaultValue, initialValueKey, setSettings } = props;
    let initialValues = {};
    initialValues[initialValueKey] = defaultValue;

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            const responseData =  await makeRequest(settingsURL, POST, values, true);
            responseData && setSettings(responseData);
            responseData && setEditable(false);
        },
    });    
    
    return (
        <Form className="perspective_input" id={ `${initialValueKey}-form` } onSubmit={ formik.handleSubmit }>
            <input 
                type="text" 
                valuedefault ={ defaultValue } 
                disabled={!isEditable}
                { ...formik.getFieldProps(initialValueKey) }
                id={ initialValueKey } 
                />
            { !isEditable? <span className="switch_btn" onClick={ e => setEditable(true) }>Edit</span>
            : <button className="save_btn" type="submit">
                Save
                <span className="cancel_btn" onClick={e => setEditable(false)}><Close/></span>
            </button>}
        </Form>
    )
}

const mapDispatchToProps = {
    setSettings
}

const mapStateToProps = ({ adminReducer: { settings } }) => ({
    ...settings,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (EmbededInput);