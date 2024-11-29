"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./Login.module.css";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      console.log(res);
      if (res?.error) {
        setError("Wrong username or password");
        return;
      } 

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
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.formInput}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <input
          className={styles.formInput}
          onChange={(e) => setPassword(e.target.value)}
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
