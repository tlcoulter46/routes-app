import React from 'react';
import "./scores.css";

const GetWeekTeeTimes = ({ loadPlayerData, selectedWeek, setSelectedWeek, selectedTime, setSelectedTime }) => {

  return (
    <div className="header">
      <div className="week-info">
        <label htmlFor="current-week">Current Week:</label>
        <input
          type="number"
          id="current-week"
          className="week-input"
          min="1"
          max="12"
          value={selectedWeek}
          onChange={e => setSelectedWeek(e.target.value)}
          placeholder="1-12"
        />
      </div>
      <div className="week-info">
        <label htmlFor="tee-time">Tee Time:</label>
        <input
          type="number"
          id="tee-time"
          className="week-input"
          min="1"
          max="6"
          value={selectedTime}
          onChange={e => setSelectedTime(e.target.value)}
          placeholder="1-6"
        />
      </div>
      <button className="btn load-btn" onClick={loadPlayerData}>
        Load
      </button>
    </div>
  )
}

export default GetWeekTeeTimes