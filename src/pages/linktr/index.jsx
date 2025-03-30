import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Linktree.module.css';
import logo from '@assets/images/logo512.png';
import mm5 from '@assets/images/mm5.jpg';
import Footer from '@components/Footer';

// Import icons
import { FaTelegram, FaDiscord, FaGithub, FaFileAlt, FaShoppingCart, FaGlobe, FaCalculator } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const generalLinks = [
  {
    title: 'Official Website',
    url: '/',
    description: 'Explore Movly - The Future of Move-to-Earn',
    isInternal: true,
    icon: <FaGlobe />,
    color: '#34D399'
  },
  {
    title: 'Whitepaper',
    url: '/whitepaper',
    description: 'Learn about our vision, technology and roadmap',
    isInternal: true,
    icon: <FaFileAlt />,
    color: '#60A5FA'
  },
  {
    title: 'Buy Movly Token',
    url: '/sale',
    description: 'Join our token sale and be part of the revolution',
    isInternal: true,
    icon: <FaShoppingCart />,
    color: '#F472B6'
  },
  {
    title: 'Earn Calculator',
    url: '/calculator',
    description: 'Calculate your potential earnings with Movly',
    isInternal: true,
    icon: <FaCalculator />,
    color: '#FCD34D'
  },
];

const socialLinks = [
  {
    title: 'Telegram Community',
    url: 'https://t.me/movlyRun',
    description: 'Join our active community on Telegram',
    isInternal: false,
    icon: <FaTelegram />,
    color: '#fff'
  },
  {
    title: 'Twitter',
    url: 'https://x.com/MovlyRun',
    description: 'Follow us for the latest updates',
    isInternal: false,
    icon: <FaXTwitter />,
    color: '#000000'
  },
  {
    title: 'Discord',
    url: 'https://discord.com/invite/HKvXYkhEe5',
    description: 'Join our growing Discord community',
    isInternal: false,
    icon: <FaDiscord />,
    color: '#5865F2'
  },
  {
    title: 'GitHub',
    url: 'https://github.com/ChauVV',
    description: 'Explore our open-source projects',
    isInternal: false,
    icon: <FaGithub />,
    color: '#333'
  }
];

export default function Linktree() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const renderLinkGroup = (links, title) => (
    <div className={styles.link_group}>
      <motion.h2
        className={styles.group_title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {links.map((link, index) => (
        <motion.div
          key={index}
          className={styles.linktree_link_item}
          variants={itemVariants}
        >
          {link.isInternal ? (
            <Link to={link.url} className={styles.linktree_link}>
              <div className={styles.link_content}>
                <div className={styles.link_icon} style={{ color: link.color }}>
                  {link.icon}
                </div>
                <div className={styles.link_text}>
                  <span className={styles.link_title}>{link.title}</span>
                  <span className={styles.link_description}>{link.description}</span>
                </div>
              </div>
            </Link>
          ) : (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linktree_link}
            >
              <div className={styles.link_content}>
                <div className={styles.link_icon} style={{ color: link.color }}>
                  {link.icon}
                </div>
                <div className={styles.link_text}>
                  <span className={styles.link_title}>{link.title}</span>
                  <span className={styles.link_description}>{link.description}</span>
                </div>
              </div>
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className={styles.linktree_page}>
      <div className={`${styles.background_image} ${styles.blur_img}`}>
        <img src={mm5} alt="background" />
        <div className={styles.blur_overlay} />
      </div>

      <div className={styles.linktree_container}>
        <motion.div
          className={styles.linktree_profile}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className={styles.profile_link}>
            <img src={logo} alt="Movly Logo" className={styles.linktree_logo} />
            <h1>Movly</h1>
          </Link>
          <p>Transform your movement into rewards • Move-to-Earn on BNB Chain</p>
        </motion.div>

        <motion.div
          className={styles.linktree_links}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {renderLinkGroup(generalLinks, 'General')}
          {renderLinkGroup(socialLinks, 'Socials')}
        </motion.div>

        <div className={styles.footer_container}>
          <Footer />
        </div>
      </div>
    </div>
  );
} 