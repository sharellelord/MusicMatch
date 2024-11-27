'use client';

import React, { useState } from 'react';
import AddRecommendationForm from '../add-recommendation/AddRecommendationForm';
import RecommendationCard from '../add-recommendation/RecommendationCard';
import AddArtist from '../add-recommendation/AddArtist';
import styles from './AddRecommendationPage.module.css';
import LibraryHeader from '../add-recommendation/LibraryHeader';
import AddItemComponent from '../add-item/AddItemComponent'; // Import the AddItemComponent

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
  const [playlists, setPlaylists] = useState<any[]>([]);

  const handleAddArtist = (artistId: string) => {
    const artist = addArtists.find((rec) => rec.id === artistId);
    if (artist) {
      setAddedArtists((prev) => [...prev, artist]);
      setAddArtists((prev) => prev.filter((rec) => rec.id !== artistId));
    }
  };

  const handleAddPlaylist = (playlist: any) => {
    setPlaylists((prev) => [...prev, playlist]);
  };

  return (
    <>
      <LibraryHeader/>
      <div className={styles['page-container']}>

        <div className={styles['lists-container']}>
          <div className={styles['list']}>
            <h3 className={styles['section-title']}>Added Artists</h3>
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
      </div>
    </>
  );
};

export default AddRecommendationPage;
