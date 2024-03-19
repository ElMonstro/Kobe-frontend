import React, { useState, useEffect } from "react";

import {CaretDown} from "@styled-icons/boxicons-regular/CaretDown";
import {CaretRight} from "@styled-icons/boxicons-regular/CaretRight";
import { Col, Row } from "react-bootstrap";

import {
  Collapse,
  StyledName,
  VerticalLine,
} from "../Tree.style";
import { StyledNode } from "./TreeNode.style";

import { useTreeContext } from "../state/TreeContext";

const NodeName = ({ isOpen, name, openCloseNode, handleNameClick, isHighligted }) => {

  useEffect(() => {
  }, [isHighligted])
  let className;
  isHighligted? className = "employee_name highlighted": className="employee_name";

  return <StyledName className={className}>
    {isOpen ? <CaretDown onClick={openCloseNode} /> : <CaretRight onClick={openCloseNode} />}
    &nbsp;&nbsp;
    <span onClick={handleNameClick}>
       {name} 
    </span>
  </StyledName>
};

const Node = ({ id, name, children, node, job_grade, department, staff_no, designation, isHighligted }) => {
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
    <StyledNode id={id} className="tree__node">
      <VerticalLine>
        <div className="org_row">
          <Row>
            <Col>
              <NodeName
                name={name}
                isOpen={isOpen}
                openCloseNode={() => setIsOpen(!isOpen)}
                handleNameClick={handleNodeClick}
                isHighligted={isHighligted}
              />
            </Col>

            <Col className="employee_details">
              <Row>
                <Col className="employee_detail"><span>{ designation }</span></Col>
                <Col className="employee_detail"><span>{ job_grade }</span></Col>
                <Col className="employee_detail"><span>{ staff_no }</span></Col>
                <Col className="employee_detail"><span>{department || '\"'}</span></Col>
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
