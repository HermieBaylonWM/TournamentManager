import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <>
      <h1 className="home-title">Tournament Manager</h1>
      <ul className="home-options">
        <li className="home-option">
          <Link className="home-option-text" to="/addplayer">
            Add Player
          </Link>
        </li>
        <li className="home-option">
          <Link className="home-option-text" to="/players">
            View Players
          </Link>
        </li>
        <li className="home-option">
          <Link className="home-option-text" to="/addtournament">
            Add Tournament
          </Link>
        </li>
        <li className="home-option">
          <Link className="home-option-text" to="/tournaments">
            View Tournaments
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Home;
