import { useRef, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import ParticlesBackground from '@components/ParticlesBackground';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import Tokenomics from './sections/Tokenomics';
import Tokens from './sections/Tokens';
import Roadmap from './sections/Roadmap';
import AppPreview from './sections/AppPreview';
import Community from './sections/Community';
import './Main.css';

function Main() {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState('hero');

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const scrollPosition = container.scrollTop;
      const windowHeight = window.innerHeight;

      if (scrollPosition < windowHeight) {
        setCurrentSection('hero');
      } else if (scrollPosition < windowHeight * 2) {
        setCurrentSection('howItWorks');
      } else if (scrollPosition < windowHeight * 3) {
        setCurrentSection('tokenomics');
      } else if (scrollPosition < windowHeight * 4) {
        setCurrentSection('tokens');
      } else if (scrollPosition < windowHeight * 5) {
        setCurrentSection('roadmap');
      } else {
        setCurrentSection('community');
      }
    }
  };

  const scrollToTop = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const scrollToHowItWorks = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  const scrollToBottom = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className="main-container"
      ref={containerRef}
      onScroll={handleScroll}
    >
      <ParticlesBackground type={currentSection === 'tokenomics' ? 'tokenomics' : 'hero'} />

      <Hero onScroll={scrollToHowItWorks} />
      <HowItWorks />
      <Tokenomics />
      <Tokens />
      <Roadmap />
      <AppPreview />
      <Community />

      <div className="section-controls">
        <button className="nav-button" onClick={scrollToTop}>
          <IoIosArrowUp />
        </button>
        <button className="nav-button" onClick={scrollToBottom}>
          <IoIosArrowDown />
        </button>
      </div>
    </div>
  );
}

export default Main; 