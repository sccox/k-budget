import React, { useState } from "react";
import GavelIcon from "@mui/icons-material/Gavel";

import { Button, Typography } from "@mui/material";
import SortTable from "./SortTable";
function App() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [uploadLocked, setUploadLocked] = useState(false);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setUploadLocked(true);
    e.preventDefault();
    let newFile = e.target.files[0];
    setFile(newFile);

    if (newFile) {
      fileReader.onload = function (e) {
        const text = e.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(e.target.files[0]);
    }
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const clear = () => {
    setUploadLocked(false);
    setArray([]);
    setFile();
  };

  //  console.log(array)
  //  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h4">Import Preview </Typography>
      <Typography>
        This is your chance to clean up your data before importing it. This is
        really important! Here's a preview.
      </Typography>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={(e) => handleOnChange(e)}
          hidden
        />

        {/* <Button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
          variant="contained"
          size="small"
          sx={{ ml: 1 }}
        >
          Import
        </Button> */}
      </form>

      <label htmlFor="csvFileInput">
        <Button
          variant="contained"
          component="span"
          color="primary"
          disabled={uploadLocked}
          sx={{ textTransform: "none" }}
        >
          Upload
        </Button>
      </label>
      <Button
        onClick={(e) => {
          clear();
        }}
        variant="outlined"
        color="error"
        size="small"
        sx={{ ml: 1, textTransform: "none" }}
      >
        Clear
      </Button>
      <Button
        variant="contained"
        size="small"
        sx={{ ml: 1, textTransform: "none" }}
      >
        Next Step
      </Button>

      <br />

      {/* {array.length > 0 && <PreviewTable objects={array} />} */}
      {/* {array.length > 0 && <SortTable objects={array} />} */}
      <SortTable objects={array} />
    </div>
  );
}

export default App;
