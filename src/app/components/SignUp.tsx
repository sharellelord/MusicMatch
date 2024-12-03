"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import styles from "./SignUp.module.css";

const SignUp = () => {
  const router = useRouter(); // initialize router for nav
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
      setError('All fields are required.'); // ensures all fields filled out
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.'); // ensures passwords match
      return;
    }

    try {
       // Send POST request to the register API endpoint
      const res = await fetch("/api/register", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // indicate JSON payload
        },
        body: JSON.stringify({
          email, 
          username, 
          password, 
          confirmPassword,
        }),
      });

      if (res.ok) {
        // clear the form and navigate to the add-recommendation page if successful
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
      <form className={styles.form} onSubmit={handleSubmit}> {/* Form for sign-up input */}
        <input
          className={styles.formInput}
          onChange={(e) => setEmail(e.target.value)}  // Update email state on change
          type="email"
          placeholder="Email"
          required
        />
        <input
          className={styles.formInput}
          onChange={(e) => setUsername(e.target.value)} // Update username state on change
          type="text"
          placeholder="Username"
          required
        />
        <input
          className={styles.formInput}
          onChange={(e) => setPassword(e.target.value)}  // Update password state on change
          type="password"
          placeholder="Password"
          required
        />
        <input
          className={styles.formInput}
          onChange={(e) => setConfirmPassword(e.target.value)}  // Update confirmPassword state on change
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

