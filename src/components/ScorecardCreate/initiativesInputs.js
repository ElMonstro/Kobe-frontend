import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import addBtn from "../../assets/plus_sign.svg";
import { fetchUnderlingsURL } from "../../services/urls";
import { GET, SELF_CASCADED_INIT } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";
import InitiativeInput from "./initiativeInput";


const InitiativeInputs = ({ formik, initiatives, initiative, setInitiatives }) => {

    const [underlings, setUnderlings] = useState([]);
    const { type } = initiative;
    const { mode } = useParams();
    let contClassName;

    if (mode === "edit" || type === SELF_CASCADED_INIT) {
        contClassName = "initiatives hidden";
    } else {
        contClassName = "initiatives";
    }

    useEffect(() => {
        makeRequest(fetchUnderlingsURL, GET, null, true, false)
        .then( data => {
            data && setUnderlings(data);
        });
    }, []);

    

    const [initiativesIndex, setInitiativesIndex] = useState(1);

    const deleteInitiative = deleteId => {
        if (initiatives.length === 1) {
            return;
        }

        for (let index=0; index < initiatives.length; index++ ) {
            if (initiatives[index].deleteId === deleteId) {
                initiatives.splice(index, 1);
                
                break;
            }
        }
        setInitiatives([
            ...initiatives
        ]);
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
