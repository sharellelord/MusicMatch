'use client';

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import styles from './AddItemComponent.module.css';
import { useRouter } from 'next/navigation';

interface FormData {
  playlistName: string;
  image: File | null;
  songs: string;
  tags: string;
}

const AddItemComponent: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    playlistName: '',
    image: null,
    songs: '',
    tags: ''
  });

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);

    // Reset form data
    setFormData({
      playlistName: '',
      image: null,
      songs: '',
      tags: ''
    });

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleLogout = () => {
    router.push('/');
  };

  const handleGoToMusicMatch = () => {
    router.push('/add-recommendation');
  };

  return (
    <div className={styles['create-playlist-container']}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="logo" />
        </div>
        <h1>MusicMatch</h1>
        <div className={styles['user-profile']}>
          <button className={styles['action-button']} onClick={handleGoToMusicMatch}>
            Go to Music Match
          </button>
          <button className={styles['action-button']} onClick={handleLogout}>
            Logout
          </button>
          <img src="/person.png" alt="user profile" className={styles['user-image']} />
        </div>
      </header>
      <div className={styles['create-playlist']}>
        <div className={styles['create-playlist2']}>
          <form onSubmit={handleSubmit}>
            <h2>Create Playlist</h2>
            <div className={styles['form-group']}>
              <label htmlFor="playlistName">Playlist Name</label>
              <input
                type="text"
                id="playlistName"
                name="playlistName"
                value={formData.playlistName}
                onChange={handleChange}
              />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                name="image"
                ref={imageInputRef}
                onChange={handleImageChange}
              />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor="songs">Search to Add Songs</label>
              <input
                type="text"
                id="songs"
                name="songs"
                value={formData.songs}
                onChange={handleChange}
              />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor="tags">Search to Add Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className={styles['submit-button']}>Create!</button>
          </form>
          <div className={styles['playlist-image']}>
            <img src="/headphones.png" alt="headphones" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemComponent;
