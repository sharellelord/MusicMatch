'use client';

import React, { useState } from 'react';
import styles from './AddRecommendationForm.module.css';

const AddRecommendationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    vibes: '',
    genre: '',
    artist: '',
    imageUrl: '',
    popularity: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.group('Submitted Form Data');
    console.log('Vibes:', formData.vibes);
    console.log('Genre:', formData.genre);
    console.log('Artist:', formData.artist);
    console.log('Image URL:', formData.imageUrl);
    console.log('Popularity:', formData.popularity);
    console.groupEnd();

    setFormData({ vibes: '', genre: '', artist: '', imageUrl: '', popularity: '1' });
  };

  return (
    <div className={styles['form-card']}>
      <h2 className={styles['form-title']}>Find your Music Match</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="vibes">Vibes</label>
        <select
          id="vibes"
          name="vibes"
          value={formData.vibes}
          onChange={handleChange}
          required
        >
          <option value="">Select a vibe...</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Chill">Chill</option>
          <option value="Loud">Loud</option>
          <option value="Trippy">Trippy</option>
          <option value="Energetic">Energetic</option>
          <option value="Smooth">Smooth</option>
          <option value="Experimental">Experimental</option>
          <option value="Dark">Dark</option>
          <option value="Sharp">Sharp</option>
          <option value="Elegant">Elegant</option>
          <option value="Meaningful">Meaningful</option>
        </select>

        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        >
          <option value="">Select a genre...</option>
          <option value="Pop">Pop</option>
          <option value="Rock">Rock</option>
          <option value="R&B">R&B</option>
          <option value="Psychedelic Rock">Psychedelic Rock</option>
          <option value="Hip Hop">Hip Hop</option>
          <option value="EDM">EDM</option>
          <option value="Soul">Soul</option>
          <option value="Country">Country</option>
          <option value="Alternative">Alternative</option>
          <option value="Funk">Funk</option>
          <option value="Metal">Metal</option>
          <option value="Disco">Disco</option>
          <option value="Indie">Indie</option>
          <option value="Rap">Rap</option>
          <option value="International">International</option>
          <option value="Misc.">Misc.</option>
        </select>

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

        <label htmlFor="imageUrl">Image</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <button type="submit" className={styles['submit-button']}>Submit</button>
      </form>
    </div>
  );
};

export default AddRecommendationForm;
