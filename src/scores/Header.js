import React from 'react'

const Header = ({ season }) => {
  return (
    <header>
      <h2>Scores</h2>
      <p>{season}</p>
    </header>
  )
}

export default Header
