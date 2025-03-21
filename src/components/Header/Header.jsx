import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src="/logo.png" alt="Movly" width="32" height="32" />
        <span>Movly</span>
      </Link>
      <nav>
        <Link to="/whitepaper">Whitepaper</Link>
        <Link to="/calculate">Calculate Earn</Link>
        <Link to="/buy">Buy Token</Link>
        <button className="connect-wallet">Connect Wallet</button>
      </nav>
    </header>
  );
};

export default Header; 