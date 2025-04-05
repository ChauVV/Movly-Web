import { motion } from 'framer-motion';
import styles from './Community.module.css';
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
          className={styles.card}
        >
          <div className={styles.icon} style={{ color: social.color }}>
            {social.icon}
          </div>
          <div className={styles.info}>
            <h3>{social.name}</h3>
            <span className={styles.type}>{social.type}</span>
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
        className={styles.card}
        initial={{ y: 25 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
          delay: index * 0.2
        }}
      >
        <div className={styles.icon} style={{ color: social.color }}>
          {social.icon}
        </div>
        <div className={styles.info}>
          <h3>{social.name}</h3>
          <span className={styles.type}>{social.type}</span>
          <p>{social.description}</p>
        </div>
      </motion.a>
    );
  };

  return (
    <section className={styles.section}>
      <div className={`${styles.background} ${styles.blurImg1}`}>
        <img src={bg} alt="background" />
        <div className={styles.blurOverlay} />
      </div>
      <div className={styles.main}>
        <h2 className={styles.title}>JOIN OUR COMMUNITY</h2>
        <div className={styles.content}>
          <div className={styles.wrapContent}>
            <div className={styles.container}>
              {socialLinks.map((social, index) => (
                <SocialCard key={social.name} social={social} index={index} />
              ))}
            </div>
          </div>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      </div>
    </section>
  );
}