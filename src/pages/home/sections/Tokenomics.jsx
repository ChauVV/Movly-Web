import { motion } from 'framer-motion';
import styles from './Tokenomics.module.css';
import bg from '@assets/images/ma7.jpg';
import chartDetail from '@assets/images/TokenDistributionStructure.png';

export default function Tokenomics() {
  const tokenData = [
    { title: 'Sale', value: 40, color: '#8B5CF6' },
    { title: 'Ecosystem/Treasury', value: 30, color: '#818CF8' },
    { title: 'Team', value: 15, color: '#F472B6' },
    { title: 'Market Launchpad', value: 12, color: '#34D399' },
    { title: 'Advisors', value: 3, color: '#FCD34D' }
  ];

  return (
    <section className={`${styles['main-section']} ${styles['tokenomics-section']}`}>
      <div className={styles['background-image']}>
        <img src={bg} alt="background" />
      </div>
      <div className={styles['blur-overlay1']}></div>

      <h2 className={styles['tokenomics-title']}>Movly Distribution</h2>
      <motion.div
        className={styles['tokenomics-content']}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles['tokenomics-container']}>
          <div className={styles['chart-right']}>
            <div className={styles['chart-container-right']}>
              <img src={chartDetail} alt="background" style={{ objectFit: 'center' }} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}