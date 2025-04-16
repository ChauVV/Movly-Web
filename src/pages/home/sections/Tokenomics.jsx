import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './Tokenomics.module.css';
import bg from '@assets/images/ma7.jpg';
import React, { useEffect } from 'react';

export default function Tokenomics() {
  const [isWideScreen, setIsWideScreen] = React.useState(window.innerWidth > 1200);
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 1200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => {
            setIsVisible(true);
          }, 1000);
        } else if (!entry.isIntersecting && isVisible) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.2
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  const data = [
    {
      name: 'Token Sale',
      value: 40,
      amount: '2,000,000,000',
      details: 'Public and private sale allocations'
    },
    {
      name: 'Ecosystem Development',
      value: 30,
      amount: '1,500,000,000',
      details: 'Game Rewards & Incentives, Community Events, Partnership Programs'
    },
    {
      name: 'Team & Advisors',
      value: 18,
      amount: '900,000,000',
      details: 'Team (15%) & Advisors (3%) with 2-year vesting period and monthly unlocks'
    },
    {
      name: 'Marketing & Operations',
      value: 12,
      amount: '600,000,000',
      details: 'Market Making, Exchange Listings, Marketing Campaigns'
    }
  ];
  const COLORS = ['#ffde00', '#ff9d00', '#ff6b00', '#ff5c4d'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: window.innerWidth <= 480 ? '12px' : '14px' }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={styles.tooltipContainer}>
          <p className={styles.tooltipName}>{data.name}</p>
          <p className={styles.tooltipValue}>{data.value}%</p>
          <p className={styles.tooltipAmount}>{data.amount} MOVLY</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className={styles['tokenomics-section']} ref={sectionRef}>
      <div className={styles['background-image']}>
        <img src={bg} alt="background" />
      </div>
      <div className={styles['blur-overlay1']}></div>

      <motion.h2
        className={styles['tokenomics-title']}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Movly Distribution
      </motion.h2>

      <div
        className={styles['tokenomics-content']}
      >
        <div className={styles['content-grid']}>
          <div
            className={styles['chart-column']}
          >
            <div className={styles['chart-wrapper']}>
              {isVisible && <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius="90%"
                    fill="#8884d8"
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                    key={isVisible ? Math.random() : undefined}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>}
            </div>

            <motion.div
              className={styles['legend-container']}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {data.map((entry, index) => (
                <motion.div
                  key={index}
                  className={styles['legend-item']}
                  initial={{ opacity: 1, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                >
                  <div className={styles['legend-header']}>
                    <span
                      className={styles['legend-color']}
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className={styles['legend-text']}>
                      <span className={styles['legend-name']}>{entry.name}</span>
                      <span className={styles['legend-value']}>{entry.value}%</span>
                    </span>
                  </div>
                  <div className={styles['legend-details']}>
                    <span className={styles['legend-amount']}>{entry.amount} MOVLY</span>
                    {isWideScreen && <span className={styles['legend-description']}>{entry.details}</span>}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {isWideScreen && (
            <motion.div
              className={styles['info-column']}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className={styles['total-supply']}>
                <h3>Total Supply</h3>
                <div className={styles['supply-amount']}>5,000,000,000</div>
                <p className={styles['supply-label']}>Maximum tokens that will ever exist</p>
              </div>

              <div className={styles['token-grid']}>
                <div className={styles['token-item']}>
                  <span className={styles['token-label']}>Token Name</span>
                  <span className={styles['token-value']}>MOVLY</span>
                </div>
                <div className={styles['token-item']}>
                  <span className={styles['token-label']}>Token Symbol</span>
                  <span className={styles['token-value']}>MOVLY</span>
                </div>
                <div className={styles['token-item']}>
                  <span className={styles['token-label']}>Network</span>
                  <span className={styles['token-value']}>BNB Chain</span>
                </div>
                <div className={styles['token-item']}>
                  <span className={styles['token-label']}>Token Standard</span>
                  <span className={styles['token-value']}>BEP-20</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}