import React, { useState, useEffect } from "react";

import {ChevronRight} from "@styled-icons/evaicons-solid/ChevronRight";
import {ChevronDown} from "@styled-icons/evaicons-solid/ChevronDown";
import { Col, Row } from "react-bootstrap";

import {
  Collapse,
  StyledName,
  VerticalLine,
} from "../Tree.style";
import { StyledNode } from "./TreeNode.style";

import { useTreeContext } from "../state/TreeContext";


const NodeName = ({ isOpen, name, handleClick }) => (
  <StyledName onClick={handleClick} className="employee_name">
    {isOpen ? <ChevronDown /> : <ChevronRight />}
    &nbsp;&nbsp;{name}
  </StyledName>
);

const Node = ({ id, name, children, node, job_grade, department, staff_no, designation }) => {
  const { onNodeClick } = useTreeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [childs, setChilds] = useState([]);
  

  useEffect(() => {
    setChilds([children]);
  }, [children]);


  const handleNodeClick = React.useCallback(
    (event) => {
      event.stopPropagation();
      onNodeClick({ node });
    },
    [node]
  );

  return (
    <StyledNode id={id} onClick={handleNodeClick} className="tree__node">
      <VerticalLine>
        <div className="org_row">
          <Row>
            <Col>
              <NodeName
                name={name}
                isOpen={isOpen}
                handleClick={() => setIsOpen(!isOpen)}
              />
            </Col>

            <Col className="employee_details">
              <Row>
                <Col className="employee_detail"><span>{ designation }</span></Col>
                <Col className="employee_detail"><span>{ job_grade }</span></Col>
                <Col className="employee_detail"><span>{ staff_no }</span></Col>
                <Col className="employee_detail"><span>{department?department: '\"'}</span></Col>
              </Row>
              
            </Col>

            </Row>
            
        </div>
        <Collapse className="tree__node--collapsible" isOpen={isOpen}>
          {childs}
        </Collapse>
      </VerticalLine>
    </StyledNode>
  );
};

export { Node, NodeName };
