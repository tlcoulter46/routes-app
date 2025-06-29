import { useEffect, useState, useRef } from 'react';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const leagueNameRef = useRef(''); // Initialize with default value

  useEffect(() => {
    // Inline script for time updates
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const month = new Date().getMonth();
    console.log('Month value:', month);

    // Update the ref value based on month
    if (month < 7) {
      leagueNameRef.current = 'Hackers';
    } else {
      leagueNameRef.current = 'Divots';
    }

    console.log('Updated leagueName:', leagueNameRef.current);

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

    // Inline script for console message
    console.log(`Welcome to ${leagueNameRef.current} Golf League!`);
    console.log('Current time:', new Date().toLocaleString());

    // Cleanup interval on component unmount
    return () => clearInterval(timeInterval);
  }, []);

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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: "center", color: '#2c5282' }}>
        {`Welcome to the ${leagueNameRef.current} Golf League`}
      </h1>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#38a169' }}>{welcomeMessage}</h2>
        <p style={{ fontSize: '18px', color: '#666' }}>
          Current Time: {currentTime.toLocaleTimeString()}
        </p>
      </div>

      <br />
      <p style={{ textAlign: "center", fontSize: '20px', fontStyle: 'italic' }}>
        Where {leagueNameRef.current} become Champions
      </p>
      <br />

      <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
        Our league is made up of avid golfers with different ages and golfing abilities.
      </p>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={handleLeagueInfo}
          style={{
            backgroundColor: '#4299e1',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#3182ce'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4299e1'}
        >
          Learn More About Our League
        </button>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f7fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>League Highlights:</h3>
        <ul style={{ textAlign: 'left', color: '#4a5568' }}>
          <li>Handicap system for fair competition</li>
          <li>Annual championship tournament</li>
          <li>Prizes and recognition for top performers</li>
        </ul>
      </div>

      {/* Removed <script> tag and its dangerouslySetInnerHTML as React does not support it */}
    </div>
  );
};

export default Home;