import wall1 from '@/assets/images/wall1.webp';
import { motion } from 'framer-motion';
import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <section className="main-section how-it-works">
      <div className="background-image">
        <img src={wall1} alt="background" />
      </div>
      <div className="content">
        <motion.div
          className="text-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="main-title">
            A WEB3 FITNESS APP<br />THAT TRANSFORMS YOUR STEPS INTO REWARDS
          </h2>
          <p className="sub-title">
            EARN TOKENS BY WALKING, JOGGING<br />AND RUNNING WITH YOUR HEALTH STEP NFTs
          </p>
        </motion.div>
      </div>
    </section>
  );
}