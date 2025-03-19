import React, { useState } from 'react';
import styles from './Calculator.module.css';

const Calculator = () => {
  const [sneaker, setSneaker] = useState({
    rarity: 'common',
    type: 'walker',
    level: 0,
    energy: 2,
    attributes: {
      efficiency: 0,
      luck: 0,
      comfort: 0,
      resilience: 0
    }
  });

  const [dailyIncome, setDailyIncome] = useState({
    gst: 0,
    durability: 0,
    repairCost: 0,
    hpLoss: 0,
    mysteryBox: 0
  });

  const handleAttributeChange = (attribute, value) => {
    setSneaker(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attribute]: Math.max(0, value)
      }
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Earn Calculator</h1>

      <div className={styles.configGrid}>
        <div className={styles.configCard}>
          <h2>Choose Rarity:</h2>
          <select
            className={styles.select}
            value={sneaker.rarity}
            onChange={(e) => setSneaker({ ...sneaker, rarity: e.target.value })}
          >
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
          </select>
        </div>

        <div className={styles.configCard}>
          <h2>Choose Type:</h2>
          <select
            className={styles.select}
            value={sneaker.type}
            onChange={(e) => setSneaker({ ...sneaker, type: e.target.value })}
          >
            <option value="walker">Walker</option>
            <option value="jogger">Jogger</option>
            <option value="runner">Runner</option>
          </select>
        </div>
      </div>

      <div className={styles.attributesSection}>
        <h2>Attributes</h2>
        <div className={styles.attributesGrid}>
          {Object.entries(sneaker.attributes).map(([key, value]) => (
            <div key={key} className={styles.attributeItem}>
              <label className="capitalize mb-2">{key}</label>
              <div className={styles.attributeControls}>
                <button
                  className={styles.button}
                  onClick={() => handleAttributeChange(key, value - 1)}
                >
                  -
                </button>
                <span>{value}</span>
                <button
                  className={styles.button}
                  onClick={() => handleAttributeChange(key, value + 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.resultsCard}>
        <h2>Daily Income</h2>
        <div className={styles.resultsGrid}>
          <div>
            <p>GST per day: {dailyIncome.gst}</p>
            <p>Durability: {dailyIncome.durability}</p>
            <p>Repair cost: {dailyIncome.repairCost} GST</p>
          </div>
          <div>
            <p>HP lost: {dailyIncome.hpLoss}%</p>
            <p>Avg. Mystery box: Level {dailyIncome.mysteryBox}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator; 