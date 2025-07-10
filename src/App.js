import React, { useState } from 'react';
import Navbar from './Navbar';
import WhiteSection from './WhiteSection';
import BlueInfoSection from './BlueInfoSection';
import IntroSection from './IntroSection';
import NumerologyForm from './NumerologyForm';
import NumerologyReport from './NumerologyReport';
import NumerologyBackground from './NumerologyBackground';
import NumerologyKidsForm from './NumerologyKidsForm';
import BlogPage from './BlogPage';
import AuthModal from './AuthModal';
import { auth, provider, signInWithPopup } from './firebase';
import { signOut } from 'firebase/auth';
import './App.css';

function App() {
  const [showResult, setShowResult] = useState(false);
  const [page, setPage] = useState('adult');
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleCalculate = () => {
    setShowResult(true);
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setAuthOpen(false);
    } catch (err) {
      alert('Login failed!');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setAuthOpen(false);
  };

  return (
    <div className="App">
      <Navbar
        onSelectPage={setPage}
        currentPage={page}
        user={user}
        onAuthClick={() => setAuthOpen(true)}
      />
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
        user={user}
        onLogout={handleLogout}
      />
      {page === 'blog' ? (
        <BlogPage />
      ) : page === 'kids' ? (
        <div className="container main-container">
          <NumerologyKidsForm />
        </div>
      ) : (
        <>
          
          <div className="container main-container">
            <NumerologyBackground>
              <IntroSection />
              <div className="row form-report-row">
                <div className="col col-form">
                  <NumerologyForm onCalculate={handleCalculate} />
                </div>
              </div>
            </NumerologyBackground>
            <div className="row form-report-row">
              <div className="col col-report">
                <div className="result-area">
                  {showResult && <NumerologyReport />}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <WhiteSection />
      <BlueInfoSection />
    </div>
  );
}

export default App;
