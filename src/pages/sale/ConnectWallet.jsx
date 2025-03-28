import React, { useState, memo } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import metamaskIcon from '@assets/icons/metamark.svg';
import DisconnectModal from './DisconnectModal';
import NoMetamaskModal from './NoMetamaskModal';
import './ConnectWallet.css';
import './WalletModals.css';

const ConnectWallet = ({ account, setAccount }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [showNoMetamaskModal, setShowNoMetamaskModal] = useState(false);

  // Wallet connection handler
  const handleConnectWallet = async () => {
    // If already connected, show disconnect modal instead of trying to connect
    if (account) {
      setShowDisconnectModal(true);
      return;
    }

    if (!isConnecting) {
      try {
        setIsConnecting(true);

        // Check if on mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (!window.ethereum) {
          // Show the MetaMask installation modal
          setShowNoMetamaskModal(true);
          return;
        }

        // Check if MetaMask is unlocked
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);

          // Add timeout to avoid hanging if user doesn't respond
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Connection request timed out")), 30000)
          );

          // Run both promises with race to get the result from whichever completes first
          const accounts = await Promise.race([
            provider.send("eth_requestAccounts", []),
            timeoutPromise
          ]);

          if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);
            toast.success("Wallet connected successfully!");
          }
        } catch (error) {
          console.error("Connection error:", error);

          // Display error based on code
          if (error.code === -32002) {
            toast.error("Please open MetaMask and log in, then try again");
          } else if (error.code === 4001) {
            toast.error("You rejected the connection request");
          } else {
            toast.error("Connection failed: " + (error.message || "Unknown error"));
          }
        }
      } finally {
        setIsConnecting(false);
      }
    }
  };

  // Handle wallet disconnection
  const handleDisconnect = () => {
    setAccount(null);
    toast.success("Wallet disconnected successfully");
    setShowDisconnectModal(false);
  };

  // Open MetaMask website in a new tab
  const handleGoToMetamask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  // Use account instead of address and isConnected
  const isWalletConnected = !!account;

  return (
    <>
      <div className="wallet-connect-container">
        <h3 className="wallet-connect-title">
          {isWalletConnected
            ? 'Wallet Connected'
            : isConnecting
              ? 'Connecting...'
              : 'Connect Your Wallet'}
        </h3>
        <div
          className={`wallet-icon-container ${isWalletConnected ? 'connected' : ''} ${isConnecting ? 'connecting' : ''}`}
          onClick={handleConnectWallet}
          style={{ cursor: isConnecting ? 'default' : 'pointer' }}
        >
          <img
            src={metamaskIcon}
            alt="MetaMask"
            className="wallet-icon"
          />
        </div>
        <p className="wallet-connect-desc" style={{ color: isWalletConnected ? '#ffb901' : '#e5e5e5' }}>
          {isWalletConnected
            ? account
            : isConnecting
              ? 'Waiting for MetaMask confirmation...'
              : 'Connect your wallet to buy Movly tokens'}
        </p>
      </div>

      {/* Disconnect Confirmation Modal */}
      <DisconnectModal
        isOpen={showDisconnectModal}
        account={account}
        onDisconnect={handleDisconnect}
        onCancel={() => setShowDisconnectModal(false)}
      />

      {/* No MetaMask Modal */}
      <NoMetamaskModal
        isOpen={showNoMetamaskModal}
        onClose={() => setShowNoMetamaskModal(false)}
        onInstall={handleGoToMetamask}
      />
    </>
  );
};

export default memo(ConnectWallet);
