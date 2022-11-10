//import "./AddPlayer.css";
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
  const [inputLevel, setInputLevel] = useState("");
  const [confirmation, setConfirmation] = useState("");

  let extractName = (e) => {
    setInputname(e.target.value);
  };

  let extractLevel = (e) => {
    setInputLevel(e.target.value);
  };

  const baseURL = "http://localhost:5087/api/addplayer";

  const submitPlayer = () => {
    axios.post(baseURL, {
      name: inputName,
      power: inputLevel,
    });
    setConfirmation(`${inputName} has been added!!`);
    setInputname("");
    setInputLevel("");
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
            value={inputLevel}
            onChange={extractLevel}
            required
            id="outlined-required"
            label="Skill Level"
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
