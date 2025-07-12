import React, { useState, useEffect } from 'react';

import "./scores.css";
import Header from "./Header";
import Footer from "./Footer";
import LineItems from "./LineItems";
import fetchData from '../util/fetchData';

function App() {
  // API URLs
  const API_URL_SCHEDULE = 'http://localhost:3600/schedule';
  const API_URL_TEAMS = 'http://localhost:3700/teams';
  const API_URL_SCORES = 'http://localhost:3800/0';

  // Global state
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [members, setMembers] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [season, setSeason] = useState('');
  const [teams, setTeams] = useState([]);
  const [scores, setScores] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [seletedTime, setSeletedTime] = useState(1);

  // Initialize 4 players with empty scores
  const [players, setPlayers] = useState([
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") }
  ]);

  const teeTimes = ["4:00", "4:10", "4:20", "4:30", "4:40", "4:50"];

  // Consolidated loading data files
  useEffect(() => {
    console.log(`useEffect - Loading all data`)
    setFetchError(null);
    setIsLoading(true);

    const fetchAllData = async () => {
      try {
        // Fetch all data concurrently using Promise.all
        const [scheduleResponse, scoresResponse, teamsResponse] = await Promise.all([
          fetchData(API_URL_SCHEDULE),
          fetchData(API_URL_SCORES),
          fetchData(API_URL_TEAMS)
        ]);

        // Check if all responses are ok
        if (!scheduleResponse.ok) throw Error('Failed to fetch schedule data');
        if (!scoresResponse.ok) throw Error('Failed to fetch scores data');
        if (!teamsResponse.ok) throw Error('Failed to fetch teams data');

        // Parse all JSON responses
        const [scheduleResult, scoresResult, teamsResult] = await Promise.all([
          scheduleResponse.json(),
          scoresResponse.json(),
          teamsResponse.json()
        ]);

        // Update all state
        setSchedule(scheduleResult);
        setScores(scoresResult);
        setTeams(teamsResult);

        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
        console.log('err.message:', err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllData();
  }, []);

  // Helper function to clear scores area
  const handlePlayersName = (newPlayers) => {
    if (newPlayers) {
      setPlayers([
        { name: newPlayers[0], scores: Array(9).fill("") },
        { name: newPlayers[1], scores: Array(9).fill("") },
        { name: newPlayers[2], scores: Array(9).fill("") },
        { name: newPlayers[3], scores: Array(9).fill("") }
      ]);

      return true;
    }
  };

  const handleScoreChange = (playerIndex, holeIndex, e) => {
    const val = e.target.value;
    // Only allow integers (including negative)
    if (/^-?\d*$/.test(val) && val.length <= 2) {
      const newPlayers = [...players];
      newPlayers[playerIndex].scores[holeIndex] = val;
      setPlayers(newPlayers);
    }
  };

  const handleWeekChange = (e) => {
    const newWeek = parseInt(e.target.value);
    setSelectedWeek(parseInt(newWeek));
    console.log("selectedWeek changed to:", newWeek, " was:", selectedWeek);
  };

  const handleTeeTimeChange = (e) => {
    const newTeeTime = parseInt(e.target.value);
    console.log(seletedTime, " changed to ", newTeeTime);
    setSeletedTime(newTeeTime);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // set index for '0' based data
      let weekIndex = selectedWeek - 1;
      let timeIndex = seletedTime - 1;

      console.log(`week: ${weekIndex}, time: ${timeIndex}`)
      const value = schedule.weeks[weekIndex].times[timeIndex].team[0];
      console.log("value: ", value);
      const newValue = schedule.weeks[weekIndex].times[timeIndex].team[1];
      console.log("new value: ", newValue);

      let resultText = `Week ${selectedWeek} Scorecard Results: \n`;

      const now = new Date();
      resultText += `Date: ${now.toDateString()} \n`;

      if (seletedTime) {
        resultText += `Tee Time: ${teeTimes[timeIndex]} \n`;
      }

      resultText += '\n';

      players?.forEach((player, index) => {
        const integers = player?.scores?.map(Number);
        const total = integers.reduce((sum, value) => sum + value, 0);
        resultText += `Player ${index + 1}: ${player?.name || 'Unknown'} \n`;
        resultText += `Scores: ${integers.join(", ")} \n`;
        resultText += `Total: ${total} \n\n`;
      });

      alert(resultText);

    } catch (error) {
      console.error('Error submitting scores:', error);
      alert('Error submitting scores. Please try again.');
    }
  };

  const handleClearAll = () => {
    setPlayers([
      { name: "", scores: Array(9).fill("") },
      { name: "", scores: Array(9).fill("") },
      { name: "", scores: Array(9).fill("") },
      { name: "", scores: Array(9).fill("") }
    ]);
  };

  const formatPlayerName = (name) => {
    const words = name.split(' ');
    const shortName = words[0] + " " + words[1][0];
    return shortName;
  }

  // NEW: Load Card function with stored data
  const handleLoadCard = () => {
    // ajust the week and seletedTime
    const weekIndex = selectedWeek - 1;
    const timeIndex = seletedTime - 1;
    console.log("selected Week:", weekIndex, " timeIndex: ", timeIndex);

    // assign match opponents
    const matchPlayers = [
      schedule.weeks[weekIndex].times[timeIndex].team[0],
      schedule.weeks[weekIndex].times[timeIndex].team[1]
    ];

    console.log("Select week:", weekIndex);
    console.log("Schedule:", schedule);
    console.log("Weeks:", schedule.weeks[weekIndex]);
    console.log("Times:", schedule.weeks[weekIndex].times[timeIndex]);
    console.log("Team:", schedule.weeks[weekIndex].times[timeIndex].team[0]);

    const a = matchPlayers[0] - 1;
    const b = matchPlayers[1] - 1;
    console.log("Player 1:", teams[a], "Player 2", teams[b]);

    // display the team opponents
    document.getElementById("opponents").innerHTML = `${a + 1} vs ${b + 1}`;

    const newPlayers = [];
    newPlayers[0] = formatPlayerName(teams[a].players[0].name);
    newPlayers[2] = formatPlayerName(teams[b].players[0].name);
    newPlayers[1] = formatPlayerName(teams[a].players[1].name);
    newPlayers[3] = formatPlayerName(teams[b].players[1].name);

    handlePlayersName(newPlayers);
    console.log(`Scorecard loaded ${newPlayers}`);
  };

  // Main app render
  return (
    <>
      <Header season={season} />
      <main>
        {/* Game Info Container - Moved above LineItems */}
        <div className="game-info-container">
          <div className="info-row">

            {/* CURRENT WEEK INPUT */}
            <div className="info-field">
              <label htmlFor="week-select">Current Week:</label>
              <input
                id="week-select"
                type="number"
                min="1"
                max="12"
                value={selectedWeek}
                onChange={handleWeekChange}
                className="week-select"
              >
              </input>
            </div>

            {/* TEE TIME INPUT */}
            <div className="info-field">
              <label htmlFor="flight">Tee time:</label>
              <input
                id="flight"
                type="number"
                min="1"
                max="6"
                value={seletedTime}
                onChange={handleTeeTimeChange}
                className="flight-input"
              />
            </div>

            {/* COMPETING TEAMS */}
            <div className="info-field">
              <p>Teams:</p>
              <p id="opponents">A vs B</p>
            </div>
          </div>
        </div>

        <LineItems title="Hole" values={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
        <LineItems title="Par" values={[4, 4, 3, 5, 4, 4, 4, 3, 5]} />

        <div className="score-entry-container">
          <form onSubmit={handleSubmit}>
            {/* Input Container */}
            <div className="input-container">
              {players.map((player, playerIndex) => (
                <div key={playerIndex} className="line-items">
                  <input
                    type="text"
                    value={player.name}
                    placeholder={`Player ${playerIndex + 1} `}
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
                type="button"
                onClick={handleLoadCard}
                className="score-submit-button"
              >
                Load Card
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
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
      </main>
      <Footer />
    </>
  );
}

export default App;