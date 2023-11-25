import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Button, Alert, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ClearIcon from "@mui/icons-material/Clear";
const optionsAccepted = [
  "Transaction Date",
  "Posts Date",
  "Description",
  "Category",
  "Type",
  "Amount",
  "Memo",
  "Account Balance",
];

const optionsRequired = ["Transaction Date", "Description", "Amount"];

export default function PreviewTable({ objects }) {
  const [headers, setHeaders] = React.useState(null);
  const [value, setValue] = React.useState(optionsAccepted[0]);
  const [inputValue, setInputValue] = React.useState("");
  const [alerts, setAlerts] = React.useState([]);
  const [rows, setRows] = React.useState(objects.slice(0, 10));

  const deleteColumn = (col) => {
    setHeaders(headers.filter((x) => x.original !== col));
    let newObj = rows.map((x) =>
      Object.keys(x)
        .filter((key) => key !== col)
        .reduce((acc, key) => {
          acc[key] = x[key];
          return acc;
        }, {})
    );
    setRows(newObj);
  };

  function checkDuplicateHeaders(headerList) {
    let checkList = headerList
      .filter((x) => x.new !== undefined)
      .map((x) => x.new);
    let checklistSet = new Set(checkList);

    if (checklistSet.size < checkList.length) {
      return true;
    } else {
      return false;
    }
  }

  function checkRequiredHeaders(newMapping) {
    let exisingList = newMapping.map((x) => x.new);
    if (optionsRequired.every((v) => exisingList.includes(v)) === false) {
      return true;
    } else {
      return false;
    }
  }

  const handleAlerts = (headers) => {
    let newAlerts = [];
    if (checkDuplicateHeaders(headers)) {
      newAlerts.push("Each column must be unique.");
    }
    if (checkRequiredHeaders(headers)) {
      newAlerts.push(`Columns must include ${JSON.stringify(optionsRequired)}`);
    }
    newAlerts = [...new Set(newAlerts)];
    setAlerts(newAlerts);
  };

  function headerNewAssignments(original) {
    if (optionsAccepted.includes(original)) {
      return original;
    }
    return undefined;
  }

  const adjustHeaderValues = (original, newValue) => {
    let newMapping = headers.map((el) =>
      el.original === original ? { ...el, new: newValue } : el
    );
    setHeaders(newMapping);
    // handleAlerts(newMapping);
  };

  const handleHeaderSettings = () => {
    let h = Object.keys(Object.assign({}, ...rows));
    let newList = [];
    h.forEach(function (entry) {
      let obj = {};
      obj["original"] = entry;
      obj["new"] = headerNewAssignments(entry);
      newList.push(obj);
    });
    setHeaders(newList);
    // handleAlerts(newList);
  };

  React.useEffect(() => {
    if (headers === null) {
      handleHeaderSettings();
    }
    handleAlerts(headers);
  }, [headers, rows]);

  return (
    <>
      {alerts.length > 0 && (
        <Alert variant="outlined" severity="error" sx={{ mt: 1 }}>
          {alerts.map((row) => (
            <Typography textAlign="left">{row}</Typography>
          ))}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ height: 500 }}>
        {headers && (
          <Table
            stickyHeader
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            size="small"
          >
            <TableHead>
              <TableRow>
                {headers.map((row, index) => (
                  <TableCell>
                    <div>
                      <strong>
                        {row.original}
                        <Button
                          size="small"
                          color="error"
                          onClick={() => deleteColumn(row.original)}
                        >
                          <ClearIcon />
                        </Button>
                      </strong>
                      <br />
                      <Autocomplete
                        value={row.new}
                        onChange={(event, newValue) => {
                          adjustHeaderValues(row.original, newValue);
                        }}
                        id={index}
                        options={optionsAccepted}
                        size="small"
                        sx={{ minWidth: 180, mt: 1 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Column"
                            error={
                              row.new === undefined ||
                              headers.filter((x) => x.new === row.new).length >
                                1
                            }
                            helperText={row.new === undefined && "Select field"}
                          />
                        )}
                      />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.values(item).map((val) => (
                    <TableCell align="left">{val}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  );
}
