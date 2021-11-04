import React, { useState } from "react";
import FileUpload from "../components/fileUpload";
import Graph from "../components/graph";
import Table from "../components/table";
import "./linearRegression.styles.scss";

const LinearRegression = () => {
  const [data, setData] = useState(undefined);

  const onFileUpload = (matrixData) => {
    setData(matrixData);
  };

  const onFileRemove = () => {
    setData(undefined);
  };

  return (
    <main>
      <FileUpload onFileUpload={onFileUpload} onFileRemove={onFileRemove} />
      <h2>Sample data</h2>
      <Table data={data} />
      <Graph />
    </main>
  );
};

export default LinearRegression;
