import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import "./layout.css";

const Layout = () => {

  return (
    <>
      <nav>
        {/* Traditional Navigation */}
        <ul>
          <li> <Link to="/">          Home      </Link> </li>
          <li> <Link to="/members">   Members   </Link> </li>
          <li> <Link to="/teams">     Teams     </Link> </li>
          <li> <Link to="/schedule">  Schedule  </Link> </li>
          <li> <Link to="/standings"> Standings </Link> </li>
          <li> <Link to="/scores">    Scores    </Link> </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;