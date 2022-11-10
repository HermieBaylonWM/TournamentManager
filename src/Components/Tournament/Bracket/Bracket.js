import React, { useState, useEffect, useContext } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import PairBracket from "../PairBracket/PairBracket";
import "./Bracket.css";
import { PlayerContext } from "../../../Context/PlayerContext.js";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
    background: "#abc4ff",
  },
});

function Bracket() {
  const classes = useStyles();

  const { selectedPlayers } = useContext(PlayerContext);
  const seeded16Draw = [1, 16, 8, 9, 5, 12, 4, 13, 3, 14, 6, 11, 7, 10, 2, 15];
  const last8 = [];
  const last4 = [];
  const last2 = [];
  const winner = [];

  const addAutomaticMatchUrl = "http://localhost:5087/api/AddAutomaticMatch";

  // Automatic match call between player1 and player2
  function playMatch(player1, player2) {
    axios.post(`${addAutomaticMatchUrl}/${player1.id}/${player2.id}`);
  }

  function createLast16Brackets(n) {
    var brackets = [];
    for (let i = 0; i < 16; i += 2) {
      brackets.push(
        <PairBracket
          player1={seeded16Draw[i] - 1}
          player2={seeded16Draw[i + 1] - 1}
        ></PairBracket>
      );
    }
    return brackets;
  }

  return (
    <div className="bracket-container">
      <div className="row">
        <div className="bracket-last-16">{createLast16Brackets(8)}</div>
        <div className="bracket-last-8">
          <PairBracket player1={-1} player2={-1}></PairBracket>
          <PairBracket player1={-1} player2={-1}></PairBracket>
          <PairBracket player1={-1} player2={-1}></PairBracket>
          <PairBracket player1={-1} player2={-1}></PairBracket>
        </div>
        <div className="bracket-last-4">
          <PairBracket player1={-1} player2={-1}></PairBracket>
          <PairBracket player1={-1} player2={-1}></PairBracket>
        </div>
        <div className="bracket-last-2">
          <PairBracket player1={-1} player2={-1}></PairBracket>
        </div>
        <div>
          <TextField
            className="bracket-last-1"
            disabled
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue="Val"
            variant="filled"
            size="small"
            inputProps={{ className: classes.input }}
          />
        </div>
      </div>
    </div>
  );
}

export default Bracket;
