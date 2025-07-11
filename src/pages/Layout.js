import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;