import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import addBtn from "../../assets/plus_sign.svg";
import { fetchUnderlingsURL } from "../../services/urls";
import { generateString } from "../../utils";
import { GET } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";
import InitiativeInput from "./initiativeInput";



const InitiativeInputs = ({ formik }) => {

    const [underlings, setUnderlings] = useState([]);

    useEffect(() => {
        makeRequest(fetchUnderlingsURL, GET, null, true, false)
        .then( data => {
            data && setUnderlings(data);
        });
    }, []);

    const [initiatives, setInitiatives] = useState([
        {
            initiativeId: 'intiative-name-1', 
            weightId: 'initiative-weight-1', 
            cascadeId: 'cascade-role-1',
            deleteId: 'delete-1'
        },
    ]);

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
        const randomString = generateString(4);
        setInitiatives([
            ...initiatives,
            {
                initiativeId: `intiative-name-${randomString}`, 
                weightId: `initiative-weight-${randomString}`, 
                cascadeId: `cascade-role-${randomString}`,
                deleteId: `delete-${randomString}`
            },
        ]);
    }
    

    return (
        <div className="initiatives" id={ initiatives.weightId }>
            <div className="title mt-3 mb-2">
                Initiatives
                <span className="add" onClick={ addInitiative }>
                    <span className="add_btn">
                        <img src={ addBtn }  alt="Logo"/>
                    </span> Add Initiative
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
