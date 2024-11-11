"use client";

import Link from 'next/link';

interface HeaderProps {
  isLoggedIn: boolean;
  handleLoginToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, handleLoginToggle }) => {
  return (
    <header className="header">
      <h1>Music Match</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/add-recommendation">Add Recommendation</Link>
      </nav>
      {/* Login/Logout Button */}
      <button onClick={handleLoginToggle} className="login-button">
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </header>
  );
};

export default Header;
