'use client';

import React, { useState } from 'react';
import AddRecommendationForm from './AddRecommendationForm';
import RecommendationCard from './RecommendationCard';
import AddArtist from './AddArtist'; // Ensure correct import
import LoggedInHeader from './LoggedInHeader';
import styles from './AddRecommendationPage.module.css';

const initRecommends = [
  { id: '1', imageUrl: 'https://i1.sndcdn.com/avatars-yHA8nds2mqg4uYtr-kyxTzw-t1080x1080.jpg', artist: 'Tame Impala', genre: 'Psychedelic Rock', vibes: 'Chill', popularity: '9' },
  { id: '2', imageUrl: 'https://www.hollywoodinsider.com/wp-content/uploads/2020/09/Hollywood-Insider-Frank-Ocean-Letter-From-Fan.jpg', artist: 'Frank Ocean', genre: 'R&B', vibes: 'Smooth', popularity: '10' },
  { id: '3', imageUrl: 'https://media.allure.com/photos/66ff11de6c3f3d8fc0e06ded/4:3/w_1940,h_1455,c_limit/Charli XCX.jpg', artist: 'Charli XCX', genre: 'Dance', vibes: 'Loud', popularity: '8' },
];

const recommendArtists = [
  { id: '4', imageUrl: 'https://cdn.prod.website-files.com/64e632e1a07b9b35364590b5/6683577edf2e029a9f690cce_SZA%20-artist%20bio-profile.webp', artist: 'Sza', genre: 'R&B', vibes: 'Chill', popularity: '9' },
  { id: '5', imageUrl: 'https://static01.nyt.com/images/2024/10/25/multimedia/25playlist1-gkzl/25playlist1-gkzl-articleLarge.jpg?quality=75&auto=webp&disable=upscale', artist: 'Lady Gaga', genre: 'Pop', vibes: 'Loud', popularity: '10' },
  { id: '6', imageUrl: 'https://i.scdn.co/image/ab67616100005174c36dd9eb55fb0db4911f25dd', artist: 'Bruno Mars', genre: 'Pop', vibes: 'Smooth', popularity: '9' },
];

const AddRecommendationPage: React.FC = () => {
  const [addedArtists, setAddedArtists] = useState(initRecommends);
  const [addArtists, setAddArtists] = useState(recommendArtists);

  const handleAddArtist = (artistId: string) => {
    const artist = addArtists.find((rec) => rec.id === artistId);
    if (artist) {
      setAddedArtists((prev) => [...prev, artist]);
      setAddArtists((prev) => prev.filter((rec) => rec.id !== artistId));
    }
  };

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
                  key={artist.id}
                  imageUrl={artist.imageUrl}
                  artist={artist.artist}
                  genre={artist.genre}
                  vibes={artist.vibes}
                  popularity={artist.popularity}
                />
              ))}
            </div>
          </div>
          <h3 className={styles['section-title']}>Recommended Artists</h3>
          <div className={styles['scrollable-section']}>
            <div className={styles['scrollable-content']}>
              {addArtists.map((artist) => (
                <AddArtist
                  key={artist.id}
                  imageUrl={artist.imageUrl}
                  artist={artist.artist}
                  genre={artist.genre}
                  vibes={artist.vibes}
                  popularity={artist.popularity}
                  onAdd={() => handleAddArtist(artist.id)}
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
