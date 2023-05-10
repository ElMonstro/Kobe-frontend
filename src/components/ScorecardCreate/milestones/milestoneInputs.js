import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import addBtn from "../../../assets/plus_sign.svg";
import MilestoneInput from "./milestoneInput";
import { deleteFromObjectlist } from "../../../utils";
import CreatedMilestone from "./createdMilestone";


const Milestones = ({ formik, milestones, initiative, setMilestones }) => {

    const { is_self_cascaded } = initiative;
    let contClassName;

    if (is_self_cascaded) {
        contClassName = "milestones";
    } else {
        contClassName = "milestones";
    }

    const [initiativesIndex, setInitiativesIndex] = useState(1);
    const [createdMilestones, setCreatedMilestones] = useState([]);

    const deleteMilestone = deleteId => {
        if (milestones.length === 1) {
            return;
        }
        const newMilestones = deleteFromObjectlist(milestones, 'deleteId', deleteId);
        
        setMilestones([
            ...newMilestones
        ]);
    }

    const deleteCreatedMilestone = deleteId => {
  
        const newMilestones = deleteFromObjectlist(createdMilestones, 'id', deleteId);
        
        setCreatedMilestones([
            ...newMilestones
        ]);
    }

    useEffect(() => {
        setCreatedMilestones(initiative?.milestones)
    }, [initiative]);

    const addMilestone = e => {

        const currentIndex = initiativesIndex + 1;
        setInitiativesIndex(currentIndex);

        setMilestones([
            ...milestones,
            {
                milestoneId: `milestone-name-${currentIndex}`,
                percentageId: `milestone-percentage-${currentIndex}`,
                deleteId: `delete-milestone-${currentIndex}`
            },
        ]);
    }
    

    return (
        <div className={ contClassName } id={ milestones.weightId }>
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
                <Col>Percentage</Col>
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

        { 
            milestones.map( milestone => {
            return (
            <MilestoneInput 
                key={ milestone.milestoneId  } 
                { ...milestone }
                formik={ formik }
                deleteMilestone={ deleteMilestone }
                />)
        })
        }   
        
    </div>
        );
}

export default Milestones;
