import React, { memo, useEffect, useState } from 'react';
import metamaskIcon from '@assets/icons/metamark.svg';
import { FaMobileAlt, FaTabletAlt, FaDesktop, FaQrcode } from 'react-icons/fa';

const NoMetamaskModal = ({ isOpen, onClose, onInstall }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Phát hiện thiết bị di động
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
  }, []);

  if (!isOpen) return null;

  // Tạo deep link để mở MetaMask app nếu đã cài đặt
  const openMetaMaskApp = () => {
    // Deep link để thử mở MetaMask app
    window.location.href = `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;

    // Sau một khoảng thời gian, nếu app không mở, chuyển đến app store
    setTimeout(() => {
      if (isMobile) {
        // Nếu trên iOS
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = 'https://apps.apple.com/us/app/metamask/id1438144202';
        } else {
          // Nếu trên Android
          window.location.href = 'https://play.google.com/store/apps/details?id=io.metamask';
        }
      }
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container metamask-install-modal">
        <div className="modal-header">
          <h3>MetaMask {isMobile ? 'App' : 'Extension'} Required</h3>
        </div>
        <div className="modal-body">
          <div className="metamask-logo">
            <img src={metamaskIcon} alt="MetaMask" />
          </div>

          {isMobile ? (
            <>
              <p>MetaMask mobile app is not detected or not connected.</p>
              <div className="metamask-steps">
                <h4>Connect with MetaMask mobile app:</h4>
                <div className="device-icon">
                  {/iPhone|iPad|iPod/i.test(navigator.userAgent) ? <FaTabletAlt size={24} /> : <FaMobileAlt size={24} />}
                </div>
                <ol>
                  <li>Install the MetaMask app from your app store if you haven't already</li>
                  <li>Set up your wallet in the MetaMask app</li>
                  <li>Tap "Install MetaMask" button below to open the app</li>
                  <li>In MetaMask app, use the built-in browser to navigate to this website</li>
                  <li>Connect your wallet when prompted</li>
                </ol>
              </div>
            </>
          ) : (
            <>
              <p>MetaMask browser extension is not detected.</p>
              <p>To connect your wallet, please install MetaMask first.</p>
              <div className="metamask-steps">
                <h4>How to install:</h4>
                <div className="device-icon">
                  <FaDesktop size={24} />
                </div>
                <ol>
                  <li>Visit the MetaMask website</li>
                  <li>Download and install the extension for your browser</li>
                  <li>Create a new wallet or import an existing one</li>
                  <li>Return to this page and click "Connect Wallet" again</li>
                </ol>
              </div>
            </>
          )}
        </div>
        <div className="modal-footer">
          <button
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="metamask-button"
            onClick={isMobile ? openMetaMaskApp : onInstall}
          >
            {isMobile ? 'Open MetaMask App' : 'Install MetaMask'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(NoMetamaskModal); 