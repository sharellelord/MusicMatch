'use client';

import React, { useEffect, useState } from 'react';
import AddRecommendationForm from './AddRecommendationForm';
import RecommendationCard from './RecommendationCard';
import LoggedInHeader from './LoggedInHeader';
import styles from './AddRecommendationPage.module.css';

interface Artist {
  _id: string;
  imageUrl: string;
  artist: string;
  genre: string;
  vibes: string;
  popularity: string;
}

const AddRecommendationPage: React.FC = () => {
  const [addedArtists, setAddedArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('/api/recommendations');
        if (response.ok) {
          const artists = await response.json();
          setAddedArtists(artists);
        } else {
          console.error('Failed to fetch artists');
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <>
      <LoggedInHeader />
      <div className={styles['page-container']}>
        <div className={styles['form-container']}>
          <AddRecommendationForm />
        </div>
        <div className={styles['scrollable-menus']}>
          <h3 className={styles['section-title']}>Added Artists</h3>
          <div className={styles['scrollable-section']}>
            <div className={styles['scrollable-content']}>
              {addedArtists.map((artist) => (
                <RecommendationCard
                  key={artist._id}
                  imageUrl={artist.imageUrl}
                  artist={artist.artist}
                  genre={artist.genre}
                  vibes={artist.vibes}
                  popularity={artist.popularity}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRecommendationPage;
