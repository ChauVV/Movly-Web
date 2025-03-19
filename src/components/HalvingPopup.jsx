import React from 'react';
import './HalvingPopup.css';

const HalvingPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="halving-popup-overlay" onClick={onClose}>
      <div className="halving-popup-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>

        <h2>HSE Halving Mechanism</h2>

        <section className="popup-section">
          <h3>Overview</h3>
          <p>HSE implements a unique halving mechanism that automatically adjusts earning rates based on the total amount of tokens earned, ensuring sustainable and fair distribution over time.</p>
        </section>

        <section className="popup-section">
          <h3>Total Supply</h3>
          <p>Maximum supply: 2,000,000,000 HSE</p>
          <ul>
            <li>First milestone: 1,000,000,000 HSE (50% of max)</li>
            <li>Second milestone: 500,000,000 HSE (25% of max)</li>
            <li>Third milestone: 250,000,000 HSE (12.5% of max)</li>
            <li>And continues following this pattern</li>
          </ul>
        </section>

        <section className="popup-section">
          <h3>Earning Rate Formula</h3>
          <p>Daily Rate = Base Rate / (1 + Time Factor)</p>
          <p>Where:</p>
          <ul>
            <li>Base Rate: Initial earning rate for each milestone</li>
            <li>Time Factor: Increases as more tokens are earned within each milestone</li>
            <li>Rate halves automatically when reaching each milestone</li>
          </ul>
        </section>

        <section className="popup-section">
          <h3>Example</h3>
          <p>Starting with Base Rate = 100 HSE/day:</p>
          <ul>
            <li>Until 1B tokens earned:
              <br />- Initial rate: 100 HSE/day
              <br />- Rate gradually decreases as tokens are earned
              <br />- Halves when reaching 1B total earned</li>
            <li>After first halving:
              <br />- New base rate: 50 HSE/day
              <br />- Rate continues to decrease gradually
              <br />- Halves again at 500M more tokens earned</li>
          </ul>
        </section>

        <section className="popup-section">
          <h3>Benefits</h3>
          <ul>
            <li>Self-adjusting distribution based on actual usage</li>
            <li>Prevents inflation through automatic rate reduction</li>
            <li>Rewards early adopters while maintaining long-term sustainability</li>
            <li>Transparent and predictable earning mechanism</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default HalvingPopup; 