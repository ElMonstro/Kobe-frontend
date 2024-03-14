import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";

import addBtn from "../../../assets/plus_sign.svg";
import getURLs from "../../../services/urls";
import { BEHAVIORAL, GET } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";
import InitiativeInput from "./initiativeInput";
import CreatedInitative from "./createdInitative";
import { deleteFromObjectlist } from "../../../utils";
import { FieldArray } from "formik";


const InitiativeInputs = ({ formik, initiative }) => {

    const [underlings, setUnderlings] = useState([]);
    const [createdInitiatives, setCreatedInitiatives] = useState([]);
    const { is_self_cascaded } = initiative;
    const arrayHelpersRef = useRef();

    useEffect(() => {
        makeRequest(getURLs().fetchUnderlingsURL, GET, null, true, false)
        .then( data => {
            data && setUnderlings(data);
        });
    }, []);

    useEffect(() => {
        setCreatedInitiatives(initiative?.initiatives)
    }, [initiative])

    const deleteCreatedInitiative = deleteId => {
        const newInitiatives = deleteFromObjectlist(createdInitiatives, 'id', deleteId);
        setCreatedInitiatives([...newInitiatives]);
    }

    const addInitiative = e => {

        arrayHelpersRef.current.push({
            name: '', 
            weight: '', 
            role: '',
        })
    }

    if (is_self_cascaded || formik.values.perspective === BEHAVIORAL) {
        return <></>
    } 

    return (
        <div className="initiatives" id="initiatives">
            <div className="title mt-3 mb-2">
                Initiatives
                <span className="add" onClick={ addInitiative }>
                    <span className="add_btn">
                        <img src={ addBtn }  alt="add"/>
                    </span> 
                    Add Initiative
                </span>
            </div>
            <Row className="initiatives_labels">
                <Col lg={4}>Name</Col>
                <Col className="weight_label">Weight</Col>
                <Col>Cascade</Col>
                <Col></Col>
            </Row>

        { 
            createdInitiatives?.map( createdInitiative => {
                return (<CreatedInitative 
                            key={ createdInitiative.id } 
                            deleteInitiative={ deleteCreatedInitiative }
                            initiative={ createdInitiative }
                            deleteId={ createdInitiative.id }
                        />)
            })
        }   

        <FieldArray 
            name="initiatives"
            render={ arrayHelpers => {
                return formik.values.initiatives.map( (initiative, index) => {
                    arrayHelpersRef.current = arrayHelpers;
                    return <InitiativeInput 
                                { ...initiative } 
                                arrayHelpers={ arrayHelpers }
                                key={ index }
                                index = { index } 
                                formik={ formik }
                                underlings={ underlings }
                            />
                })
            }}
        />

        { 
            
        }   
        
    </div>
        );
}

export default InitiativeInputs;
