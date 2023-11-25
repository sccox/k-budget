import * as React from "react";

import {
  Typography,
  Autocomplete,
  Modal,
  Button,
  Box,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function RuleModal({ column, value, open, handleClose }) {
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
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
          <Typography>Any transaction where column:</Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={cols}
            sx={{ width: 300, mt: 1 }}
            renderInput={(params) => <TextField {...params} label="Column" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={operators}
            sx={{ width: 300, mt: 1 }}
            renderInput={(params) => <TextField {...params} label="Operator" />}
          />
          <TextField
            id="outlined-basic"
            sx={{ width: 300, mt: 1 }}
            label="Value"
            variant="outlined"
          />
        </Box>
      </Modal>
    </div>
  );
}

const cols = [{ label: "Memo" }, { label: "Description" }, { label: "Amount" }];

const operators = [{ label: "equals" }, { label: "contains" }];
