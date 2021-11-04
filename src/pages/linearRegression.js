import React, { useState } from "react";
import FileUpload from "../components/fileUpload";
import Graph from "../components/graph";
import Table from "../components/table";

const LinearRegression = () => {
  const [data, setData] = useState(undefined);

  const onFileUpload = (matrixData) => {
    setData(matrixData);
  };

  return (
    <main>
      <FileUpload onFileUpload={onFileUpload} />
      <h2>Sample data</h2>
      <Table data={data} />
      <Graph />
    </main>
  );
};

export default LinearRegression;
