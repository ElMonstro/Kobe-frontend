import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { GET } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";
import CascadedInitiative from "./cascadedInitiative";
import getURLs from "../../../services/urls";

import "./index.scss";

const CascadedCard = ({ title, type, setInitiativeId, setActiveComponent }) => {

    

    const [initiatives, setInitiatives] = useState([])

    

    useEffect(() => {
        const { fetchSelfCascadedInitURL, fetchCascadedObjectiveURL } = getURLs();
        const urlMapper = {
            selfCascaded: fetchSelfCascadedInitURL,
            cascaded: fetchCascadedObjectiveURL
        }
        const url = urlMapper[type];

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
                                            { ...initiative }
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
