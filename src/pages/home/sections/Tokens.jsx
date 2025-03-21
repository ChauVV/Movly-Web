import { motion } from 'framer-motion';
import './Tokens.css';
import React, { useState, useEffect } from 'react';
import HalvingPopup from '../../../components/HalvingPopup';
import { FaExclamationCircle } from 'react-icons/fa';
import bg from '@assets/images/map4.jpeg';
import silverIcon from '@assets/tokens/silver.jpeg';
import goldIcon from '@assets/tokens/gold.jpeg';

export default function Tokens() {
  const [showHalvingPopup, setShowHalvingPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tokens = [
    {
      symbol: 'Movly',
      icon: silverIcon,
      name: 'Movly',
      description: 'The governance token of the Movly ecosystem. Total supply is limited to 3,000,000,000 Movly.',
      features: [
        'Fixed max supply: 3B tokens (Unchangeable)',
        'Stake to earn rewards',
        'Vote on project proposals',
        'NFT purchase benefits',
        'Reduced transaction fees'
      ]
    },
    {
      symbol: 'MGD',
      icon: goldIcon,
      name: 'Movly Gold (Earn Token)',
      description: 'The earning token (MGD) of the Movly ecosystem. Users earn MGD through physical activities with a unique halving mechanism. Total supply is limited to 10,000,000,000 MGD.',
      features: [
        'Fixed max supply: 10B tokens (Unchangeable)',
        'Unique halving mechanism:',
        ' Rate halves at each milestone (25%)',
        ' Milestone: 25% of remaining earned',
        'Anti-inflation features:',
        ' Controlled supply & rate unlike unlimited tokens',
        'Long-term sustainability guaranteed'
      ]
    }
  ];

  const handleInfoClick = (symbol) => {
    if (symbol === 'MGD') {
      setShowHalvingPopup(true);
    }
  };

  return (
    <section className="main-section tokens-section">
      <div className="background-image">
        <img src={bg} alt="background" />
        <div className="blur-overlay" />
      </div>
      <h2 className="tokens-title">Our Tokens</h2>
      {isMobile ? (
        <div className="tokens-content">
          <div className="tokens-container">
            {tokens.map((token) => (
              <div key={token.symbol} className="token-card">
                <div className="token-header">
                  <div className="token-header-left">
                    <div className="token-symbol">
                      <h3>{token.symbol}</h3>
                    </div>
                    <p className="token-name">{token.name}</p>
                  </div>
                  <div className="token-icon-wrapper">
                    <img src={token.icon} alt={token.symbol} className="token-icon" />
                  </div>
                </div>

                <div className="token-description-wrapper">
                  <p className="token-description">{token.description}</p>
                  {token.symbol === 'MGD' && (
                    <FaExclamationCircle
                      className="info-icon"
                      onClick={() => handleInfoClick(token.symbol)}
                      title="Click for halving details"
                    />
                  )}
                </div>

                <div className="token-features">
                  <h4>Features</h4>
                  <ul>
                    {token.features.map((feature, index) => {
                      const isHighlight = [
                        'Fixed max supply: 3B tokens (Unchangeable)',
                        'Fixed max supply: 10B tokens (Unchangeable)',
                        'Unique halving mechanism:',
                        'Anti-inflation features:'
                      ].includes(feature);
                      return (
                        <li
                          key={index}
                          className={`${feature.startsWith(' ') ? 'sub-feature' : ''} ${isHighlight ? 'highlight' : ''}`}
                        >
                          {feature}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          className="tokens-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="tokens-container">
            {tokens.map((token, index) => (
              <motion.div
                key={token.symbol}
                className="token-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="token-header">
                  <div className="token-header-left">
                    <div className="token-symbol">
                      <h3>{token.symbol}</h3>
                    </div>
                    <p className="token-name">{token.name}</p>
                  </div>
                  <div className="token-icon-wrapper">
                    <img src={token.icon} alt={token.symbol} className="token-icon" />
                  </div>
                </div>

                <div className="token-description-wrapper">
                  <p className="token-description">{token.description}</p>
                  {token.symbol === 'MGD' && (
                    <FaExclamationCircle
                      className="info-icon"
                      onClick={() => handleInfoClick(token.symbol)}
                      title="Click for halving details"
                    />
                  )}
                </div>

                <div className="token-features">
                  <h4>Features</h4>
                  <ul>
                    {token.features.map((feature, index) => {
                      const isHighlight = [
                        'Fixed max supply: 3B tokens (Unchangeable)',
                        'Fixed max supply: 10B tokens (Unchangeable)',
                        'Unique halving mechanism:',
                        'Anti-inflation features:'
                      ].includes(feature);
                      return (
                        <li
                          key={index}
                          className={`${feature.startsWith(' ') ? 'sub-feature' : ''} ${isHighlight ? 'highlight' : ''}`}
                        >
                          {feature}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <HalvingPopup
        isOpen={showHalvingPopup}
        onClose={() => setShowHalvingPopup(false)}
      />
    </section>
  );
} 