import React, { useState, useRef } from 'react';
import './AddItemComponent.css';

const AddItemComponent = () => {
  console.log("TEST");
  const [formData, setFormData] = useState({
    playlistName: '',
    image: null,
    songs: '',
    tags: ''
  });

  // Create a ref for the file input
  const imageInputRef = useRef(null);

  const handleChange = (e) => {
    console.log("TEST1");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    console.log("TEST2");
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    console.log("handleSubmit triggered"); // Add debug log here
    e.preventDefault();  // Make sure to prevent the default form submission behavior
    console.log(formData); // Log the formData to see if it gets captured

    // Reset form data
    setFormData({
      playlistName: '',
      image: null,
      songs: '',
      tags: ''
    });

    // Clear the file input using the ref
    imageInputRef.current.value = '';
  };

  // Test if component renders
  console.log("AddItemComponent rendered");

  return (
    <div className="create-playlist-container">
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
        </div>
        <h1>MusicMatch</h1>
        <div className="user-profile">
          <button className="logout-button">Logout</button>
          <img src="/person.png" alt="user profile" className="user-image" />
        </div>
      </header>
      <div className="create-playlist">
        <div className="create-playlist2">
          {/* Form Submission Trigger */}
          <form onSubmit={handleSubmit}>
            <h2>Create Playlist</h2>
            <div className="form-group">
              <label htmlFor="playlistName">Playlist Name</label>
              <input
                type="text"
                id="playlistName"
                name="playlistName"
                value={formData.playlistName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                name="image"
                ref={imageInputRef} // Attach ref to file input
                onChange={handleImageChange}
              />
              <span className="start-here">Start Here</span>
            </div>
            <div className="form-group">
              <label htmlFor="songs">Search to Add Songs</label>
              <input
                type="text"
                id="songs"
                name="songs"
                value={formData.songs}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tags">Search to Add Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Create!</button>
          </form>
          <div className="playlist-image">
            <img src="/headphones.png" alt="headphones" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemComponent;