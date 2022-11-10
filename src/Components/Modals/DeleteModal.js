import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

function DeleteModal(props) {
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
    <Modal open={props.openDeleteModal} onClose={props.closeDeleteModal}>
      <Box sx={style}>
        <Typography component="h2">
          Are you sure you want to delete this player?
        </Typography>
        <div className="players-modal-options">
          <div className="players-modal-delete">
            <Button
              onClick={() => props.deletePlayer(props.selectedId)}
              variant="contained"
              color="warning"
            >
              Delete
            </Button>
          </div>
          <div className="players-modal-cancel">
            <Button onClick={props.closeDeleteModal} variant="contained">
              Cancel
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
