import { motion } from 'framer-motion';
import styles from './AppPreviewWatch.module.css';
import bg from '@assets/images/ma3.jpg';
import watch from '@assets/images/watch.png';
import { useState, useEffect } from 'react';

export default function AppPreview() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const features = [
    {
      title: 'Hands-free Tracking',
      description: 'No more holding phones while running - Track your movement and earn Movly tokens automatically with just a glance at your wrist'
    },
    {
      title: 'Real-time Performance',
      description: 'Instant feedback on pace, heart rate, and earnings right on your wrist - Stay focused on your workout without phone distractions'
    },
    {
      title: 'Comfort & Convenience',
      description: 'Lightweight and water-resistant design perfect for any workout - Exercise freely without worrying about your phone'
    },
    {
      title: 'Smart Notifications',
      description: 'Get instant alerts for achievements and rewards with gentle vibrations - Never miss a milestone during your fitness journey'
    }
  ];

  return (
    <section className={styles['watch-app-preview-section']}>
      <div className={`${styles['background-image']} ${styles['blur-img1']}`}>
        <img src={bg} alt="background" />
        <div className={styles['watch-blur-overlay1']} />
      </div>
      <h2 className={styles['watch-app-preview-title']}>Watch App</h2>
      <div className={styles['watch-app-preview-content']}>
        <div className={styles['watch-app-preview-container']}>
          <div className={styles['watch-mockup-container']}>
            <div className="mockup-placeholder">
              <img src={watch} alt="mobile-mockup" className={styles['watch-mobile-img']} />
            </div>
          </div>

          {!isMobile && (
            // Desktop Layout
            <div className={styles['watch-features-container']}>
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  className={styles['watch-feature-item']}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      {isMobile &&
        <div className={styles['watch-features-text']}>
          {features.map((feature) => (
            <div key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      }
    </section>
  );
} 