import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import GuidePopup from './GuidePopup';
import { ethers } from 'ethers';
import './ConnectWallet.css';  // Thêm import CSS
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    position: 'relative',
    background: '#1a1a1a',
    borderRadius: '12px',
    padding: '24px',
    width: '90%',
    maxWidth: '400px',
    margin: 'auto',
    border: 'none',
    inset: 'auto'
  }
};

const ConnectWallet = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showDisconnectOptions, setShowDisconnectOptions] = useState(false);

  useEffect(() => {
    // Kiểm tra mobile và MetaMask browser
    const checkEnvironment = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(userAgent);
      const isMetaMaskBrowser = userAgent.includes('MetaMaskMobile');

      setIsMobile(isMobileDevice && !isMetaMaskBrowser);
    };

    checkEnvironment();
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    } catch (error) {
      console.error("Check connection error:", error);
    }
  };

  const handleConnectClick = async () => {
    if (!account) {
      if (isMobile) {
        // Trên mobile thông thường: hiện hướng dẫn mở MetaMask browser
        setShowGuide(true);
      } else {
        // Trên desktop hoặc MetaMask browser: kết nối trực tiếp
        await connectWallet();
      }
    } else {
      // Đã kết nối: hiện options disconnect
      setShowDisconnectOptions(true);
    }
  };

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      if (!window.ethereum) {
        throw new Error("MetaMask không được tìm thấy!");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setShowGuide(false);
      }
    } catch (error) {
      console.error("Connection error:", error);
      if (isMobile) {
        setShowGuide(true); // Hiện hướng dẫn nếu có lỗi trên mobile
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setShowDisconnectOptions(false);
    // Lưu ý: MetaMask không có API chính thức để disconnect
    // Chúng ta chỉ có thể xóa state local
  };

  // Component hiển thị
  return (
    <>
      <button
        onClick={handleConnectClick}
        disabled={isConnecting}
        className="connect-button"
      >
        {isConnecting ? "Connecting..." :
          account ? `${account.slice(0, 6)}...${account.slice(-4)}` :
            "Connect Wallet"}
      </button>

      <GuidePopup
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />

      <Modal
        isOpen={showDisconnectOptions}
        onRequestClose={() => setShowDisconnectOptions(false)}
        style={customStyles}
        contentLabel="Wallet Information"
      >
        <div className="popup-header">
          <h3>Wallet Information</h3>
          <button
            className="popup-close"
            onClick={() => setShowDisconnectOptions(false)}
          >
            ×
          </button>
        </div>
        <div className="guide-steps">
          <p className="wallet-info">
            Wallet Address: <br />
            <code>{account}</code>
          </p>
          <button
            className="disconnect-button"
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ConnectWallet; 