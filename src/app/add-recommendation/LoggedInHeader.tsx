'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoggedInHeader.module.css';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const LoggedInHeader: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const handleAddPlaylist = () => {
    router.push('/add-item');
  };

  const handleLibrary = () => {
    router.push('/library');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="logo" />
      </div>
      <h1>MusicMatch</h1>
      <div className={styles.userProfile}>
      <button className={styles.button} onClick={handleLibrary}>
          View Artist Library
        </button>
        <button className={styles.button} onClick={handleAddPlaylist}>
          Add Playlist
        </button>
        <button className={styles.button} onClick={handleLogout}>
          Logout
        </button>
        <Link href="/update-profile-page">
          <img
            src="/person.png"
            alt="user profile"
            className={styles.userImage}
            style={{ cursor: 'pointer' }} // Add pointer cursor for clarity
          />
        </Link>
      </div>
    </header>
  );
};

export default LoggedInHeader;
