"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import styles from "./SignUp.module.css";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Form validation/signup logic
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch("/api/register", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, 
          username, 
          password, 
          confirmPassword,
        }),
      });

      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/add-recommendation");
      } else {
        setError("Failed to register. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={`card ${styles.signupCard}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.formInput}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
        />
        <input
          className={styles.formInput}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          required
        />
        <input
          className={styles.formInput}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <input
          className={styles.formInput}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          required
        />
        <button type="submit" className={`button ${styles.signupButton}`}>
          Sign Up
        </button>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </form>
    </div>
  );
};

export default SignUp;
