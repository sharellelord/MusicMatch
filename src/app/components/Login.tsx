"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./Login.module.css";

const Login = () => {
  const router = useRouter(); // initialize router for nav
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // handles form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate input fields
    if (!username || !password) {
      setError('All fields are required.'); //ensures all fields filled
      return;
    }

    try {
      // sign in with credentials provider
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      // handle errors in auth
      console.log(res);
      if (res?.error) {
        setError("Wrong username or password");
        return;
      } 

      // redirect to add-recommendation page on successful login
      router.push("/add-recommendation");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`card ${styles.loginCard}`}>
      <img
        src="headphones.png"
        alt="Headphones"
        className={styles.headphonesIcon}
      />
      <form className={styles.form} onSubmit={handleSubmit}> {/* Form for login input */}
        <input
          className={styles.formInput}
          onChange={(e) => setUsername(e.target.value)}  // Update username state on change
          type="text"
          placeholder="Username"
        />
        <input
          className={styles.formInput}
          onChange={(e) => setPassword(e.target.value)}  // Update password state on change
          type="password"
          placeholder="Password"
        />
        <button type="submit" className={`button ${styles.loginButton}`}>
          Log In
        </button>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
