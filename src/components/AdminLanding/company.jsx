import React from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import defaultLogo from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom";
import { WindowEdit } from "styled-icons/fluentui-system-regular";
import { connect } from "react-redux";
import { setCompanyInfo, setShowEditCompany } from "../../redux/actions";
import { Settings } from "styled-icons/evaicons-solid";
import { BASE_CLOUDINARY_URL } from "../../services/baseURL";


const Company = ({ logo, name, rest_server,  grpc_server, id, email_domain, setShowEditCompany, setCompanyInfo }) => {

    const navigate = useNavigate();
    const handleEditCompany = () => {
        setCompanyInfo({logo, name, rest_server, grpc_server, email_domain, id});
        setShowEditCompany(true);
    }
       
    return (
        <div className="company">
            <Row> 
                <Col>
                    <div className="company_logo">
                        <img  src={logo? BASE_CLOUDINARY_URL + logo: defaultLogo } alt="logo"/>
                    </div>
                </Col> 
                <Col >
                    <span>
                        { name }
                    </span> 
                </Col>
                <Col>
                    <span>
                        { rest_server }
                    </span> 
                </Col>
                <Col>
                    <span>
                        { grpc_server }
                    </span>
                
                </Col>

                <Col>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip id="edit">
                                Edit Company 👀 👀 
                            </Tooltip>
                        }
                    >
                        <span className="actions" onClick={ handleEditCompany }>
                        <WindowEdit />
                    </span>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip id="settings">
                                Configure Company (Admin Dashboard)
                            </Tooltip>
                        }
                    >
                        <span className="actions" onClick={ () => navigate(`/${id}/admin`)}>
                            <Settings />
                        </span>

                    </OverlayTrigger>
                    
                </Col>


            </Row>
        </div>
    )
};

const mapDispatchToProps = {
    setShowEditCompany,
    setCompanyInfo
}

const mapStateToProps = ({adminReducer: { showEditCompany, companyInfo }}) => ({
    showEditCompany,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (Company);
