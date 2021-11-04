import React from "react";
import { CSVReader } from "react-papaparse";

const FileUpload = (props) => {
  const { onFileUpload, onFileRemove } = props;

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    if (onFileRemove) {
      onFileRemove();
    }
  };

  const handleOnDrop = (data, meta) => {
    if (onFileUpload) {
      const dataMatrix = toMatrix(data);
      onFileUpload(dataMatrix, data, meta);
    }
  };

  const toMatrix = (data) => {
    return data.map((item) => item.data);
  };

  return (
    <CSVReader
      onDrop={handleOnDrop}
      onError={handleOnError}
      addRemoveButton
      onRemoveFile={handleOnRemoveFile}
    >
      <span>Drop CSV file here or click to upload.</span>
    </CSVReader>
  );
};

export default FileUpload;
