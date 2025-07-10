import React from 'react';
import './AuthModal.css';

function AuthModal({ open, onClose, onLogin, user, onLogout }) {
  if (!open) return null;
  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>&times;</button>
        <h2>{user ? 'Account' : 'Sign Up / Log In'}</h2>
        {!user ? (
          <button className="google-btn" onClick={onLogin}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" className="google-icon" />
            Sign in with Google
          </button>
        ) : (
          <div className="auth-user-info">
            <img src={user.photoURL} alt={user.displayName} className="auth-user-avatar" />
            <div className="auth-user-name">{user.displayName}</div>
            <button className="logout-btn" onClick={onLogout}>Log out</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal; 