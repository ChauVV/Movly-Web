import React, { useState, useEffect } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import ConnectWallet from './ConnectWallet';
import logo from '@assets/icons/logo2.jpeg';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigation = (path, isExternal = false) => (e) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (isExternal) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
  };

  const renderMobileMenu = () => (
    <>
      <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <IoClose /> : <IoMenu />}
      </button>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <Link
          to="/"
          className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
          onClick={handleNavigation('/')}
        >
          <img src={logo} alt="Movly Logo" className="nav-logo" />
          <span className="mobile-only">Movly</span>
        </Link>

        <Link to="/"
          className={location.pathname === '/' ? 'active' : ''}
          onClick={handleNavigation('/')}>
          <img src={logo} alt="Movly Logo" className="header-logo" />
          <span>Movly</span>
        </Link>

        <Link
          to="/whitepaper"
          className={location.pathname === '/whitepaper' ? 'active' : ''}
          onClick={handleNavigation('/whitepaper')}
        >
          Whitepaper
        </Link>

        <Link
          to="/calculator"
          className={location.pathname === '/calculator' ? 'active' : ''}
          onClick={handleNavigation('/calculator')}
        >
          Earn Calculator
        </Link>

        <Link
          to="/sale"
          className={location.pathname === '/sale' ? 'active' : ''}
          onClick={handleNavigation('/sale')}
        >
          Buy Token
        </Link>
        <div className='connect-wallet-btn'>
          <ConnectWallet />
        </div>
      </div>
    </>
  );

  const renderDesktopMenu = () => (
    <>
      <div className="nav-links">
        <Link
          to="/whitepaper"
          className={location.pathname === '/whitepaper' ? 'active' : ''}
          onClick={handleNavigation('/whitepaper')}
        >
          Whitepaper
        </Link>

        <Link
          to="/calculator"
          className={location.pathname === '/calculator' ? 'active' : ''}
          onClick={handleNavigation('/calculator')}
        >
          Earn Calculator
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
    </>
  );

  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="logo" onClick={handleNavigation('/')}>
          <img src={logo} alt="Movly Logo" className="header-logo" />
          <span>Movly</span>
        </Link>

        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </nav>
    </header>
  );
}