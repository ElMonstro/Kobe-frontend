import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { fetchSelfCascadedInitURL, fetchCascadedObjectiveURL } from "../../../services/urls";
import { GET } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";
import CascadedInitiative from "./cascadedInitiative";

import "./index.scss";

const CascadedCard = ({ title, type, setInitiativeId, setActiveComponent }) => {

    const urlMapper = {
        selfCascaded: fetchSelfCascadedInitURL,
        cascaded: fetchCascadedObjectiveURL
    }

    const [initiatives, setInitiatives] = useState([])

    const url = urlMapper[type];

    useEffect(() => {
        makeRequest(url, GET, null, true, false)
            .then(data => {
                setInitiatives(data);
            })
    }, []);

    
    return (
            <Card className="staff_card cascaded_initiatives">
                <div className="card_title title">{ title }</div>
                    <div className="initiatives">
                        {
                            initiatives?.map(initiative => {
                                return <CascadedInitiative 
                                            key={ initiative.id } 
                                            id={ initiative.id }
                                            name={ initiative.name } 
                                            type={ initiative.type }
                                            is_created={ initiative.is_created }
                                            setInitiativeId={setInitiativeId}
                                            setActiveComponent={setActiveComponent}
                                    />
                            })
                        }
                    </div>
        </Card>
        )
    }

export default CascadedCard;
