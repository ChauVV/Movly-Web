import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './Whitepaper.css';

// Import markdown files directly
import overview from './sections/1_overview.md?raw';
import gettingStarted from './sections/2_getting_started.md?raw';
import assetModule from './sections/3_asset_module.md?raw';
import shoeMinting from './sections/4.1_game_module_Shoe-Minting.md?raw';
import energySystem from './sections/4.2_game_module_EnegySystem.md?raw';
import mysteryBox from './sections/4.3_game_module_MysteryBox.md?raw';
import gps from './sections/4.4_game_module_GPS.md?raw';
import antiCheating from './sections/4.5_game_module_AntiCheating.md?raw';
import earningMechanics from './sections/4.8_MGD Earning Mechanics.md?raw';
import hstToken from './sections/4.9_MOVLY_token.md?raw';
import mgdToken from './sections/4.10_MGD_token.md?raw';
import uiRequirements from './sections/4.11_UI_UX_Requirements.md?raw';

// Combine game module content
const gameModuleContent = `
# Game Module

${shoeMinting}

${energySystem}

${mysteryBox}

${gps}

${antiCheating}
`;

const sections = [
  { id: 'overview', title: 'Overview', content: overview },
  { id: 'getting-started', title: 'Getting Started', content: gettingStarted },
  { id: 'asset-module', title: 'Asset Module', content: assetModule },
  { id: 'game-module', title: 'Game Module', content: gameModuleContent },
  { id: 'earning-mechanics', title: 'Earning Mechanics', content: earningMechanics },
  { id: 'mgd-token', title: 'MGD Token', content: mgdToken },
  { id: 'ui-requirements', title: 'UI/UX Requirements', content: uiRequirements }
];

const Whitepaper = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setIsNavOpen(false); // Close nav after selection on mobile
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.scrollTop = 0;
    }
  };

  const currentSection = sections.find(s => s.id === activeSection);
  const content = currentSection ? currentSection.content : '';

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
            Movly
          </motion.h2>
          <motion.div
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Whitepaper
          </motion.div>
          <motion.div
            className="version"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Version 1.0
          </motion.div>
        </div>
        <ul className="nav-sections">
          {sections.map(section => (
            <li key={section.id}>
              <button
                className={activeSection === section.id ? 'active' : ''}
                onClick={() => handleSectionChange(section.id)}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <motion.main
        className="whitepaper-content"
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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