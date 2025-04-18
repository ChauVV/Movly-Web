import React, { useState, useEffect } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import MovlyLogo from './MovlyLogo';

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
        <MovlyLogo setIsMenuOpen={setIsMenuOpen} />

        <Link
          to="/sale"
          className={location.pathname === '/sale' ? 'active' : ''}
          onClick={handleNavigation('/sale')}
        >
          Buy Token
        </Link>
        <Link
          to="/tokenomics"
          className={location.pathname === '/tokenomics' ? 'active' : ''}
          onClick={handleNavigation('/tokenomics')}
        >
          Tokenomics
        </Link>
        <Link
          to="/calculator"
          className={location.pathname === '/calculator' ? 'active' : ''}
          onClick={handleNavigation('/calculator')}
        >
          Earn Calculator
        </Link>
        <Link
          to="/linktr"
          className={location.pathname === '/linktr' ? 'active' : ''}
          onClick={handleNavigation('/linktr')}
        >
          Linktree
        </Link>
        <Link
          to="/whitepaper"
          className={location.pathname === '/whitepaper' ? 'active' : ''}
          onClick={handleNavigation('/whitepaper')}
        >
          Whitepaper
        </Link>
      </div>
    </>
  );

  const renderDesktopMenu = () => (
    <>
      <div className="nav-links">
        <Link
          to="/sale"
          className={location.pathname === '/sale' ? 'active' : ''}
          onClick={handleNavigation('/sale')}
        >
          Buy Token
        </Link>
        <Link
          to="/tokenomics"
          className={location.pathname === '/tokenomics' ? 'active' : ''}
          onClick={handleNavigation('/tokenomics')}
        >
          Tokenomics
        </Link>
        <Link
          to="/calculator"
          className={location.pathname === '/calculator' ? 'active' : ''}
          onClick={handleNavigation('/calculator')}
        >
          Earn Calculator
        </Link>
        <Link
          to="/linktr"
          className={location.pathname === '/linktr' ? 'active' : ''}
          onClick={handleNavigation('/linktr')}
        >
          Linktree
        </Link>
        <Link
          to="/whitepaper"
          className={location.pathname === '/whitepaper' ? 'active' : ''}
          onClick={handleNavigation('/whitepaper')}
        >
          Whitepaper
        </Link>
      </div>
    </>
  );

  return (
    <header className="header">
      <nav className="nav-container">
        <MovlyLogo setIsMenuOpen={setIsMenuOpen} />

        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </nav>
    </header>
  );
}