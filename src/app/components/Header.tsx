import React from 'react';
import styles from './Header.module.css';


function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoBackground}>
        <span className={styles.logo}>MM</span>
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
