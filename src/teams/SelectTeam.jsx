import React from 'react'
import './teams.css';

const SelectTeam = ({ selectedTeam, setSelectedTeam }) => {
  return (
    <div className='team-container'>
      <div className='team-number-input'>
        <label htmlFor='team' className='team-number-label'>
          Team number:
        </label>
        <input
          id="team"
          type="number"
          className='team-number-input'
          min="1"
          max="12"
          value={selectedTeam}
          onChange={e => setSelectedTeam(e.target.value)}
        />
      </div>
    </div>
  )
}

export default SelectTeam;
