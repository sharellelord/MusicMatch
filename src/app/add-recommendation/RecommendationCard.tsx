'use client';

import React from 'react';
import styles from './RecommendationCard.module.css';

interface RecommendationCardProps {
  artist: string;
  genre: string;
  vibes: string;
  popularity: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ artist, genre, vibes, popularity }) => {
  return (
    <div className={styles.card}>
      <h3>{artist}</h3>
      <p><strong>Genre:</strong> {genre}</p>
      <p><strong>Vibes:</strong> {vibes}</p>
      <p><strong>Popularity:</strong> {popularity}</p>
    </div>
  );
};

export default RecommendationCard;
