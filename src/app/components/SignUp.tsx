import React from 'react';
import styles from './SignUp.module.css';


const SignUp = () => {
  return (
    <div className={`card ${styles.signupCard}`}>
      <form className={styles.form}>
        <input className={styles.formInput} type="email" placeholder="Email" />
        <input className={styles.formInput} type="text" placeholder="Username" />
        <input className={styles.formInput} type="password" placeholder="Password" />
        <input className={styles.formInput} type="password" placeholder="Confirm Password" />
        <button type="submit" className={`button ${styles.signupButton}`}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
