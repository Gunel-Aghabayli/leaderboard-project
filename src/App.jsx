import React, { useState } from "react";
import Admin from "./Pages/Admin";
import Board from "./Pages/Board";
import "./assets/scss/index.scss";

const App = () => {
  const [teams, setTeams] = useState([
    "Real Madrid",
    "Man City",
    "Lyon",
    "Juventus",
    "Napoli",
    "Barcelona",
    "Chelsea",
    "Bayern",
    "Tottenham",
    "Leipzig",
    "Atletico",
    "Liverpool",
    "Atalanta",
    "Valencia",
    "Dortmund",
    "PSG",
  ]);

  return (
    <div className="app">
    <Board teams={teams} />
      <Admin teams={teams} setTeams={setTeams} />
      
    </div>
  );
};

export default App;
