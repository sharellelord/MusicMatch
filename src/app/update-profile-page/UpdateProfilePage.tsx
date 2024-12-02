import React, { useState } from 'react';
import styles from './UpdateProfilePage.module.css';

const UpdateProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    bio: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

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
