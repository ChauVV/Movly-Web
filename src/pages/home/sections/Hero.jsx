import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import { useNavigate } from 'react-router-dom';
import hero from '@assets/images/hero/hero.png';
import heroshadow from '@assets/images/hero/hero-shadow.png';
import herobgg from '@assets/images/hero/herobgg.png';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBg}>
        <img src={herobgg} alt="background" className={styles.bgImage} />
      </div>
      <div className={styles.heroContainer}>
        <motion.div
          className={styles.imageSide}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            opacity: { duration: 0.8 },
            x: { duration: 0.8 }
          }}
        >
          <motion.div
            className={styles.heroImageWrapper}
            animate={{
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img src={hero} alt="hero" className={styles.heroImage} />
            <img src={heroshadow} alt="" className={styles.heroShadow} />
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.contentSide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.textContent}>
            <h1>Move To Earn With</h1>
            <h2>MOVLY</h2>
            <h3 className={styles.slogan}>Move Daily - Earn More - Live Better</h3>
            <p>
              Transform your daily movements into rewards with MOVLY
            </p>
            <div className={styles.buttonGroup}>
              <button
                className={styles.primaryBtn}
                onClick={() => navigate('/sale')}
              >
                Join Presale
              </button>
              <button
                className={styles.secondaryBtn}
                onClick={() => navigate('/whitepaper')}
              >
                Whitepaper
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}