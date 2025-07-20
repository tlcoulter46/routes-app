import React from 'react'

const ActionButtons = ({ savePlayerData, clearScores }) => {

  return (
    <div className="action-buttons">
      <button className="btn btn-submit" onClick={savePlayerData}>Submit</button>
      <button className="btn btn-clear" onClick={clearScores}>Clear</button>
    </div>
  )
}

export default ActionButtons