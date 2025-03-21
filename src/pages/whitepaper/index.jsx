import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './Whitepaper.css';
import { Link } from 'react-router-dom';

// Import markdown files directly
import overview from './sections/1_overview.md?raw';
import gettingStarted from './sections/2_getting_started.md?raw';
import assetModule from './sections/3_nft_system.md?raw';
import shoeMinting from './sections/4.1_game_module_Shoe-Minting.md?raw';
import energySystem from './sections/4.2_game_module_EnegySystem.md?raw';
import mysteryBox from './sections/4.3_game_module_MysteryBox.md?raw';
import gps from './sections/4.4_game_module_GPS.md?raw';
import antiCheating from './sections/4.5_game_module_AntiCheating.md?raw';
import earningMechanics from './sections/4.8_MGD Earning Mechanics.md?raw';
import movlyToken from './sections/4.9_MOVLY_token.md?raw';
import mgdToken from './sections/4.10_MGD_token.md?raw';
import smartContract from './sections/smart_contract.md?raw';
import gettingHelp from './sections/getting_help.md?raw';
import privacy from './sections/privacy.md?raw';

const sections = [
  { id: 'overview', title: 'Overview', content: overview },
  { id: 'getting-started', title: 'Getting Started', content: gettingStarted },
  { id: 'nft-system', title: 'NFT System', content: assetModule },
  {
    id: 'tokenomic',
    title: 'Tokenomic',
    subSections: [
      { id: 'movly-token', title: 'MOVLY Token', content: movlyToken },
      { id: 'mgd-token', title: 'MGD Token', content: mgdToken }
    ]
  },
  {
    id: 'gameplay',
    title: 'Game Play',
    subSections: [
      { id: 'shoe-minting', title: 'Shoe-Minting', content: shoeMinting },
      { id: 'mystery-box', title: 'Mystery Box System', content: mysteryBox },
      { id: 'energy-system', title: 'Energy System', content: energySystem },
      { id: 'gps', title: 'GPS', content: gps },
      { id: 'anti-cheating', title: 'Anti-Cheating System', content: antiCheating },
      { id: 'earning-mechanics', title: 'Earning Mechanics', content: earningMechanics }
    ]
  },
  { id: 'smart-contract', title: 'Smart Contract', content: smartContract },
  { id: 'getting-help', title: 'Getting Help', content: gettingHelp },
  { id: 'privacy', title: 'Privacy Policy', content: privacy }
];

const Whitepaper = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsNavOpen(false);
  };

  const toggleSubSections = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  // Updated content finding logic
  const findContent = (sectionId) => {
    // First check main sections
    const mainSection = sections.find(s => s.id === sectionId);
    if (mainSection && mainSection.content) {
      return mainSection.content;
    }

    // Then check sub-sections
    for (const section of sections) {
      if (section.subSections) {
        const subSection = section.subSections.find(sub => sub.id === sectionId);
        if (subSection) {
          return subSection.content;
        }
      }
    }
    return '';
  };

  const content = findContent(activeSection);

  return (
    <div className="whitepaper-container">
      <button
        className="nav-toggle"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        {isNavOpen ? '✕' : '☰'}
      </button>

      {isNavOpen && (
        <div
          className="nav-overlay"
          onClick={() => setIsNavOpen(false)}
        />
      )}

      <nav className={`whitepaper-nav ${isNavOpen ? 'open' : ''}`}>
        <div className="nav-header">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="home-link">Movly</Link>
          </motion.h2>
          <motion.div
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Whitepaper
            <span className="version">v1.0.0</span>
          </motion.div>
        </div>
        <div className="nav-sections">
          {sections.map((section) => (
            <div key={section.id} className="section-item">
              <button
                className={`section-button ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => {
                  if (section.subSections) {
                    toggleSubSections(section.id);
                  } else {
                    handleSectionClick(section.id);
                  }
                }}
              >
                {section.title}
                {section.subSections && (
                  <span className={`arrow ${expandedSection === section.id ? 'expanded' : ''}`}>
                    ▼
                  </span>
                )}
              </button>

              {section.subSections && expandedSection === section.id && (
                <div className="sub-sections">
                  {section.subSections.map((subSection) => (
                    <button
                      key={subSection.id}
                      className={`sub-section-button ${activeSection === subSection.id ? 'active' : ''}`}
                      onClick={() => handleSectionClick(subSection.id)}
                    >
                      {subSection.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      <motion.main
        className="whitepaper-content"
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ paddingBottom: isMobileView ? '140px' : '70px' }}
      >
        <div className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </motion.main>
    </div>
  );
};

export default Whitepaper; 