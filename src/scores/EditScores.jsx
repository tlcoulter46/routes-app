import React, { useState, useEffect } from 'react';
import "./scores.css";
import { HiH3 } from 'react-icons/hi2';

const EditScores = ({ players, handleScoreChange, clearTrigger }) => {
  // Par values for holes 1-9
  const parValues = [4, 5, 4, 3, 4, 5, 4, 3, 4];
  const totalPar = parValues.reduce((sum, par) => sum + par, 0);
  const [scores, setScores] = useState(
    Array(4).fill().map(() => Array(9).fill(''))
  );

  // Clear local scores when clearTrigger changes
  useEffect(() => {
    setScores(Array(4).fill().map(() => Array(9).fill('')));
  }, [clearTrigger]);

  // Update the score change handler to work with local state
  const handleLocalScoreChange = (playerIdx, holeIdx, value) => {
    if (value <= parValues[holeIdx] * 2) {
      const newScores = [...scores];
      newScores[playerIdx][holeIdx] = value;
      setScores(newScores);

      // Also call the parent handler if it exists
      if (handleScoreChange) {
        handleScoreChange(playerIdx, holeIdx, value);
      }
    } else {
      alert(`Try again: ${value} exceeds limit ${parValues[holeIdx] * 2} (par x 2) `);
    }

  };

  return (
    <div className="scorecard">
      <h2 style={{ fontStyle: 'italic' }}>Foothills Championship Course</h2>
      <table className="scorecard-table">
        <thead>
          <tr>
            <th>Hole</th>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(hole => <th key={hole}>{hole}</th>)}
            <th>Total</th>
          </tr>
          <tr className="par-row">
            <td className="player-name">Par</td>
            {parValues.map((par, idx) => <td key={idx}>{par}</td>)}
            <td>{totalPar}</td>
          </tr>
        </thead>
        <tbody>
          {scores.map((row, playerIdx) => {
            const total = row.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
            return (
              <tr key={playerIdx}>
                <td className="player-name">{players[playerIdx].name}</td>
                {row.map((score, holeIdx) => (
                  <td key={holeIdx}>
                    <input
                      type="text"
                      className="score-input"
                      min="1"
                      max="10"
                      value={scores[playerIdx][holeIdx]}
                      onChange={e => handleLocalScoreChange(playerIdx, holeIdx, e.target.value)}
                    />
                  </td>
                ))}
                <td>{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default EditScores