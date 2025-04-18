import { motion } from 'framer-motion';
import styles from './Tokens.module.css';
import React, { useState, useEffect } from 'react';
import HalvingPopup from '../../../components/HalvingPopup';
import { FaExclamationCircle } from 'react-icons/fa';
import bg from '@assets/images/map4.jpeg';
import silverIcon from '@assets/gmd/gmd.png';
import goldIcon from '@assets/movly/movly.png';

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
      icon: goldIcon,
      name: 'Movly',
      description: 'The governance token of the Movly ecosystem. Total supply is limited to 5,000,000,000 Movly.',
      features: [
        'Fixed max supply: 5B tokens (Unchangeable)',
        'Stake to earn rewards',
        'Vote on project proposals',
        'NFT purchase benefits',
        'Reduced transaction fees'
      ]
    },
    {
      symbol: 'MGD',
      icon: silverIcon,
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
    <section className={`${styles['main-section']} ${styles['tokens-section']}`}>
      <div className={styles['background-image']}>
        <img src={bg} alt="background" />
      </div>
      <div className={styles['blur-overlay']}></div>

      <h2 className={styles['tokens-title']}>Our Tokens</h2>
      {isMobile ? (
        <div className={styles['tokens-content']}>
          <div className={styles['tokens-container']}>
            {tokens.map((token) => (
              <div key={token.symbol} className={styles['token-card']}>
                <div className={styles['token-header']}>
                  <div className={styles['token-header-left']}>
                    <div className={styles['token-symbol']}>
                      <h3>{`#${token.symbol}`}</h3>
                    </div>
                    <p className={styles['token-name']}>{token.name}</p>
                  </div>
                  <div className={styles['token-icon-wrapper']}>
                    <img src={token.icon} alt={token.symbol} className={styles['token-icon']} />
                  </div>
                </div>

                <div className={styles['token-description-wrapper']}>
                  <p className={styles['token-description']}>{token.description}</p>
                  {token.symbol === 'MGD' && (
                    <FaExclamationCircle
                      className={styles['info-icon']}
                      onClick={() => handleInfoClick(token.symbol)}
                      title="Click for halving details"
                    />
                  )}
                </div>

                <div className={styles['token-features']}>
                  <h4>Features</h4>
                  <ul>
                    {token.features.map((feature, index) => {
                      const isHighlight = [
                        'Fixed max supply: 5B tokens (Unchangeable)',
                        'Fixed max supply: 10B tokens (Unchangeable)',
                        'Unique halving mechanism:',
                        'Anti-inflation features:'
                      ].includes(feature);
                      return (
                        <li
                          key={index}
                          className={`${feature.startsWith(' ') ? styles['sub-feature'] : ''} ${isHighlight ? styles['highlight'] : ''}`}
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
          className={styles['tokens-content']}
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles['tokens-container']}>
            {tokens.map((token, index) => (
              <motion.div
                key={token.symbol}
                className={styles['token-card']}
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className={styles['token-header']}>
                  <div className={styles['token-header-left']}>
                    <div className={styles['token-symbol']}>
                      <h3>{`#${token.symbol}`}</h3>
                    </div>
                    <p className={styles['token-name']}>{token.name}</p>
                  </div>
                  <div className={styles['token-icon-wrapper']}>
                    <img src={token.icon} alt={token.symbol} className={styles['token-icon']} />
                  </div>
                </div>

                <div className={styles['token-description-wrapper']}>
                  <p className={styles['token-description']}>{token.description}</p>
                  {token.symbol === 'MGD' && (
                    <FaExclamationCircle
                      className={styles['info-icon']}
                      onClick={() => handleInfoClick(token.symbol)}
                      title="Click for halving details"
                    />
                  )}
                </div>

                <div className={styles['token-features']}>
                  <h4>Features</h4>
                  <ul>
                    {token.features.map((feature, index) => {
                      const isHighlight = [
                        'Fixed max supply: 5B tokens (Unchangeable)',
                        'Fixed max supply: 10B tokens (Unchangeable)',
                        'Unique halving mechanism:',
                        'Anti-inflation features:'
                      ].includes(feature);
                      return (
                        <li
                          key={index}
                          className={`${feature.startsWith(' ') ? styles['sub-feature'] : ''} ${isHighlight ? styles['highlight'] : ''}`}
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