import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";

import addBtn from "../../../assets/plus_sign.svg";
import MilestoneInput from "./milestoneInput";
import { deleteFromObjectlist } from "../../../utils";
import CreatedMilestone from "./createdMilestone";
import { FieldArray } from "formik";

const Milestones = ({ formik, objective }) => {
  
    const [createdMilestones, setCreatedMilestones] = useState([]);
    const arrayHelpersRef = useRef();

    const deleteCreatedMilestone = deleteId => {
  
        const newMilestones = deleteFromObjectlist(createdMilestones, 'id', deleteId);
        
        setCreatedMilestones([
            ...newMilestones
        ]);
    }

    useEffect(() => {
        setCreatedMilestones(objective?.milestones)
    }, [objective]);

    const addMilestone = ( )=> {
        arrayHelpersRef.current.push({
            description: '',
            percentage: ''
        })
    }
    
    return (
        <div className="milestones" id="milestones">
            <div className="title mt-3 mb-2">
                Milestones
                <span className="add" onClick={ addMilestone }>
                    <span className="add_btn">
                        <img src={ addBtn }  alt="Logo"/>
                    </span> 
                    Add Milestone
                </span>
            </div>
            <Row className="initiatives_labels">
                <Col lg={4}>Description</Col>
                <Col className="weight_label"></Col>
                <Col>Percentage Weight</Col>
                <Col></Col>
            </Row> 
            {
                createdMilestones.map( milestone => {
                    return (
                        <CreatedMilestone 
                            key={ milestone.id  } 
                            { ...milestone }
                            formik={ formik }
                            deleteMilestone={ deleteCreatedMilestone }
                            />)
                })
            }
        <FieldArray 
            render={ arrayHelpers => {
                formik.values.milestones?.map( (milestone, index) => {
                    arrayHelpersRef.current = arrayHelpers;
                    return (
                        <MilestoneInput 
                            key={ index  } 
                            formik={ formik }
                            arrayHelpers={ arrayHelpers }
                            />)
                })
            }}
        />
        
    </div>
        );
}

export default Milestones;
