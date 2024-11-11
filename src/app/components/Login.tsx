import React from 'react';
import styles from './Login.module.css';


const Login = () => {
  return (
    <div className={`card ${styles.loginCard}`}>
      <img src="https://png.pngtree.com/png-vector/20240903/ourmid/pngtree-rainbow-headphones-music-clipart-illustration-png-image_13743867.png" alt="Headphones" className={styles.headphonesIcon} />
      <form className={styles.form}>
        <input className={styles.formInput} type="text" placeholder="Username" />
        <input className={styles.formInput} type="password" placeholder="Password" />
        <button type="submit" className={`button ${styles.loginButton}`}>Log In</button>
      </form>
    </div>
  );
}

export default Login;