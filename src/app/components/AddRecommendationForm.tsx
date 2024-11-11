"use client";

import React, { useState } from 'react';
import RecommendationCard from '@/app/components/RecommendationCard';

interface Recommendation {
  vibes: string;
  genre: string;
  artist: string;
  popularity: number;
}

const AddRecommendationForm: React.FC = () => {
  const [vibes, setVibes] = useState('');
  const [genre, setGenre] = useState('');
  const [artist, setArtist] = useState('');
  const [popularity, setPopularity] = useState(5);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRecommendation: Recommendation = {
      vibes,
      genre,
      artist,
      popularity,
    };
    setRecommendations([...recommendations, newRecommendation]);
    setVibes('');
    setGenre('');
    setArtist('');
    setPopularity(5);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Vibes"
          value={vibes}
          onChange={(e) => setVibes(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

        {/* Popularity Slider */}
        <div className="slider-container">
          <label htmlFor="popularity" className="slider-label">
            Popularity: {popularity}
          </label>
          <input
            type="range"
            id="popularity"
            min="1"
            max="10"
            value={popularity}
            onChange={(e) => setPopularity(Number(e.target.value))}
            className="slider"
          />
        </div>

        <button type="submit">Add Recommendation</button>
      </form>

      <div className="cards">
        {recommendations.length === 0 && (
          <p className="no-recommendations">No recommendations yet</p>
        )}
        {recommendations.map((rec, index) => (
          <RecommendationCard key={index} recommendation={rec} />
        ))}
      </div>
    </div>
  );
};

export default AddRecommendationForm;
