'use client';

import React, { useState } from 'react';
import styles from './AddRecommendationForm.module.css';

const AddRecommendationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    vibes: '',
    genre: '',
    artist: '',
    popularity: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.group('Submitted Form Data');
    console.log('Vibes:', formData.vibes);
    console.log('Genre:', formData.genre);
    console.log('Artist:', formData.artist);
    console.log('Popularity:', formData.popularity);
    console.groupEnd();

    setFormData({ vibes: '', genre: '', artist: '', popularity: '' });
  };

  return (
    <div className={styles['form-card']}>
      <h2 className="form-title">Find your Music Match</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="vibes">Vibes</label>
        <input
          type="text"
          id="vibes"
          name="vibes"
          value={formData.vibes}
          onChange={handleChange}
          required
        />

        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />

        <label htmlFor="artist">Artist</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />

        <label htmlFor="popularity">Popularity (1-10)</label>
        <input
          type="number"
          id="popularity"
          name="popularity"
          value={formData.popularity}
          onChange={handleChange}
          min="1"
          max="10"
          required
        />

        <button type="submit" className={styles['submit-button']}>Submit</button>
      </form>
    </div>
  );
};

export default AddRecommendationForm;
