import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Close } from "@styled-icons/material-twotone/Close";

import { makeRequest } from "../../utils/requestUtils";
import { settingsURL } from "../../services/urls";
import { setSettings } from "../../redux/actions";
import { POST } from "../../utils/constants";
import { useFormik } from 'formik';
import "./index.scss";
import { connect } from "react-redux";


const EmbededInput = ({ defaultValue, initialValueKey, setSettings }) => {
    const [isEditable, setEditable] = useState(false);

    let initialValues = {};
    initialValues[initialValueKey] = defaultValue;

    useEffect(() => {
        setEditable(false)
    }, [defaultValue])

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
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
                disabled={!isEditable}
                { ...formik.getFieldProps(initialValueKey) }
                id={ initialValueKey } 
                />
            { isEditable ? <button className="save_btn" type="submit">
                              Save
                              <span className="cancel_btn" onClick={e => setEditable(false)}><Close/></span>
                          </button> : <span className="switch_btn" onClick={ e => setEditable(true) }>Edit</span>}
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
