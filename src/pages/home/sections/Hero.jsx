import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Hero.module.css';
import logo from '@assets/images/logo512.png';
import { useNavigate } from 'react-router-dom';

export default function Hero({ onScroll }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: 0.3,
    once: false
  });
  const navigate = useNavigate();

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 100
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -100
    }
  };

  return (
    <section className={styles.heroSection} ref={ref}>
      <div className={styles.heroLogo}>
        <img src={logo} alt="Health Step Logo" />
      </div>
      <AnimatePresence>
        {inView && (
          <motion.div
            className={styles.heroContent}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.h1>
                Movly
              </motion.h1>
              <motion.p
                className={styles.heroSubtitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Move To Earn - Live To Earn
              </motion.p>
            </motion.div>

            <motion.div
              className={styles.heroDescription}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <p>Walk, Run and Earn with every step you take</p>
            </motion.div>

            <motion.div
              className={styles.heroButtons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <motion.button
                className={styles.primaryButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onScroll}
              >
                Get Started
              </motion.button>
              <motion.button
                className={styles.secondaryButton}
                onClick={() => navigate('/whitepaper')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                More Info
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}