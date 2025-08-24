import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/sections/Hero';
import { Features } from '../components/sections/Features';
import { Footer } from '../components/layout/Footer';

export const LandingPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleGetStarted = () => {
    setShowSignup(true);
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <Footer />


    </div>
  );
};