import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home/Home.js";
import Players from "./Components/Player/Players";
import Tournaments from "./Components/Tournament/Tournaments";
import AddPlayer from "./Components/Player/AddPlayer";
import AddTournament from "./Components/Tournament/AddTournament";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/players" element={<Players />} />
          <Route exact path="/addplayer" element={<AddPlayer />} />
          <Route exact path="/tournaments" element={<Tournaments />} />
          <Route exact path="/addtournament" element={<AddTournament />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
