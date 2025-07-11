import React, { useContext } from 'react';

const ScoreForm = () => {

  // API request functions for current week and team data

  return (
    <div className="score-entry-container">
      <form onSubmit={handleSubmit}>
        {/* Input Container */}
        <div className="input-container">
          {players.map((player, playerIndex) => (
            <div key={playerIndex} className="line-items">
              <input
                type="text"
                value={player.name}
                placeholder={`Player ${playerIndex + 1}`}
                className="line-label"
                readOnly
              />

              {[...Array(9)].map((_, holeIndex) => (
                <div key={holeIndex}>
                  <input
                    type="text"
                    value={player.scores[holeIndex]}
                    onChange={(e) => handleScoreChange(playerIndex, holeIndex, e)}
                    placeholder="0"
                    className="line-item"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Button Container */}
        <div className="button-container">
          <button
            type="submit"
            className="score-submit-button"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="score-clear-button"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScoreForm;