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
import earningMechanics from './sections/4.8_HSE Earning Mechanics.md?raw';
import hstToken from './sections/4.9_HST_token.md?raw';
import hseToken from './sections/4.10_HSE_token.md?raw';
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
  { id: 'movly-token', title: 'MOVLY Token', content: hseToken },
  { id: 'ui-requirements', title: 'UI/UX Requirements', content: uiRequirements }
];

export default function Whitepaper() {
  const [activeSection, setActiveSection] = useState('overview');

  // Process content to replace tokens and names
  const processContent = (content) => {
    return content
      .replace(/HST/g, 'MVS')
      .replace(/HSE/g, 'MOVLY')
      .replace(/HealthStep/g, 'Movly')
      .replace(/Health Step/g, 'Movly');
  };

  const currentSection = sections.find(s => s.id === activeSection);
  const content = currentSection ? processContent(currentSection.content) : '';

  return (
    <div className="whitepaper-container">
      <nav className="whitepaper-nav">
        <div className="nav-header">
          <h2>Movly Whitepaper</h2>
          <p className="version">Version 1.0</p>
        </div>
        <ul className="nav-sections">
          {sections.map(section => (
            <li key={section.id}>
              <button
                className={activeSection === section.id ? 'active' : ''}
                onClick={() => setActiveSection(section.id)}
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
} 