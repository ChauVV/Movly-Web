import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="Footer-content">
        <a href="mailto:support@movly.run" className="Footer-email">support@movly.run</a>
        <div className="Footer-links">
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
        <div className="Footer-copyright">
          COPYRIGHT 2024 MOVLY TECHNOLOGY LIMITED. ALL RIGHTS RESERVED | POWERED BY MOVLY TECHNOLOGY LTD.
        </div>
      </div>
    </footer>
  );
} 