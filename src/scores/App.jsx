import React, { useState } from "react";
import "./index.css";
import Header from "./Header";
import Footer from "./Footer";
import LineItems from "./LineItems";

function App() {
  const [values, setValues] = useState(Array(9).fill(""));
  const [playerName, setPlayerName] = useState("");

  const handleChange = (index, e) => {
    const val = e.target.value;
    // Only allow integers (including negative)
    if (/^-?\d*$/.test(val) && val.length <= 2) {
      const newValues = [...values];
      newValues[index] = val;
      setValues(newValues);
    }
  };

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const integers = values.map(Number);
    const total = integers.reduce((sum, value) => sum + value, 0);
    alert(`Player: ${playerName || 'Unknown'}, Scores: ${integers.join(", ")}, Total: ${total}`);
  };

  const handleClearAll = () => {
    setPlayerName("");
    setValues(Array(9).fill(""));
  };

  return (
    <>
      <Header playDay={'6/24/2025'} a={12} b={2}/>
      <main>
        <LineItems title="Hole" values={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
        <LineItems title="Par" values={[4, 4, 3, 5, 4, 4, 4, 3, 5]} />
        
        {/* Score Entry Form */}
        {/* <div className="score-form-container"> */}
          {/* <h3 className="score-form-title">
            Enter Player & Scores
          </h3> */}
          
          <form onSubmit={handleSubmit}>
            {/* Player Name Input */}
            <div className="line-item">
              <label className="score-form-label">
              </label>
              <input
                type="text"
                value={playerName}
                onChange={handleNameChange}
                placeholder="Player name"
                className="score-form-input"
              />
            </div>

            {/* Score Inputs Grid */}
            <div className="score-inputs-grid">
              {[...Array(9)].map((_, index) => (
                <div key={index}>
                  {/* <label className="score-input-field">
                    Hole {index + 1}:
                  </label> */}
                  <input
                    type="text"
                    min="0"
                    max="15"
                    value={values[index]}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="0"
                    className="score-number-input"
                  />
                </div>
              ))}
            </div>

            {/* Form Buttons */}
            <div className="score-form-buttons">
              <button
                type="submit"
                className="score-submit-button"
              >
                Submit Scores
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="score-clear-button"
              >
                Clear All
              </button>
            </div>
          </form>
        {/* </div> */}
      </main>
      <Footer />
    </>
  );
}

export default App;