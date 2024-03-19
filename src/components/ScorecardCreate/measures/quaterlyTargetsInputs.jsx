import React from "react";
import { connect } from "react-redux";

import { Row, Col } from "react-bootstrap"
import { FieldArray } from "formik";
import QuaterlyTargetInput from "./quarterlyTargetInput";

const QuaterlyTargetInputs = ({ formik, periods }) => {

    const periodHalfLength = periods.length / 2;

    return (
        <FieldArray name="period_targets" render={ () => {
            return (
                <Row className="inputs_row period_target">
                    <Col>
                        {
                            formik.values.period_targets?.slice(0, periodHalfLength)?.map(
                                (period, index) => {
                                    return <QuaterlyTargetInput 
                                                period={ period }
                                                index={ index }
                                                formik={ formik }
                                                key={ index }
                                            />
                            }) 
                        }
                    </Col>
                    <Col>
                        {
                            formik.values.period_targets?.slice(periodHalfLength)?.map(
                                (period, index) => {
                                    index = index + periodHalfLength;
                                    return <QuaterlyTargetInput 
                                                period={ period }
                                                index={ index }
                                                formik={ formik }
                                                key={ index }
                                            />
                            })
                        }
                    </Col>
                </Row>
            )
        }}
           
        />
        );
}

const mapDispatchToProps = {
}

const mapStateToProps = ({ adminReducer: { periods }, }) => ({
    periods,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (QuaterlyTargetInputs);
