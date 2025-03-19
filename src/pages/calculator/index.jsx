import React, { useState, useEffect } from 'react';
import styles from './Calculator.module.css';
import posterCal from '@assets/images/posterCal.jpeg';

const Calculator = () => {
  const [sneaker, setSneaker] = useState({
    rarity: 'warrior',
    type: 'walker',
    level: 1,
    mana: 2,
    power: 1,
    wings: {
      level: 0,
      bonus: 0
    },
    halo: {
      level: 0,
      bonus: 0
    }
  });

  const [earnings, setEarnings] = useState({
    hsePerMin: 0,
    hsePerSession: 0,
    sessionTime: 0
  });

  const [basePowers, setBasePowers] = useState({
    shoe: 1,
    wings: 1,
    halo: 1
  });

  const rarityOrder = ['warrior', 'general', 'knight', 'lord', 'sovereign'];
  const rarityLabels = {
    warrior: 'Warrior',
    general: 'General',
    knight: 'Knight',
    lord: 'Lord',
    sovereign: 'Sovereign'
  };

  const handleRarityChange = (direction) => {
    const currentIndex = rarityOrder.indexOf(sneaker.rarity);
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    } else {
      newIndex = currentIndex < rarityOrder.length - 1 ? currentIndex + 1 : currentIndex;
    }

    handleSneakerChange('rarity', rarityOrder[newIndex]);
  };

  const rarityMultipliers = {
    warrior: 1.0,
    general: 1.5,
    knight: 2.0,
    lord: 2.5,
    sovereign: 3.0
  };

  const calculateEnhancementBonus = (level) => {
    if (level === 0) return 0;
    if (level <= 10) return 0.05;
    if (level <= 20) return 0.10;
    if (level <= 30) return 0.15;
    return 0.20;
  };

  const calculateHSE = () => {
    // Base rate
    const baseRate = 0.35;

    // Quality multiplier
    const qualityMultiplier = rarityMultipliers[sneaker.rarity];

    // Power bonus
    const powerBonus = 1 + (sneaker.power * 0.01);

    // Level multiplier
    const levelMultiplier = 1 + (sneaker.level * 0.02);

    // Enhancement bonus
    const wingsBonus = 1 + calculateEnhancementBonus(sneaker.wings.level);
    const haloBonus = 1 + calculateEnhancementBonus(sneaker.halo.level);
    const enhancementMultiplier = wingsBonus * haloBonus;

    // Calculate HSE per minute
    const hsePerMin = baseRate * qualityMultiplier * powerBonus * levelMultiplier * enhancementMultiplier;

    // Calculate session details
    const sessionTime = sneaker.mana * 10; // 10 minutes per mana
    const hsePerSession = hsePerMin * sessionTime;

    setEarnings({
      hsePerMin: parseFloat(hsePerMin.toFixed(2)),
      hsePerSession: parseFloat(hsePerSession.toFixed(2)),
      sessionTime
    });
  };

  const calculateTotalPower = (type) => {
    if (type === 'shoe') {
      return basePowers[type] + sneaker.power;
    }
    return basePowers[type] + (sneaker[type]?.level || 0);
  };

  useEffect(() => {
    calculateHSE();
  }, [sneaker]);

  const handleSneakerChange = (field, value) => {
    setSneaker(prev => {
      const updatedSneaker = {
        ...prev,
        [field]: value
      };

      // Reset wings and halo levels if sneaker level is set below 10
      if (field === 'level' && value < 10) {
        updatedSneaker.wings.level = 0;
        updatedSneaker.halo.level = 0;
      }

      return updatedSneaker;
    });
  };

  const handleEnhancementChange = (type, field, value) => {
    setSneaker(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: Math.max(0, Math.min(value, 40)) // Max level 40 for Wings/Halo
      }
    }));
  };

  const getQualityBackground = (quality) => {
    return styles[`calc_${quality}Bg`];
  };

  const handlePowerChange = (type, value) => {
    setBasePowers(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className={styles.calc_container}>
      <h1 className={styles.calc_title}>HSE Earn Calculator</h1>

      <div className={styles.calc_poster}>
        <img src={posterCal} alt="Health Step Calculator Poster" />
      </div>

      <div className={styles.calc_mainContent}>
        {/* Left side - All inputs */}
        <div className={styles.calc_contentSection}>
          <h2>Sneaker</h2>
          <div className={styles.calc_configGrid}>
            <div className={styles.calc_configCard}>

              <div className={styles.calc_configItem}>
                <div className={styles.calc_configLabel}>CHOOSE RARITY:</div>
                <div className={styles.calc_raritySelector}>
                  <button
                    className={styles.calc_rarityNav}
                    onClick={() => handleRarityChange('prev')}
                  >
                    ‹
                  </button>
                  <div className={`${styles.calc_rarityDisplay} ${styles[`calc_rarity${rarityLabels[sneaker.rarity]}`]}`}>
                    {rarityLabels[sneaker.rarity]}
                  </div>
                  <button
                    className={styles.calc_rarityNav}
                    onClick={() => handleRarityChange('next')}
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className={styles.calc_configItem}>
                <div className={styles.calc_configLabel}>SNEAKERS LEVEL:</div>
                <div className={styles.calc_controls}>
                  <button onClick={() => handleSneakerChange('level', Math.max(1, sneaker.level - 1))}>‹</button>
                  <span>{sneaker.level}</span>
                  <button onClick={() => handleSneakerChange('level', sneaker.level + 1)}>›</button>
                </div>
              </div>

              <div className={styles.calc_configItem}>
                <div className={styles.calc_configLabel}>DAILY MANA:</div>
                <div className={styles.calc_controls}>
                  <button onClick={() => handleSneakerChange('mana', Math.max(2, sneaker.mana - 1))}>‹</button>
                  <span>{sneaker.mana}</span>
                  <button onClick={() => handleSneakerChange('mana', Math.min(20, sneaker.mana + 1))}>›</button>
                </div>
              </div>
            </div>


          </div>

          <div className={styles.calc_enhancementsSection}>
            <h2>Wings</h2>
            <div className={styles.calc_configGrid}>
              <div className={styles.calc_configCard} style={{ opacity: sneaker.level < 10 ? 0.5 : 1 }}>
                <div className={styles.calc_configItem}>
                  <div className={styles.calc_configLabel}>WINGS LEVEL:</div>
                  <div className={styles.calc_controls}>
                    <button onClick={() => handleEnhancementChange('wings', 'level', sneaker.wings.level - 1)} disabled={sneaker.level < 10}>-</button>
                    <span>{sneaker.wings.level}</span>
                    <button onClick={() => handleEnhancementChange('wings', 'level', sneaker.wings.level + 1)} disabled={sneaker.level < 10}>+</button>
                  </div>
                  <p>Bonus: +{(calculateEnhancementBonus(sneaker.wings.level) * 100).toFixed(0)}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.calc_enhancementsSection}>
            <h2>Halo</h2>
            <div className={styles.calc_configGrid}>
              <div className={styles.calc_configCard} style={{ opacity: sneaker.level < 10 ? 0.5 : 1 }}>
                <div className={styles.calc_configItem}>
                  <div className={styles.calc_configLabel}>HALO LEVEL:</div>
                  <div className={styles.calc_controls}>
                    <button onClick={() => handleEnhancementChange('halo', 'level', sneaker.halo.level - 1)} disabled={sneaker.level < 10}>-</button>
                    <span>{sneaker.halo.level}</span>
                    <button onClick={() => handleEnhancementChange('halo', 'level', sneaker.halo.level + 1)} disabled={sneaker.level < 10}>+</button>
                  </div>
                  <p>Bonus: +{(calculateEnhancementBonus(sneaker.halo.level) * 100).toFixed(0)}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.calc_contentSection}>
            <h2>Power</h2>
            <div className={styles.calc_powerSection}>
              <div className={styles.calc_powerItem}>
                <div className={styles.calc_powerLabel}>SHOE:</div>
                <input
                  type="number"
                  value={basePowers.shoe}
                  onChange={(e) => handlePowerChange('shoe', Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                  className={styles.calc_powerInput}
                  placeholder="1-10"
                />
                <div className={styles.calc_powerControls}>
                  <button onClick={() => handlePowerChange('shoe', Math.max(1, basePowers.shoe - 1))}>‹</button>
                  <span>{calculateTotalPower('shoe')}</span>
                  <button onClick={() => handlePowerChange('shoe', Math.min(10, basePowers.shoe + 1))}>›</button>
                </div>
              </div>

              <div className={styles.calc_powerItem}>
                <div className={styles.calc_powerLabel}>WINGS:</div>
                <input
                  type="number"
                  value={basePowers.wings}
                  onChange={(e) => handlePowerChange('wings', Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                  className={styles.calc_powerInput}
                  placeholder="1-10"
                />
                <div className={styles.calc_powerControls}>
                  <button onClick={() => handlePowerChange('wings', Math.max(1, basePowers.wings - 1))}>‹</button>
                  <span>{calculateTotalPower('wings')}</span>
                  <button onClick={() => handlePowerChange('wings', Math.min(10, basePowers.wings + 1))}>›</button>
                </div>
              </div>

              <div className={styles.calc_powerItem}>
                <div className={styles.calc_powerLabel}>HALO:</div>
                <input
                  type="number"
                  value={basePowers.halo}
                  onChange={(e) => handlePowerChange('halo', Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                  className={styles.calc_powerInput}
                  placeholder="1-10"
                />
                <div className={styles.calc_powerControls}>
                  <button onClick={() => handlePowerChange('halo', Math.max(1, basePowers.halo - 1))}>‹</button>
                  <span>{calculateTotalPower('halo')}</span>
                  <button onClick={() => handlePowerChange('halo', Math.min(10, basePowers.halo + 1))}>›</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Sneaker and Results */}
        <div className={styles.calc_sneakerSection}>
          <div className={styles.calc_sneakerDisplay}>
            <div className={`${styles.calc_sneakerBg} ${getQualityBackground(sneaker.rarity)}`}>
              {sneaker.halo.level > 0 && (
                <svg viewBox="0 0 100 100" className={styles.calc_flameAnimation}>
                  <defs>
                    <radialGradient id="haloGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFF" stopOpacity="1" />
                      <stop offset="30%" stopColor="#FFD700" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#FFD700" stopOpacity="0.7" />
                      <stop offset="85%" stopColor="#FFD700" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="49" fill="url(#haloGradient)" />
                </svg>
              )}
            </div>
          </div>

          <div className={styles.calc_resultsCard}>
            <h2>Earnings</h2>
            <div className={styles.calc_resultsGrid}>
              <div>
                <p>HSE per minute: {earnings.hsePerMin}</p>
                <p>Session time: {earnings.sessionTime} minutes</p>
                <p>HSE per session: {earnings.hsePerSession}</p>
              </div>
            </div>
          </div>

          <div className={styles.calc_formula}>
            <h3>Earning Formula:</h3>
            <code>
              HSE/min = 0.35 × Quality × (1 + Power×0.01) × (1 + Level×0.02) × [(1 + Wings) × (1 + Halo)]
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator; 