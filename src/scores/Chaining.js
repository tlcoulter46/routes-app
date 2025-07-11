
// Get teams for a specific week and time slot
const getTeamsForWeekAndTimeSlot = (scheduleData, weekNumber, timeSlot) => {
  return scheduleData?.schedule?.weeks
    ?.find(week => week.weekNumber === weekNumber)
    ?.times
    ?.find(time => time.timeSlot === timeSlot)
    ?.teams || [];
};

// Example usage in your component
const getCurrentTeams = () => {
  const teams = schedule?.schedule?.weeks
    ?.find(week => week.weekNumber === selectedWeek)
    ?.times
    ?.find(time => time.timeSlot === selectedTimeSlot)
    ?.teams;

  return teams || [];
};

// Or in your getSpecificTeamMessage function
const getSpecificTeamMessage = () => {
  // Get the current week data
  const currentWeek = schedule?.schedule?.weeks
    ?.find(week => week.weekNumber === selectedWeek);

  if (!currentWeek?.times) {
    return "No team data available for this week.";
  }

  // Get the specific time slot
  const timeSlot = currentWeek.times
    ?.find(slot => slot.timeSlot === selectedTimeSlot);

  const teams = timeSlot?.teams;

  if (!teams || teams.length === 0) {
    return `No teams scheduled for Week ${selectedWeek}, Time Slot ${selectedTimeSlot}.`;
  }

  const teamsText = teams.join(', ');
  return `Week ${selectedWeek}, Time Slot ${selectedTimeSlot}: Teams ${teamsText}`;
};

// Get all teams for a specific week
const getWeekTeams = () => {
  const currentWeek = schedule?.schedule?.weeks
    ?.find(week => week.weekNumber === selectedWeek);

  const allTeams = currentWeek?.times
    ?.flatMap(time => time.teams || []) || [];

  // Remove duplicates and sort
  return [...new Set(allTeams)].sort((a, b) => a - b);
};

// Get the date for current week
const getCurrentWeekDate = () => {
  return schedule?.schedule?.weeks
    ?.find(week => week.weekNumber === selectedWeek)
    ?.date || 'No date available';
};

