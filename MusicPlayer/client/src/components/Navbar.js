// In your Navbar.js component
import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/search" className="nav-link">Search</Link>
        </li>
        <li>
          <Link to="/playlist" className="nav-link">Playlist</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
