import { motion } from 'framer-motion';
import './Community.css';
import bg from '@assets/images/s3.jpg';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

// Import icons
import { FaTelegram, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

export default function Community() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 540);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const socialLinks = [
    {
      name: 'Telegram',
      icon: <FaTelegram />,
      type: 'Community',
      url: 'https://t.me/movlyRun',
      description: 'Join our main community channel for updates & discussions',
      color: '#fff'
    },
    {
      name: 'X (Twitter)',
      icon: <FaXTwitter />,
      type: 'Social',
      url: 'https://x.com/MovlyRun',
      description: 'Follow us for official announcements & project updates',
      color: '#000000'
    },
    {
      name: 'Discord',
      icon: <FaDiscord />,
      type: 'Community',
      url: 'https://discord.com/invite/HKvXYkhEe5',
      description: 'Join our Discord server for community events & support',
      color: '#5865F2'
    },
  ];

  const SocialCard = ({ social, index }) => {
    if (isMobile) {
      return (
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="Community-card"
        >
          <div className="Community-icon" style={{ color: social.color }}>
            {social.icon}
          </div>
          <div className="Community-info">
            <h3>{social.name}</h3>
            <span className="Community-type">{social.type}</span>
            <p>{social.description}</p>
          </div>
        </a>
      );
    }

    return (
      <motion.a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className="Community-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        <div className="Community-icon" style={{ color: social.color }}>
          {social.icon}
        </div>
        <div className="Community-info">
          <h3>{social.name}</h3>
          <span className="Community-type">{social.type}</span>
          <p>{social.description}</p>
        </div>
      </motion.a>
    );
  };

  return (
    <section className="Community-section">
      <div className="Community-background blur-img1">
        <img src={bg} alt="background" />
        <div className="Community-blur-overlay" />
      </div>
      <div className="Community-main">
        <h2 className="Community-title">Join Our Community</h2>
        <div className="Community-content">
          <div className="Community-wrap-content">
            <div className="Community-container">
              {socialLinks.map((social, index) => (
                <SocialCard key={social.name} social={social} index={index} />
              ))}
            </div>
          </div>
          <div className="Community-footer">
            <Footer />
          </div>
        </div>
      </div>
    </section>
  );
}