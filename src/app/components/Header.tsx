import React from 'react';
import styles from './Header.module.css';

// header info
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoBackground}>
      <div className={styles.logo}>
          <img src="/logo.png" alt="logo" />
      </div>
      </div>
      <h1 className={styles.appName}>MusicMatch</h1>
      <div className={styles.menuIcon}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </header>
  );
}

export default Header;
