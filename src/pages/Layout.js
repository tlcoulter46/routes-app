import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav style={{
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6'
      }}>
        {/* Traditional Navigation */}
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          gap: '20px',
          margin: 0,
          padding: 0
        }}>
          <li>
            <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>Home</Link>
          </li>
          <li>
            <Link to="/members" style={{ textDecoration: 'none', color: '#007bff' }}>Members</Link>
          </li>
          <li>
            <Link to="/teams" style={{ textDecoration: 'none', color: '#007bff' }}>Teams</Link>
          </li>
          <li>
            <Link to="/schedule" style={{ textDecoration: 'none', color: '#007bff' }}>Schedule</Link>
          </li>
          <li>
            <Link to="/standings" style={{ textDecoration: 'none', color: '#007bff' }}>Standings</Link>
          </li>
          <li>
            <Link to="/scores" style={{ textDecoration: 'none', color: '#007bff' }}>Scores</Link>
          </li>
        </ul>

        {/* Dropdown Navigation
        <div style={{
          position: 'relative',
          display: 'inline-block',
          marginTop: '20px'
        }}>
          <button
            onClick={toggleDropdown}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Navigation Menu ▼
          </button>

          {isDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              backgroundColor: 'white',
              minWidth: '200px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              zIndex: 1000,
              marginTop: '2px'
            }}>
              <Link
                to="/"
                onClick={handleLinkClick}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  textDecoration: 'none',
                  color: '#333',
                  borderBottom: '1px solid #eee'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                🏠 Home
              </Link>
              <Link
                to="/players"
                onClick={handleLinkClick}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  textDecoration: 'none',
                  color: '#333',
                  borderBottom: '1px solid #eee'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                👥 Players
              </Link>
              <Link
                to="/teams"
                onClick={handleLinkClick}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  textDecoration: 'none',
                  color: '#333',
                  borderBottom: '1px solid #eee'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                🏆 Teams
              </Link>
              <Link
                to="/schedule"
                onClick={handleLinkClick}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  textDecoration: 'none',
                  color: '#333',
                  borderBottom: '1px solid #eee'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                📅 Schedule
              </Link>
              <Link
                to="/standings"
                onClick={handleLinkClick}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  textDecoration: 'none',
                  color: '#333',
                  borderBottom: '1px solid #eee'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                📊 Standings
              </Link>
              <Link
                to="/contact"
                onClick={handleLinkClick}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  textDecoration: 'none',
                  color: '#333'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                📞 Contact
              </Link>
            </div>
          )}
        </div> */}
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;