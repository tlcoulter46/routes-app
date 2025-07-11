import React, { createContext, useContext, useState, useEffect } from 'react';
import fetchData from '../util/fetchData';

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    // throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Context Provider Component
export const AppProvider = ({ children }) => {
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
  const [teams, setTeams] = useState([]);
  const [scores, setScores] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1);

  // Initialize 4 players with empty scores
  const [players, setPlayers] = useState([
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") },
    { name: "", scores: Array(9).fill("") }
  ]);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setFetchError(null);

        // Fetch all data sources using fetchData
        const results = await Promise.allSettled([
          fetchData(API_URL_MEMBERS, members),
          fetchData(API_URL_SCHEDULE, schedule),
          fetchData(API_URL_TEAMS, teams),
          fetchData(API_URL_SCORES, scores)
        ]);

        console.log('results: ', results);

        // Handle members data
        if (results[0].status === 'fulfilled') {
          setMembers(results[0].value);
          console.log('members loaded:', results[0].value);
        } else {
          console.error('Members fetch failed:', results[0].reason);
        }

        // Handle schedule data
        if (results[1].status === 'fulfilled') {
          setSchedule(results[1].value);
          console.log('schedule loaded:', results[1].value);
        } else {
          console.error('Schedule fetch failed:', results[1].reason);
        }

        // Handle teams data
        if (results[2].status === 'fulfilled') {
          setTeams(results[2].value);
          console.log('teams loaded:', results[2].value);
        } else {
          console.error('Teams fetch failed:', results[2].reason);
        }

        // Handle scores data
        if (results[3].status === 'fulfilled') {
          setScores(results[3].value);
          console.log('scores loaded:', results[3].value);
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

    console.log('App rendered, context available');
  }, []);

  // Helper functions
  const getCurrentWeekData = async (weekNumber) => {
    try {
      const scheduleData = await fetchData(API_URL_SCHEDULE);
      const currentWeek = scheduleData?.schedule?.weeks?.find(
        week => week.weekNumber === weekNumber
      );
      return currentWeek || null;
    } catch (error) {
      console.error('Error fetching current week data:', error);
      throw error;
    }
  };

  const getTeamData = async () => {
    try {
      const membersData = await fetchData(API_URL_MEMBERS);
      return membersData || [];
    } catch (error) {
      console.error('Error fetching team data:', error);
      throw error;
    }
  };

  const getAllScheduleData = async () => {
    try {
      const scheduleData = await fetchData(API_URL_SCHEDULE);
      return scheduleData || {};
    } catch (error) {
      console.error('Error fetching schedule data:', error);
      throw error;
    }
  };

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

  // Get current week info from schedule
  const getCurrentWeekInfo = () => {
    if (schedule?.schedule?.weeks) {
      const currentWeek = schedule.schedule.weeks.find(week => week.weekNumber === selectedWeek);
      return currentWeek || null;
    }
    return null;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use context helper function to get fresh current week data
      const currentWeekData = await getCurrentWeekData(selectedWeek);
      console.log('Current week data: ', currentWeekData);

      let resultText = `Week ${selectedWeek} Scorecard Results:\n`;
      if (currentWeekData) {
        resultText += `Date: ${currentWeekData.date}\n\n`;
      }

      players?.forEach((player, index) => {
        const integers = player?.scores?.map(Number);
        const total = integers.reduce((sum, value) => sum + value, 0);
        resultText += `Player ${index + 1}: ${player?.name || 'Unknown'}\n`;
        resultText += `Scores: ${integers.join(", ")}\n`;
        resultText += `Total: ${total}\n\n`;
      });

      // alert(resultText);

      // Optionally submit scores to API
      // await fetchData(API_URL_SCORES, 'POST', {
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

  // Context value object
  const contextValue = {
    // State
    fetchError, setFetchError,
    isLoading, setIsLoading,
    members, setMembers,
    schedule, setSchedule,
    teams, setTeams,
    scores, setScores,
    selectedWeek, setSelectedWeek,
    players, setPlayers,

    // Helper functions
    getCurrentWeekData,
    getTeamData,
    getAllScheduleData,
    refreshWeekData,
    getCurrentWeekInfo,
    handleScoreChange,
    handleSubmit,
    handleClearAll,

    // API URLs
    API_URL_MEMBERS,
    API_URL_SCHEDULE,
    API_URL_TEAMS,
    API_URL_SCORES
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;