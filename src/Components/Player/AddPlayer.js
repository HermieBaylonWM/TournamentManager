import "./AddPlayer.css";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { stepButtonClasses } from "@mui/material";
import axios from "axios";

function AddPlayer() {
  const [inputName, setInputname] = useState("");
  const [inputPower, setInputPower] = useState("");
  const [confirmation, setConfirmation] = useState("");

  let extractName = (e) => {
    setInputname(e.target.value);
  };

  let extractPower = (e) => {
    setInputPower(e.target.value);
  };

  const baseURL = "http://localhost:5087/api/addplayer";

  const submitPlayer = () => {
    axios.post(baseURL, {
      name: inputName,
      power: inputPower,
    });
    setConfirmation(`${inputName} has been added!!`);
    setInputname("");
    setInputPower("");
  };

  return (
    <div>
      <h1 className="add-player-title">Add Player</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="add-player-form">
          <TextField
            value={inputName}
            onChange={extractName}
            required
            id="outlined-required"
            label="Name"
          />
          <TextField
            value={inputPower}
            onChange={extractPower}
            required
            id="outlined-required"
            label="Power"
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue="Rating: 1000"
          />
        </div>
        <div className="add-player-button-container">
          <Button onClick={submitPlayer} variant="contained">
            Add
          </Button>
        </div>
        <h1 className="add-player-confirmation">{confirmation}</h1>
      </Box>
    </div>
  );
}

export default AddPlayer;
