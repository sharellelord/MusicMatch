"use client";

import React, { useState } from 'react';
import Header from '@/app/components/Header';
import AddRecommendationForm from '@/app/components/AddRecommendationForm';

const AddRecommendationPage: React.FC = () => {
  // State to manage user login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to toggle login/logout status
  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="page-container">
      {/* Pass the login state and handler to the Header component */}
      <Header isLoggedIn={isLoggedIn} handleLoginToggle={handleLoginToggle} />

      {/* Conditional rendering based on login status */}
      <main className="content">
        {isLoggedIn ? (
          <AddRecommendationForm />
        ) : (
          <p className="login-prompt">Please log in to add music recommendations.</p>
        )}
      </main>
    </div>
  );
};

export default AddRecommendationPage;
