import React, { useState } from 'react';
import './AuthModal.css';

function AuthModal({ open, onClose, onLogin, user, onLogout, onEmailSignUp, onEmailSignIn, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!open) return null;
  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>&times;</button>
        <h2>{user ? 'Account' : 'Sign Up / Log In'}</h2>
        {!user ? (
          <>
            <button className="google-btn" onClick={onLogin}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" className="google-icon" />
              Sign in with Google
            </button>
            <div className="auth-or">or</div>
            <input
              type="email"
              className="auth-input"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              type="password"
              className="auth-input"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <div className="auth-btn-row">
              <button className="email-btn" onClick={() => onEmailSignIn(email, password)}>Sign In</button>
              <button className="email-btn" onClick={() => onEmailSignUp(email, password)}>Sign Up</button>
            </div>
            {error && <div className="auth-error">{error}</div>}
          </>
        ) : (
          <div className="auth-user-info">
            <img src={user.photoURL} alt={user.displayName} className="auth-user-avatar" />
            <div className="auth-user-name">{user.displayName || user.email}</div>
            <button className="logout-btn" onClick={onLogout}>Log out</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal; 