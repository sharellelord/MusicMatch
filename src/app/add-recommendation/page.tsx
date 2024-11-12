'use client';

import React from 'react';
import Header from '@/app/components/Header';
import AddRecommendationForm from '@/app/add-recommendation/AddRecommendationForm';
import LoggedInHeader from './LoggedInHeader';

const AddRecommendationPage: React.FC = () => {
  return (
    <div className="page-container">
      {/* Render the Header component */}
      <LoggedInHeader />

      {/* Render the AddRecommendationForm component */}
      <main className="content">
        <AddRecommendationForm />
      </main>
    </div>
  );
};

export default AddRecommendationPage;