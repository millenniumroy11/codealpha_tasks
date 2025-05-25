import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3">
      <div className="container">
        <Link to="/" className="navbar-brand fs-4 fw-bold">CrowdFunder</Link>
        <div className="d-flex gap-3">
          <Link to="/" className="nav-link text-white">Home</Link>
          <Link to="/create-project" className="nav-link text-white">Start a Project</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-link nav-link text-white p-0">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link text-white">Login</Link>
              <Link to="/register" className="nav-link text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
