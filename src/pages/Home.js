import { useEffect, useState, useRef } from 'react';
import './home.css';

const Home = () => {
  const leagueStartDay = useRef(new Date('07/08/2025'));
  const currentTime = useRef(new Date());
  const today = useRef(new Date());
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [leagueNameRef, setLeagueNameRef] = useState('');

  useEffect(() => {
    // Update the ref value based on month
    if (leagueStartDay.getDate < today.getDate) {
      setLeagueNameRef('Hackers');
    } else {
      setLeagueNameRef('Divots');
    }

    console.log('Updated leagueName:', leagueNameRef);

    // Inline script for dynamic welcome message
    const hour = new Date().getHours();

    let greeting;
    if (hour < 12) {
      greeting = 'Good Morning';
    } else if (hour < 18) {
      greeting = 'Good Afternoon';
    } else {
      greeting = 'Good Evening';
    }
    setWelcomeMessage(`${greeting}, Golfer!`);

    // Cleanup interval on component unmount
    return () => clearInterval(0);
  }, [leagueNameRef]);

  // Inline script function for button click
  const handleLeagueInfo = () => {
    const facts = [
      'Our league has been running for over 20 years!',
      'We welcome golfers of all skill levels.',
      'Weekly tournaments every Tuesday.',
      'We have 12 teams of 2 players.',
      'Annual championship with prizes!',
      'Friendly competition and great camaraderie.',
      'Spring league is known as Hackers.',
      'Hackers play at Meadows Golf Club',
      'Divots play at Foothills Golf Club',
      'Fall league is know as Divots.'
    ];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    alert(`Fun Fact: ${randomFact}`);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">
        {`Welcome to the ${leagueNameRef} Golf League`}
      </h1>

      <div className="welcome-section">
        <h2 className="welcome-message">{welcomeMessage}</h2>
        <p className="current-time">
          {`Current Time: ${currentTime.current.toLocaleTimeString()}`}
        </p>
      </div>

      <br />
      <p className="tagline">
        Where {leagueNameRef} become Champions
      </p>
      <br />

      <p className="description">
        Our league is made up of avid golfers from different ages and golfing abilities.
      </p>

      <div className="button-section">
        <button
          onClick={handleLeagueInfo}
          className="league-info-button"
        >
          Learn More About Our League
        </button>
      </div>

      <div className="highlights-section">
        <h3 className="highlights-title">League Highlights:</h3>
        <ul className="highlights-list">
          <li>Handicap system for fair competition</li>
          <li>Annual championship tournament</li>
          <li>Prizes and recognition for top performers</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;