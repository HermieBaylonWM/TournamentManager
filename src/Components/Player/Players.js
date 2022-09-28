import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TiDelete } from "react-icons/ti";
import { MdUpdate } from "react-icons/md";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import "./Players.css";

function Players() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [selectedName, setSelectedName] = useState("");
  const [selectedPower, setSelectedPower] = useState(-1);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const getAllPlayersUrl = "http://localhost:5087/api/GetAllPlayers";
  const deletePlayerUrl = "http://localhost:5087/api/DeletePlayer/";
  const updatePlayerUrl = "http://localhost:5087/api/UpdatePlayer/";

  // Displays all Players
  axios.get(getAllPlayersUrl).then((response) => {
    setData(response.data);
  });

  // Deletes Player given an id
  const deletePlayer = (id) => {
    axios.delete(`${deletePlayerUrl}${id}`);
    setOpen(false);
  };

  // Updates Player given an id
  const updatePlayer = () => {
    axios.put(
      `${updatePlayerUrl}${selectedId}/${selectedName}/${selectedPower}`
    );
    setOpen2(false);
  };

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
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this player?
            </Typography>
            <div className="players-modal-options">
              <div className="players-modal-delete">
                <Button
                  onClick={() => deletePlayer(selectedId)}
                  variant="contained"
                  color="warning"
                >
                  Delete
                </Button>
              </div>
              <div className="players-modal-cancel">
                <Button onClick={handleClose} variant="contained">
                  Cancel
                </Button>
              </div>
            </div>
          </Box>
        </Modal>

        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              className="players-modal-update-title"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Update Player
            </Typography>
            <div className="players-modal-update-name">
              <p>Name: </p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
              />
            </div>
            <div className="players-modal-update-power">
              <p>Power: </p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={selectedPower}
                onChange={(e) => setSelectedPower(e.target.value)}
              />
            </div>
            <div className="players-modal-options">
              <div className="players-modal-update">
                <Button
                  onClick={() => updatePlayer()}
                  variant="contained"
                  color="success"
                >
                  Update
                </Button>
              </div>
              <div className="players-modal-cancel">
                <Button onClick={handleClose2} variant="contained">
                  Cancel
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>

      <h1 className="players-title">Player List</h1>
      <TableContainer className="players-container">
        <Table>
          <TableHead className="players-table-head">
            <TableRow>
              <TableCell>PLAYER</TableCell>
              <TableCell>RATING</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>RECORD</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((player) => (
              <TableRow key={player.id} className="players-row">
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.rating}</TableCell>
                <TableCell>{player.id}</TableCell>
                <TableCell>
                  <Button variant="contained">View</Button>
                </TableCell>
                <TableCell className="players-last-row">
                  <div className="players-delete-update">
                    <TiDelete
                      className="players-delete-icon"
                      onClick={() => setOpen(true)}
                      onMouseEnter={() => setSelectedId(player.id)}
                    ></TiDelete>
                    <MdUpdate
                      className="players-update-icon"
                      onClick={() => setOpen2(true)}
                      onMouseEnter={() => {
                        setSelectedId(player.id);
                        setSelectedName(player.name);
                        setSelectedPower(player.power);
                      }}
                    ></MdUpdate>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Players;
