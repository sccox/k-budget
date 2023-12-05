import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Autocomplete,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import configureHeaders from "./functions/headerConfiguration";
import RuleModal from "./RuleModal";
import RuleListModal from "./RuleListModal";
const objs = [
  {
    "Transaction Date": "11/16/2023",
    "Post Date": "11/17/2023",
    Description: "COSTCO GAS #0770",
    Category: "Gas",
    Type: "Sale",
    Amount: "-45.84",
    Memo: "",
  },
  {
    "Transaction Date": "11/15/2023",
    "Post Date": "11/15/2023",
    Description: "Payment Thank You-Mobile",
    Category: "",
    Type: "Payment",
    Amount: "496.61",
    Memo: "",
  },
  {
    "Transaction Date": "11/09/2023",
    "Post Date": "11/12/2023",
    Description: "MORTYS CAR WASH",
    Category: "Automotive",
    Type: "Sale",
    Amount: "-11.00",
    Memo: "",
  },
  {
    "Transaction Date": "11/08/2023",
    "Post Date": "11/09/2023",
    Description: "COSTCO GAS #0770",
    Category: "Gas",
    Type: "Sale",
    Amount: "-40.94",
    Memo: "",
  },
  {
    "Transaction Date": "11/07/2023",
    "Post Date": "11/08/2023",
    Description: "COSTCO WHSE #0770",
    Category: "Shopping",
    Type: "Sale",
    Amount: "-69.29",
    Memo: "",
  },
  {
    "Transaction Date": "11/07/2023",
    "Post Date": "11/08/2023",
    Description: "COSTCO WHSE #0770",
    Category: "Shopping",
    Type: "Sale",
    Amount: "-2.15",
    Memo: "",
  },
  {
    "Transaction Date": "11/07/2023",
    "Post Date": "11/08/2023",
    Description: "Amazon.com*0S7E000C3",
    Category: "Shopping",
    Type: "Sale",
    Amount: "-69.70",
    Memo: "",
  },
  {
    "Transaction Date": "11/06/2023",
    "Post Date": "11/08/2023",
    Description: "HARRISVILLE DI",
    Category: "Shopping",
    Type: "Sale",
    Amount: "-4.50",
    Memo: "",
  },
  {
    "Transaction Date": "11/07/2023",
    "Post Date": "11/08/2023",
    Description: "COSTCO GAS #0770",
    Category: "Gas",
    Type: "Sale",
    Amount: "-57.12",
    Memo: "",
  },
  {
    "Transaction Date": "11/04/2023",
    "Post Date": "11/05/2023",
    Description: "DOLLAR TREE",
    Category: "Shopping",
    Type: "Sale",
    Amount: "-2.68",
    Memo: "",
  },
];

export default function SortTable({ objects }) {
  const [headers, setHeaders] = React.useState(null);
  const [rules, setRules] = React.useState([
    {
      column: "Description",
      operator: "equals",
      value: "COSTCO GAS #0770",
      category: "Gas",
    },
    {
      column: "Description",
      operator: "contains",
      value: "COSTCO WHSE #0770",
      category: "Groceries",
    },
  ]);

  const [rows, setRows] = React.useState(
    objs
      .map((v) => ({ ...v, set_cat: null, rule_cat: null }))
      .sort(function (a, b) {
        if (a.Description < b.Description) {
          return -1;
        }
        if (a.Description > b.Description) {
          return 1;
        }
        return 0;
      })
  );

  function applyCategory(item, index) {
    // text += index + ": " + item + "<br>";
    let selectedRows = [];
    if (item.operator === "equals") {
      selectedRows = rows.filter((x) => x[item.column] === item.value);
      selectedRows.map((v) => (v.rule_cat = item.category));
    }
    return selectedRows;
  }
  const applyRules = (newRules) => {
    newRules.forEach(applyCategory);
  };
  useEffect(() => {
    console.log("USEEFFECT");
    applyRules(rules);
    if (headers === null) {
      setHeaders(configureHeaders(rows));
    }
  }, [headers, rules]);

  useEffect(() => {
    console.log("rowsuseeffect");
  }, [rows]);

  const [open, setOpen] = React.useState(false);
  const [column, setColumn] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const handleOpen = (col, val) => {
    setColumn(col);
    setValue(val);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [openAll, setOpenAll] = useState(true);
  const handleOpenAll = (col, val) => {
    setOpen(true);
  };
  const handleCloseAll = () => setOpen(false);

  const handleUpdateCategory = (index, v) => {
    console.log("test");
    const updatedRows = structuredClone(rows);
    updatedRows[index].set_cat = v;
    console.log(updatedRows);
    setRows(updatedRows);
  };

  return (
    <>
      {open && (
        <RuleModal
          open={open}
          handleClose={handleClose}
          col={column}
          val={value}
        />
      )}

      {openAll && (
        <RuleListModal
          open={openAll}
          handleClose={handleCloseAll}
          rules={rules}
        />
      )}

      <Button
        variant="contained"
        size="small"
        sx={{ my: 1, textTransform: "none" }}
        endIcon={<GavelIcon />}
      >
        View Rules
      </Button>
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
                {headers.map(
                  (row, index) =>
                    ["rule_cat", "set_cat"].includes(row.original) ===
                      false && (
                      <TableCell>
                        <div>
                          <strong>
                            {row.original}
                            <Button size="small" color="error">
                              Button
                            </Button>
                          </strong>
                          <br />
                        </div>
                      </TableCell>
                    )
                )}
                <TableCell>Assigned Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.keys(item).map((key) =>
                    [
                      "Description",
                      "Amount",
                      "Memo",
                      "Type",
                      "Category",
                    ].includes(key) ? (
                      <TableCell align="left">
                        <Tooltip
                          title={`Create a rule for transactions with this ${key}`}
                        >
                          <IconButton
                            aria-label="delete"
                            color="primary"
                            onClick={() => handleOpen(key, item[key])}
                          >
                            <GavelIcon />
                          </IconButton>
                        </Tooltip>
                        {item[key]}
                      </TableCell>
                    ) : (
                      ["rule_cat", "set_cat"].includes(key) === false && (
                        <TableCell align="left">{item[key]}</TableCell>
                      )
                    )
                  )}
                  <TableCell>
                    <Tooltip
                      title={
                        item.set_cat !== null
                          ? `This item's category (${item.set_cat}) was set manually by you.`
                          : item.rule_cat !== null
                          ? `This item's category (${item.rule_cat}) was set automatically based on your rules. Click another option to override.`
                          : "You have not selected an option and no rule currently applies to this row."
                      }
                      placement="left"
                    >
                      <Autocomplete
                        size="small"
                        // freeSolo
                        // disablePortal
                        id={`${index}-combo-box-demo`}
                        value={
                          item.set_cat === null
                            ? categories[
                                categories.findIndex((x) => x === item.rule_cat)
                              ]
                            : categories[
                                categories.findIndex((x) => x === item.set_cat)
                              ]
                        }
                        onChange={(e, v) => {
                          handleUpdateCategory(index, v);
                        }}
                        options={categories}
                        sx={{ width: 300, display: "inline-block" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Category" />
                        )}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  );
}

const categories = ["Groceries", "Shopping", "Car", "Gas", "Transfer"];
