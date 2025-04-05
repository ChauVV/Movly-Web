import styles from './Roadmap.module.css';
import bg from '@assets/images/mm5.jpg';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Roadmap() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && scrollRef.current) {
      const phase2Element = scrollRef.current.querySelector(`.${styles['roadmap-timeline']} > div:nth-child(2)`);
      if (phase2Element) {
        const containerWidth = scrollRef.current.offsetWidth;
        const phase2Position = phase2Element.offsetLeft;
        const phase2Width = phase2Element.offsetWidth;

        const scrollPosition = phase2Position - (containerWidth - phase2Width) / 2;
        scrollRef.current.scrollLeft = scrollPosition;
      }
    }
  }, [isMobile]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const roadmapData = [
    {
      phase: 'Phase 1',
      title: 'Preparation',
      time: 'Completed',
      items: [
        'Website Launch',
        'Whitepaper Release',
        'Smart Contract Development',
        'Community Building'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'ICO',
      time: 'Current',
      items: [
        'Smart Contract Audit',
        'Marketing Campaign',
        'Pre-sale',
        'Partnership Announcements'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Launch',
      items: [
        'Exchange Listings',
        'Community Events',
        'Development Planning'
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Mobile App & Security',
      items: [
        'Mobile App Development',
        'Advanced KYC Integration',
        'Anti-Bot & Multi-Account System',
        'AI-Based Movement Detection',
        'Fraud Prevention System',
        'Token Earning Algorithm Optimization'
      ]
    },
    {
      phase: 'Phase 5',
      title: 'Ecosystem Expansion',
      items: [
        'Smartwatch App Development',
        'Cross-Platform Integration',
        'Health Data Analytics',
        'Reward System Enhancement',
        'Global Partnership Network',
      ]
    },
    {
      phase: 'Phase 6',
      title: 'Events & Competitions',
      items: [
        'Marathon & Running Events',
        'Regional Fitness Challenges',
        'Community Tournaments',
        'Seasonal Rewards Programs',
        'Brand Ambassador Program',
        'Charity Run Events'
      ]
    }
  ];

  return (
    <section className={styles['roadmap-section']}>
      <div className={styles['background-image'] + ' ' + styles['blur-img1']}>
        <img src={bg} alt="background" />
        <div className={styles['blur-overlay1']} />
      </div>
      <h2 className={styles['roadmap-title']}>Roadmap</h2>
      <div className={styles['roadmap-content']}>
        <div
          ref={scrollRef}
          className={styles['roadmap-scroll']}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className={styles['roadmap-timeline']}>
            {roadmapData.map((phase, index) => (
              isMobile ? (
                <div key={phase.phase} className={styles['roadmap-item']}>
                  <div className={styles['phase-header']}>
                    <h3>{phase.phase}</h3>
                    {phase.time && <span className={styles['phase-time']}>{phase.time}</span>}
                  </div>
                  <h4 className={styles['phase-title']}>{phase.title}</h4>
                  <ul className={styles['phase-items']}>
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <motion.div
                  key={phase.phase}
                  className={styles['roadmap-item']}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className={styles['phase-header']}>
                    <h3>{phase.phase}</h3>
                    {phase.time && <span className={styles['phase-time']}>{phase.time}</span>}
                  </div>
                  <h4 className={styles['phase-title']}>{phase.title}</h4>
                  <ul className={styles['phase-items']}>
                    {phase.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + itemIndex * 0.1 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 