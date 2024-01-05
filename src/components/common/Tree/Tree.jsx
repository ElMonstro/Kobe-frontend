import React, { useReducer, useLayoutEffect } from "react";
import { v4 } from "uuid";
import { ThemeProvider } from "styled-components";

import { useDidMountEffect } from "../../../utils/treeUtils";
import { TreeContext, reducer } from "./state";

import { StyledTree } from "../Tree/Tree.style";
import { Node } from "../Tree/Node/TreeNode";
import "./tree.scss";
import { C } from "styled-icons/simple-icons";


const Tree = ({ children, data, onNodeClick, onUpdate, currentNode }) => {
  const [state, dispatch] = useReducer(reducer, data);
  useLayoutEffect(() => {
    dispatch({ type: "SET_DATA", payload: data });
  }, [data]);

  useDidMountEffect(() => {
    onUpdate && onUpdate(state);
  }, [state]);

  const isImparative = data && !children;

  return (
    <ThemeProvider theme={{ indent: 10 }}>
      <TreeContext.Provider
        value={{
          isImparative,
          state,
          dispatch,
          onNodeClick: (node) => {
            onNodeClick && onNodeClick(node);
          },
        }}
      >
        <StyledTree>
          {isImparative ? (
            <TreeRecursive data={state} parentNode={state} currentNode={currentNode} />
          ) : (
            children
          )}
        </StyledTree>
      </TreeContext.Provider>
    </ThemeProvider>
  );
};

const TreeRecursive = ({ data, parentNode, currentNode }) => {
  return data?.map((item) => {
    if (!item) {
      return <></>;
    }
    
    const isHighligted = item?.user?.email === currentNode?.user?.email;
    item.parentNode = parentNode;

    if (!parentNode) {
      item.parentNode = data;
    }

    if (!item.id) {
      item.id = v4();
    }

    const name = item?.user?.first_name + " " + item?.user?.second_name

    return (
      <Node 
        key={item.id} 
        designation={item.code} 
        job_grade={item.job_grade} 
        id={item.id}
        department={item.department?.name}
        name={name}
        staff_no={item.staff_no} 
        node={item}
        isHighligted={isHighligted}
      >
        <TreeRecursive key={item.id} parentNode={item} data={item.underlings} currentNode={currentNode}/>
      </Node>
    );
  });
};

Tree.Node = Node;

export default Tree;
