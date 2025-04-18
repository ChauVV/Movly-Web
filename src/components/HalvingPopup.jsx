import React from 'react';
import './HalvingPopup.css';

const HalvingPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="halving-popup-overlay" onClick={onClose}>
      <div className="halving-popup-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>

        <h2>MGD Halving Mechanism</h2>

        <section className="popup-section">
          <h3>Overview</h3>
          <p>MGD (Movly Gold) implements a dynamic halving mechanism that reduces earning rates based on the percentage of remaining tokens earned, ensuring sustainable and long-lasting distribution over time.</p>
        </section>

        <section className="popup-section">
          <h3>Total Supply</h3>
          <p>Maximum supply: 10,000,000,000 MGD</p>
          <p>The halving mechanism works on remaining tokens:</p>
          <ul>
            <li>First halving: When 25% of max supply is earned (2,500M MGD)
              <br />- Earning rate reduces by 25%
              <br />- Remaining supply: 7,500M MGD</li>
            <li>Second halving: When 25% of remaining supply is earned (1,875M MGD)
              <br />- Earning rate reduces by another 25%
              <br />- New remaining supply: 5,625M MGD</li>
            <li>Third halving: When 25% of new remaining supply is earned (1,406.25M MGD)
              <br />- Earning rate reduces by another 25%
              <br />- Process continues...</li>
          </ul>
        </section>

        <section className="popup-section">
          <h3>Earning Rate Formula</h3>
          <p>Current Rate = Base Rate × (Current Reduction Factor)</p>
          <p>Where:</p>
          <ul>
            <li>Base Rate: Initial earning rate</li>
            <li>Reduction Factor: Decreases by 25% each time users earn 25% of remaining supply</li>
            <li>Process continues indefinitely, making tokens increasingly scarce</li>
          </ul>
        </section>

        <section className="popup-section">
          <h3>Example</h3>
          <p>Starting with Base Rate = 100 MGD/day:</p>
          <ul>
            <li>Initial Phase:
              <br />- Full rate: 100 MGD/day
              <br />- Until 2,500M tokens earned (25% of 10,000M)</li>
            <li>First Reduction:
              <br />- Rate reduces to: 75 MGD/day
              <br />- Until 1,875M more tokens earned (25% of 7,500M)</li>
            <li>Second Reduction:
              <br />- Rate reduces to: 56.25 MGD/day
              <br />- Until 1,406.25M more tokens earned (25% of 5,625M)</li>
            <li>Pattern continues:
              <br />- Each time 25% of remaining tokens are earned
              <br />- Rate reduces by 25% of current rate</li>
          </ul>
        </section>

        <section className="popup-section">
          <h3>Benefits</h3>
          <ul>
            <li>Truly sustainable long-term distribution</li>
            <li>Natural scarcity increases over time</li>
            <li>Rewards early participants while maintaining long-term earning potential</li>
            <li>Dynamic adjustment based on actual token circulation</li>
            <li>Theoretically infinite earning cycles with decreasing rates</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default HalvingPopup; 