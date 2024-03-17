import React, { useEffect, useRef } from "react";

import addBtn from "../../../assets/plus_sign.svg"
import MeasureInput from "./measureInput";
import TargetInputs from "./targetsInputs";
import BaselineTargetInputs from "./baselineTargetInputs";
import QuaterlyTargetsInputs from "./quaterlyTargetsInputs";
import ThresholdsInputs from "../thresholdsInputs";
import { FieldArray } from "formik";
import { PERCENTAGE, UNITS } from "../../../utils/constants";

const MeasuresInputs = ({ formik, initiative, setReinitializeForm }) => {

    const arrayHelpersRef = useRef();
    const dataType = formik.getFieldProps('data_type').value;

    useEffect(() => {
        const resetUnitTargets = () => {
            formik.setFieldValue('units_target', 0);
            formik.setFieldValue('baseline', 0)
        }
        dataType === UNITS? formik.setFieldValue('percentage_target', 0): resetUnitTargets();

    }, [dataType]);

    const addMeasure = () => {
        arrayHelpersRef.current.push({
            name: '',
            weight: ''
        });
    };

    return (
        <>
            <div className="title mt-3 mb-2">
                Measure 
                <span className="add add_measure" onClick={ addMeasure }>
                    <span className="add_btn">
                        <img src={ addBtn }  alt="Logo"/>
                    </span> Add Measure
                </span>
            </div>
            <FieldArray name="measures" render={ arrayHelpers => {
                return formik.values.measures.map((measure, index) => {
                    arrayHelpersRef.current = arrayHelpers;
                        return (
                            <MeasureInput 
                                { ...measure }
                                formik={ formik }
                                key={ index }
                                index={ index }
                                initiative={ initiative }
                            />
                        )
                    })
                }} 
            />
            <TargetInputs 
                formik={ formik }  
                targetDisabled={ dataType!==PERCENTAGE } 
                setReinitializeForm={setReinitializeForm}
                />
            <BaselineTargetInputs 
                targetDisabled={ dataType!==UNITS} 
                formik={ formik } 
                />
            <QuaterlyTargetsInputs formik={ formik } />
            <ThresholdsInputs formik={ formik } />
        </>
        
        );
}

export default MeasuresInputs;
