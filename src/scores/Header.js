import React from 'react'

const Header = ({ playDay, a, b }) => {
  return (
    <header>
      <h2>Scores</h2>
      <p>{playDay} Teams {a} vs {b}</p>
    </header>
  )
}

export default Header
