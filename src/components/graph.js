import React from "react";
import ReactFlow from "react-flow-renderer";

const Graph = () => {
  const elements = [
    {
      id: "1",
      type: "input", // input node
      data: { label: "X1" },
      position: { x: 100, y: 100 },
      sourcePosition: "right",
    },
    {
      id: "2",
      type: "input", // input node
      data: { label: "X2", value: [1, 2, 3, 4, 5] },
      position: { x: 100, y: 150 },
      sourcePosition: "right",
    },
    {
      id: "3",
      type: "input", // input node
      data: { label: "X3" },
      position: { x: 100, y: 200 },
      sourcePosition: "right",
    },
    {
      id: "4",
      data: { label: <div>linear fn</div> },
      position: { x: 350, y: 150 },
      sourcePosition: "right",
      targetPosition: "left",
    },
    {
      id: "5",
      type: "output", // output node
      data: { label: "Output Node" },
      position: { x: 650, y: 150 },
      targetPosition: "left",
    },
    // animated edge
    { id: "e1-4", source: "1", target: "4", animated: true },
    { id: "e2-4", source: "2", target: "4", animated: true },
    { id: "e3-4", source: "3", target: "4", animated: true },
    { id: "e4-5", source: "4", target: "5", animated: true },
  ];

  const handleNodeClick = (event, element) => {
    if (element.type === "input") {
      console.log(element);
    }
  };

  return (
    <div style={{ height: "80vh", width: "100vw" }}>
      <ReactFlow
        elements={elements}
        nodesDraggable={false}
        onElementClick={handleNodeClick}
      />
    </div>
  );
};

export default Graph;
