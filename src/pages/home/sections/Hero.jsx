import { motion, useScroll, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import './Hero.css';
import logo from '@assets/images/logo512.png';

export default function Hero({ onScroll }) {
  const { scrollY } = useScroll();
  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: 0.3,
    once: false
  });

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
    <section className="main-section hero-section" ref={ref}>
      <div className="hero-logo">
        <img src={logo} alt="Health Step Logo" />
      </div>
      <AnimatePresence>
        {inView && (
          <motion.div
            className="hero-content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ textAlign: 'center' }}
          >
            <motion.div
              className="hero-title"
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
                HEALTH STEP
              </motion.h1>
              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Move To Earn - Live To Earn
              </motion.p>
            </motion.div>

            <motion.div
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <p>Walk, Run and Earn with every step you take</p>
            </motion.div>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}
            >
              <motion.button
                className="primary-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onScroll}
              >
                Get Started
              </motion.button>
              <motion.button
                className="secondary-button"
                onClick={onScroll}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Us
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}