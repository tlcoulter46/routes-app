import React, { useState, useEffect } from 'react';
import "./teams.css";
import fetchData from '../util/fetchData';
import SelectTeam from './SelectTeam';
import EditPartner from './EditPartner';
import Header from '../util/Header';
import TeamList from './TeamList';
import apiRequest from '../util/apiRequest';

function App() {
  // API URLs
  const API_URL_MEMBERS = 'http://localhost:3500/members';
  const API_URL_TEAMS = 'http://localhost:3700/teams';

  // Global state
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [staticName1, setStaticName1] = useState('');
  const [staticName2, setStaticName2] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(() => {
    return sessionStorage.getItem('selectedTeam') || '1';
  });

  useEffect(() => {
    sessionStorage.setItem('selectedTeam', selectedTeam);
  }, [selectedTeam]);

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
    const foundTeam = teams.find(team => team.id == selectedTeam);
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

  const setHasTeam = async (member) => {
    const patchOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hasTeam: true }),
    };

    const result = await apiRequest(`${API_URL_MEMBERS}`, patchOptions);
    if (result) {
      setFetchError(result);
    } else {
      // Update local state to reflect the change
      setMembers(prevMembers =>
        prevMembers.map(m =>
          m.id === member.id ? { ...m, hasTeam: true } : m
        )
      );
    }
  };

  const handleRemove = (member) => {
    console.log("Remove member:", member);
    alert("Trying to remove a team member")
  }

  const swapTeamMember = async (teamId, newMemberKey) => {
    try {
      console.log('swapTeamMember props:', teamId, newMemberKey);
      // Find the target team
      const targetTeam = teams.find(team => team.id == teamId);
      if (!targetTeam) {
        setFetchError('Team not found');
        return;
      }

      // Find first available slot (null playerID)
      const players = [...targetTeam.players];
      const availableSlot = players.findIndex(player => player.playerID === null);

      if (availableSlot === -1) {
        setFetchError('No available slots in team');
        return;
      }

      // Update the first available slot
      players[availableSlot] = { playerID: newMemberKey };

      // Create updated team object
      const updatedTeam = {
        ...targetTeam,
        players: players
      };

      console.log('Adding member to slot:', availableSlot, 'Member:', newMemberKey);

      // Update team via PUT request
      const teamPutOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTeam)
      };

      const teamResult = await apiRequest(`${API_URL_TEAMS}/${teamId}`, teamPutOptions);
      if (teamResult) {
        setFetchError(`Failed to update team: ${teamResult}`);
        return;
      }

      // Set new member's hasTeam to true
      const memberResult = await apiRequest(`${API_URL_MEMBERS}/${newMemberKey}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hasTeam: true })
      });

      if (memberResult) {
        setFetchError(`Failed to update member: ${memberResult}`);
        return;
      }

      // Update local state
      setTeams(prevTeams =>
        prevTeams.map(team =>
          team.id == teamId ? updatedTeam : team
        )
      );

      setMembers(prevMembers =>
        prevMembers.map(member => {
          if (member.id === newMemberKey) {
            return { ...member, hasTeam: true };
          }
          return member;
        })
      );

      console.log('Member added successfully to first available slot');

    } catch (error) {
      console.error('Error adding team member:', error);
      setFetchError(`Failed to add member: ${error.message}`);
    }
  };

  const handleSwapMember = async (member) => {
    console.log("Select member:", member);
    alert(`Trying to swap ${staticName1} with ${member.id}`);

    // Add member to vacant position
    if (staticName1 === 'Select from Available Names') {
      await swapTeamMember(selectedTeam, member.id, 1);
    } else {
      await swapTeamMember(selectedTeam, member.id, 2);
    }
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

      <EditPartner
        currentName={staticName1}
        handleRemove={handleRemove}
      />

      <EditPartner
        currentName={staticName2}
        handleRemove={handleRemove}
      />

      <main>
        {isLoading && <p>Loading Members...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}

        {!fetchError && !isLoading &&
          (staticName1 === 'Select from Available Names' || staticName2 === 'Select from Available Names') &&
          <>
            <h3>Available Names</h3>
            <TeamList
              members={members.filter(member => member.hasTeam === false)}
              handleSwapMember={handleSwapMember}
            />
          </>
        }
      </main>
    </div>
  );
}

export default App;