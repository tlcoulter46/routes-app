import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

import "./scores.css";
import Header from "./Header";
import Footer from "./Footer";
import LineItems from "./LineItems";
import fetchData from '../util/fetchData';

function App() {
  // API URLs
  const API_URL_MEMBERS = 'http://localhost:3500/members';
  const API_URL_SCHEDULE = 'http://localhost:3600/schedule';
  const API_URL_TEAMS = 'http://localhost:3700/teams';
  const API_URL_SCORES = 'http://localhost:3800/0';

  // Global state
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [season, setSeason] = useState('');
  const [teams, setTeams] = useState([]);
  const [scores, setScores] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [time, setTime] = useState('1');
  const [team, setTeam] = useState([]);

  // Initialize 4 players with empty scores
  const [players, setPlayers] = useState([
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") }
  ]);

  const teeTimes = ["4:00", "4:10", "4:20", "4:30", "4:40", "4:50"];

  // Load initial data
  useEffect(() => {
    console.log(`useEffect #1`)
    setFetchError(null);

    // Handle members data
    const fetchMembers = async () => {
      try {
        const response = await fetchData(API_URL_MEMBERS);
        if (!response.ok) throw Error('Did not receive expected data');
        const result = await response.json();
        setMembers(result);
        setFetchError(null);
        console.log('Members:', members);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchMembers();
  }, []);

  useEffect(() => {
    console.log(`useEffect #2`)
    setFetchError(null);

    // Handle schedule data
    const fetchSchedule = async () => {
      try {
        const response = await fetchData(API_URL_SCHEDULE);
        if (!response.ok) throw Error('Did not receive expected data');
        const result = await response.json();
        setSchedule(result);
        console.log('Schedule:', schedule);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
        console.log('err.message:', err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSchedule();
    // Dependency array for useEffect
  }, []);

  useEffect(() => {
    console.log(`useEffect #3`)
    setFetchError(null);

    // Handle scores data
    const fetchScores = async () => {
      try {
        const response = await fetchData(API_URL_SCORES);
        const result = await response.json();
        setScores(result);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchScores();

  }, []);

  useEffect(() => {
    console.log(`useEffect #4`)
    setFetchError(null);

    // Handle team data
    const fetchTeams = async () => {
      try {
        const response = await fetchData(API_URL_TEAMS);
        if (!response.ok) throw Error('Did not receive expected data');
        const result = await response.json();
        setTeams(result);
        console.log('teams:', teams);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTeams();

  }, []);

  // Update team pairs when week changes
  useEffect(() => {
    // console.log(`useEffect #5`);
    // console.log(`Selected week: ${selectedWeek}`);
    // console.log(`Week #3: ${schedule?.schedule?.weeks?.find(week => week.week === 3)}`);

    if (schedule?.weeks && selectedWeek) {
      // const currentWeek = schedule?.schedule?.weeks.find(week => week.week === selectedWeek);
      // console.log(`Current week: ${currentWeek}`);
      // if (currentWeek.team) {
      //   setTeam(currentWeek.team.join(' vs '));
      //   console.log(`Current Week Pair: ${currentWeek.team}`)
      // } else {
      //   setTeam('Team pairs not available');
      //   console.log(`Current Week Pair: ${currentWeek?.team}`)
      // }
    }
  }, [schedule, selectedWeek]);

  // Helper functions
  const getCurrentWeekData = async (weekNumber) => {
    try {
      // const scheduleData = await fetchData(API_URL_SCHEDULE);
      // const value = scheduleData?.weeks.week[selectedWeek]?.time[4].teams[0];
      // const value = scheduleData?.weeks?.week[selectedWeek];

      const currentWeek = schedule?.schedule?.weeks?.find(
        week => week === selectedWeek
      );
      // console.log(`Week Number: ${weekNumber} `);
      // return currentWeek || null;
      return 1;
    } catch (error) {
      console.error('Error fetching current week data:', error);
      throw error;
    }
  };

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

  // Handler functions moved to top-level scope

  // Refresh current week data
  const refreshWeekData = async () => {
    try {
      setIsLoading(true);
      setFetchError(null);

      const freshScheduleData = await fetchData(API_URL_SCHEDULE);
      setSchedule(freshScheduleData);
      console.log('Week data refreshed successfully');
    } catch (error) {
      console.error('Error refreshing week data:', error);
      setFetchError('Failed to refresh week data');
    } finally {
      setIsLoading(false);
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
    setTime(newTeeTime);
    console.log(time, " changed to ", newTeeTime);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use context helper function to get fresh current week data
      // const currentWeekData = await getCurrentWeekData(selectedWeek);
      // console.log('Current week data: ', currentWeekData);

      console.log(`week: ${selectedWeek - 1}, time: ${time - 1}`)
      const value = schedule.weeks[selectedWeek - 1].times[time - 1].team[0];
      console.log("value: ", value);
      const newValue = schedule.weeks[selectedWeek - 1].times[time - 1].team[1];
      console.log("new value: ", newValue);

      let resultText = `Week ${selectedWeek} Scorecard Results: \n`;
      // if (currentWeekData) {
      // resultText += `Date: ${currentWeekData.date} \n`;
      const now = new Date();
      resultText += `Date: ${now.toDateString()} \n`;
      // }
      if (time) {
        resultText += `Tee Time: ${teeTimes[time - 1]} \n`;
      }
      if (team) {
        resultText += `Team Pairs: ${team} \n`;
      }
      resultText += '\n';

      players?.forEach((player, index) => {
        const integers = player?.scores?.map(Number);
        const total = integers.reduce((sum, value) => sum + value, 0);
        resultText += `Player ${index + 1}: ${player?.name || 'Unknown'} \n`;
        resultText += `Scores: ${integers.join(", ")} \n`;
        resultText += `Total: ${total} \n\n`;
        // resultText += `Value: ${value} \n\n`;
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
    // ajust the week and time
    const modWeek = selectedWeek - 1;
    const modTime = time - 1;
    const opponents = [
      schedule.weeks[modWeek].times[modTime].team[0],
      schedule.weeks[modWeek].times[modTime].team[1]
    ];

    console.log("Select week:", modWeek);
    console.log("Schedule:", schedule);
    console.log("Weeks:", schedule.weeks[modWeek]);
    console.log("Times:", schedule.weeks[modWeek].times[modTime]);
    console.log("Team:", schedule.weeks[modWeek].times[modTime].team[0]);

    console.log("selected Week:", modWeek, " modTime: ", modTime);
    const a = opponents[0] - 1;
    const b = opponents[1] - 1;
    console.log("opponent a:", teams[a], "opponent b", teams[b]);
    // console.log("Team player 1 handicap", teams[a].players[0].handicap);

    document.getElementById("opponents").innerHTML = `${a + 1} vs ${b + 1}`;

    const newPlayers = [];
    newPlayers[0] = (teams[a].players[0].name);
    newPlayers[2] = (teams[b].players[0].name);
    newPlayers[1] = (teams[a].players[1].name);
    newPlayers[3] = (teams[b].players[1].name);

    handlePlayersName(newPlayers);
    console.log(`Scorecard loaded ${newPlayers} `);
  };

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Header />
        <main>
          <div className="score-entry-container">
            <div className="loading-container">
              <p>Loading players and schedule...</p>
              <div className="loading-subtitle">
                Please wait while we fetch the data...
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Show error state
  if (fetchError) {
    return (
      <>
        <Header />
        <main>
          <div className="score-entry-container">
            <div className="error-container">
              <h3 className="error-title">⚠️ Error Loading Data</h3>
              <p className="error-message">{fetchError}</p>
              <div className="error-buttons">
                <button
                  onClick={refreshWeekData}
                  className="error-retry-button"
                >
                  🔄 Retry
                </button>
                <button
                  onClick={() => setFetchError(null)}
                  className="error-continue-button"
                >
                  Continue Anyway
                </button>
              </div>
              <div className="error-help-text">
                "Check that your JSON servers are running on ports:" <br />
                "3500 - Members Data" <br />
                "3600 - Schedule Data" <br />
                "3700 - Teams Data" <br />
                "3800 - Scores Data"
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
                value={time}
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