'use client';

import React from 'react';
import styles from './AddArtist.module.css';
import Image from 'next/image';


interface RecommendationCardProps {
  imageUrl: string;
  artist: string;
  genre: string;
  vibes: string;
  popularity: string;
  onAdd: () => void;
}

const AddArtist: React.FC<AddArtistProps> = ({ imageUrl, artist, genre, vibes, popularity, onAdd }) => {
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
      <button onClick={onAdd} className={styles['add-button']}>Add</button>
    </div>
  );
};

export default AddArtist;
