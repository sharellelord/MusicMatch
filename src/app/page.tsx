import React from 'react';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Login from './components/Login';




function App() {
  return (
    <div className="app">
      <Header />
      <h2 className="title">Ready to Find Music Catered to You?</h2>
      <div className="cards-container">
        <SignUp />
        <Login />
      </div>
    </div>
  );
}

export default App;
