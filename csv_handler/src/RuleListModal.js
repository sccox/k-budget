import * as React from "react";

import {
  Typography,
  Autocomplete,
  Modal,
  Button,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
export default function RuleListModal({
  open,
  handleClose,
  handleOpen,
  rules,
}) {
  console.log(rules);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Transaction Rule
          </Typography>
          {rules.map((row, index) => (
            <Grid container>
              <Grid item sx={{ mt: 2 }}>
                <Autocomplete
                  disablePortal
                  value={row.column}
                  id="combo-box-demo"
                  options={cols}
                  sx={{ width: 200, mr: 1, display: "inline-block" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Column" />
                  )}
                />
                <Autocomplete
                  disablePortal
                  defaultValue={row.operator}
                  id="combo-box-demo2"
                  options={operators}
                  sx={{ width: 200, mr: 1, display: "inline-block" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Operator" />
                  )}
                />
                <TextField
                  id="outlined-basic"
                  sx={{ width: 200, display: "inline-block" }}
                  label="Value"
                  variant="outlined"
                  defaultValue={row.value}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo2"
                  value={row.category}
                  options={categories}
                  sx={{ width: 200, display: "inline-block" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Category" />
                  )}
                />
              </Grid>
              {/* <Grid item>
                  <TextField label="Outlined" variant="outlined" />
                </Grid> */}

              <Grid item alignItems="stretch" style={{ display: "flex" }}>
                <Button color="error" sx={{ mt: 2 }}>
                  <ClearIcon />
                </Button>
              </Grid>
            </Grid>
          ))}
          <br />
          <Button
            variant="outlined"
            sx={{ mr: 1, mt: 1, textTransform: "none" }}
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{ mr: 1, mt: 1, textTransform: "none" }}
          >
            Apply and Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

const cols = ["Description", "Amount", "Type", "Memo", "Category"];

const operators = ["equals", "contains"];

const categories = ["Gas", "Groceries"];
