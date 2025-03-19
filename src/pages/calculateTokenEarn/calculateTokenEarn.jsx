import React, { useState, useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import './calculateTokenEarn.css';
import bg from '@assets/images/s3.jpg';
import Modal from 'react-modal';

const STATS_CONFIG = {
  SHOE: {
    power: [
      { level: 1, range: [5, 10] },
      { level: 2, range: [15, 20] },
      { level: 3, range: [25, 30] },
      { level: 4, range: [35, 40] },
      { level: 5, range: [45, 50] },
      { level: 6, range: [55, 60] },
      { level: 7, range: [65, 70] },
      { level: 8, range: [75, 80] },
      { level: 9, range: [85, 90] },
      { level: 10, range: [95, 100] },
    ],
    baseTime: 6,
  },
  WINGS: {
    power: [
      { level: 1, range: [1, 5] },
      { level: 2, range: [6, 10] },
      { level: 3, range: [11, 15] },
      { level: 4, range: [16, 20] },
      { level: 5, range: [21, 25] },
      { level: 6, range: [26, 30] },
      { level: 7, range: [31, 35] },
      { level: 8, range: [36, 40] },
      { level: 9, range: [41, 45] },
      { level: 10, range: [46, 50] },
    ],
    baseTime: 2,
  },
  HALO: {
    power: [
      { level: 1, range: [1, 5] },
      { level: 2, range: [6, 10] },
      { level: 3, range: [11, 15] },
      { level: 4, range: [16, 20] },
      { level: 5, range: [21, 25] },
      { level: 6, range: [26, 30] },
      { level: 7, range: [31, 35] },
      { level: 8, range: [36, 40] },
      { level: 9, range: [41, 45] },
      { level: 10, range: [46, 50] },
    ],
    baseTime: 2,
  },
};

const LevelInput = React.memo(({ label, levelValue, powerValue, onLevelChange, onPowerChange, stats, isMobile }) => {
  const [inputValue, setInputValue] = useState(powerValue.toFixed(1));

  useEffect(() => {
    setInputValue(powerValue.toFixed(1));
  }, [powerValue]);

  return (
    <div className="calculator-level-input">
      <div className="calculator-label">{label}</div>
      <div className="calculator-level-details">
        <div className="calculator-level-column">
          <div className="calculator-level-title">Level</div>
          <div className="calculator-input-group">
            <button
              onClick={() => levelValue > 1 && onLevelChange(levelValue - 1)}
              className="calculator-level-btn"
            >
              -
            </button>
            <input
              type="number"
              value={levelValue}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                if (val >= 1 && val <= 10) onLevelChange(val);
              }}
              min="1"
              max="10"
            />
            <button
              onClick={() => levelValue < 10 && onLevelChange(levelValue + 1)}
              className="calculator-level-btn"
            >
              +
            </button>
          </div>
        </div>
        <div className="calculator-power-column">
          <div className="calculator-power-title">Power ({stats.power.min.toFixed(1)} - {stats.power.max.toFixed(1)})</div>
          <div className="calculator-input-group">
            <button
              onClick={() => {
                if (powerValue > stats.power.min) {
                  const newValue = parseFloat((powerValue - 1).toFixed(1));
                  if (newValue >= stats.power.min) {
                    onPowerChange(newValue);
                  } else {
                    onPowerChange(stats.power.min);
                  }
                }
              }}
              className="calculator-level-btn"
            >
              -
            </button>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onBlur={() => {
                if (inputValue === '') {
                  setInputValue(stats.power.min.toFixed(1));
                  onPowerChange(stats.power.min);
                  return;
                }

                const val = parseFloat(inputValue);
                if (!isNaN(val)) {
                  const roundedVal = parseFloat(val.toFixed(1));
                  if (roundedVal >= stats.power.min && roundedVal <= stats.power.max) {
                    setInputValue(roundedVal.toFixed(1));
                    onPowerChange(roundedVal);
                  } else if (roundedVal > stats.power.max) {
                    const limitedVal = stats.power.max;
                    setInputValue(limitedVal.toFixed(1));
                    onPowerChange(limitedVal);
                  } else if (roundedVal < stats.power.min) {
                    const limitedVal = stats.power.min;
                    setInputValue(limitedVal.toFixed(1));
                    onPowerChange(limitedVal);
                  }
                } else {
                  setInputValue(stats.power.min.toFixed(1));
                  onPowerChange(stats.power.min);
                }
              }}
              min={stats.power.min}
              max={stats.power.max}
              step="0.1"
            />
            <button
              onClick={() => {
                if (powerValue < stats.power.max) {
                  const newValue = parseFloat((powerValue + 1).toFixed(1));
                  if (newValue <= stats.power.max) {
                    onPowerChange(newValue);
                  } else {
                    onPowerChange(stats.power.max);
                  }
                }
              }}
              className="calculator-level-btn"
            >
              +
            </button>
          </div>
        </div>
        <div className="calculator-time-column">
          <div className="calculator-time-title">Time</div>
          <div className="calculator-time-value">{stats.time} {isMobile ? 'min' : 'minutes'}</div>
        </div>
      </div>
    </div>
  );
});

LevelInput.displayName = 'LevelInput';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    position: 'relative',
    background: '#f0f0f0',
    color: '#000',
    borderRadius: '12px',
    padding: '24px',
    width: '95%',
    maxWidth: '600px',
    margin: 'auto',
    border: 'none',
    inset: 'auto'
  }
};

const CalculateTokenEarn = () => {
  const location = useLocation();

  useEffect(() => {
    // Ngăn chặn redirect không mong muốn
    const preventRedirect = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener('beforeunload', preventRedirect);
    return () => window.removeEventListener('beforeunload', preventRedirect);
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [levels, setLevels] = useState({
    shoe: 1,
    wings: 1,
    halo: 1,
  });

  const [powers, setPowers] = useState({
    shoe: STATS_CONFIG.SHOE.power[0].range[0],
    wings: STATS_CONFIG.WINGS.power[0].range[0],
    halo: STATS_CONFIG.WINGS.power[0].range[0],
  });

  const [showFormulaModal, setShowFormulaModal] = useState(false);

  const [userHalving, setUserHalving] = useState(0);

  const stats = useMemo(() => {
    const calculateItemStats = (type, level) => {
      const config = STATS_CONFIG[type.toUpperCase()];
      const powerRange = config.power[level - 1].range;
      const baseTime = config.baseTime;
      const timeIncrease = type === 'SHOE' ? 2 : 1;

      return {
        power: { min: powerRange[0], max: powerRange[1] },
        time: baseTime + (level - 1) * timeIncrease,
      };
    };

    const shoeStats = calculateItemStats('SHOE', levels.shoe);
    const wingsStats = calculateItemStats('WINGS', levels.wings);
    const haloStats = calculateItemStats('WINGS', levels.halo);

    const totalPower = powers.shoe + powers.wings + powers.halo;
    const totalTime = shoeStats.time + wingsStats.time + haloStats.time;

    const maxTokens = 600;
    const maxPower = 100 + 50 + 50; // Max power for shoe, wings, and halo
    const maxTime = 24 + 11 + 11; // Corrected max time for shoe, wings, and halo

    const scalingFactor = maxTokens / (maxPower * maxTime);

    const tokensEarned = totalPower * totalTime * scalingFactor;

    const adjustedTokensEarned = tokensEarned / Math.pow(2, userHalving);

    return {
      shoe: shoeStats,
      wings: wingsStats,
      halo: haloStats,
      total: {
        power: totalPower,
        time: totalTime,
        tokens: adjustedTokensEarned.toFixed(3),
      },
      scalingFactor: scalingFactor.toFixed(4),
    };
  }, [levels, powers, userHalving]);

  const handleLevelChange = (type, newLevel) => {
    const upperType = type.toUpperCase();
    setLevels((prev) => ({ ...prev, [type]: newLevel }));
    const config = STATS_CONFIG[upperType];
    const newPowerValue = config.power[newLevel - 1].range[0];
    setPowers((prev) => ({ ...prev, [type]: newPowerValue }));
  };

  return (
    <div className="calculator-container">
      <div className="background-image blur-img1">
        <img src={bg} alt="background" />
        <div className="blur-overlay1" />
      </div>
      <h1 className="calculator-title">Health Step - Token Calculator</h1>
      <div className="halving-container">
        <div className="halving-info">
          <div className="halving-header">
            <span className="halving-label">Current Halving:</span>
            <div className="halving-value-container">
              <button
                className="halving-button"
                onClick={() => setUserHalving(prev => Math.max(0, prev - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="halving-input"
                value={userHalving}
                onChange={(e) => setUserHalving(Math.max(0, parseInt(e.target.value) || 0))}
                min="0"
              />
              <button
                className="halving-button"
                onClick={() => setUserHalving(prev => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="halving-description">
            <div>(Token earning rate is divided by 2<sup>{userHalving}</sup>)</div>
            <div>Current halving = 0, next halving estimate in 5.5 years</div>
          </div>
        </div>
      </div>
      <div className='calculator-content'>
        <div className='calculator-content-limit'>
          <div className="calculator-items-grid">
            <LevelInput
              label="Shoe"
              levelValue={levels.shoe}
              powerValue={powers.shoe}
              onLevelChange={(val) => handleLevelChange('shoe', val)}
              onPowerChange={(val) => setPowers((prev) => ({ ...prev, shoe: val }))}
              stats={stats.shoe}
              isMobile={isMobile}
            />
            <LevelInput
              label="Wings"
              levelValue={levels.wings}
              powerValue={powers.wings}
              onLevelChange={(val) => handleLevelChange('wings', val)}
              onPowerChange={(val) => setPowers((prev) => ({ ...prev, wings: val }))}
              stats={stats.wings}
              isMobile={isMobile}
            />
            <LevelInput
              label="Halo"
              levelValue={levels.halo}
              powerValue={powers.halo}
              onLevelChange={(val) => handleLevelChange('halo', val)}
              onPowerChange={(val) => setPowers((prev) => ({ ...prev, halo: val }))}
              stats={stats.halo}
              isMobile={isMobile}
            />
          </div>
          <div className="calculator-total-stats">
            <div className="calculator-stats-grid">
              <div className="calculator-stat-box">
                <h4>Total Power</h4>
                <p>{stats.total.power}</p>
              </div>
              <div className="calculator-stat-box">
                <h4>Total Running Time</h4>
                <p>{stats.total.time} {'minutes'}</p>
              </div>
              <div className="calculator-stat-box">
                <h4>Tokens Earned</h4>
                <p>{stats.total.tokens} HSE <span className="info-icon" onClick={() => setShowFormulaModal(true)}>ℹ️</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showFormulaModal}
        onRequestClose={() => setShowFormulaModal(false)}
        style={customStyles}
        contentLabel="Calculation Formula"
      >
        <div className="modal-header">
          <h2>Calculation Formula</h2>
          <span className="calculation-close" onClick={() => setShowFormulaModal(false)}>&times;</span>
        </div>
        <div className="calculation-modal-content">
          <h4>Health Step Earn Token (HSE) </h4>
          <p>Tokens Earned = Total Power × Total Time × Scaling Factor / 2<sup>Halving</sup></p>
          <p>Scaling Factor = Max Tokens / (Max Power × Max Time)</p>
          <p>Max Tokens = 600</p>
          <p>Max Power = 100 + 50 + 50</p>
          <p>Max Time = 24 + 11 + 11</p>
          <p>Current Scaling Factor = {stats.scalingFactor}</p>
        </div>
      </Modal>
    </div>
  );
};

export default CalculateTokenEarn;

