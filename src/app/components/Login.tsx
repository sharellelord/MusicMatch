"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './Login.module.css';


const Login = () => {

  const router = useRouter();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form validation/signup logic goes here

    // Goes to reccomendation page
    router.push('/add-recommendation');
  };

  return (
    <div className={`card ${styles.loginCard}`}>
      <img src="https://png.pngtree.com/png-vector/20240903/ourmid/pngtree-rainbow-headphones-music-clipart-illustration-png-image_13743867.png" alt="Headphones" className={styles.headphonesIcon} />
      <form className={styles.form} onSubmit={handleSubmit} >
        <input className={styles.formInput} type="text" placeholder="Username" />
        <input className={styles.formInput} type="password" placeholder="Password" />
        <button type="submit" className={`button ${styles.loginButton}`}>Log In</button>
      </form>
    </div>
  );
}

export default Login;