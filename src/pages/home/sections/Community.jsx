import { motion } from 'framer-motion';
import './Community.css';
import bg from '@assets/images/s3.jpg';
import { useEffect, useState } from 'react';

// Import icons
import { FaTelegram, FaDiscord, FaMedium, FaGithub } from 'react-icons/fa';
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
      url: 'https://t.me/healthstep',
      description: 'Join our main community channel for updates & discussions',
      color: '#0088cc'
    },
    {
      name: 'X (Twitter)',
      icon: <FaXTwitter />,
      type: 'Social',
      url: 'https://x.com/healthstep',
      description: 'Follow us for official announcements & project updates',
      color: '#000000'
    },
    {
      name: 'Discord',
      icon: <FaDiscord />,
      type: 'Community',
      url: 'https://discord.gg/healthstep',
      description: 'Join our Discord server for community events & support',
      color: '#5865F2'
    },
    {
      name: 'Email Support',
      icon: <MdEmail />,
      type: 'Support',
      url: '/mail-request',
      description: 'Submit a request or get help from our support team',
      color: '#00ffd1'
    }
  ];

  const SocialCard = ({ social, index }) => {
    if (isMobile) {
      return (
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-card"
        >
          <div className="social-icon" style={{ color: social.color }}>
            {social.icon}
          </div>
          <div className="social-info">
            <h3>{social.name}</h3>
            <span className="social-type">{social.type}</span>
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
        className="social-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        <div className="social-icon" style={{ color: social.color }}>
          {social.icon}
        </div>
        <div className="social-info">
          <h3>{social.name}</h3>
          <span className="social-type">{social.type}</span>
          <p>{social.description}</p>
        </div>
      </motion.a>
    );
  };

  return (
    <section className="community-section">
      <div className="background-image blur-img1">
        <img src={bg} alt="background" />
        <div className="blur-overlay1" />
      </div>
      <h2 className="community-title">Join Our Community</h2>
      <div className="community-content">
        <div className="community-container">
          {socialLinks.map((social, index) => (
            <SocialCard key={social.name} social={social} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}