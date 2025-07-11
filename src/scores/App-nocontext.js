import { useState, useEffect } from 'react';
import "./scores.css";
import Header from "./Header";
import Footer from "./Footer";
import LineItems from "./LineItems";
import fetchData from '../util/fetchData';
import ScoreForm from './ScoreForm';

function App() {
  const API_URL_MEMBERS = 'http://localhost:3500/members';
  const API_URL_SCHEDULE = 'http://localhost:3600/schedule';
  const API_URL_TEAMS = 'http://localhost:3700/teams';
  const API_URL_SCORES = 'http://localhost:3800/0';

  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [teams, setTeams] = useState([]);
  const [scores, setScores] = useState([]);

  // Initialize 4 players with empty scores
  const [players, setPlayers] = useState([
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") }
  ]);

  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        setFetchError(null);

        // Fetch both data sources using fetchData
        const results = await Promise.allSettled([
          fetchData(API_URL_MEMBERS),
          fetchData(API_URL_SCHEDULE),
          fetchData(API_URL_TEAMS),
          fetchData(API_URL_SCORES)
        ]);

        // Handle members data
        if (results[0].status === 'fulfilled') {
          setMembers(results[0].value);
          console.log('members:', members);
        } else {
          console.error('Members fetch failed:', results[0].reason);
        }

        // Handle schedule data
        if (results[1].status === 'fulfilled') {
          setSchedule(results[1].value);
          console.log('schedule:', schedule);

        } else {
          console.error('Schedule fetch failed:', results[1].reason);
        }

        // Handle team data
        if (results[2].status === 'fulfilled') {
          setSchedule(results[2].value);
          console.log('schedule:', schedule);

        } else {
          console.error('Teams fetch failed:', results[2].reason);
        }

        // Handle score data
        if (results[3].status === 'fulfilled') {
          setSchedule(results[3].value);
          console.log('scores:', scores);

        } else {
          console.error('Scores fetch failed:', results[3].reason);
        }

        // Check if any fetch failed
        const failures = results.filter(result => result.status === 'rejected');
        if (failures.length > 0) {
          const errorMessages = failures.map(failure => failure.reason.message);
          setFetchError(`Failed to load: ${errorMessages.join(', ')}`);
        }
      } catch (err) {
        console.error('Data loading error:', err.message);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleScoreChange = (playerIndex, holeIndex, e) => {
    const val = e.target.value;
    // Only allow integers (including negative)
    if (/^-?\d*$/.test(val) && val.length <= 2) {
      const newPlayers = [...players];
      newPlayers[playerIndex].scores[holeIndex] = val;
      setPlayers(newPlayers);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get fresh current week data
      const currentWeekData = await getCurrentWeekData(selectedWeek);
      console.log('Current week data: ', currentWeekData);

      let resultText = `Week ${selectedWeek} Scorecard Results:\n`;
      if (currentWeekData) {
        resultText += `Date: ${currentWeekData.date}\n\n`;
      }

      players.forEach((player, index) => {
        const integers = player.scores.map(Number);
        const total = integers.reduce((sum, value) => sum + value, 0);
        resultText += `Player ${index + 1}: ${player.name || 'Unknown'}\n`;
        resultText += `Scores: ${integers.join(", ")}\n`;
        resultText += `Total: ${total}\n\n`;
      });

      alert(resultText);

      // Optionally submit scores to API
      // await apiRequest('http://localhost:3700/scores', 'POST', {
      //   week: selectedWeek,
      //   date: currentWeekData?.date,
      //   players: players
      // });

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

  // Get current week info from schedule
  const getCurrentWeekInfo = () => {
    if (schedule?.schedule?.weeks) {
      const currentWeek = schedule.schedule.weeks.find(week => week.weekNumber === selectedWeek);
      return currentWeek || null;
    }
    return null;
  };

  // Get teams organized by time slots for selected week
  const getTimeSlotTeams = () => {
    const currentWeek = getCurrentWeekInfo();
    if (currentWeek?.times) {
      return currentWeek.times.map(timeSlot => ({
        time: timeSlot.timeSlot,
        teams: timeSlot.teams
      }));
    }
    return [];
  };

  // Example usage in your component
  const getCurrentTeams = () => {
    const teams = schedule?.schedule?.weeks
      ?.find(week => week.weekNumber === selectedWeek)
      ?.times
      ?.find(time => time.timeSlot === selectedTimeSlot)
      ?.teams;
    console.log('Scehdule:', schedule?.weeks?.date);
    console.log('Teams:', teams);
    return teams || [];
  };


  // Get all unique teams for selected week
  const getWeekTeams = () => {
    const currentWeek = getCurrentWeekInfo();
    if (currentWeek?.times) {
      const allTeams = new Set();
      currentWeek.times.forEach(timeSlot => {
        timeSlot.teams.forEach(team => allTeams.add(team));
      });
      return Array.from(allTeams).sort((a, b) => a - b);
    }

    getCurrentTeams();

    return [];
  };

  // Refresh current week data
  const refreshWeekData = async () => {
    try {
      setIsLoading(true);
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

  const currentWeekInfo = getCurrentWeekInfo();

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Header season={schedule?.schedule?.season} />
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
        <Header season={schedule?.schedule?.season} />
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
                Check that your JSON servers are running on ports 3500 and 3600
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Add this function with your other helper functions
  const getSpecificTeamMessage = () => {
    const currentWeek = getCurrentWeekInfo();
    if (!currentWeek || !currentWeek.times) {
      return "No team data available for this week.";
    }

    const timeSlot = currentWeek.times.find(slot => slot.timeSlot === selectedTimeSlot);
    if (!timeSlot || !timeSlot.teams || timeSlot.teams.length === 0) {
      return `No teams scheduled for Week ${selectedWeek}, Time Slot ${selectedTimeSlot}.`;
    }

    const teamsText = timeSlot.teams.join(', ');
    return `Week ${selectedWeek}, Time Slot ${selectedTimeSlot}: Teams ${teamsText}`;
  };

  return (
    <>
      <Header season={schedule?.schedule?.season} />

      <main>
        <LineItems title="Hole" values={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
        <LineItems title="Par" values={[4, 4, 3, 5, 4, 4, 4, 3, 5]} />

        <ScoreForm />
      </main>

      <Footer />
    </>
  );
}

export default App;
