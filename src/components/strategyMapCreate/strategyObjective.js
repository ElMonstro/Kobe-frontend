import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Select from 'react-select';

import { linkObjectiveURL } from "../../services/urls";
import { PATCH } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";
import "./index.scss";
import SelectedObjective from "./selectedObjective";


const StrategyObjective = ({objective: currentObjective, linkableObjectives, perspective }) => {

    const createOptions = objectives => {
        const options = objectives?.filter(objective => currentObjective?.id !== objective.id ).map(objective => {

            return {value: objective.id, label: `${objective.name} (${objective.perspective})`}
        });

        return options;
    }
    const options = createOptions(linkableObjectives);
    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '1px solid #e6ecf2',
          color: state.isSelected ? 'red' : 'blue',
        }),
        control: (provided, state) => ({
            ...provided,          
        })
      }
    
    const [selectedOptions, setSelectedOptions] = useState([]);
    
    const onSelect = (selected) => {
        selected =  selected.map(({value}) => value)
        const payload = {
            links_ids: selected
        };

        makeRequest(linkObjectiveURL(currentObjective?.id), PATCH, payload, true, false )
            .then(data => {
                data && setSelectedOptions(createOptions(data?.links));
            });
    };

    useEffect(() => {
        setSelectedOptions(createOptions(currentObjective?.links))
    }, [currentObjective]);


    return (
        <Row className="objective row_design">
                <Col>
                    <Row>
                        <Col className="name">{ currentObjective?.name }</Col>
                        <Col className="link">
                            <Select 
                                styles={ customStyles }
                                options={ options }
                                value={ selectedOptions }
                                onChange={ onSelect }
                                isSearchable={ true }
                                isMulti
                            />
                        </Col>
                    </Row>
                </Col>
                <Col className="selected_objectives">
                    <Row>
                        {
                            selectedOptions?.map(option => {
                                return <SelectedObjective key={ option.value } option={ option } perspective={ perspective } />
                            })
                        }
                    </Row>
                </Col>
         </Row>
      
    );
};

export default StrategyObjective;
