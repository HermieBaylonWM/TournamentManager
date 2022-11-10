import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import "./Modals.css";

function RecordsModal(props) {
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

  const winCell = {
    bgcolor: "#acd8aa",
  };

  const lossCell = {
    bgcolor: "#f2ccc3",
  };
  return (
    <Modal open={props.openRecordsModal} onClose={props.closeRecordsModal}>
      <Box sx={style}>
        <Typography id="modal-modal-title" component="h2">
          <div className="records-body">
            <Table>
              <TableHead className="players-table-head">
                <TableRow>
                  <TableCell>{`${props.selectedName}'s Record`}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.selectedWins.map((win) => (
                  <TableRow sx={winCell} key={win.id}>
                    <TableCell>{`${win.opponent} (${win.winnerScore} - ${win.losserScore})`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableBody>
                {props.selectedLosses.map((loss) => (
                  <TableRow sx={lossCell} key={loss.id}>
                    <TableCell>{`${loss.opponent} (${loss.losserScore} - ${loss.winnerScore})`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Typography>
        <div className="players-modal-options">
          <div className="players-modal-cancel">
            <Button onClick={props.closeRecordsModal} variant="contained">
              Exit
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default RecordsModal;
