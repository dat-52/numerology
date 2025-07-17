import React from 'react';
import logo from './assets/logo.png';

function Navbar({ onSelectPage, currentPage, user, onAuthClick }) {
  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => onSelectPage('adult')}>
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <div
        className={`nav-item${currentPage === 'adult' ? ' active' : ''}`}
        onClick={() => onSelectPage('adult')}
      >
        Numerology
      </div>
      <div
        className={`nav-item${currentPage === 'kids' ? ' active' : ''}`}
        onClick={() => onSelectPage('kids')}
      >
        Numerology for kids
      </div>
      <div
        className={`nav-item${currentPage === 'blog' ? ' active' : ''}`}
        onClick={() => onSelectPage('blog')}
      >
        Blog
      </div>
      <div className="nav-item nav-auth" onClick={onAuthClick} style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
        {user ? (
          <>
            <img src={user.photoURL} alt={user.displayName} style={{width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px #7fffd455'}} />
            <span style={{fontSize: '1.1rem', color: '#ffe600', fontWeight: 600}}>{user.displayName}</span>
          </>
        ) : (
          'Sign Up/Log In'
        )}
      </div>
    </nav>
  );
}

export default Navbar; 