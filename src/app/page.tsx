"use client";

import React, { useState } from 'react';
import Header from '@/app/components/Header';

const HomePage: React.FC = () => {
  // State to manage user login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to toggle login/logout status
  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="home-container">
      {/* Pass the login state and handler to the Header component */}
      <Header isLoggedIn={isLoggedIn} handleLoginToggle={handleLoginToggle} />

      {/* Main content section */}
      <main className="home-content">
        <h2>Welcome to Music Match!</h2>
        <p>Your one-stop platform for sharing and discovering music recommendations.</p>

        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          <div className="welcome-message">
            <p>You are logged in. Explore and share your favorite music recommendations!</p>
          </div>
        ) : (
          <div className="welcome-message">
            <p>Please log in to access personalized features.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
