import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import addBtn from "../../../assets/plus_sign.svg";
import getURLs from "../../../services/urls";
import { GET } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";
import InitiativeInput from "./initiativeInput";
import CreatedInitative from "./createdInitative";
import { deleteFromObjectlist } from "../../../utils";


const InitiativeInputs = ({ formik, initiatives, initiative, setInitiatives }) => {

    const [underlings, setUnderlings] = useState([]);
    const [createdInitiatives, setCreatedInitiatives] = useState([]);
    const { is_self_cascaded } = initiative;
    let contClassName;

    if (is_self_cascaded) {
        contClassName = "initiatives hidden";
    } else {
        contClassName = "initiatives";
    }

    useEffect(() => {
        makeRequest(getURLs().fetchUnderlingsURL, GET, null, true, false)
        .then( data => {
            data && setUnderlings(data);
        });
    }, []);

    useEffect(() => {
        setCreatedInitiatives(initiative?.initiatives)
    }, [initiative])

    const [initiativesIndex, setInitiativesIndex] = useState(1);

    const deleteInitiative = deleteId => {
        if (initiatives.length === 1) {
            return;
        }
        initiatives.pop();
        
        setInitiatives([
            ...initiatives
        ]);
    }

    const deleteCreatedInitiative = deleteId => {
        const newInitiatives = deleteFromObjectlist(createdInitiatives, 'id', deleteId);
        setCreatedInitiatives([...newInitiatives]);
    }

    const addInitiative = e => {

        const currentIndex = initiativesIndex + 1;
        setInitiativesIndex(currentIndex);

        setInitiatives([
            ...initiatives,
            {
                initiativeId: `intiative-name-${currentIndex}`, 
                weightId: `initiative-weight-${currentIndex}`, 
                cascadeId: `cascade-role-${currentIndex}`,
                deleteId: `delete-${currentIndex}`
            },
        ]);
    }
    

    return (
        <div className={ contClassName } id={ initiatives.weightId }>
            <div className="title mt-3 mb-2">
                Initiatives
                <span className="add" onClick={ addInitiative }>
                    <span className="add_btn">
                        <img src={ addBtn }  alt="Logo"/>
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

        { 
            initiatives.map( initiative => {
            return (<InitiativeInput 
                        { ...initiative } 
                        key={ initiative.initiativeId } 
                        formik={ formik }
                        deleteInitiative={ deleteInitiative }
                        underlings={ underlings }
                />)
        })
        }   
        
    </div>
        );
}

export default InitiativeInputs;
