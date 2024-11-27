'use client';

import React, { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './AddItemComponent.module.css';
import { useRouter } from 'next/navigation';

interface FormData {
  playlistName: string;
  image: File | null;
  songInput: string;
  songs: string[];
  tags: string;
}

interface Playlist {
  playlistName: string;
  imageUrl: string;
  songs: string[];
  tags: string;
}

const AddItemComponent: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    playlistName: '',
    image: null,
    songInput: '',
    songs: [],
    tags: ''
  });

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isClient, setIsClient] = useState(false); // State to track client-side rendering

  const imageInputRef = useRef<HTMLInputElement>(null);

  // Prevent hydration issues by ensuring this effect runs only on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true); // Set the state once the component is mounted on the client
      const storedPlaylists = localStorage.getItem('playlists');
      if (storedPlaylists) {
        setPlaylists(JSON.parse(storedPlaylists));
      }
    }
  }, []);

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

  const handleAddSong = () => {
    if (formData.songInput) {
      const updatedSongs = [...formData.songs, formData.songInput];
      setFormData({
        ...formData,
        songs: updatedSongs,
        songInput: ''
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.playlistName || formData.songs.length === 0 || !formData.tags) {
      alert('Please fill out all fields!');
      return;
    }

    const newPlaylist: Playlist = {
      playlistName: formData.playlistName,
      imageUrl: formData.image ? URL.createObjectURL(formData.image) : '/headphones.png',
      songs: formData.songs,
      tags: formData.tags
    };

    const updatedPlaylists = [...playlists, newPlaylist];
    setPlaylists(updatedPlaylists);
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));

    setFormData({
      playlistName: '',
      image: null,
      songInput: '',
      songs: [],
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

  if (!isClient) {
    return null; // Render nothing or a loading state until the component is mounted on the client
  }

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
        <form onSubmit={handleSubmit} className={styles['playlist-form']}>
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
  <label htmlFor="songInput">Add a Song</label>
  <input
    type="text"
    id="songInput"
    name="songInput"
    value={formData.songInput}
    onChange={handleChange}
  />
  <button type="button" onClick={handleAddSong} className={styles['add-song-button']}>
    Add Song
  </button>
  <div className={styles['songs-list']}>
    {formData.songs.map((song, index) => (
      <p key={index}>{song}</p>
    ))}
  </div>
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
        </div>
        <div className={styles['my-playlists']}>
          <h2>My Playlists</h2>
          {playlists.map((playlist, index) => (
            <div key={index} className={styles['playlist-card']}>
              <div className={styles['playlist-card-header']}>
                <img src={playlist.imageUrl} alt={playlist.playlistName} className={styles['playlist-image']} />
                <h3>{playlist.playlistName}</h3>
              </div>
              <div className={styles['songs-list']}>
                <p><strong>Songs:</strong></p>
                {playlist.songs.map((song, i) => (
                  <p key={i}>{song}</p>
                ))}
              </div>
              <div className={styles['tags-list']}>
                <p><strong>Tags:</strong></p>
                {playlist.tags.split(',').map((tag, i) => (
                  <p key={i}>{tag}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default AddItemComponent;
