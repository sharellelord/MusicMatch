'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoggedInHeader.module.css';

const LoggedInHeader: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  const handleAddPlaylist = () => {
    router.push('/add-item');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="logo" />
      </div>
      <h1>MusicMatch</h1>
      <div className={styles.userProfile}>
        <button className={styles.button} onClick={handleAddPlaylist}>
          Add Playlist
        </button>
        <button className={styles.button} onClick={handleLogout}>
          Logout
        </button>
        <img src="/person.png" alt="user profile" className={styles.userImage} />
      </div>
    </header>
  );
};

export default LoggedInHeader;
