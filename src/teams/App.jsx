import React, { useState, useEffect } from 'react';
import "./teams.css";
import fetchData from '../util/fetchData';
import SelectTeam from './SelectTeam';
import SearchMembers from './SearchMembers.jsx';
import Header from '../util/Header';
import TeamList from './TeamList';

function App() {
  // API URLs
  const API_URL_MEMBERS = 'http://localhost:3500/members';
  const API_URL_TEAMS = 'http://localhost:3700/teams';

  // Global state
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [staticName1, setStaticName1] = useState('');
  const [staticName2, setStaticName2] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('1');

  // Consolidated loading data files
  useEffect(() => {
    console.log(`useEffect - Loading all data`)
    setFetchError(null);
    setIsLoading(true);

    const fetchAllData = async () => {
      try {
        const [membersResponse, teamsResponse] = await Promise.all([
          fetchData(API_URL_MEMBERS),
          fetchData(API_URL_TEAMS)
        ]);

        if (!membersResponse.ok) throw Error('Failed to fetch members data');
        if (!teamsResponse.ok) throw Error('Failed to fetch teams data');

        const [membersResult, teamsResult] = await Promise.all([
          membersResponse.json(),
          teamsResponse.json()
        ]);

        setMembers(membersResult);
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

  useEffect(() => {
    // Wait for loading to complete before processing team data
    if (isLoading || teams.length === 0) return;

    console.log("Selected team:", selectedTeam, typeof selectedTeam);
    console.log("Available team IDs:", teams.map(team => ({ id: team.id, type: typeof team.id })));
    const foundTeam = teams.find(teams => teams.id === selectedTeam);
    console.log('Found team:', foundTeam);

    // Use foundTeam to get the players
    if (foundTeam) {
      console.log('Team players:', foundTeam.players);

      // Do something with the found team's players
      if (foundTeam.players && foundTeam.players.length > 0) {
        // Get the first two players and find their member details
        const player1 = foundTeam.players[0];
        const player2 = foundTeam.players[1];

        // Find members that match the player IDs
        const member1 = members?.find(member => member.id === player1?.playerID);
        const member2 = members?.find(member => member.id === player2?.playerID);

        console.log('Player 1:', player1, 'Member 1:', member1);
        console.log('Player 2:', player2, 'Member 2:', member2);

        // Set the names for display
        setStaticName1(member1?.name || 'Select from Available Names');
        setStaticName2(member2?.name || 'Select from Available Names');
      }
    } else {
      // Reset names if no team found
      setStaticName1('Select from Available Names');
      setStaticName2('Select from Available Names');
    }
  }, [teams, members, selectedTeam, isLoading]);

  // debug code for development - remove
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const refreshMembers = async () => {
    try {
      const response = await fetchData(API_URL_MEMBERS);
      if (!response.ok) throw Error('Failed to fetch members data');
      const result = await response.json();
      setMembers(result);
    } catch (err) {
      setFetchError(err.message);
    }
  };

  // Custom setters to clear other search when one is used
  const handleSetSearch1 = (value) => {
    setSearch1(value);
    if (value !== '') {
      setSearch2(''); // Clear search2 when search1 is used
    }
  };

  const handleSetSearch2 = (value) => {
    setSearch2(value);
    if (value !== '') {
      setSearch1(''); // Clear search1 when search2 is used
    }
  };

  const handleAdd = (member) => {
    // {id: '9baf', name: 'Steve Bello', phone: '', email: '', team: false}
    console.log("Member:", member);
    alert("Trying to add a team member")
  }

  const handleRemove = (member) => {
    // {id: '9baf', name: 'Steve Bello', phone: '', email: '', team: false}
    console.log("Member:", member);
    alert("Trying to remove a team member")
  }

  if (isLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error: {fetchError}</div>;

  return (
    <div className="App">
      <Header title="Teams" />

      <SelectTeam
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />

      <SearchMembers
        currentName={staticName1}
        handleRemove={handleRemove}
      />

      <SearchMembers
        currentName={staticName2}
        handleRemove={handleRemove}
      />

      <main>
        <h3>Available Names</h3>

        {isLoading && <p>Loading Members...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading &&
          <TeamList
            members={members.filter(member => {
              const name = member.name.toLowerCase();
              const matchesSearch1 = search1 === '' || name.includes(search1.toLowerCase());
              const matchesSearch2 = search2 === '' || name.includes(search2.toLowerCase());

              // Check if member is already assigned to any team
              const isAssignedToTeam = teams.some(team =>
                team.players && team.players.some(player => player.playerID === member.id)
              );

              // Show member only if it matches ALL active searches AND is not assigned to a team
              return matchesSearch1 && matchesSearch2 && !isAssignedToTeam;
            })}

            handleAdd={handleAdd}
          />
        }
      </main>
    </div>
  );
}

export default App;