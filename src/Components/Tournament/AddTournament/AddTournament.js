import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./AddTournament.css";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PlayerContext } from "../../../Context/PlayerContext.js";

function AddTournament() {
  const { selectedPlayers } = useContext(PlayerContext);

  const [count, setCount] = useState(selectedPlayers.length);
  const [numberOfParticipants, setNumberOfParticipants] = useState("");
  const handleChangeInNumberOfParticipants = (event) => {
    setNumberOfParticipants(event.target.value);
  };

  function handleCheckedPlayer(event, player) {
    if (event.target.checked) {
      setCount((selectedPlayersCount) => selectedPlayersCount + 1);
    } else {
      setCount((selectedPlayersCount) => selectedPlayersCount - 1);
    }
  }

  let navigate = useNavigate();
  const goToNewBacket = () => {
    navigate("/bracket");
  };

  return (
    <>
      <h1 className="add-tournament--title">Create new Tournament</h1>
      <div className="add-tournament--info">
        <div className="tournament-name">
          <h3>Tournament Name: </h3>
          <TextField id="outlined-basic" variant="outlined" />
        </div>
        <div className="tournament-type">
          <h3>Tournament Type: </h3>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Manual"
              control={<Radio />}
              label="Manual"
            />
            <FormControlLabel
              value="Simulation"
              control={<Radio />}
              label="Simulation"
            />
          </RadioGroup>
        </div>

        <div className="tournament-seeding">
          <h3>Seeding: </h3>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Random"
              control={<Radio />}
              label="Random"
            />
            <FormControlLabel
              value="Seeded"
              control={<Radio />}
              label="Seeded"
            />
          </RadioGroup>
        </div>

        <div className="tournament-number-of-participants">
          <h3>Number of Participants: </h3>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={numberOfParticipants}
            label="Age"
            onChange={handleChangeInNumberOfParticipants}
          >
            <MenuItem value={16}>16</MenuItem>
          </Select>
        </div>

        <div className="tournament-participants">
          <h3>{`Selected Participants (${count})`}</h3>
          <div className="tournament-participants-list">
            {selectedPlayers.map((player) => (
              <div key={player.id} className="tournament-participants-row">
                <Checkbox
                  defaultChecked
                  onChange={(e) => handleCheckedPlayer(e, player)}
                />
                <p>{player.name}</p>
              </div>
            ))}
          </div>
        </div>
        <Button
          className="add-tournament-create-button"
          variant="contained"
          color="success"
          onClick={goToNewBacket}
        >
          CREATE
        </Button>
      </div>
    </>
  );
}

export default AddTournament;
