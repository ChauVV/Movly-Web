import React, { useState, useEffect } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import ConnectWallet from './ConnectWallet';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path, isExternal = false) => (e) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (isExternal) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="logo" onClick={handleNavigation('/')}>
          Movly
        </Link>

        <button className="menu-button" onClick={toggleMenu}>
          {isMenuOpen ? <IoClose /> : <IoMenu />}
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
            onClick={handleNavigation('/')}
          >
            Movly
          </Link>

          <a
            href="https://vo-van-chau.gitbook.io/health-step"
            className={location.pathname === '/whitepaper' ? 'active' : ''}
            onClick={handleNavigation('https://vo-van-chau.gitbook.io/health-step', true)}
          >
            Whitepaper
          </a>

          <Link
            to="/calculator"
            className={location.pathname === '/calculator' ? 'active' : ''}
            onClick={handleNavigation('/calculator')}
          >
            Calculate Earn
          </Link>

          <Link
            to="/sale"
            className={location.pathname === '/sale' ? 'active' : ''}
            onClick={handleNavigation('/sale')}
          >
            Buy Token
          </Link>
          <ConnectWallet />
        </div>
      </nav>
    </header>
  );
}