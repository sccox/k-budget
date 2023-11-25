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
} from "@mui/material";
import configureHeaders from "./functions/headerConfiguration";

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
  const [rows, setRows] = useState(
    objs.sort(function (a, b) {
      if (a.Description < b.Description) {
        return -1;
      }
      if (a.Description > b.Description) {
        return 1;
      }
      return 0;
    })
  );

  useEffect(() => {
    console.log(
      objs.sort(function (a, b) {
        if (a.Description < b.Description) {
          return -1;
        }
        if (a.Description > b.Description) {
          return 1;
        }
        return 0;
      })
    );
    if (headers === null) {
      setHeaders(configureHeaders(rows));
    }
  }, [headers, rows]);
  return (
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
                      <Button size="small" color="error">
                        Button
                      </Button>
                    </strong>
                    <br />
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
  );
}