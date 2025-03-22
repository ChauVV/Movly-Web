import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaExternalLinkAlt, FaCopy, FaTimes } from 'react-icons/fa';
import './DialogResult.css';

const DialogResult = ({ isOpen, onClose, result }) => {
  const [copyMessage, setCopyMessage] = useState(false);

  if (!isOpen || !result) return null;

  const { success, error, txHash, tokenAmount, paymentMethod, paymentAmount } = result;

  // Check if we're on mainnet or testnet to get the appropriate explorer URL
  const getExplorerUrl = (hash) => {
    if (!hash) return '#';

    // Change network ID based on the network you're connected to
    // Chain ID of BSC Mainnet is 56, BSC Testnet is 97
    const networkId = window.ethereum ? window.ethereum.networkVersion : null;
    const isMainnet = networkId === '56';

    const baseUrl = isMainnet
      ? 'https://bscscan.com/tx/'
      : 'https://testnet.bscscan.com/tx/';

    return `${baseUrl}${hash}`;
  };

  const handleCopyHash = () => {
    if (txHash) {
      navigator.clipboard.writeText(txHash);
      setCopyMessage(true);
      setTimeout(() => setCopyMessage(false), 2000);
    }
  };

  return (
    <div className="sale-dialog-overlay">
      <div className="sale-dialog-container">
        <div className={`sale-dialog-header ${success ? 'success' : 'error'}`}>
          <div className={`sale-dialog-icon ${success ? 'success' : 'error'}`}>
            {success ? <FaCheckCircle size={22} /> : <FaTimesCircle size={22} />}
          </div>
          <h2>{success ? 'Transaction Successful' : 'Transaction Failed'}</h2>
        </div>

        <div className="sale-dialog-content">
          {success ? (
            <>
              <p className="sale-dialog-message">
                Congratulations! You have successfully purchased:
              </p>
              <h3 style={{ textAlign: 'center', color: '#ffb901', fontSize: '24px', margin: '10px 0 20px' }}>
                {Number(tokenAmount).toLocaleString()} MOVLY
              </h3>
            </>
          ) : (
            <div className="sale-dialog-message" style={{ color: '#ea3943' }}>
              {error || 'An error occurred during the transaction.'}
            </div>
          )}

          <div className="sale-dialog-details">
            {success && (
              <>
                <div className="sale-detail-row">
                  <span className="sale-detail-label">Payment Method:</span>
                  <span className="sale-detail-value">{paymentMethod}</span>
                </div>
                <div className="sale-detail-row">
                  <span className="sale-detail-label">Payment Amount:</span>
                  <span className="sale-detail-value">{paymentAmount} {paymentMethod}</span>
                </div>
              </>
            )}

            {txHash && (
              <div className="sale-detail-row">
                <span className="sale-detail-label">Transaction Hash:</span>
                <div className="sale-hash-container">
                  <span className="sale-hash-text">{txHash.slice(0, 6)}...{txHash.slice(-4)}</span>
                  <FaCopy className="sale-copy-icon" onClick={handleCopyHash} />
                  {copyMessage && <span className="sale-copy-message">Copied!</span>}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sale-dialog-footer">
          {txHash && (
            <a
              href={getExplorerUrl(txHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="sale-dialog-btn sale-dialog-btn-explorer"
            >
              View on BSCScan <FaExternalLinkAlt size={12} />
            </a>
          )}
          <button onClick={onClose} className="sale-dialog-btn sale-dialog-btn-close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogResult;
