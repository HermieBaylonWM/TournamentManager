import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home.js";
import Players from "./Components/Player/Players/Players";
import Tournaments from "./Components/Tournament/Tournaments/Tournaments";
import AddPlayer from "./Components/Player/AddPlayer/AddPlayer";
import AddTournament from "./Components/Tournament/AddTournament/AddTournament";
import Bracket from "./Components/Tournament/Bracket/Bracket";
import PairBracket from "./Components/Tournament/PairBracket/PairBracket";
import { PlayerContext } from "./Context/PlayerContext.js";
import Player from "./Objects/Player.js";
import axios from "axios";

function App() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayersCount, setSelectedPlayersCount] = useState();

  const [selectedPlayers, setSelectedPlayers] = useState([]);

  // Displays all Players
  const getAllPlayersUrl = "http://localhost:5087/api/GetAllPlayers";
  useEffect(() => {
    axios.get(getAllPlayersUrl).then((response) => {
      setPlayers(response.data);
      setSelectedPlayersCount(players.length);
    });
    console.log("calling players");
  }, [players.length]); //players.length

  useEffect(() => {
    for (let item of players) {
      var id = item.id;
      var name = item.name;
      var power = item.power;
      var rating = item.rating;
      var wins = item.wins;
      var losses = item.losses;
      var isSelected = true;
      var player = new Player(
        id,
        name,
        power,
        rating,
        wins,
        losses,
        isSelected
      );
      selectedPlayers.push(player);
    }
  }, [players.length]);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/players" element={<Players />} />
          <Route exact path="/addplayer" element={<AddPlayer />} />
          <Route exact path="/tournaments" element={<Tournaments />} />
          <Route
            exact
            path="/addtournament"
            element={
              <PlayerContext.Provider
                value={{
                  selectedPlayers,
                }}
              >
                <AddTournament />
              </PlayerContext.Provider>
            }
          />
          <Route
            exact
            path="/bracket"
            element={
              <PlayerContext.Provider
                value={{
                  selectedPlayers,
                }}
              >
                <Bracket />
              </PlayerContext.Provider>
            }
          />
          <Route
            exact
            path="/pairbracket"
            element={
              <PlayerContext.Provider
                value={{
                  selectedPlayers,
                }}
              >
                <PairBracket />
              </PlayerContext.Provider>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
