'use client';

import React from 'react';
import AddRecommendationForm from './AddRecommendationForm';
import RecommendationCard from './RecommendationCard';
import LoggedInHeader from './LoggedInHeader';
import styles from './AddRecommendationPage.module.css';

const AddRecommendationPage: React.FC = () => {
  return (
    <>
      <LoggedInHeader />
      <div className={styles['page-container']}>
        <div className={styles['form-container']}>
          <AddRecommendationForm />
        </div>
        <div className={styles['cards-container']}>
          {/* Example hardcoded recommendation cards */}
          <RecommendationCard
            artist="Tame Impala"
            genre="Psychedelic Rock"
            vibes="Chill, Trippy"
            popularity="9"
          />
          <RecommendationCard
            artist="Frank Ocean"
            genre="R&B"
            vibes="Smooth, Emotional"
            popularity="10"
          />
        </div>
      </div>
    </>
  );
};

export default AddRecommendationPage;
