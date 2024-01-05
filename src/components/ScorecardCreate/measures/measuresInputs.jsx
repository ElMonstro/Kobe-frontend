import React, { useState } from "react";

import addBtn from "../../../assets/plus_sign.svg"
import MeasureInput from "./measureInput";

const MeasuresInputs = ({ formik, measures, setMeasures, initiative, setReinitializeForm }) => {

    const [measureIndex, setMeasureIndex] = useState(1);

    const addMeasure = e => {
        const currentIndex = measureIndex + 1;
        setMeasureIndex(currentIndex);

        setMeasures([
            ...measures,
            {
                measureId: `measure-name-${currentIndex}`, 
                weightId: `measure-weight-${currentIndex}`, 
            },
            
        ]);
    }


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

            {
                measures.map(measure => {
                    return (
                    <MeasureInput 
                        { ...measure }
                        formik={ formik }
                        key={ measure.measureId }
                        initiative={ initiative }
                        setReinitializeForm={ setReinitializeForm }
                    />
                    )
                })
            }

            
        </>
        
        );
}

export default MeasuresInputs;
