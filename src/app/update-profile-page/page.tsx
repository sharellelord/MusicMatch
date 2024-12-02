"use client";

import React from 'react';
import UpdateProfileComponent from './UpdateProfilePage';
import LoggedInHeader from './LibraryHeader';
import styles from './UpdateProfilePage.module.css';

const UpdateProfilePage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
        <LoggedInHeader />
        <div className={styles.formContainer} >
            <UpdateProfileComponent />
        </div>
    </div>
  );
};

export default UpdateProfilePage;
