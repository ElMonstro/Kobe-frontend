import React, { useEffect, useState } from "react";

import addBtn from "../../assets/plus_sign.svg"
import { generateString } from "../../utils";
import MeasureInput from "./measureInput";

const MeasuresInputs = ({ formik }) => {

    const [measures, setMeasures] = useState([
        {
            measureId: 'measure-name-1', 
            weightId: 'measure-weight-1', 

        },
    ]);

    const addMeasure = e => {
        const randomString = generateString(5);

        setMeasures([
            ...measures,
            {
                measureId: `measure-name-${randomString}`, 
                weightId: `measure-weight-${randomString}`, 
            },
            
        ]);
    }


    return (
        <>
            <div className="title mt-3 mb-2">
                Measure 
                <span className="add" onClick={ addMeasure }>
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
                    />
                    )
                })
            }

            
        </>
        
        );
}

export default MeasuresInputs;
