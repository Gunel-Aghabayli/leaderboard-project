import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Board = ({ teams }) => {
  const [round16, setRound16] = useState([]);
  const [quarterFinals, setQuarterFinals] = useState([]);
  const [semiFinals, setSemiFinals] = useState([]);
  const [finals, setFinals] = useState([]);
  const [thirdPlaceMatch, setThirdPlaceMatch] = useState([]);
  const [winner, setWinner] = useState(null);
  const [second, setSecond] = useState(null);
  const [third, setThird] = useState(null);

  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    setRound16(teams.slice(0, 16));
    setQuarterFinals([]);
    setSemiFinals([]);
    setFinals([]);
    setThirdPlaceMatch([]);
    setWinner(null);
    setSecond(null);
    setThird(null);
    setConfettiActive(false);
  }, [teams]);

  const handleWinner = (team, roundSetter, nextRoundSetter, isFinal = false, isSemi = false, isThird = false) => {
    roundSetter((prev) => [...prev, team]);

    if (isFinal && finals.length === 2) {
      setWinner(team);
      setSecond(finals.find((t) => t !== team));
      setConfettiActive(true); 
    }

    
    if (isSemi) {
      const loser = semiFinals.find((t) => t !== team);
      setThirdPlaceMatch((prev) => {
        if (!prev.includes(loser)) return [...prev, loser];
        return prev;
      });
    }

  
    if (isThird && thirdPlaceMatch.length === 2) {
      setThird(team);
      setConfettiActive(true);
    }
  };

  const renderMatch = (team1, team2, roundSetter, nextRoundSetter, options = {}) => (
    <div className="match">
      <button onClick={() => handleWinner(team1, roundSetter, nextRoundSetter, options.isFinal, options.isSemi, options.isThird)}>
        {team1}
      </button>
      <span>vs</span>
      <button onClick={() => handleWinner(team2, roundSetter, nextRoundSetter, options.isFinal, options.isSemi, options.isThird)}>
        {team2}
      </button>
    </div>
  );

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>

      {confettiActive && <Confetti numberOfPieces={300} recycle={false} />}

      <div className="bracket">

        <div className="round">
          <h2>1/8 Final</h2>
          {round16.length === 16 &&
            Array.from({ length: 8 }, (_, i) =>
              renderMatch(round16[i*2], round16[i*2+1], setQuarterFinals, quarterFinals)
            )}
        </div>

        <div className="round">
          <h2>1/4 Final</h2>
          {quarterFinals.length >= 2 &&
            Array.from({ length: 4 }, (_, i) =>
              renderMatch(quarterFinals[i*2], quarterFinals[i*2+1], setSemiFinals, semiFinals)
            )}
        </div>

        <div className="round">
          <h2>Yarımfinal</h2>
          {semiFinals.length >= 2 &&
            Array.from({ length: 2 }, (_, i) =>
              renderMatch(semiFinals[i*2], semiFinals[i*2+1], setFinals, finals, { isSemi: true })
            )}
        </div>

        <div className="round">
          <h2>Final</h2>
          {finals.length === 2 &&
            renderMatch(finals[0], finals[1], setFinals, [], { isFinal: true })
          }
        </div>

        <div className="round">
          <h2>3-cü Yer</h2>
          {thirdPlaceMatch.length === 2 &&
            renderMatch(thirdPlaceMatch[0], thirdPlaceMatch[1], setThirdPlaceMatch, [], { isThird: true })
          }
        </div>

      </div>

      {winner && (
        <div className="results">
          <h2>Champion: {winner}</h2>
          <p>Second place: {second}</p>
          <p>Third place: {third}</p>
        </div>
      )}
    </div>
  );
};

export default Board;
