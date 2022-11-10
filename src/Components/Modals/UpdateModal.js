import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function UpdateModal(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal open={props.openUpdateModal} onClose={props.closeUpdateModal}>
      <Box sx={style}>
        <Typography className="players-modal-update-title" component="h2">
          Update Player
        </Typography>
        <div className="players-modal-update-name">
          <p>Name: </p>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={props.selectedName}
            onChange={(e) => props.setSelectedName(e.target.value)}
          />
        </div>
        <div className="players-modal-update-power">
          <p>Skill Level: </p>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={props.selectedPower}
            onChange={(e) => props.setSelectedPower(e.target.value)}
          />
        </div>
        <div className="players-modal-options">
          <div className="players-modal-update">
            <Button
              onClick={() => props.updatePlayer()}
              variant="contained"
              color="success"
            >
              Update
            </Button>
          </div>
          <div className="players-modal-cancel">
            <Button onClick={props.closeUpdateModal} variant="contained">
              Cancel
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default UpdateModal;
