"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './SignUp.module.css';

const SignUp = () => {
  const router = useRouter();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form validation/signup logic goes here

    // Goes to reccomendation page
    router.push('/add-recommendation');
  };

  return (
    <div className={`card ${styles.signupCard}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.formInput} type="email" placeholder="Email" required />
        <input className={styles.formInput} type="text" placeholder="Username" required />
        <input className={styles.formInput} type="password" placeholder="Password" required />
        <input className={styles.formInput} type="password" placeholder="Confirm Password" required />
        <button type="submit" className={`button ${styles.signupButton}`}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
