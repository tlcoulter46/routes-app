import React, { useState, useEffect } from 'react';
import "./scores.css";
import fetchData from '../util/fetchData';
import Header from '../util/Header';
import GetWeekTeeTime from './GetWeekTeeTime';
import EditScores from './EditScores';
import ActionButtons from './ActionButtons';

function App() {
  // API URLs
  const API_URL_MEMBERS = 'http://localhost:3500/members';
  const API_URL_SCHEDULE = 'http://localhost:3600/schedule';
  const API_URL_TEAMS = 'http://localhost:3700/teams';
  const API_URL_SCORES = 'http://localhost:3800/scores';

  // Global state
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [teams, setTeams] = useState([]);
  const [scores, setScores] = useState([]);
  const [clearTrigger, setClearTrigger] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(() => {
    return sessionStorage.getItem('selectedWeek') || '1';
  });
  const [selectedTime, setSelectedTime] = useState(() => {
    return sessionStorage.getItem('selectedTime') || '1';
  });

  useEffect(() => {
    sessionStorage.setItem('selectedTeam', selectedWeek);
  }, [selectedWeek]);

  useEffect(() => {
    sessionStorage.setItem('selectedTeam', selectedTime);
  }, [selectedTime]);


  // Initialize 4 players with empty scores
  const [players, setPlayers] = useState([
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") }
  ]);

  // Consolidated loading data files
  useEffect(() => {
    console.log(`useEffect - Loading all data`)
    setFetchError(null);
    setIsLoading(true);

    const fetchAllData = async () => {
      try {
        const [membersResponse, scheduleResponse, scoresResponse, teamsResponse] = await Promise.all([
          fetchData(API_URL_MEMBERS),
          fetchData(API_URL_SCHEDULE),
          fetchData(API_URL_TEAMS),
          fetchData(API_URL_SCORES)
        ]);

        if (!membersResponse.ok) throw Error('Failed to fetch members data');
        if (!scheduleResponse.ok) throw Error('Failed to fetch schedule data');
        if (!teamsResponse.ok) throw Error('Failed to fetch teams data');
        if (!scoresResponse.ok) throw Error('Failed to fetch scores data');

        const [membersResult, scheduleResult, scoresResult, teamsResult] = await Promise.all([
          membersResponse.json(),
          scheduleResponse.json(),
          teamsResponse.json(),
          scoresResponse.json()
        ]);

        setMembers(membersResult);
        setSchedule(scheduleResult);
        setTeams(teamsResult);
        setScores(scoresResult);

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

  // debug code for development - remove
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let weekIndex = selectedWeek - 1;
      let timeIndex = selectedTime - 1;
      console.log(`week: ${weekIndex}, time: ${timeIndex}`);

      let resultText = `Week ${selectedWeek} Scorecard Results: \n`;

      const opponents = [
        schedule.weeks[weekIndex].times[timeIndex].team[0],
        schedule.weeks[weekIndex].times[timeIndex].team[1]
      ]
      resultText += `Team A: ${opponents[0]} Team B: ${opponents[1]} \n`

      const now = new Date(2025, 6, 8);
      now.setDate(now.getDate() + (weekIndex * 7));
      resultText += `Date: ${now.toDateString()} \n`;

      if (selectedTime) {
        const teeTimes = ["4:00", "4:10", "4:20", "4:30", "4:40", "4:50"];
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

  // Todo: match opponents by handicap
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

  const formatPlayerName = (name) => {
    if (name) {
      const words = name.split(' ');
      const shortName = words[0] + " " + words[1][0];
      return shortName;
    } else {
      console.log('invalid name');
    }
  }

  const loadPlayerData = () => {
    console.log(`loadPlayerData recieved request: week ${selectedWeek} tee time ${selectedTime}`)

    const weekIndex = selectedWeek - 1;
    const timeIndex = selectedTime - 1;
    console.log(`weekindex ${weekIndex} timeindex ${timeIndex}`);

    const matchPlayers = [
      schedule?.weeks[weekIndex]?.times[timeIndex]?.team[0],
      schedule?.weeks[weekIndex]?.times[timeIndex]?.team[1]
    ];
    console.log(`match players ${matchPlayers}`);

    const a = matchPlayers[0] - 1;
    const b = matchPlayers[1] - 1;

    let player1Id = teams[a]?.players[0];
    let player2Id = teams[b]?.players[0];
    let player3Id = teams[a]?.players[1];
    let player4Id = teams[b]?.players[1];
    console.log(`player1Id ${teams[a]?.players[0]}`);

    let player1 = members?.find(member => member?.id === player1Id?.playerID);
    let player2 = members?.find(member => member?.id === player2Id?.playerID);
    let player3 = members?.find(member => member?.id === player3Id?.playerID);
    let player4 = members?.find(member => member?.id === player4Id?.playerID);
    console.log(`player ${player1}`);
    const newPlayers = [
      (formatPlayerName(player1?.name) || 'Unknown'),
      (formatPlayerName(player2?.name) || 'Unknown'),
      (formatPlayerName(player3?.name) || 'Unknown'),
      (formatPlayerName(player4?.name) || 'Unknown')
    ];

    console.log("Players:", newPlayers);
    handlePlayersName(newPlayers);
  };

  if (isLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error: {fetchError}</div>;

  const clearScores = () => {
    console.log("clearScores");

    // Reset players state (this will clear names and scores)
    setPlayers([
      { name: "", scores: Array(9).fill("") },
      { name: "", scores: Array(9).fill("") },
      { name: "", scores: Array(9).fill("") },
      { name: "", scores: Array(9).fill("") }
    ]);

    // Reset week and time selections
    setSelectedWeek(1);
    setSelectedTime(1);

    // Trigger clear in EditScores
    setClearTrigger(prev => !prev);

    console.log("All data cleared");
  }

  const submitScores = () => {
    const scores = {};
    for (let player = 1; player <= 4; player++) {
      const row = document.querySelectorAll(`tbody tr:nth-child(${player + 1}) .score-input`);
      scores[`player${player}`] = Array.from(row).map(input => parseInt(input.value) || 0);
    }

    const week = document.getElementById('current-week').value;
    const teeTime = document.getElementById('tee-time').value;

    console.log('Submitting scores:', {
      week,
      teeTime,
      scores
    });

    alert('Scores submitted successfully!');
  }

  return (
    <>
      <Header title="Scores" />

      <GetWeekTeeTime
        loadPlayerData={loadPlayerData}
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

      <EditScores
        players={players}
        setPlayers={setPlayers}
        clearTrigger={clearTrigger}
      />

      <ActionButtons
        savePlayerData={handleSubmit}
        clearScores={clearScores}
      />
    </>
  );
}

export default App;