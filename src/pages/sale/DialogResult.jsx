import React, { memo } from 'react';
import { FaCheck, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import './DialogResult.css';
import './WalletModals.css'; // Import shared styles with NoMetamaskModal

const DialogResult = ({ isOpen, onClose, result }) => {
  if (!isOpen || !result) return null;

  const getExplorerUrl = (txHash) => {
    const networkId = window.ethereum ? window.ethereum.networkVersion : null;
    const isMainnet = networkId === '56';

    const baseUrl = isMainnet
      ? 'https://bscscan.com/tx/'
      : 'https://testnet.bscscan.com/tx/';

    return `${baseUrl}${txHash}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container transaction-result-modal">
        <div className="modal-header">
          {result.success ? (
            <h3 className="success-header-text">
              <FaCheck className="success-icon" /> Transaction Successful
            </h3>
          ) : (
            <h3 className="error-header-text">
              <FaTimes className="error-icon" /> Transaction Failed
            </h3>
          )}
        </div>

        <div className="modal-body">
          {result.success ? (
            <div className="success-content">
              <p className="success-message">
                You have successfully purchased <span className="highlight">{result.tokenAmount}</span> Movly tokens!
              </p>
              <div className="transaction-info">
                <div className="info-row">
                  <span className="info-label">Amount paid:</span>
                  <span className="info-value">{result.paymentAmount} {result.paymentMethod}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Transaction:</span>
                  <a
                    href={getExplorerUrl(result.txHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tx-link"
                  >
                    View on Explorer <FaExternalLinkAlt size={12} />
                  </a>
                </div>
              </div>
              <div className="follow-up-message">
                <p>Tokens will be available for claim after the sale ends. Check the homepage for updates.</p>
              </div>
            </div>
          ) : (
            <div className="error-content">
              <p className="error-message">{result.error}</p>
              {result.txHash && (
                <div className="transaction-info">
                  <a
                    href={getExplorerUrl(result.txHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tx-link"
                  >
                    View transaction details <FaExternalLinkAlt size={12} />
                  </a>
                </div>
              )}
              <div className="follow-up-message error">
                <p>Please try again or contact support if the issue persists.</p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className={result.success ? "success-button" : "disconnect-button"} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(DialogResult);
