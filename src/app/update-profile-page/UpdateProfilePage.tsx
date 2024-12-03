"use client";

import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import styles from './UpdateProfilePage.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { Router } from 'express';


type DecodedToken = {
  userId: string;
  exp: number;
};


const UpdateProfilePage = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    bio: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.userId) {
        if (status === "loading") {
          console.log("Session is still loading...");
        } else {
          console.log("No session or userId found");
        }
        return;
      }

      const userId = session.userId;

      setLoading(true);

      try {
        localStorage.setItem("currentUserId", userId);

        if (!userId.match(/^[a-fA-F0-9]{24}$/)) {
          throw new Error("Invalid User ID format.");
        }

        const response = await fetch(`/api/user/${userId}`, {
          method: "GET",
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(errorDetails.message || "Failed to fetch user data.");
        }

        const userData = await response.json();

        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          username: userData.username || "",
          bio: userData.bio || "",
        });
      } catch (err: any) {
        console.error("Error fetching user data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session, status]);

  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = session.userId;
  
    if (!userId) {
      setError("User ID is missing.");
      return;
    }
  
    setLoading(true);
  
    try {
      if (!userId.match(/^[a-fA-F0-9]{24}$/)) {
        throw new Error("Invalid User ID format.");
      }
  
      const response = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Failed to update user data.");
      }
  

      console.log("Profile updated successfully");
    } catch (err: any) {
      console.error("Error updating profile:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles['update-profile-container']}>
      <h1>Update Profile</h1>
      <form className={styles['profile-form']} onSubmit={handleSubmit}>
        <div className={styles['form-row']}>
          <div className={styles['form-group']}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={styles['input-field']}
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={styles['input-field']}
            />
          </div>
        </div>
        <div className={styles['form-row']}>
          <div className={styles['form-group']}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles['input-field']}
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={styles['input-field']}
            />
          </div>
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className={styles['bio-field']}
          />
        </div>
        <button type="submit" className={styles['submit-button']}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
