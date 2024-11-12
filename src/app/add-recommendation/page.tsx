'use client';

import React from 'react';
import AddRecommendationForm from './AddRecommendationForm';
import RecommendationCard from './RecommendationCard';
import LoggedInHeader from './LoggedInHeader';
import styles from './AddRecommendationPage.module.css';
import { receiveMessageOnPort } from 'worker_threads';

//initial dummy array
const initRecommends = [
  { id: '1', imageUrl: 'https://i1.sndcdn.com/avatars-yHA8nds2mqg4uYtr-kyxTzw-t1080x1080.jpg', artist: 'Tame Impala', genre: 'Psychedelic Rock', vibes: 'Chill, Trippy', popularity: '9' },
  { id: '2', imageUrl: 'https://www.hollywoodinsider.com/wp-content/uploads/2020/09/Hollywood-Insider-Frank-Ocean-Letter-From-Fan.jpg', artist: 'Frank Ocean', genre: 'R&B', vibes: 'Smooth, Emotional', popularity: '10' },
  { id: '3', imageUrl: 'https://media.allure.com/photos/66ff11de6c3f3d8fc0e06ded/4:3/w_1940,h_1455,c_limit/Charli%20XCX.jpg', artist: 'Charli XCX', genre: 'Pop', vibes: 'Loud, Energetic', popularity: '8' },
];


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
          {
            initRecommends.map((rec, index) => (
              <RecommendationCard
                key = {index}
                imageUrl = {rec.imageUrl}
                artist = {rec.artist}
                genre = {rec.genre}
                vibes = {rec.vibes}
                popularity = {rec.popularity}
                />
            ))
          }
        </div>
      </div>
    </>
  );
};

export default AddRecommendationPage;
