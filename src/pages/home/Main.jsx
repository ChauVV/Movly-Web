import { useRef, useState, useEffect } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import ParticlesBackground from '@components/ParticlesBackground';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import Tokenomics from './sections/Tokenomics';
import Tokens from './sections/Tokens';
import Roadmap from './sections/Roadmap';
import AppPreview from './sections/AppPreview';
import AppPreviewWatch from './sections/AppPreviewWatch';
import Community from './sections/Community';
import styles from './Main.module.css';
import Header from '@/components/Header';
import { FaDiscord, FaTelegram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function Main() {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState('hero');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Define sections explicitly
  const sections = [
    { id: 'hero', name: 'hero' },
    { id: 'howItWorks', name: 'howItWorks' },
    { id: 'tokens', name: 'tokens' },
    { id: 'tokenomics', name: 'tokenomics' },
    { id: 'roadmap', name: 'roadmap' },
    { id: 'appPreview', name: 'appPreview' },
    { id: 'appPreviewWatch', name: 'appPreviewWatch' },
    { id: 'community', name: 'community' }
  ];

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const scrollPosition = container.scrollTop;
      const windowHeight = window.innerHeight;

      // Determine current section based on scroll position
      const sectionIndex = Math.floor(scrollPosition / windowHeight);
      setCurrentSectionIndex(Math.min(sectionIndex, sections.length - 1));

      // Update current section for ParticlesBackground
      if (scrollPosition < windowHeight) {
        setCurrentSection('hero');
      } else if (scrollPosition < windowHeight * 2) {
        setCurrentSection('howItWorks');
      } else if (scrollPosition < windowHeight * 3) {
        setCurrentSection('tokens');
      } else if (scrollPosition < windowHeight * 4) {
        setCurrentSection('tokenomics');
      } else if (scrollPosition < windowHeight * 5) {
        setCurrentSection('roadmap');
      } else if (scrollPosition < windowHeight * 6) {
        setCurrentSection('appPreview');
      } else if (scrollPosition < windowHeight * 7) {
        setCurrentSection('appPreviewWatch');
      }
      else {
        setCurrentSection('community');
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const scrollToHowItWorks = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  const scrollToPrevSection = () => {
    const container = containerRef.current;
    if (container && currentSectionIndex > 0) {
      const prevSectionIndex = currentSectionIndex - 1;
      container.scrollTo({
        top: prevSectionIndex * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  const scrollToNextSection = () => {
    const container = containerRef.current;
    if (container && currentSectionIndex < sections.length - 1) {
      const nextSectionIndex = currentSectionIndex + 1;
      container.scrollTo({
        top: nextSectionIndex * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className={styles.mainContainer}
      ref={containerRef}
      onScroll={handleScroll}
    >
      <Header />
      {/* <ParticlesBackground type={currentSection === 'tokenomics' ? 'tokenomics' : 'hero'} /> */}

      <section id="hero" className={styles.section}><Hero onScroll={scrollToHowItWorks} /></section>
      <section id="howItWorks" className={styles.section}><HowItWorks /></section>
      <section id="tokens" className={styles.section}><Tokens /></section>
      <section id="tokenomics" className={styles.section}><Tokenomics /></section>
      <section id="roadmap" className={styles.section}><Roadmap /></section>
      <section id="appPreview" className={styles.section}><AppPreview /></section>
      <section id="appPreviewWatch" className={styles.section}><AppPreviewWatch /></section>
      <section id="community" className={styles.section}><Community /></section>

      <div className={styles.sectionControls}>
        <button className={styles.navButton} onClick={scrollToPrevSection}>
          <IoIosArrowUp />
        </button>
        <button className={styles.navButton} onClick={scrollToNextSection}>
          <IoIosArrowDown />
        </button>
      </div>

      {currentSection !== 'community' &&
        <div className={styles.socialIcons}>
          <div className={styles.socialIcon}>
            <a
              href="https://t.me/movlyRun"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram
                style={{ color: currentSection === 'hero' ? '#7a4a00' : '#fff' }}
              />
            </a>
          </div>
          <div className={styles.socialIcon}>
            <a
              href="https://x.com/MovlyRun"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter
                style={{ color: currentSection === 'hero' ? '#7a4a00' : '#fff' }}
              />
            </a>
          </div>
          <div className={styles.socialIcon}>
            <a
              href="https://discord.com/invite/HKvXYkhEe5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord
                style={{ color: currentSection === 'hero' ? '#7a4a00' : '#fff' }}
              />
            </a>
          </div>
        </div>
      }
    </div>
  );
}

export default Main;