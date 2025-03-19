import { motion } from 'framer-motion';
import './AppPreview.css';
import bg from '@assets/images/ma3.jpg';
import mobile from '@assets/images/mobile2.png';
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
      title: 'Web3 Move-To-Earn',
      description: 'Transform your daily steps into HSE tokens through blockchain technology - Limited supply of 2B HSE'
    },
    {
      title: 'GameFi Fitness',
      description: 'Gamified fitness experience with daily quests, achievements, and level progression'
    },
    {
      title: 'Secure Wallet Integration',
      description: 'Built-in Web3 wallet for easy token management and NFT rewards'
    },
    {
      title: 'Community & Events',
      description: 'Join blockchain-based fitness challenges and earn special rewards'
    }
  ];

  return (
    <section className="app-preview-section">
      <div className="background-image blur-img1">
        <img src={bg} alt="background" />
        <div className="blur-overlay1" />
      </div>
      <h2 className="app-preview-title">Mobile App</h2>
      <div className="app-preview-content">
        <div className="app-preview-container">
          <div className="mockup-container">
            <div className="mockup-placeholder">
              <img src={mobile} alt="mobile-mockup" className="mobile-img" />
            </div>
          </div>

          {!isMobile && (
            // Desktop Layout
            <div className="features-container">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  className="feature-item"
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
        <div className="features-text">
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