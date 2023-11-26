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
  width: 650,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function RuleModal({ col, val, open, handleClose, handleOpen }) {
  const [column, setColumn] = React.useState(col);
  const [value, setValue] = React.useState(val);

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
          <Typography>Any transaction where column:</Typography>
          <Autocomplete
            disablePortal
            value={col ? col : cols[1]}
            id="combo-box-demo"
            options={cols}
            sx={{ width: 200, mt: 1, mr: 1, display: "inline-block" }}
            renderInput={(params) => <TextField {...params} label="Column" />}
          />
          <Autocomplete
            disablePortal
            defaultValue={operators[0]}
            id="combo-box-demo2"
            options={operators}
            sx={{ width: 200, mt: 1, mr: 1, display: "inline-block" }}
            renderInput={(params) => <TextField {...params} label="Operator" />}
          />
          <TextField
            id="outlined-basic"
            sx={{ width: 200, mt: 1, display: "inline-block" }}
            label="Value"
            variant="outlined"
            defaultValue={val}
          />
          <Typography sx={{ mt: 2 }}>Will be categorized as:</Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo2"
            options={categories}
            sx={{ width: 200, mt: 1, mr: 1, display: "inline-block" }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          <br />
          <Button
            variant="outlined"
            sx={{ mr: 1, mt: 1, textTransform: "none" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            sx={{ mr: 1, mt: 1, textTransform: "none" }}
          >
            Apply Once
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
