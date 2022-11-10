import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import "./PairBracket.css";
import { PlayerContext } from "../../../Context/PlayerContext.js";
import { makeStyles } from "@material-ui/core/styles";

import { MdOutlinePlayCircleFilled } from "react-icons/md";

const useStyles = makeStyles({
  input: {
    background: "#abc4ff",
  },
});

function PairBracket(props) {
  const { selectedPlayers } = useContext(PlayerContext);
  const player1 = selectedPlayers[props.player1];
  const player2 = selectedPlayers[props.player2];

  const classes = useStyles();

  return (
    <div className="bracket-container">
      <div className="bracket">
        <div>
          <TextField
            disabled
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue={player1 === undefined ? " " : player1.name}
            variant="filled"
            size="small"
            inputProps={{ className: classes.input }}
          />
        </div>
        <div>
          <TextField
            disabled
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue={player2 === undefined ? " " : player2.name}
            variant="filled"
            size="small"
            inputProps={{ className: classes.input }}
          />
        </div>
      </div>
      <div className="play-match-button-container">
        <MdOutlinePlayCircleFilled className="play-match-button"></MdOutlinePlayCircleFilled>
      </div>
    </div>
  );
}

export default PairBracket;
