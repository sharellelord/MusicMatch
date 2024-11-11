import React from 'react';
import styles from './RecommendationCard.module.css';

interface Recommendation {
  vibes: string;
  genre: string;
  artist: string;
  popularity: number;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  return (
    <div className={styles.card}>
      <h3>{recommendation.artist}</h3>
      <p>Vibes: {recommendation.vibes}</p>
      <p>Genre: {recommendation.genre}</p>
      <p>Popularity: {recommendation.popularity}/10</p>
    </div>
  );
};

export default RecommendationCard;
