import React, { useState, useEffect } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import ConnectWallet from './ConnectWallet';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          Health Step
        </Link>

        <button className="menu-button" onClick={toggleMenu}>
          {isMenuOpen ? <IoClose /> : <IoMenu />}
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Health Step
          </Link>

          <a
            href="https://vo-van-chau.gitbook.io/health-step"
            target="_blank"
            rel="noopener noreferrer"
            className={location.pathname === '/whitepaper' ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Whitepaper
          </a>

          <Link
            to="/calculator"
            className={location.pathname === '/calculator' ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Calculate Earn
          </Link>

          <Link
            to="/sale"
            className={location.pathname === '/sale' ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Buy Token
          </Link>
          <ConnectWallet />
        </div>
      </nav>
    </header>
  );
}