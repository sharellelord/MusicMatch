'use client';

import React from 'react';
import styles from './RecommendationCard.module.css';
import Image from 'next/image';


interface RecommendationCardProps {
  imageUrl: string;
  artist: string;
  genre: string;
  vibes: string;
  popularity: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ imageUrl, artist, genre, vibes, popularity }) => {
  return (
    <div className={styles.card}>
      <Image
        className={styles['img-Adjust']}
        src={imageUrl}
        alt={`${artist} avatar`}
        width={100}
        height={100}
        priority
      />
      <h3>{artist}</h3>
      <p><strong>Genre:</strong> {genre}</p>
      <p><strong>Vibes:</strong> {vibes}</p>
      <p><strong>Popularity:</strong> {popularity}</p>
    </div>
  );
};

export default RecommendationCard;
