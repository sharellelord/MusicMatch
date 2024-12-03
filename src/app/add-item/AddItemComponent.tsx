'use client';

import React, { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './AddItemComponent.module.css';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

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
    tags: '',
  });

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]); // Store iTunes search results

  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedPlaylists = localStorage.getItem('playlists');
    if (storedPlaylists) {
      setPlaylists(JSON.parse(storedPlaylists));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const searchiTunes = async (query: string) => {
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error searching iTunes:', error);
    }
  };

  const handleSongSearch = async () => {
    if (formData.songInput) {
      await searchiTunes(formData.songInput);
    }
  };

  const handleAddSong = (song: any) => {
    const updatedSongs = [...formData.songs, `${song.trackName} by ${song.artistName}`];
    setFormData({
      ...formData,
      songs: updatedSongs,
      songInput: '',
    });
    setSearchResults([]); // Clear search results after adding a song
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
      tags: formData.tags,
    };

    const updatedPlaylists = [...playlists, newPlaylist];
    setPlaylists(updatedPlaylists);
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));

    setFormData({
      playlistName: '',
      image: null,
      songInput: '',
      songs: [],
      tags: '',
    });

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
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
            <label htmlFor="songInput">Search for a Song</label>
            <input
              type="text"
              id="songInput"
              name="songInput"
              value={formData.songInput}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={handleSongSearch}
              className={styles['add-song-button']}
            >
              Search
            </button>
          </div>

          <div className={styles['search-results']}>
            {searchResults.map((song, index) => (
              <div key={index} className={styles['search-result']} onClick={() => handleAddSong(song)}>
                <p>
                  {song.trackName} by {song.artistName}
                </p>
              </div>
            ))}
          </div>

          <div className={styles['songs-list']}>
            <h3>Added Songs:</h3>
            {formData.songs.map((song, index) => (
              <p key={index}>{song}</p>
            ))}
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="tags">Add Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles['submit-button']}>
            Create!
          </button>
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
