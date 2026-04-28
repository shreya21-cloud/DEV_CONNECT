import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <div className="container nav-container">
        <Link to="/" className="logo">
          Dev<span>Connect</span>
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/create-post" className="btn btn-primary" style={{ marginRight: '1rem' }}>Write a Post</Link>
              <span style={{ color: 'var(--text-secondary)' }}>Hello, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Log In</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
